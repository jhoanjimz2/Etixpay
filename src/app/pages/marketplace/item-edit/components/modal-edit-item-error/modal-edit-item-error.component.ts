import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-edit-item-error',
  templateUrl: './modal-edit-item-error.component.html',
  styleUrls: ['./modal-edit-item-error.component.scss'],
})
export class ModalEditItemErrorComponent implements OnInit {

  constructor(
    private modalController: ModalController,
    private router: Router
  ) { }

  ngOnInit() {}

  async closeModal() {
    this.modalController.dismiss();
    this.router.navigate(["pages/marketplace/item-edit/1"]);
  }

}
