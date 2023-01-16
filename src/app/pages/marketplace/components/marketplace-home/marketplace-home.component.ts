import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-marketplace-home',
  templateUrl: './marketplace-home.component.html',
  styleUrls: ['./marketplace-home.component.scss'],
})
export class MarketplaceHomeComponent {
  @Input() products: any[] = [];

  search = '';
  category = '';

  constructor(
    private alertController: AlertController,
    private router: Router
  ) { }

  showDetail(id: number) {
    this.router.navigate(["pages/marketplace/item-detail", id]);
  }

  
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'alert-market-place-start',
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
  }
}
