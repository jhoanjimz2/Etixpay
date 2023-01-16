import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductDetail } from 'src/app/models/marketplace/reponseProduct.model';
import { CargandoService } from 'src/app/services/cargando.service';
import { MarketplaceService } from 'src/app/services/marketplace.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-marke-place-item-form',
  templateUrl: './item-form.page.html',
  styleUrls: ['./item-form.page.scss'],
})
export class ItemFormPage implements OnInit {

  modalDelete = false;
  product: ProductDetail = new ProductDetail();
  idProduct = '';
  mainImage = '';

  constructor(
    private router: Router,
    private marketplaceService: MarketplaceService,
    private cargandoService: CargandoService,
    public route: ActivatedRoute,
    private nav: NavController
  ) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.idProduct = params.id;
      if (this.idProduct) {
        this.getProductDetail();
      } else {
        this.router.navigate(["pages/my-items"]);
      }
    });
  }

  getProductDetail() {
    this.cargandoService.iniciaCargando();
    this.marketplaceService.getProductDetail(this.idProduct).subscribe(
      response => {
        this.product = response.data;
        this.mainImage = this.product.main_image.file.fileURL;
        this.cargandoService.terminaCargando();
      }, 
      () => {
        this.cargandoService.terminaCargando();
        this.router.navigate(["pages/marketplace/my-items"]);
      }
    );
  }

  editItem() {
    return ;
    this.router.navigate(["pages/marketplace/item-edit", this.idProduct]);
  }

  deleteItem() {
    this.modalDelete = true
  } 

  getModalDelete(res: boolean) {
    this.modalDelete = false;
    if (!res) return;
    this.cargandoService.iniciaCargando();
    this.marketplaceService.deleteProductDetail(this.idProduct).subscribe( respose => {
      this.cargandoService.terminaCargando();
      this.router.navigate(["/tabs/marketplace/store"]);
    }, error => {
      this.cargandoService.terminaCargando();
    })
  }

}
