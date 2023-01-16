import { Component, Input, OnInit } from '@angular/core';
import { CarterasService } from '../../../carteras.service';
import { CargandoService } from '../../../../../../services/cargando.service';
import { AlertComponent } from '../../../../../../shared/alert/alert.component';
import { PopoverController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LectorQrComponent } from 'src/app/shared/lector-qr/lector-qr.component';

@Component({
  selector: 'app-popover-cards',
  templateUrl: './popover-cards.component.html',
  styleUrls: ['./popover-cards.component.scss'],
})
export class PopoverCardsComponent implements OnInit {
  cards: any = [];
  select_card = false;

  constructor(
    private cartera_service: CarterasService,
    private cargando_service: CargandoService,
    private popover_controller: PopoverController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.cargar_mis_cards();
  }
  cargar_mis_cards() {
    this.cartera_service.cargar_cards().subscribe((data: any) => {
      this.cards = data.data;
    }, error => {
      this.cargando_service.terminaCargando();
      this.Alert(error.error.message, 'OK', true);
    })
  }
  seleccion_card(cardNumber) {
    this.popover_controller.dismiss({data: true, cardNumber});
  }
  async lectorQr() {
    const modal = await this.modalController.create({
      component: LectorQrComponent,
      backdropDismiss: true,
      swipeToClose: true
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data.data) { setTimeout(() => {this.relacionar_card(data.data);},500) }
  }
  relacionar_card(cardNumber) {
    this.cartera_service.relacionar_card(cardNumber).subscribe((data: any) => {
      this.Alert(data.message, 'OK', false);
      this.cargar_mis_cards();
    }, error => {
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
