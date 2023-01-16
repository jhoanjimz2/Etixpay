import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-edit-item-compl',
  templateUrl: './modal-add-item-compl.component.html',
  styleUrls: ['./modal-add-item-compl.component.scss'],
})
export class ModalAddItemComplComponent implements OnInit {

  constructor(
    private modalController: ModalController,
    private router: Router
  ) { }

  ngOnInit() {}

  async closeModal() {
    this.modalController.dismiss();
    this.router.navigate(["/tabs/marketplace/store"]);
  }

}
