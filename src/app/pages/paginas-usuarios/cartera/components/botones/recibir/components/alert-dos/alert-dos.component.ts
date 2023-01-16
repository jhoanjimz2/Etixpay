import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-alert-dos',
  templateUrl: './alert-dos.component.html',
  styleUrls: ['./alert-dos.component.scss'],
})
export class AlertDosComponent {
  @Input() tipo: boolean;

  constructor(
    private modal_controller: ModalController
  ) { }

  salir_con_argumentos() {
    this.modal_controller.dismiss({data: true})
  }
  salir_sin_argumentos() {
    this.modal_controller.dismiss({data: false})
  }

}
