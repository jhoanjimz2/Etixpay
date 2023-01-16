import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RecargasComponent } from '../recargas/recargas.component';
import { RecargaEtixcashComponent } from '../recarga-etixcash/recarga-etixcash.component';
import { CarteraPage } from '../../../cartera.page';

@Component({
  selector: 'app-tipo-recarga',
  templateUrl: './tipo-recarga.component.html',
  styleUrls: ['./tipo-recarga.component.scss'],
})
export class TipoRecargaComponent {
  @Input() actualizar: EventEmitter<any> = new EventEmitter();

  constructor(
    private modal_controller: ModalController
  ) { }

  salir_sin_argumentos() {
    this.modal_controller.dismiss({data: false})
  }
  async recarga_tc() {
    this.salir_sin_argumentos()
    const modal = await this.modal_controller.create({
      component: RecargasComponent,
      cssClass: 'modal_recargas',
      backdropDismiss: true
    });
    modal.componentProps = {  modal  }
    await modal.present();
    const { data } = await modal.onDidDismiss();
    this.actualizar_datos();
  }
  async recarga_etixcash() {
    this.salir_sin_argumentos()
    const modal = await this.modal_controller.create({
      component: RecargaEtixcashComponent,
      cssClass: 'modal_recargas',
      backdropDismiss: true
    });
    modal.componentProps = {  modal  }
    await modal.present();
    const { data } = await modal.onDidDismiss();
    this.actualizar_datos();
  }
  actualizar_datos() {
    this.actualizar.emit();
  }

}
