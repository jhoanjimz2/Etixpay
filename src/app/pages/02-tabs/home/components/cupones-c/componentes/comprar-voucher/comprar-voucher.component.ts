import { Component, Input, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { ModalController, PopoverController } from '@ionic/angular';
import { CargandoService } from '../../../../../../../services/cargando.service';
import { MetodosPagoService } from '../../../../../../../services/metodos-pago.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { HomeService } from '../../../../../../../services/home.service';
import { PagarService } from '../../../../../../../services/pagar.service';
import { HttpClient } from '@angular/common/http';
import { CompraVoucherExitosaComponent } from '../compra-voucher-exitosa/compra-voucher-exitosa.component';
import { environment } from 'src/environments/environment';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-comprar-voucher',
  templateUrl: './comprar-voucher.component.html',
  styleUrls: ['./comprar-voucher.component.scss'],
})
export class ComprarVoucherComponent implements OnInit {
  @Input() flash = false;
  @Input() voucher: any;
  prev_select = [{ 
    seleccionado: true, 
    nombre: 'TIX' , 
    texto: JSON.parse(localStorage.getItem('user')).username,
    img: '/assets/tabs/componentes/tix.png',
    tipo: 'TIX',
    id: null
  }];

  
  _second = 1000;
  _minute = this._second * 60;
  _hour = this._minute * 60;
  _day = this._hour * 24;
  end: any;
  now: any;
  day: any;
  hours: any;
  minutes: any;
  seconds: any;
  source = timer(0, 1000);
  clock: any;

  cantidad = 0;
  precio_total = 0;
  pr_total = 0;

  constructor(
    private modal_controller: ModalController,
    private cargando_service: CargandoService,
    private metodos_pago_service: MetodosPagoService,
    private popover_controller: PopoverController,
    private home_service: HomeService,
    private http: HttpClient,
    private pagar_service: PagarService
  ) { }

  ngOnInit() {
    this.sumar_cantidad();
    this.cargar_reloj();
  }
  cargar_reloj() {
    this.clock = this.source.subscribe(t => {
      this.now = new Date();
      this.end = new Date(this.voucher.voucherFECHACADUCIDAD);
      this.end.setDate(this.end.getDate());
      this.end.setHours(this.end.getHours());
      this.showDate();
    });
  }
  showDate() {
    let distance = this.end - this.now;
    this.day = Math.floor(distance / this._day);
    this.hours = Math.floor((distance % this._day) / this._hour);
    this.minutes = Math.floor((distance % this._hour) / this._minute);
    this.seconds = Math.floor((distance % this._minute) / this._second);
  }
  sumar_cantidad() {
    this.cantidad = this.cantidad + 1;
    this.precio_total = this.cantidad * this.voucher.voucherPRECIO;
    let valor_comision = ((this.voucher.voucherPRECIO * this.voucher.voucherCOMISION)/100);
    this.pr_total = ((valor_comision * this.voucher.voucherPUNTORECOMPENSA) / 100) * this.cantidad;
  }
  restar_cantidad() {
    this.cantidad = this.cantidad - 1;
    this.precio_total = this.cantidad * this.voucher.voucherPRECIO;
    let valor_comision = ((this.voucher.voucherPRECIO * this.voucher.voucherCOMISION)/100);
    this.pr_total = ((valor_comision * this.voucher.voucherPUNTORECOMPENSA) / 100) * this.cantidad;
  }
  get categoria() {
    if (localStorage.getItem('lenguaje') == 'it') if (this.voucher.voucher_type) return this.voucher.voucher_type.voucher_tipoTITULOIT;
    if (localStorage.getItem('lenguaje') == 'en') if (this.voucher.voucher_type) return this.voucher.voucher_type.voucher_tipoTITULOEN;
    if (localStorage.getItem('lenguaje') == 'es') if (this.voucher.voucher_type) return this.voucher.voucher_type.voucher_tipoTITULOES;
    if (localStorage.getItem('lenguaje') == 'ro') if (this.voucher.voucher_type) return this.voucher.voucher_type.voucher_tipoTITULORO;
  }
  tipo_de_pago() {
    if (this.voucher.voucherPRECIO == 0) return this.voucher_gratis_o_precio_cero();
    if(this.prev_select[0].tipo == 'TIX') return this.pagar_voucher_tix();
    if(this.prev_select[0].tipo == 'TC') return this.crear_pay_intent_tarjeta_guardada();
  }
  crear_pay_intent_tarjeta_guardada() {
    this.cargando_service.iniciaCargando();
    this.metodos_pago_service.crear_intent_pay(
      'Comprar voucher',
      this.cantidad,
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
        this.pagar_voucher_tc(data.paymentIntent.id);
      }
    });
  }
  pagar_voucher_tc(payIntent) {
    this.home_service.pagar_voucher_evento(
      payIntent, 
      localStorage.getItem('wallet'), 
      this.precio_total, 
      'Comprar voucher',
      1, 
      'APROBADO', 
      3,
      this.voucher.id,
      this.cantidad
      )
      .subscribe( (data: any) => {
        this.cargando_service.terminaCargando();
        this.modal_controller.dismiss({data: true});
        this.compra_exitosa();
    }, error => {
      this.cargando_service.terminaCargando();
      this.Alert(error.error.message, 'OK', true);
    })
  }
  pagar_voucher_tix() {
    this.cargando_service.iniciaCargando();
    this.home_service.pagar_voucher_evento(
      undefined, 
      localStorage.getItem('wallet'), 
      this.precio_total, 
      'Comprar voucher',
      1, 
      'APROBADO', 
      4, 
      this.voucher.id,
      this.cantidad
      ).subscribe( (data: any) => {
        this.cargando_service.terminaCargando();
        this.modal_controller.dismiss({data: true});
        this.compra_exitosa();
    }, error => {
      this.cargando_service.terminaCargando();
      this.Alert(error.error.message, 'OK', true);
    })
  }
  
  voucher_gratis_o_precio_cero() {
    this.cargando_service.iniciaCargando();
    this.home_service.pagar_voucher_evento(
      undefined, 
      localStorage.getItem('wallet'), 
      this.precio_total, 
      'Comprar voucher',
      1, 
      'APROBADO', 
      7, 
      this.voucher.id,
      this.cantidad
      ).subscribe( (data: any) => {
        this.cargando_service.terminaCargando();
        this.modal_controller.dismiss({data: true});
        this.compra_exitosa();
    }, error => {
      this.cargando_service.terminaCargando();
      this.Alert(error.error.message, 'OK', true);
    })
  }

  async compra_exitosa() {
    this.modal_controller.dismiss({data: true});
    const modal = await this.modal_controller.create({
      component: CompraVoucherExitosaComponent
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
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
