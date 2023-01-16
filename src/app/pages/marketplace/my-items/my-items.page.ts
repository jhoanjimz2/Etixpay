import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CargandoService } from 'src/app/services/cargando.service';
import { MarketplaceService } from 'src/app/services/marketplace.service';
import { Product } from 'src/app/models/marketplace/reponseProducts.model';

@Component({
  selector: 'app-my-items',
  templateUrl: './my-items.page.html',
  styleUrls: ['./my-items.page.scss'],
})
export class MyItemsPage {

  products: Product[];

  constructor(
    private router: Router,
    private marketplaceService: MarketplaceService,
    private cargandoService: CargandoService
  ) { }

  ionViewWillEnter() {
    this.getMyProducts()
  }

  addItem() {
    this.router.navigate(["pages/marketplace/add-item"]);
  }
  getMyProducts() {
    this.cargandoService.iniciaCargando();
    this.marketplaceService.getMyProductsShop().subscribe(
      response => {
        this.products = response.data.data
        this.cargandoService.terminaCargando();
      },
      () => this.cargandoService.terminaCargando()
    );
  }

}
