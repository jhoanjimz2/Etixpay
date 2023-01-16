import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CargandoService } from 'src/app/services/cargando.service';
import { MarketplaceService } from 'src/app/services/marketplace.service';

@Component({
  selector: 'app-modal-purchace-error',
  templateUrl: './modal-purchace-error.component.html',
  styleUrls: ['./modal-purchace-error.component.scss'],
})
export class ModalPurchaceErrorComponent {

  @Input() product;

  constructor(
    private modalController: ModalController,
    private router: Router,
    private marketplaceService: MarketplaceService,
    private cargandoService: CargandoService
  ) { }

  closeModal() {
    this.modalController.dismiss();
  }

  trySave() {
    this.cargandoService.iniciaCargando();
    this.marketplaceService.saveOrder('pendiente', [this.product]).subscribe(
      response => {
        this.cargandoService.terminaCargando();
        this.closeModal();
      },
      () => {
        this.cargandoService.terminaCargando();
      }
    );
  }

}
