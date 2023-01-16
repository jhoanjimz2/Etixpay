import { Component, Input } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { CarterasService } from '../../../carteras.service';
import { CargandoService } from '../../../../../../services/cargando.service';
import { MetodosPagoService } from 'src/app/services/metodos-pago.service';
import { environment } from 'src/environments/environment';
import { SelectCantidadComponent } from 'src/app/shared/select-cantidad/select-cantidad.component';
import {loadStripe} from '@stripe/stripe-js';


export interface Card {
  number: string
  exp_month: number
  exp_year: number
  cvc: string
  name: string
}
export interface CardStripe {
  number: string
  expMonth: number
  expYear: number
  cvc: string
  name: string
}

@Component({
  selector: 'app-recargas',
  templateUrl: './recargas.component.html',
  styleUrls: ['./recargas.component.scss'],
})
export class RecargasComponent {
  @Input() modal;
  cuenta_seleccionada: any = {};
  botones = [
    {valor: 2000, size: 12},
    {valor: 1000, size: 7},
    {valor: 500, size: 5},
    {valor: 200, size: 4.5},
    {valor: 100, size: 4.5},
    {valor: 50, size: 3}
  ]
  
  @Input() opcion_modal = 1;

  @Input() cantidad = 0;

  card: Card = {
    number: null,
    exp_month: null,
    exp_year: null,
    cvc: null,
    name: null
  };

  card_stripe: CardStripe = {
    number: null,
    expMonth: null,
    expYear: null,
    cvc: null,
    name: null
  };

  reset_form = false;

  saved_card = false;

  codigo_transaccion = null;
  fecha_transaccion: Date;

  constructor(
    private modal_controller: ModalController,
    private popover_controller: PopoverController,
    private carteras_service: CarterasService,
    private cargando_service: CargandoService,
    private metodos_pago_service: MetodosPagoService
  ) { }

  ngOnInit(): void {
    if (this.opcion_modal == 3) this.modal.cssClass = 'modal_recargas_abierto'; 
  }

  salir_sin_argumentos() {
    this.modal_controller.dismiss();
  }
  eliminar_seleccion() {
    this.cuenta_seleccionada.seleccionado = false;
  }
  seleccion(event) {
    this.reset_form = !this.reset_form;
    this.cuenta_seleccionada = event.cuenta_seleccionada;
  }
  recargar(event) {
    if (!event.valid && this.cuenta_seleccionada.seleccionado) this.crear_pay_intent_tarjeta_guardada();
    if (event.valid && !this.cuenta_seleccionada.seleccionado) {
      this.saved_card = event.save;
      this.card = event.card;
      this.crear_pay_intent_tarjeta_ingresada();
    }
  }
  crear_pay_intent_tarjeta_guardada() {
    this.cargando_service.iniciaCargando();
    this.metodos_pago_service.crear_intent_pay(
      'Comprar TIX',
      this.cantidad,
      this.cuenta_seleccionada.id,
      JSON.parse(localStorage.getItem('user')).username
      ).subscribe((data: any) => {
      this.confirmar_pay_intent(data.data.client_secret, data.data.payment_method)
    }, error => {
      this.cargando_service.terminaCargando();
      this.Alert(error.error.message, 'OK', true);
    })
  }
  crear_pay_intent_tarjeta_ingresada() {
    this.cargando_service.iniciaCargando();
    this.metodos_pago_service.crear_intent_pay_con_tarjetas(
      this.card, 
      this.cantidad,
      'Comprar TIX'
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
        this.comprar_tix(data.paymentIntent.id);
      }
    });
  }
  comprar_tix(token) {
    this.carteras_service.comprar_tix_con_tarjeta( localStorage.getItem('wallet'), this.cantidad, token).subscribe(( data: any) => {
      this.codigo_transaccion = data.data.transaccionCODIGO;
      this.fecha_transaccion = new Date();
      if (this.saved_card) this.crear_token_card();
      this.cargando_service.terminaCargando();
      this.click(4);
    }, error => {
      this.cargando_service.terminaCargando();
      this.Alert(error.error.message , 'OK', true);
    });
  }
  crear_token_card() {
    this.add_tarjeta_credito();
  }
  get set_tarjeta_stripe() {
    let card = {
      number:  this.card.number,
      exp_month: this.card.exp_month,
      exp_year:  this.card.exp_year,
      cvc:  this.card.cvc,
      name: this.card.name
     };
    return card;
  }
  add_tarjeta_credito() {
    this.carteras_service.add_tarjeta_credito_sin_form_data(
      this.set_tarjeta_stripe, 
      JSON.parse(localStorage.getItem('user')).username)
    .subscribe((data: any) => {
    });
  }
  click(id) {
    this.opcion_modal = id;
    if (id == 1) this.modal.cssClass = 'modal_recargas'; 
    if (id == 2) this.modal.cssClass = 'modal_recargas_cerrado'; 
    if (id == 3) this.modal.cssClass = 'modal_recargas_abierto'; 
    if (id == 4) this.modal.cssClass = 'modal_recargas_abierto'; 
  }
  async cantidad_popover() {
    const popover = await this.popover_controller.create({
      component: SelectCantidadComponent,
      cssClass: 'popoverCantidad',
      mode: 'ios',
      translucent: false,
      backdropDismiss: false
    });
    await popover.present();
    const { data } = await popover.onDidDismiss();
    if (data.datos) this.cantidad = data.cantidad ;
  }
  async Alert(tex, bot, value) {
    const popover = await this.popover_controller.create({
      component: AlertComponent,
      cssClass: 'popover_central',
      mode: 'ios',
      componentProps: {
        texto: tex,
        boton: bot,
        img: value
      },
      translucent: false,
      backdropDismiss: false
    });
    return await popover.present();
  }


}
