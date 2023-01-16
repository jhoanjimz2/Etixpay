import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductDetail } from 'src/app/models/marketplace/reponseProduct.model';
import { CargandoService } from 'src/app/services/cargando.service';
import { MarketplaceService } from 'src/app/services/marketplace.service';
import { ModalPayConfirComponent } from '../modal-pay-confir/modal-pay-confir.component';
import { ModalPurchaceErrorComponent } from '../modal-purchace-error/modal-purchace-error.component';
import { Router } from '@angular/router';
import { TipoRecargaComponent } from 'src/app/pages/paginas-usuarios/cartera/components/botones/tipo-recarga/tipo-recarga.component';

@Component({
  selector: 'app-modal-pay',
  templateUrl: './modal-pay.component.html',
  styleUrls: ['./modal-pay.component.scss'],
})
export class ModalPayComponent {

  delivery = 0;
  @Input('product') product: ProductDetail = new ProductDetail();
  saldo_tix = 0;
  tipo_user = JSON.parse(localStorage.getItem('user')).tipoUsuario;
  precioEnvio = 0;

  constructor(
    private modalController: ModalController,
    private marketplaceService: MarketplaceService,
    private cargandoService: CargandoService,
    private router: Router,
    private modal_controller: ModalController
    ) { this.actualizar(); }

  closeModalPay() {
    this.modalController.dismiss();
  }

  typeDelivery(type: number) {
    this.delivery = type;
  }

  saveOrder() {
    let shippingMethod = '';
    if (this.delivery === 1) shippingMethod = this.metodo_envia.data_shipping_mehtod.uuid;
    if (this.delivery === 2) shippingMethod = this.metodo_recogida.data_shipping_mehtod.uuid;
    const productData  = {
      product_uuid: this.product.uuid,
      product_orderAMOUNT: 1,
      shipping_method_uuid: shippingMethod
    }
    this.cargandoService.iniciaCargando();
    this.marketplaceService.saveOrder( 'pendiente', [productData] ).subscribe( response => {
        this.cargandoService.terminaCargando();
        this.modalController.dismiss();
        this.confirmModalPay();
      }, error => {
        this.cargandoService.terminaCargando();
        this.modalController.dismiss();
        this.errorModalPay(productData);
      }
    );
  }

  get metodo_envia() {
    return this.product.shipping_method_data.find(metod => metod.data_shipping_mehtod.shipping_methodCODE == 'ENVIO');
  }

  get metodo_recogida() {
    return this.product.shipping_method_data.find(metod => metod.data_shipping_mehtod.shipping_methodCODE == 'ARETIRO_DIRECTO');
  }


  async confirmModalPay() {
    const modal = await this.modalController.create({
      component: ModalPayConfirComponent,
      cssClass: 'modal-marketplace-payment-confir',
      backdropDismiss: false
    });
    return await modal.present();
  }

  async errorModalPay(product) {
    const modal = await this.modalController.create({
      component: ModalPurchaceErrorComponent,
      componentProps: { product }
    });
    return await modal.present();
  }
  actualizar() {
    if (this.tipo_user == 3) {
      this.persona();
    } else {
      this.empresa();
    }
  }
  persona() {
    this.marketplaceService.cargarSaldoTixPersonas().subscribe((data: any) => {
      this.saldo_tix = data.data.wallets[0].walletSALDOATM;
    });
  }
  empresa() {
    this.marketplaceService.cargarSaldoTixEmpresas().subscribe((data: any) => {
      this.saldo_tix = data.data.wallets[0].walletSALDOATM;
    });
  }

  goToRecharge() {
    this.modalController.dismiss();
    this.router.navigate(["tabs/cartera"]);
    setTimeout( () => { this.tipo_recarga() }, 500)
  }
  async tipo_recarga() {
    const modal = await this.modal_controller.create({
      component: TipoRecargaComponent,
      cssClass: 'modal_recargas_tipos',
      backdropDismiss: true,
      componentProps: {
        actualizar: this.actualizar
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
  }

}
