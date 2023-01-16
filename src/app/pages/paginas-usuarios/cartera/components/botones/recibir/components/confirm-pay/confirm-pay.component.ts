import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-confirm-pay',
  templateUrl: './confirm-pay.component.html',
  styleUrls: ['./confirm-pay.component.scss'],
})
export class ConfirmPayComponent {

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
