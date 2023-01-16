import { Component, Input, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { ComprarVoucherComponent } from '../comprar-voucher/comprar-voucher.component';

@Component({
  selector: 'app-card-voucher-flash',
  templateUrl: './card-voucher-flash.component.html',
  styleUrls: ['./card-voucher-flash.component.scss'],
})
export class CardVoucherFlashComponent implements OnInit {
  @Input() voucher: any = null;
  _second = 1000;
  _minute = this._second * 60;
  _hour = this._minute * 60;
  _day = this._hour * 24;
  end: any;
  now: any;
  day: any;
  hours: any;
  minutes: any;
  seconds: any;
  source = timer(0, 1000);
  clock: any;


  constructor(
    private modal_controller: ModalController
  ) { }
  ngOnInit() {
    this.clock = this.source.subscribe(t => {
      this.now = new Date();
      this.end = new Date(this.voucher.voucherFECHACADUCIDAD);
      this.end.setDate(this.end.getDate());
      this.end.setHours(this.end.getHours());
      this.showDate();
    });
  }
  async comprar_voucher() {
    const modal = await this.modal_controller.create({
      component: ComprarVoucherComponent,
      componentProps: {
        flash: true,
        voucher: this.voucher
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
  }
  

  showDate() {
    let distance = this.end - this.now;
    this.day = Math.floor(distance / this._day);
    this.hours = Math.floor((distance % this._day) / this._hour);
    this.minutes = Math.floor((distance % this._hour) / this._minute);
    this.seconds = Math.floor((distance % this._minute) / this._second);
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
