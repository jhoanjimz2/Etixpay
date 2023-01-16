import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActionSheetController, PopoverController } from '@ionic/angular';
import { VerImgComponent } from '../ver-img/ver-img.component';
import { TranslateService } from '@ngx-translate/core';
import { CargandoService } from '../../../../../services/cargando.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { CamaraService } from 'src/app/services/camara.service';
import { ExpertsService } from '../../../../../services/experts.service';
import {Plugins, CameraResultType } from'@capacitor/core';
import { Profesional } from '../../interface/experts.model';
const {Camera} = Plugins;


@Component({
  selector: 'app-info-principal',
  templateUrl: './info-principal.component.html',
  styleUrls: ['./info-principal.component.scss'],
})
export class InfoPrincipalComponent {

  @Input() editar: boolean = false;
  @Input() uuid: string = '';
  @Input() profesional: Profesional = new Profesional();
  @Output() cargarInfoPrincipal: EventEmitter<any> = new EventEmitter();

  constructor(
    private popoverController: PopoverController,
    private translate: TranslateService,
    private actionSheetController: ActionSheetController,
    private cargandoService: CargandoService,
    private camaraService: CamaraService,
    private expertsService: ExpertsService
  ) { }

  async verImg(img) {
    const popover = await this.popoverController.create({
      component: VerImgComponent,
      cssClass: 'popoverVerImg',
      componentProps: { img },
      translucent: true,
      backdropDismiss: true
    });
    return await popover.present();
  }
  async subirImg() {
    const camara = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl
    });
    const imageUrl = camara.dataUrl;
    const imageFile = this.camaraService.dataURItoBlob(imageUrl);

    this.cargandoService.iniciaCargando();
    this.expertsService.cargarImgPerfil(imageFile, this.uuid).subscribe( (data: any) => {
      this.cargarInfoPrincipal.emit();
    }, error => { 
      this.cargandoService.terminaCargando();
      this.Alert(error.error.message, 'OK', true);
    });
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
