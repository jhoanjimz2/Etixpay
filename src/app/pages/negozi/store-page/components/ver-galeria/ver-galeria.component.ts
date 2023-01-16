import { Component, Input, EventEmitter } from '@angular/core';
import { NegoziService } from '../../../../../services/negozi.service';
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
  @Input() editar: boolean = false;
  @Input() actualizarGalery: EventEmitter<any> = new EventEmitter();

  uuidImgSelect: string = "";

  constructor(
    private negoziService: NegoziService,
    private cargandoService: CargandoService,
    private popoverController: PopoverController,
    private modalController: ModalController
  ) { 
  }
  back() {
    this.modalController.dismiss();
  }
  eliminarImg(uuid) {
    this.cargandoService.iniciaCargando();
    this.negoziService.eliminarImg(uuid).subscribe((data: any) => {
      this.actualizarGalery.emit();
      this.back();
    }, error => {
      this.cargandoService.terminaCargando();
      this.Alert(error, 'OK', true);
    })
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
