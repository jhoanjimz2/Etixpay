import { Component } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { AlertComponent } from '../../../../../shared/alert/alert.component';
import { CuentaService } from '../../../../../services/cuenta.service';
import { CargandoService } from '../../../../../services/cargando.service';
import { NegoziService } from '../../../../../services/negozi.service';
import { PanelsVouchersComponent } from 'src/app/pages/negozi/store-page/components/vouchers/panels-vouchers/panels-vouchers.component';

@Component({
  selector: 'app-mis-vouchers',
  templateUrl: './mis-vouchers.component.html',
  styleUrls: ['./mis-vouchers.component.scss'],
})
export class MisVouchersComponent {

  uuid = localStorage.getItem('uuidMiEmpresa');

  constructor(
    private modalController: ModalController,
    private popoverController: PopoverController,
    private cargandoService: CargandoService,
    private negoziService: NegoziService
  ) { }

  cargarVouchers(uuid) {
    this.cargandoService.iniciaCargando();
    this.negoziService.cargarVouches(uuid).subscribe((data: any) => {
      this.cargandoService.terminaCargando();
      this.abrirPanelVouchers(uuid, data.data);
    },  error => {
      this.cargandoService.terminaCargando();
      this.Alert(error.error.message, 'OK' , true);
    });
  }
  async abrirPanelVouchers(uuid, vouchers) {
    const modal = await this.modalController.create({
      component: PanelsVouchersComponent,
      componentProps: { uuid, vouchers }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
  }
  async Alert(tex, bot, bol) {
    const popover = await this.popoverController.create({
      component: AlertComponent,
      cssClass: 'popover_central',
      mode: 'ios',
      componentProps: {
        texto: tex,
        boton: bot,
        img: bol
      },
      translucent: false,
      backdropDismiss: false
    });
    return await popover.present();
  }

}
