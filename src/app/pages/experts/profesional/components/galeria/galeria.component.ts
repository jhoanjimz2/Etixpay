import { Component, Input, EventEmitter, Output } from '@angular/core';
import { PopoverController, ActionSheetController, ModalController, AlertController } from '@ionic/angular';
import { VerImgComponent } from '../ver-img/ver-img.component';
import { CargandoService } from 'src/app/services/cargando.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { VerGaleriaComponent } from '../ver-galeria/ver-galeria.component';
import { TranslateService } from '@ngx-translate/core';
import { Profesional } from '../../interface/experts.model';
import { CamaraService } from 'src/app/services/camara.service';
import { ExpertsService } from '../../../../../services/experts.service';
import {Plugins, CameraResultType } from'@capacitor/core';
const {Camera} = Plugins;


@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.scss'],
})
export class GaleriaComponent {
  @Input() editar: boolean = false;
  @Input() uuid: string = '';
  @Output() cargarGalery: EventEmitter<any> = new EventEmitter();
  @Input() profesional: Profesional = new Profesional();
  imagenData;
  opcion: number = 0;

  constructor(
    private popoverController: PopoverController,
    private alertController: AlertController,
    private cargandoService: CargandoService,
    private modalController: ModalController,
    private translate: TranslateService,
    private camaraService: CamaraService,
    private expertsService: ExpertsService
  ) { }
  opcionesImg(opcion) {
    this.opcion = opcion;
    this.cargarCamara()
  }
  async verGaleria(galery) {
    const popover = await this.modalController.create({
      component: VerGaleriaComponent,
      cssClass: 'modalVerGaleria',
      componentProps: { galery, cargarGalery: this.cargarGalery },
      backdropDismiss: true
    });
    return await popover.present();
  }
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
  
  async cargarCamara() {
    const camara = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl
    });
    const imageUrl = camara.dataUrl;
    const imageFile = this.camaraService.dataURItoBlob(imageUrl);
    if (!imageUrl) return null;
    else {
      this.imagenData = imageFile;
      if (this.opcion == 1) this.subirImgMain();
      else if (this.opcion == 2) this.subirImgRectangular();
      else if (this.opcion == 3) this.subirImgGaleria();
      else if (this.opcion == 4) this.subirImgCuadrada();
    }
  }
  subirImgMain() {
    this.cargandoService.iniciaCargando();
    this.expertsService.cargarImgPerfil(this.imagenData, this.uuid).subscribe( (data: any) => {
      this.cargarGalery.emit();
    }, error => { 
      this.cargandoService.terminaCargando();
      this.Alert(error.error.message, 'OK', true);
    });
  }
  subirImgCuadrada() {
    this.cargandoService.iniciaCargando();
    this.expertsService.cargarImgCuadrada(this.imagenData, this.uuid).subscribe( (data: any) => {
      this.cargarGalery.emit();
    }, error => { 
      this.cargandoService.terminaCargando();
      this.Alert(error.error.message, 'OK', true);
    });
  }
  subirImgRectangular() {
    this.cargandoService.iniciaCargando();
    this.expertsService.cargarImgRectangular(this.imagenData, this.uuid).subscribe( (data: any) => {
      this.cargarGalery.emit();
    }, error => { 
      this.cargandoService.terminaCargando();
      this.Alert(error.error.message, 'OK', true);
    });
  }
  subirImgGaleria() {
    this.cargandoService.iniciaCargando();
    this.expertsService.cargarImgGaleria(this.imagenData, this.uuid).subscribe( (data: any) => {
      this.cargarGalery.emit();
    }, error => { 
      this.cargandoService.terminaCargando();
      this.Alert(error.error.message, 'OK', true);
    });
  }
  cambiarImgGaleria(img) {
    this.cargandoService.iniciaCargando();
    this.expertsService.cambiarImgGaleria(this.imagenData, img, this.uuid).subscribe( (data: any) => {
      this.cargarGalery.emit();
    }, error => { 
      this.cargandoService.terminaCargando();
      this.Alert(error.error.message, 'OK', true);
    });
  }
  eliminarImgGaleria(img) {
    this.cargandoService.iniciaCargando();
    this.expertsService.eliminarImgGaleria(img, this.uuid).subscribe( (data: any) => {
      this.cargarGalery.emit();
    }, error => { 
      this.cargandoService.terminaCargando();
      this.Alert(error.error.message, 'OK', true);
    });
  }
  async selectEliminar(img) {
    const alert = await this.alertController.create({
      header: 'Sei sicuro di voler eliminare questa immagine?',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { text: 'OK', role: 'confirm', handler: () => { this.eliminarImgGaleria(img) } },
      ],
    });
    await alert.present();
  }
  async selectCambiar(img) {
    const alert = await this.alertController.create({
      header: 'È sicuro di voler cambiare questa immagine??',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { text: 'OK', role: 'confirm', handler: () => { this.cargarCamaraCambiar(img) } },
      ],
    });
    await alert.present();
  }
  async cargarCamaraCambiar(img) {
    const camara = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl
    });
    const imageUrl = camara.dataUrl;
    const imageFile = this.camaraService.dataURItoBlob(imageUrl);
    if (!imageUrl) return null;
    else {
      this.imagenData = imageFile;
      this.cambiarImgGaleria(img);
    }
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
