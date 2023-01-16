import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { RequetsRegProduct } from 'src/app/models/marketplace/requetsRegProduct.model';
import { CargandoService } from 'src/app/services/cargando.service';
import { MarketplaceService } from 'src/app/services/marketplace.service';
import { ModalAddItemComplComponent } from '../modal-add-item-compl/modal-add-item-compl.component';

@Component({
  selector: 'app-modal-edit-item-error',
  templateUrl: './modal-add-item-error.component.html',
  styleUrls: ['./modal-add-item-error.component.scss'],
})
export class ModalAddItemErrorComponent implements OnInit {

  @Input('dataProduct') dataProduct: RequetsRegProduct = new RequetsRegProduct();

  constructor(
    private modalController: ModalController,
    private router: Router,
    private marketplaceService: MarketplaceService,
    private cargandoService: CargandoService,
  ) { }

  ngOnInit() {}

  
  trySave() {
    this.cargandoService.iniciaCargando();
    this.marketplaceService.saveProduct(this.dataProduct).subscribe(
      async response => {
        console.log(response);
        this.cargandoService.terminaCargando();
        this.modalController.dismiss();
        const modal = await this.modalController.create({
          component: ModalAddItemComplComponent
        });
        return await modal.present();
      },
      () => this.cargandoService.terminaCargando()
    );
  }

  async closeModal() {
    this.modalController.dismiss();
  }

}
