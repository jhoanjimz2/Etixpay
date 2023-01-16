import { Component } from '@angular/core';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { CuentaService } from 'src/app/services/cuenta.service';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-etixcash',
  templateUrl: './etixcash.page.html',
  styleUrls: ['./etixcash.page.scss'],
})
export class EtixcashPage {
  filtro_movimientos = 'recharges';
  recargas;
  retiros;
  movimientos;

  constructor(
    private popoverController: PopoverController,
    private cuentaService: CuentaService
  ) { 
    this.actualizar();
  }
  muestra( event ) {
    this.filtro_movimientos = event.detail.value;
  }
  actualizar() {
    this.cargar_recargas();
    this.cargar_movimientos();
    this.cargar_retiros();
  }
  cargar_recargas() {
    this.cuentaService.muestra_listado_recargas().subscribe( (data: any) => {
      this.recargas = data.data.data;
    },error => {
      this.Alert(error.error.message, 'OK', true);
    });
  }
  cargar_movimientos() {
    this.cuentaService.muestra_listado_movimientos().subscribe( (data: any) => {
      this.movimientos = data.data.data;
    },error => {
      this.Alert(error.error.message, 'OK', true);
    });
  }
  cargar_retiros() {
    this.cuentaService.muestra_listado_retiros().subscribe( (data: any) => {
      this.retiros = data.data.data;
    },error => {
      this.Alert(error.error.message, 'OK', true);
    });
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
