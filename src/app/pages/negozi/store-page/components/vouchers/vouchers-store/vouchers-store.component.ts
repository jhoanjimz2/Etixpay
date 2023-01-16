import { Component, EventEmitter, Output, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PanelsVouchersComponent } from '../panels-vouchers/panels-vouchers.component';
import { ComprarVoucherComponent } from 'src/app/pages/02-tabs/home/components/cupones-c/componentes/comprar-voucher/comprar-voucher.component';

@Component({
  selector: 'app-vouchers-store',
  templateUrl: './vouchers-store.component.html',
  styleUrls: ['./vouchers-store.component.scss'],
})
export class VouchersStoreComponent {
  @Output() actualizarVouchers: EventEmitter<any> = new EventEmitter();
  @Input() vouchers;
  @Input() editar;
  @Input() uuid;
  option = {
    initialSlide: 0,
    slidesPerView:1,
    observer: true,
    observeParents: true,
    spaceBetween: 5,
    speed: 1500
  };

  constructor(
    private modalController: ModalController
  ) { }

  async abrirPanelVouchers() {
    const modal = await this.modalController.create({
      component: PanelsVouchersComponent,
      componentProps: {
        uuid: this.uuid,
        vouchers: this.vouchers
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
  }
  async comprarVoucher(voucher) {
    const modal = await this.modalController.create({
      component: ComprarVoucherComponent,
      componentProps: { voucher }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
  }
  categoria(voucher) {
    if (localStorage.getItem('lenguaje') == 'it') return voucher.voucher_type.voucher_tipoTITULOIT;
    if (localStorage.getItem('lenguaje') == 'en') return voucher.voucher_type.voucher_tipoTITULOEN;
    if (localStorage.getItem('lenguaje') == 'es') return voucher.voucher_type.voucher_tipoTITULOES;
    if (localStorage.getItem('lenguaje') == 'ro') return voucher.voucher_type.voucher_tipoTITULORO;
  }

}
