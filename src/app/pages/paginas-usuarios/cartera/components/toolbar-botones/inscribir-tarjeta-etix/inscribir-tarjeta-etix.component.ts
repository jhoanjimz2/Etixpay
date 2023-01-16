import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { CarterasService } from '../../../carteras.service';
import { TranslateService } from '@ngx-translate/core';
import { CargandoService } from 'src/app/services/cargando.service';
import { AlertComponent } from '../../../../../../shared/alert/alert.component';
import { LectorQrComponent } from 'src/app/shared/lector-qr/lector-qr.component';

@Component({
  selector: 'app-inscribir-tarjeta-etix',
  templateUrl: './inscribir-tarjeta-etix.component.html',
  styleUrls: ['./inscribir-tarjeta-etix.component.scss'],
})
export class InscribirTarjetaEtixComponent implements OnInit {

  constructor(
    private modal_controller: ModalController,
    private cartera_service: CarterasService,
    private popover_controller: PopoverController
  ) { }

  ngOnInit() {
  }
  salir_sin_argumentos() {
    this.modal_controller.dismiss({data: false});
  }
  async lectorQr() {
    const modal = await this.modal_controller.create({
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
      this.modal_controller.dismiss({data: true});
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
