import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-form-contact-compl',
  templateUrl: './modal-form-contact-compl.component.html',
  styleUrls: ['./modal-form-contact-compl.component.scss'],
})
export class ModalFormContactComplComponent implements OnInit {

  constructor(
    private modalController: ModalController,
    private router: Router
  ) { }

  ngOnInit() {}

  async closeModal() {
    this.modalController.dismiss();
    // this.router.navigate(["pages/marketplace"]);
  }

}
