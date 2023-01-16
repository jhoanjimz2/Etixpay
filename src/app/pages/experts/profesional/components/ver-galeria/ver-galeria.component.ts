import { Component, Input, EventEmitter } from '@angular/core';
import { CargandoService } from 'src/app/services/cargando.service';
import { PopoverController, ModalController } from '@ionic/angular';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

@Component({
  selector: 'app-ver-galeria',
  templateUrl: './ver-galeria.component.html',
  styleUrls: ['./ver-galeria.component.scss'],
})
export class VerGaleriaComponent {

  @Input() galery: string[] = []; 
  @Input() cargarGalery: EventEmitter<any> = new EventEmitter();

  uuidImgSelect: string = "";

  constructor(
    private cargandoService: CargandoService,
    private popoverController: PopoverController,
    private modalController: ModalController
  ) { 
  }
  back() {
    this.modalController.dismiss();
  }
  async Alert(tex, bot, tipo) {
    const popover = await this.popoverController.create({
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
