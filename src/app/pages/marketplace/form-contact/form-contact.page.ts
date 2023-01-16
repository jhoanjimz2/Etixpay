import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalFormContactComplComponent } from './components/modal-form-contact-compl/modal-form-contact-compl.component';

@Component({
  selector: 'app-form-contact',
  templateUrl: './form-contact.page.html',
  styleUrls: ['./form-contact.page.scss'],
})
export class FormContactPage implements OnInit {

  constructor(
    public modalController: ModalController
  ) { }

  ngOnInit() {
  }

  async save() {
    // const modal = await this.modalController.create({
    //   component: ModalPurchaceErrorComponent,
    //   cssClass: 'my-custom-class'
    // });
    const modal = await this.modalController.create({
      component: ModalFormContactComplComponent,
      cssClass: 'my-custom-class'
    });
    // const modal = await this.modalController.create({
    //   component: ModalPayConfirComponent,
    //   cssClass: 'my-custom-class'
    // });
    // const modal = await this.modalController.create({
    //   component: ModalPayComponent,
    //   cssClass: 'my-custom-class'
    // });
    return await modal.present();
  }

}
