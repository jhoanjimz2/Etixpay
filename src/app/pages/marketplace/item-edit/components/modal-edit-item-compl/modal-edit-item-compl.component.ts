import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-edit-item-compl',
  templateUrl: './modal-edit-item-compl.component.html',
  styleUrls: ['./modal-edit-item-compl.component.scss'],
})
export class ModalEditItemComplComponent implements OnInit {
  @Input() idProduct;

  constructor(
    private modalController: ModalController,
    private router: Router
  ) { }

  ngOnInit() {}

  async closeModal() {
    this.modalController.dismiss();
    this.router.navigate([`pages/marketplace/item-edit/${this.idProduct}`]);
  }

}
