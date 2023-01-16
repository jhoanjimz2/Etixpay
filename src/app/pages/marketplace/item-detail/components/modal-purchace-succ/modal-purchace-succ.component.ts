import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalPayConfirComponent } from '../modal-pay-confir/modal-pay-confir.component';

@Component({
  selector: 'app-modal-purchace-succ',
  templateUrl: './modal-purchace-succ.component.html',
  styleUrls: ['./modal-purchace-succ.component.scss'],
})
export class ModalPurchaceSuccComponent implements OnInit {

  constructor(
    private modalController: ModalController,
    private router: Router
  ) { }

  ngOnInit() {}

  async closeModal() {
    this.modalController.dismiss();
    this.router.navigate(["tabs/marketplace"]);
  }

}
