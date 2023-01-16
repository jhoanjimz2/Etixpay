import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.scss'],
})
export class ConfirmacionComponent {
  @ViewChild('slides', { static: true }) slides: IonSlides;
  @Input() type;
  @Input() cantidad;
  @Input() siglas;
  constructor(
    private nav: NavController,
    private router: Router,
    private modalController: ModalController
  ) {
    setTimeout(() => this.slides.lockSwipes(true), 1000)
  }

  goToWallet() {
    this.modalController.dismiss({data: false});
    this.router.navigate(["/tabs/cartera"]);
    this.nav.navigateBack("/tabs/cartera");
  }

  tryAgain() {
    this.modalController.dismiss({data: true});
  }

}
