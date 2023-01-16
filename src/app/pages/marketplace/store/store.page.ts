import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/marketplace/reponseProducts.model';
import { MarketplaceService } from 'src/app/services/marketplace.service';
import { SettingsService } from '../../../services/settings.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage  {

  products: Product[];
  category = '';
  search = this.route.snapshot.paramMap.get('search');

  constructor(
    public route: ActivatedRoute,
    private marketplaceService: MarketplaceService,
    private settingsService: SettingsService
  ) { }
  ionViewWillEnter() {
    this.getProductsShop();
    this.settingsService.default();
  }

  getProductsShop() {
    this.marketplaceService.getProductsShop().subscribe(response  => {
        this.products = response.data.data;
        //this.products = this.products.concat(this.products,this.products,this.products);
    });
  }

  getCategory(res: string) {
    this.category = res;
  }

}
