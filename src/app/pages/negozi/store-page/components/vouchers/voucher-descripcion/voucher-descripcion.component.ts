import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-voucher-descripcion',
  templateUrl: './voucher-descripcion.component.html',
  styleUrls: ['./voucher-descripcion.component.scss'],
})
export class VoucherDescripcionComponent {
  @Input() voucher;

  constructor() { }
  
  get punto_recompensa() {
    let valor_comision = ((this.voucher.voucherPRECIO * this.voucher.voucherCOMISION)/100);
    return ((valor_comision * this.voucher.voucherPUNTORECOMPENSA) / 100);
  }
  get facturacion() {
    return (this.voucher.voucherPRECIO * this.voucher.voucherUsed);
  }

}
