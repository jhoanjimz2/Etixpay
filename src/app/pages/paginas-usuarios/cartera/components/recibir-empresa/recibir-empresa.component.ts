import { Component, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RecibirComponent } from '../botones/recibir/recibir.component';

@Component({
  selector: 'app-recibir-empresa',
  templateUrl: './recibir-empresa.component.html',
  styleUrls: ['./recibir-empresa.component.scss'],
})
export class RecibirEmpresaComponent {

  @Output() actualizar: EventEmitter<any> = new EventEmitter();

  constructor(
    private modal_controller: ModalController
  ) {}
  
  actualizar_datos() {
    this.actualizar.emit();
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

}
