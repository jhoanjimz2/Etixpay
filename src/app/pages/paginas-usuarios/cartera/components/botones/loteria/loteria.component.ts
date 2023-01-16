import { Component, Input, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { HistorialDeLoteriaComponent } from './componentes/historial-de-loteria/historial-de-loteria.component';

@Component({
  selector: 'app-loteria',
  templateUrl: './loteria.component.html',
  styleUrls: ['./loteria.component.scss'],
})
export class LoteriaComponent implements OnInit {
  @Input() datos: any;
  @Input() porcentajeBarra = 0;

  constructor(
    private modalController: ModalController,
    private popover_controller: PopoverController
  ) { }

  ngOnInit() {
  }
  salirSinArgumentos() {
    this.modalController.dismiss();
  }
  async historial() {
    return 0;
    const modal = await this.modalController.create({
      component: HistorialDeLoteriaComponent,
      backdropDismiss: false
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
  }
  reglas() {
    window.open('https://etixpay.com/es/terminos-de-uso/');
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
