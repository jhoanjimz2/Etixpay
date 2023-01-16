import { Component, Input, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CargandoService } from '../../../../../../services/cargando.service';
import { CarterasService } from '../../../carteras.service';
import { AlertComponent } from '../../../../../../shared/alert/alert.component';
import { MetodosPagoService } from '../../../../../../services/metodos-pago.service';
import { environment } from 'src/environments/environment';
import { SelectCantidadComponent } from '../../../../../../shared/select-cantidad/select-cantidad.component';
import {loadStripe} from '@stripe/stripe-js';
import { LectorQrComponent } from 'src/app/shared/lector-qr/lector-qr.component';

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.scss'],
})
export class RechargeComponent implements OnInit {
  @Input() modal;
  @Input() wallet_card;
  botones = [
    {valor: 2000, size: 12},
    {valor: 1000, size: 7},
    {valor: 500, size: 5},
    {valor: 200, size: 4.5},
    {valor: 100, size: 4.5},
    {valor: 50, size: 3}
  ]
  prev_select = [
    {seleccionado: false, tipo: null, id: null}
  ];
  opcion = 1;
  cantidad = 0;
  formulario_wallet;

  constructor(
    private form_builder: FormBuilder,
    private translate_service: TranslateService,
    private modal_controller: ModalController,
    private popover_controller: PopoverController,
    private cargando_service: CargandoService,
    private cartera_service: CarterasService,
    private metodos_pago_service: MetodosPagoService
  ) { }

  ngOnInit() {
    this.cargar_formulario_wallet();
  }
  cargar_formulario_wallet() {
    this.formulario_wallet = this.form_builder.group({
      wallet: new FormControl('', [
        Validators.required
      ])
    });
  }
  salir_sin_argumentos() {
    this.modal_controller.dismiss();
  }
  salir_con_argumentos() {
    this.modal_controller.dismiss({data: true});
  }
  consultar_wallet(data) {
    this.cargando_service.iniciaCargando();
    this.cartera_service.walletQR(data).subscribe((data: any) => {
      this.formulario_wallet.controls['wallet'].setValue(data.data.walletCODIGO);
      this.cargando_service.terminaCargando();
    }, error => {
      this.cargando_service.terminaCargando();
      this.Alert(error.error.message, 'OK', true);
    });
  }
  async lectorQr() {
    const modal = await this.modal_controller.create({
      component: LectorQrComponent,
      backdropDismiss: true,
      swipeToClose: true
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data.data) { setTimeout(() => {this.consultar_wallet(data.data);},500) }
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
  click(id) {
    this.opcion = id;
    if (id == 1) this.modal.cssClass = 'modal_recargas'; 
    if (id == 2) this.modal.cssClass = 'modal_recargas_cerrado'; 
    if (id == 3) this.modal.cssClass = 'modal_recargas_abierto_top_up'; 
  }
  recarga() {
    if (this.prev_select[0].tipo == 'TC') { this.crear_pay_intent_tarjeta_guardada();}
    if (this.prev_select[0].tipo == 'TIX') { this.modal.cssClass = 'modal_recargas_cerrado'; return this.opcion = 5;}
    if (this.prev_select[0].tipo == 'ATM') this.transferir_saldo_de_wallet_a_card();
  }
  crear_pay_intent_tarjeta_guardada() {
    this.cargando_service.iniciaCargando();
    this.metodos_pago_service.crear_intent_pay(
      'Comprar TIX',
      this.cantidad,
      this.prev_select[0].id,
      JSON.parse(localStorage.getItem('user')).username
      ).subscribe((data: any) => {
        this.confirmar_pay_intent(data.data.client_secret, data.data.payment_method)
    }, error => {
      this.cargando_service.terminaCargando();
      this.Alert(error.message, 'OK', true);
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
    this.cartera_service.comprar_tix_con_tarjeta( this.wallet_card, this.cantidad, token).subscribe(( data: any) => {
      this.cargando_service.terminaCargando();
      this.modal.cssClass = 'modal_recargas_abierto'; 
      this.opcion = 4;
    }, error => {
      this.cargando_service.terminaCargando();
      this.Alert(error.error.message , 'OK', true);
    });
  }
  recarga_con_tix() {
    this.cargando_service.iniciaCargando();
    this.cartera_service.comprar_tix_con_etixcash( this.wallet_card, this.cantidad, '1', '1',  this.cantidad,this.formulario_wallet.controls.wallet.value).subscribe((datos: any) => {
      this.cargando_service.terminaCargando();
      this.modal_controller.dismiss({data: true});
      this.Alert(datos.message, 'OK', false);
    }, error => {
      this.cargando_service.terminaCargando();
      this.Alert(error.error.message, 'OK', true);
    });
  }
  transferir_saldo_de_wallet_a_card() {
    this.cargando_service.iniciaCargando();
    this.cartera_service.transferir_saldo_de_wallet_a_card( localStorage.getItem('wallet') ,this.wallet_card, this.cantidad).subscribe((data: any) => {
      this.cargando_service.terminaCargando();
      this.modal.cssClass = 'modal_recargas_abierto'; 
      this.opcion = 4;
    }, error => {
      this.cargando_service.terminaCargando();
      this.Alert(error.error.message, 'OK', true);
    });
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
