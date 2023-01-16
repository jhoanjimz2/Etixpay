import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { VerVoucherAdquiridoComponent } from '../ver-voucher-adquirido/ver-voucher-adquirido.component';

@Component({
  selector: 'app-card-voucher-adquirido',
  templateUrl: './card-voucher-adquirido.component.html',
  styleUrls: ['./card-voucher-adquirido.component.scss'],
})
export class CardVoucherAdquiridoComponent implements OnInit {
  @Input() voucher: any = null;


  constructor(
    private modal_controller: ModalController
  ) { }

  ngOnInit() {}

  async ver_voucher() {
    const modal = await this.modal_controller.create({
      component: VerVoucherAdquiridoComponent,
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
    let valor_comision = ((this.voucher.vouchers.voucherPRECIO * this.voucher.vouchers.voucherCOMISION )/100);
    return ((valor_comision * this.voucher.vouchers.voucherPUNTORECOMPENSA ) / 100);
  }

}
