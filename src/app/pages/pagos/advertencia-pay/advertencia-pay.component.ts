import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-advertencia-pay',
  templateUrl: './advertencia-pay.component.html',
  styleUrls: ['./advertencia-pay.component.scss'],
})
export class AdvertenciaPayComponent {
  
  advertencia: boolean = false;

  constructor(
    private modalController: ModalController
  ) {}

  botonClick() {
    if (this.advertencia) localStorage.setItem('advertencia-pay', 'true')
    this.modalController.dismiss({data: true});
  }

}
