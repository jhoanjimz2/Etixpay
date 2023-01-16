import { Component, Input } from '@angular/core';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PopoverController, ModalController } from '@ionic/angular';
import { CargandoService } from 'src/app/services/cargando.service';
import { NegoziService } from '../../../../../../services/negozi.service';
import { RegisterVoucherComponent } from '../register-voucher/register-voucher.component';
import { LectorQrComponent } from 'src/app/shared/lector-qr/lector-qr.component';

@Component({
  selector: 'app-panels-vouchers',
  templateUrl: './panels-vouchers.component.html',
  styleUrls: ['./panels-vouchers.component.scss'],
})
export class PanelsVouchersComponent {
  @Input() uuid;
  @Input() vouchers;

  constructor(
    private modalController: ModalController,
    private popoverController: PopoverController,
    private cargandoService: CargandoService,
    private negoziService: NegoziService
  ) {
  }

  async crearVoucherTienda() {
    const modal = await this.modalController.create({
      component: RegisterVoucherComponent,
      componentProps: {
        uuid: this.uuid
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
  }
  async lectorQr() {
    const modal = await this.modalController.create({
      component: LectorQrComponent,
      backdropDismiss: true,
      swipeToClose: true
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data.data) { setTimeout(() => {this.recibirVoucher(JSON.parse(data.data).voucherID, JSON.parse(data.data).voucherCode, JSON.parse(data.data).voucherable_id);},500) }
  }
  recibirVoucher(voucherID, voucher_generadoCODIGO, voucherable_id) {
    this.cargandoService.iniciaCargando();
    this.negoziService.recibirVoucher(voucherID, voucher_generadoCODIGO, voucherable_id).subscribe((data: any) => {
      this.cargandoService.terminaCargando();
      this.Alert(data.responseMessage, 'OK', false);
    }, error => {
      this.cargandoService.terminaCargando();
      this.Alert(error.error.message, 'OK', true);
    })
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

