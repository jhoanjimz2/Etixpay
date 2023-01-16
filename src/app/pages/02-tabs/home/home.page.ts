import { Component } from '@angular/core';
import { Product } from 'src/app/models/marketplace/reponseProducts.model';
import { MarketplaceService } from 'src/app/services/marketplace.service';
import { SettingsService } from '../../../services/settings.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  products: Product[];
  constructor(
    private marketplaceService: MarketplaceService,
    private settingsService: SettingsService,
    private modalController: ModalController
  ) { 
    localStorage.setItem('COLABORADOR', 'false');
  }
  ionViewWillEnter() {
    this.settingsService.default();
    this.getProductsShop();
  }
  ngOnDestroy(): void {
    this.modalController.dismiss();
  }
  getProductsShop() {
    this.marketplaceService.getProductsShop().subscribe(
      (response: any) => {
        this.products = response.data.data;
        //this.products = this.products.concat(this.products,this.products,this.products,this.products,this.products,)
      }
    );
  }

}
