import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MarketplaceService } from 'src/app/services/marketplace.service';
import { CargandoService } from 'src/app/services/cargando.service';
import { ModalPayComponent } from './components/modal-pay/modal-pay.component';
import { ProductDetail } from 'src/app/models/marketplace/reponseProduct.model';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.page.html',
  styleUrls: ['./item-detail.page.scss'],
})
export class ItemDetailPage {

  product: ProductDetail = new ProductDetail();
  idProduct = '';
  mainImage = ''

  constructor(
    public modalController: ModalController,
    public route: ActivatedRoute,
    private marketplaceService: MarketplaceService,
    private cargandoService: CargandoService,
    private router: Router
  ) { 
    this.cargarId();
  }
  cargarId() {
    this.route.params.forEach((params: Params) => {
      this.idProduct = params.id;
      if (this.idProduct)  this.getProductDetail();
      else this.router.navigate(["tabs/marketplace/store"]);
    });
  }
  getProductDetail() {
    this.cargandoService.iniciaCargando();
    this.marketplaceService.getProductDetail(this.idProduct).subscribe( (data: any) => {
      this.product = data.data;
      this.mainImage = this.product.main_image.file.fileURL;
      this.cargandoService.terminaCargando();
    }, () => {
      this.cargandoService.terminaCargando();
      this.router.navigate(["tabs/marketplace"]);
    });
  }
  async payItem() {
    const modal = await this.modalController.create({
      component: ModalPayComponent,
      cssClass: 'modal-marketplace-payment',
      backdropDismiss: false,
      swipeToClose: true
    });
    modal.componentProps = { product: this.product }
    return await modal.present();
  }

  contactSeller(idSeller: number) {
    open('mailto:youetix@gmail.com', "_system");
  }

}
