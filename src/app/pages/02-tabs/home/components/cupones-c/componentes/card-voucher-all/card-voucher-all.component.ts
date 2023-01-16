import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ComprarVoucherComponent } from '../comprar-voucher/comprar-voucher.component';

@Component({
  selector: 'app-card-voucher-all',
  templateUrl: './card-voucher-all.component.html',
  styleUrls: ['./card-voucher-all.component.scss'],
})
export class CardVoucherAllComponent implements OnInit {
  @Input() voucher: any = null;

  constructor(
    private modal_controller: ModalController
  ) { }

  ngOnInit() {}
  async comprar_voucher() {
    const modal = await this.modal_controller.create({
      component: ComprarVoucherComponent,
      componentProps: {
        voucher: this.voucher
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
  }
  get categoria() {
    if (localStorage.getItem('lenguaje') == 'it') if (this.voucher.voucher_type) return this.voucher.voucher_type.voucher_tipoTITULOIT;
    if (localStorage.getItem('lenguaje') == 'en') if (this.voucher.voucher_type) return this.voucher.voucher_type.voucher_tipoTITULOEN;
    if (localStorage.getItem('lenguaje') == 'es') if (this.voucher.voucher_type) return this.voucher.voucher_type.voucher_tipoTITULOES;
    if (localStorage.getItem('lenguaje') == 'ro') if (this.voucher.voucher_type) return this.voucher.voucher_type.voucher_tipoTITULORO;
  }
  get voucher_punto_recompensa() {
    let valor_comision = ((this.voucher.voucherPRECIO * this.voucher.voucherCOMISION )/100);
    return ((valor_comision * this.voucher.voucherPUNTORECOMPENSA ) / 100);
  }

}
