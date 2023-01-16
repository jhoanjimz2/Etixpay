import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-pay-confir',
  templateUrl: './modal-pay-confir.component.html',
  styleUrls: ['./modal-pay-confir.component.scss'],
})
export class ModalPayConfirComponent {

  constructor(
    private modalController: ModalController,
    private router: Router
  ) { }

  closeModalPay() {
    this.modalController.dismiss();
    this.router.navigate(["tabs/marketplace"]);
  }

}
