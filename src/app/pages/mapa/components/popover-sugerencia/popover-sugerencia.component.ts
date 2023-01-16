import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { SugerenciaTiendaComponent } from '../sugerencia-tienda/sugerencia-tienda.component';
import { CamaraService } from 'src/app/services/camara.service';
import { Plugins, CameraResultType } from'@capacitor/core';
const { Geolocation, Camera } = Plugins;

@Component({
  selector: 'app-popover-sugerencia',
  templateUrl: './popover-sugerencia.component.html',
  styleUrls: ['./popover-sugerencia.component.scss'],
})
export class PopoverSugerenciaComponent implements OnInit {

  checking = {
    check: false
  }

  constructor(
    private popover_controller: PopoverController,
    private modal_controller: ModalController,
    private camaraService: CamaraService
  ) { }

  ngOnInit() {}

  salir_sin_argumentos() {
    this.popover_controller.dismiss();
  }
  set_sugerencia() {
    localStorage.setItem('sugerencia', JSON.stringify(true))
  }
  cargar_camara() {
    if (this.checking.check) this.set_sugerencia();
    this.cargarCamara()
  }
  async cargarCamara() {
    const camara = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl
    });
    if (camara.dataUrl) {
      this.superencia(camara.dataUrl, this.camaraService.dataURItoBlob(camara.dataUrl));
    }
  }
  async superencia(imagen, imagen_para_subir) {
    this.salir_sin_argumentos();
    const modal = await this.modal_controller.create({
      component: SugerenciaTiendaComponent,
      componentProps: {
        imagen,
        imagen_para_subir
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
  }

}
