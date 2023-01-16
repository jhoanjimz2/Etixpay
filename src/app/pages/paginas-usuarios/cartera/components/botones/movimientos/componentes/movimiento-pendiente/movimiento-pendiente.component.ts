import { Component, Input, OnInit } from '@angular/core';
import { CarterasService } from '../../../../../carteras.service';
import { CargandoService } from '../../../../../../../../services/cargando.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PopoverController } from '@ionic/angular';
import { ClaveDinamicaMovimientoComponent } from '../clave-dinamica-movimiento/clave-dinamica-movimiento.component';
import { MovimientosComponent } from '../../movimientos.component';
@Component({
  selector: 'app-movimiento-pendiente',
  templateUrl: './movimiento-pendiente.component.html',
  styleUrls: ['./movimiento-pendiente.component.scss'],
})
export class MovimientoPendienteComponent implements OnInit {
  @Input() movimiento: any;

  constructor(
    private cartera_service: CarterasService,
    private cargando_service: CargandoService,
    private popover_controller: PopoverController,
    private movimientos: MovimientosComponent
  ) { }

  ngOnInit() {
  }
  ap(uuid, sentido) {
    switch (sentido) {
      case 'OUT':
        this.generarClaveDinamica(uuid);
        break;
      case 'IN':
        this.aprobar(uuid);
        break;
    }
  }
  den(uuid, sentido) {
    switch (sentido) {
      case 'OUT':
        this.denegarSOLICITUDtransferencia(uuid);
        break;
      case 'IN':
        this.denegar(uuid);
        break;
    }
  }
  generarClaveDinamica(uuid) {
    this.cartera_service.generarClaveDinamica().subscribe((datos: any) => {
      this.claveDinamica(uuid);
    }, errorServicio => {
      this.Alert(errorServicio.error.message, 'OK', true);
    });
  }
  aprobar(uuid) {
    this.cargando_service.iniciaCargando();
    this.cartera_service.movimientosAPROBAR(localStorage.getItem('wallet'),uuid).subscribe((data: any) => {
      this.movimientos.actualizar();
      this.cargando_service.terminaCargando();
    }, errorServicio => {
      this.cargando_service.terminaCargando();
      this.Alert(errorServicio.error.message, 'OK', true);
    });
  }
  denegarSOLICITUDtransferencia(uuid) {
    this.cargando_service.iniciaCargando();
    this.cartera_service.denegarSolicitudDeTransaccion(localStorage.getItem('wallet'), uuid).subscribe((data: any) => {
      this.movimientos.actualizar();
      this.cargando_service.terminaCargando();
    }, errorServicio => {
      this.cargando_service.terminaCargando();
      this.Alert(errorServicio.error.message, 'OK', true);
    });
  }
  denegar(uuid) {
    this.cargando_service.iniciaCargando();
    this.cartera_service.movimientosDENEGAR(localStorage.getItem('wallet'), uuid).subscribe((data: any) => {
      this.movimientos.actualizar();
      this.cargando_service.terminaCargando();
    }, errorServicio => {
      this.cargando_service.terminaCargando();
      this.Alert(errorServicio.error.message, 'OK', true);
    });
  }
  async claveDinamica(uuid) {
    const popover = await this.popover_controller.create({
      component: ClaveDinamicaMovimientoComponent,
      cssClass: 'popover_central',
      mode: 'ios',
      translucent: false,
      backdropDismiss: false
    });
    await popover.present();
    const { data } = await popover.onDidDismiss();
    if (data.seleccionado) {
      this.aprobarSOLICITUDtransferencia(data.clave, uuid);
    }
  }
  aprobarSOLICITUDtransferencia(clave, uuid) {
    this.cargando_service.iniciaCargando();
    this.cartera_service.aprobarSolicitudDeTransaccion(localStorage.getItem('wallet'), uuid, clave).subscribe((data: any) => {
      this.movimientos.actualizar();
      this.cargando_service.terminaCargando();
    }, errorServicio => {
      this.cargando_service.terminaCargando();
      this.Alert(errorServicio.error.message, 'OK', true);
    });
  }
  async Alert(tex, bot, tipo) {
    const popover = await this.popover_controller.create({
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
