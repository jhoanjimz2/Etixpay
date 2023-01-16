import { Component, Input } from '@angular/core';
import { timer } from 'rxjs';
import { ModalController, PopoverController } from '@ionic/angular';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { CargandoService } from 'src/app/services/cargando.service';
import { VoucherDescripcionComponent } from '../voucher-descripcion/voucher-descripcion.component';
import { NegoziService } from 'src/app/services/negozi.service';

@Component({
  selector: 'app-voucher-panel',
  templateUrl: './voucher-panel.component.html',
  styleUrls: ['./voucher-panel.component.scss'],
})
export class VoucherPanelComponent{
  @Input() voucher;
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
    private modalController: ModalController,
    private popoverController: PopoverController,
    private cargandoService: CargandoService,
    private negoziService: NegoziService
  ) { 
    this.clock = this.source.subscribe(t => {
      this.now = new Date();
      this.end = new Date(this.voucher.voucherFECHACADUCIDAD);
      this.end.setDate(this.end.getDate());
      this.end.setHours(this.end.getHours());
      this.showDate();
    });
  }
  showDate() {
    let distance = this.end - this.now;
    this.day = Math.floor(distance / this._day);
    this.hours = Math.floor((distance % this._day) / this._hour);
    this.minutes = Math.floor((distance % this._hour) / this._minute);
    this.seconds = Math.floor((distance % this._minute) / this._second);
  }
  get categoria() {
    if (localStorage.getItem('lenguaje') == 'it') return this.voucher.voucher_type.voucher_tipoTITULOIT;
    if (localStorage.getItem('lenguaje') == 'en') return this.voucher.voucher_type.voucher_tipoTITULOEN;
    if (localStorage.getItem('lenguaje') == 'es') return this.voucher.voucher_type.voucher_tipoTITULOES;
    if (localStorage.getItem('lenguaje') == 'ro') return this.voucher.voucher_type.voucher_tipoTITULORO;
  }
  cargarVoucher() {
    this.cargandoService.iniciaCargando();
    this.negoziService.cargarDescripcionVoucher(this.voucher.voucherCODIGO).subscribe((data: any) =>{
      this.cargandoService.terminaCargando();
      this.descripcionVoucher(data.data);
    }, error => {
      this.cargandoService.terminaCargando();
      this.Alert(error.error.message, 'OK', true);
    });
  }
  async descripcionVoucher(voucher) {
    const modal = await this.modalController.create({
      component: VoucherDescripcionComponent,
      componentProps: { voucher }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
  }
  async Alert(tex, bot, tipo) {
    const popover = await this.popoverController.create({
      component: AlertComponent,
      cssClass: 'popover_central',
      mode: 'ios',
      componentProps: {
        texto: tex,
        boton: bot,
        img: tipo
      },
      translucent: false,
      backdropDismiss: false
    });
    return await popover.present();
  }

}
