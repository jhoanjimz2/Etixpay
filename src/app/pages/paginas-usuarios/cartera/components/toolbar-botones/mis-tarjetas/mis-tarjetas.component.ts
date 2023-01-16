import { Component, Input, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { TopUpCardComponent } from '../top-up-card/top-up-card.component';
import { RechargeComponent } from '../recharge/recharge.component';
import { PopoverCardsComponent } from '../popover-cards/popover-cards.component';
import { AlertComponent } from '../../../../../../shared/alert/alert.component';
import { CarterasService } from '../../../carteras.service';
import { TranslateService } from '@ngx-translate/core';
import { CargandoService } from '../../../../../../services/cargando.service';
import { AliasCardsComponent } from '../alias-cards/alias-cards.component';
import { LectorQrComponent } from 'src/app/shared/lector-qr/lector-qr.component';

@Component({
  selector: 'app-mis-tarjetas',
  templateUrl: './mis-tarjetas.component.html',
  styleUrls: ['./mis-tarjetas.component.scss'],
})
export class MisTarjetasComponent implements OnInit {
  @Input() cardNumber;
  card_seleccionada = {
    cardALIAS: null,
    saldo: 0,
    cardNUMERO: null,
    wallet: {
      walletSALDOATM: 0,
      walletCODIGO: null
    }
  };
  cargando = false;

  constructor(
    private modal_controller: ModalController,
    private popover_controller: PopoverController,
    private cartera_service: CarterasService,
    private translate_service: TranslateService,
    private cargando_service: CargandoService
  ) { }

  ngOnInit() {
    this.cargar_seleccion_de_card();
  }
  salir_sin_argumentos() {
    this.modal_controller.dismiss({data: false});
  }
  cargar_seleccion_de_card_dos(event) {
    this.cargando = true;
    this.cartera_service.cargar_card_especifico(this.cardNumber).subscribe((data: any) => {
      this.card_seleccionada = data.data;
      this.cargando = false;
      event.target.complete();
    }, error => {
      this.cargando = false;
      this.Alert(error.error.message, 'OK', true);
    })
  }
  cargar_seleccion_de_card() {
    this.cargando = true;
    this.cartera_service.cargar_card_especifico(this.cardNumber).subscribe((data: any) => {
      this.card_seleccionada = data.data;
      this.cargando = false;
    }, error => {
      this.cargando = false;
      this.Alert(error.error.message, 'OK', true);
    })
  }
  async top_up_card() {
    return 0;
    const modal = await this.modal_controller.create({
      component: TopUpCardComponent,
      cssClass: 'modal_recargas',
      backdropDismiss: true
    });
    modal.componentProps = {  modal, wallet_card: this.card_seleccionada.wallet.walletCODIGO  }
    await modal.present();
    const { data } = await modal.onDidDismiss();
  }
  
  async recharge() {
    const modal = await this.modal_controller.create({
      component: RechargeComponent,
      cssClass: 'modal_recargas',
      backdropDismiss: true
    });
    modal.componentProps = {  modal, wallet_card: this.card_seleccionada.wallet.walletCODIGO  }
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data) if (data.data) { this.cargar_seleccion_de_card() }
  }
  async popover_cards(ev: any) {
    const popover = await this.popover_controller.create({
      component: PopoverCardsComponent,
      event: ev,
      translucent: true,
      mode: 'ios',
      cssClass: 'popover_card_menu'
    });
    await popover.present();
    const { data } = await popover.onDidDismiss();
    if (data) if (data.data) { this.cardNumber = data.cardNumber; this.cargar_seleccion_de_card()}
  }
  async alias_cards(ev: any) {
    const popover = await this.popover_controller.create({
      component: AliasCardsComponent,
      event: ev,
      translucent: true,
      mode: 'ios',
      cssClass: 'popover_card',
      componentProps: {
        cardNumber: this.cardNumber
      }
    });
    await popover.present();
    const { data } = await popover.onDidDismiss();
    if (data) if (data.data) { this.cargar_seleccion_de_card() }
  }
  async lectorQr() {
    const modal = await this.modal_controller.create({
      component: LectorQrComponent,
      backdropDismiss: true,
      swipeToClose: true
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data.data) { setTimeout(() => {this.ver_pay(JSON.parse(data.data).uuid, JSON.parse(data.data).objetoNOMBRE);},500) }
  }
  ver_pay(uuid, tienda) {
    this.cargando_service.iniciaCargando();
    this.cartera_service.ver_pay(this.card_seleccionada.wallet.walletCODIGO, uuid).subscribe((data: any) => {
      this.cargando_service.terminaCargando();
      let cantidad_uno, cantidad_dos;
      if (data.data.solicitudEnvioTransaccionTIPO === 'TICKET') {
        if (data.data.solicitudEnvioTransaccionCANTIDATICKET)  cantidad_uno = parseFloat(data.data.solicitudEnvioTransaccionCANTIDATICKET);
        else if (!data.data.solicitudEnvioTransaccionCANTIDATICKET) cantidad_uno = 0;
        if (data.data.solicitudEnvioTransaccionCANTIDADEXTRATICKET) cantidad_dos = parseFloat(data.data.solicitudEnvioTransaccionCANTIDADEXTRATICKET);
        else if (!data.data.solicitudEnvioTransaccionCANTIDADEXTRATICKET) cantidad_dos = 0;
      } 
      else if (data.data.solicitudEnvioTransaccionTIPO === 'ATM') {
        if (data.data.solicitudEnvioTransaccionCANTIDADATM) cantidad_uno = parseFloat(data.data.solicitudEnvioTransaccionCANTIDADATM);
        else if (!data.data.solicitudEnvioTransaccionCANTIDADATM) cantidad_uno = 0;
        if (data.data.solicitudEnvioTransaccionCANTIDADEXTRAATM) cantidad_dos = parseFloat(data.data.solicitudEnvioTransaccionCANTIDADEXTRAATM);
        else if (!data.data.solicitudEnvioTransaccionCANTIDADEXTRAATM) cantidad_dos = 0;
      }
      this.pago(cantidad_uno,cantidad_dos, uuid, tienda, data.favorito, this.card_seleccionada.wallet.walletCODIGO);
    }, error => {
      this.cargando_service.terminaCargando();
      this.Alert(error.error.message, 'OK' , true);
    });
  }
  async pago(cantidad_uno, cantidad_dos, uuid, tienda, favorito, wallet) {
   /*  const modal = await this.modal_controller.create({
      component: PagoComponent,
      componentProps:{
        cantidad_uno, 
        cantidad_dos,
        uuid, 
        tienda, 
        favorito,
        wallet
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data.data) this.cargar_seleccion_de_card(); */
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
