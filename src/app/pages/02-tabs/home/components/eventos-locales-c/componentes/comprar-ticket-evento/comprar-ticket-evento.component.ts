import { Component, Input, OnInit } from '@angular/core';
import { HomeService } from '../../../../../../../services/home.service';
import { CargandoService } from '../../../../../../../services/cargando.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PopoverController, ModalController } from '@ionic/angular';
import { MetodosPagoService } from '../../../../../../../services/metodos-pago.service';
import { environment } from 'src/environments/environment';
import { loadStripe } from '@stripe/stripe-js';


@Component({
  selector: 'app-comprar-ticket-evento',
  templateUrl: './comprar-ticket-evento.component.html',
  styleUrls: ['./comprar-ticket-evento.component.scss'],
})
export class ComprarTicketEventoComponent implements OnInit {
  @Input() detalle_evento: any;
  @Input() boton_seleccionado:any;
  operacion = {
    cantidad: 0,
    total: 0,
    cantidad_restante: 0,
    precio: 0,
    comision: 0,
    pr: 0,
    valor_comision: 0,
    pr_total: 0
  }
  prev_select = [{ 
    seleccionado: true, 
    nombre: 'TIX' , 
    texto: JSON.parse(localStorage.getItem('user')).username,
    img: '/assets/tabs/componentes/tix.png',
    tipo: 'TIX',
    id: null
  }]
  constructor(
    private home_service: HomeService,
    private cargando_service: CargandoService,
    private popover_controller: PopoverController,
    private modal_controller: ModalController,
    private metodos_pago_service: MetodosPagoService
    ) {}
 
  ngOnInit() {
    this.actualizar_operacion();
  }
  salir() {
    this.modal_controller.dismiss();
  }
  actualizar_operacion() {
    this.operacion.cantidad = 1;
    this.operacion.total = this.boton_seleccionado.voucher_event.voucherPRECIO;
    this.operacion.precio = this.boton_seleccionado.voucher_event.voucherPRECIO;
    this.operacion.cantidad_restante = this.boton_seleccionado.evento_ticket_detalleCANTIDADTICKETDISPONIBLE;
    this.operacion.comision = this.boton_seleccionado.voucher_event.voucherCOMISION;
    this.operacion.pr = this.boton_seleccionado.voucher_event.voucherPUNTORECOMPENSA;
    this.operacion.valor_comision = ((this.operacion.precio * this.operacion.comision)/100);
    this.operacion.pr_total = ((this.operacion.valor_comision * this.operacion.pr) / 100);
  }
  restar_cantidad() {
    this.operacion.cantidad = this.operacion.cantidad - 1;
    this.operacion.total = this.operacion.precio * this.operacion.cantidad;
    this.operacion.valor_comision = ((this.operacion.precio * this.operacion.comision)/100);
    this.operacion.pr_total = ((this.operacion.valor_comision * this.operacion.pr) / 100) * this.operacion.cantidad;
  }
  sumar_canrtidad() {
    this.operacion.cantidad = this.operacion.cantidad + 1;
    this.operacion.total = this.operacion.precio * this.operacion.cantidad;
    this.operacion.valor_comision = ((this.operacion.precio * this.operacion.comision)/100);
    this.operacion.pr_total = ((this.operacion.valor_comision * this.operacion.pr) / 100) * this.operacion.cantidad;
  }
  tipo_de_pago() {
    if (this.operacion.precio == 0) return this.evento_gratis_o_precio_cero();
    if(this.prev_select[0].tipo == 'TIX') return this.pagar_voucher_evento_tix();
    if(this.prev_select[0].tipo == 'TC') return this.crear_pay_intent_tarjeta_guardada();
  }
  crear_pay_intent_tarjeta_guardada() {
    this.cargando_service.iniciaCargando();
    this.metodos_pago_service.crear_intent_pay(
      'Comprar ticket evento', 
      this.operacion.total,
      this.prev_select[0].id,
      JSON.parse(localStorage.getItem('user')).username
      ).subscribe((data: any) => {
      this.confirmar_pay_intent(data.data.client_secret, data.data.payment_method)
    }, error => {
      this.cargando_service.terminaCargando();
      this.Alert(error.error.message, 'OK', true);
    })
  }
  async confirmar_pay_intent(client_secret, payment_method) {
    const stripe = await loadStripe(environment.keyStripe);
    stripe.confirmCardPayment(client_secret, {payment_method: payment_method}).then((data: any) => {
      if (data.error) {
        this.cargando_service.terminaCargando();
        this.Alert(data.error.message, 'OK', true);
      } else {
        this.pagar_voucher_evento_tc(data.paymentIntent.id);
      }
    });
  }
  pagar_voucher_evento_tc(token) {
    this.home_service.pagar_voucher_evento(
      token, 
      localStorage.getItem('wallet'), 
      this.operacion.total, 
      'Comprar ticket evento',
      1, 
      'APROBADO', 
      3,
      this.boton_seleccionado.voucher_event.id,
      this.operacion.cantidad
      )
      .subscribe( (data: any) => {
        this.Alert(data.message, 'OK', false);
        this.cargando_service.terminaCargando();
        this.modal_controller.dismiss({data: true});
    }, error => {
      this.cargando_service.terminaCargando();
      this.Alert(error.error.message, 'OK', true);
    })
  }
  pagar_voucher_evento_tix() {
    this.cargando_service.iniciaCargando();
    this.home_service.pagar_voucher_evento(
      undefined, 
      localStorage.getItem('wallet'), 
      this.operacion.total, 
      'Comprar ticket evento',
      1, 
      'APROBADO', 
      4, 
      this.boton_seleccionado.voucher_event.id,
      this.operacion.cantidad
      ).subscribe( (data: any) => {
        this.Alert(data.message, 'OK', false);
        this.cargando_service.terminaCargando();
        this.modal_controller.dismiss({data: true});
    }, error => {
      this.cargando_service.terminaCargando();
      this.Alert(error.error.message, 'OK', true);
    })
  }
  evento_gratis_o_precio_cero() {
    this.cargando_service.iniciaCargando();
    this.home_service.pagar_voucher_evento(
      undefined, 
      localStorage.getItem('wallet'), 
      this.operacion.total, 
      'Comprar ticket evento',
      1, 
      'APROBADO', 
      7, 
      this.boton_seleccionado.voucher_event.id,
      this.operacion.cantidad
      ).subscribe( (data: any) => {
        this.Alert(data.message, 'OK', false);
        this.cargando_service.terminaCargando();
        this.modal_controller.dismiss({data: true});
    }, error => {
      this.cargando_service.terminaCargando();
      this.Alert(error.error.message, 'OK', true);
    })
  }
  async Alert(tex, bot, tipo) {
    const popover = await this.popover_controller.create({
      component: AlertComponent,
      cssClass: 'popover_central',
      mode: 'ios',
      componentProps: {
        texto: tex,
        boton: bot,
        img: tipo
      },
      translucent: false,
      backdropDismiss: false
    });
    return await popover.present();
  }

}
