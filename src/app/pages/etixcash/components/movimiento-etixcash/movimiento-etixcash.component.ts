import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CargandoService } from '../../../../services/cargando.service';
import { CuentaService } from '../../../../services/cuenta.service';
import { PopoverController } from '@ionic/angular';
import { DenegarEtixcashComponent } from '../denegar-etixcash/denegar-etixcash.component';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { DetalleEtixcashComponent } from '../detalle-etixcash/detalle-etixcash.component';

@Component({
  selector: 'app-movimiento-etixcash',
  templateUrl: './movimiento-etixcash.component.html',
  styleUrls: ['./movimiento-etixcash.component.scss'],
})
export class MovimientoEtixcashComponent {
  @Input() movimiento: any;
  @Input() tipo = null;
  @Input() tipo_dos = false;
  @Output() actualizarEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    private cargando_service: CargandoService,
    private cuenta_service: CuentaService,
    private popover_controller: PopoverController
  ) { }

  aprobar(uuid) {
    this.cargando_service.iniciaCargando();
    this.cuenta_service.movimientos_aprobar(localStorage.getItem('wallet'), uuid).subscribe( (data: any) => {
      this.cargando_service.terminaCargando();
      this.actualizarEvent.emit();
    },error => {
      this.cargando_service.terminaCargando();
      this.Alert(error.error.message, 'OK', true);
    });
  }
  async denegar(uuid, wallet) {
    const popover = await this.popover_controller.create({
      component: DenegarEtixcashComponent,
      cssClass: 'popover_central',
      translucent: false,
      mode: 'ios',
      backdropDismiss: false,
      componentProps: { uuid, wallet },
    });
    await popover.present();
    const { data } = await popover.onDidDismiss();
    if ( data.data) this.actualizarEvent.emit();
  }
  async detalle_movimiento(movimiento, tipo) {
    const popover = await this.popover_controller.create({
      component: DetalleEtixcashComponent,
      cssClass: 'popover_central',
      translucent: false,
      mode: 'ios',
      backdropDismiss: true,
      componentProps: { movimiento,  tipo },
    });
    await popover.present();
  }
  async Alert(tex, bot, bol) {
    const popover = await this.popover_controller.create({
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
