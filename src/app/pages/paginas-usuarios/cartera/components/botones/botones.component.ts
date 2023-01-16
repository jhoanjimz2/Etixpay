import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { MovimientosComponent } from './movimientos/movimientos.component';
import { RetirosComponent } from './retiros/retiros.component';
import { TipoRecargaComponent } from './tipo-recarga/tipo-recarga.component';
import { EnviarComponent } from './enviar/enviar.component';
import { TranslateService } from '@ngx-translate/core';
import { RecibirComponent } from './recibir/recibir.component';

@Component({
  selector: 'app-botones',
  templateUrl: './botones.component.html',
  styleUrls: ['./botones.component.scss'],
})
export class BotonesComponent {

  @Input() saldo_tix = 0;
  @Output() actualizar: EventEmitter<any> = new EventEmitter();
  tipo_user = JSON.parse(localStorage.getItem('user')).tipoUsuario;

  slides = {
    initialSlide: 0,
    slidesPerView: 4,
    observer: true,
    observeParents: true,
    speed: 500
  };

  constructor(
    private modal_controller: ModalController,
    private toast_controller: ToastController,
    private translate_service: TranslateService
  ) { }

  async tipo_recarga() {
    const modal = await this.modal_controller.create({
      component: TipoRecargaComponent,
      cssClass: 'modal_recargas_tipos',
      backdropDismiss: true,
      componentProps: {
        actualizar: this.actualizar
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data) if (data.data) this.actualizar_datos();
  }
  async enviar() {
    const modal = await this.modal_controller.create({
      component: EnviarComponent,
      backdropDismiss: false,
      componentProps: {
        saldo_tix: this.saldo_tix
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    this.actualizar_datos();
  }
  async recibir() {
    const modal = await this.modal_controller.create({
      component: RecibirComponent,
      swipeToClose: true
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    this.actualizar_datos();
  }
  async retiros() {
    const modal = await this.modal_controller.create({
      component: RetirosComponent,
      backdropDismiss: true,
      componentProps: { saldo_tix: this.saldo_tix }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    this.actualizar_datos();
  }
  async movimientos() {
    const modal = await this.modal_controller.create({
      component: MovimientosComponent,
      backdropDismiss: false
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    this.actualizar_datos();
  }
  actualizar_datos() {
    this.actualizar.emit();
  }
  async desactivado() {
    let texto: string = '';
    this.translate_service.get('DISABLED').subscribe(data => {texto = data});
    const toast = await this.toast_controller.create({
      message: texto,
      mode: 'md',
      duration: 1500
    });
    toast.present();
  }


}
