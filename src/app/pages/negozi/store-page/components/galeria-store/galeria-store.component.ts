import { Component, Input, EventEmitter, Output } from '@angular/core';
import { PopoverController, ActionSheetController, ModalController } from '@ionic/angular';
import { VerImgComponent } from '../ver-img/ver-img.component';
import { CargandoService } from 'src/app/services/cargando.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { environment } from 'src/environments/environment';
import { VerGaleriaComponent } from '../ver-galeria/ver-galeria.component';
import { TranslateService } from '@ngx-translate/core';
import { CamaraService } from 'src/app/services/camara.service';
import { NegoziService } from '../../../../../services/negozi.service';
import { Plugins, CameraResultType } from'@capacitor/core';
const  { Camera } = Plugins;

@Component({
  selector: 'app-galeria-store',
  templateUrl: './galeria-store.component.html',
  styleUrls: ['./galeria-store.component.scss'],
})
export class GaleriaStoreComponent {

  @Input() galery: string[] = []; 
  @Input() imgRectangular: string = ""; 
  @Input() imgCuadrada: string = ""; 
  @Input() uuid: string = ""; 
  @Input() editar: boolean = false; 
  @Output() actualizarGalery: EventEmitter<any> = new EventEmitter();
  imagenData;
  opcion: number = 0;

  constructor(
    private popoverController: PopoverController,
    private actionSheetController: ActionSheetController,
    private cargandoService: CargandoService,
    private modalController: ModalController,
    private translate: TranslateService,
    private camaraService: CamaraService,
    private negoziService: NegoziService
  ) { }


  async verGaleria(galery, editar) {
    const popover = await this.modalController.create({
      component: VerGaleriaComponent,
      cssClass: 'modalVerGaleria',
      componentProps: { galery, editar, actualizarGalery: this.actualizarGalery },
      backdropDismiss: true
    });
    return await popover.present();
  }

  opcionesImg(img, opcion) {
    this.opcion = opcion;
    if (this.editar) this.Edit(img)
    else this.verImg(img)
  }

  async Edit(img) {
    let options, view, change, cancel;
    this.translate.get('OPTIONS').subscribe(value => { options = value; });
    this.translate.get('VIEWN').subscribe(value => { view = value; });
    this.translate.get('CHANGE').subscribe(value => { change = value; });
    this.translate.get('CANCELN').subscribe(value => { cancel = value; });
    const actionSheet = await this.actionSheetController.create({
      header: options,
      cssClass: 'my-custom-class',
      mode: 'ios',
      buttons: [ {
        text: view,
        icon: 'eye-outline',
        handler: () => {
          this.verImg(img);
        }
      }, {
        text: change,
        icon: 'reload',
        handler: () => {
          this.subirImg();
        }
      },{
        text: cancel,
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
    const { role, data } = await actionSheet.onDidDismiss();
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
  async subirImg() {
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
      if (this.opcion == 1) this.subirImgCuadrada();
      else if (this.opcion == 2) this.subirImgRectangular();
      else if (this.opcion == 3) this.subirImgGaleria();
    }
  }
  subirImgCuadrada() {
    this.cargandoService.iniciaCargando();
    this.negoziService.cambiarImgCuadrada( this.uuid, this.imagenData).subscribe( (data: any) => {
      this.actualizarGalery.emit();
    }, error => { 
      this.cargandoService.terminaCargando();
      this.Alert(error.error.message, 'OK', true);
    });
  }
  subirImgRectangular() {
    this.cargandoService.iniciaCargando();
    this.negoziService.cambiarImgRectangular( this.uuid, this.imagenData).subscribe( (data: any) => {
      this.actualizarGalery.emit();
    }, error => { 
      this.cargandoService.terminaCargando();
      this.Alert(error.error.message, 'OK', true);
    });
  }
  subirImgGaleria() {
    this.cargandoService.iniciaCargando();
    this.negoziService.cambiarImgGaleria( this.uuid, this.imagenData).subscribe( (data: any) => {
      this.actualizarGalery.emit();
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
