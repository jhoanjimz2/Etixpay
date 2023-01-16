import { Component, Output, EventEmitter } from '@angular/core';
import { CargandoService } from '../../../../../services/cargando.service';
import { AlertComponent } from '../../../../../shared/alert/alert.component';
import { CarterasService } from '../../carteras.service';
import { PopoverController, ModalController } from '@ionic/angular';
import { MisTarjetasComponent } from './mis-tarjetas/mis-tarjetas.component';
import { InscribirTarjetaEtixComponent } from './inscribir-tarjeta-etix/inscribir-tarjeta-etix.component';
import { MiWalletComponent } from './mi-wallet/mi-wallet.component';
import { RecompensasComponent } from './recompensas/recompensas.component';

@Component({
  selector: 'app-toolbar-botones',
  templateUrl: './toolbar-botones.component.html',
  styleUrls: ['./toolbar-botones.component.scss'],
})
export class ToolbarBotonesComponent {
  
  @Output() actualizar: EventEmitter<any> = new EventEmitter();

  constructor(
    private cargando_service: CargandoService,
    private cartera_service: CarterasService,
    private popover_controller: PopoverController,
    private modal_controller: ModalController
  ) { }

  actualizar_datos() {
    this.actualizar.emit();
  }

  seleccionar_que_vista_abrir() {
    this.cargando_service.iniciaCargando();
    this.cartera_service.cargar_cards().subscribe((data: any) => {
      if (!data.data.length) this.inscribir_tarjetas();
      if (data.data.length) this.mis_tarjetas(data.data[0].cardNUMERO);
    }, error => {
      this.cargando_service.terminaCargando();
      this.Alert(error.error.message, 'OK', true);
    })
  }
  async mis_tarjetas(cardNumber) {
    this.cargando_service.terminaCargando();
    const modal = await this.modal_controller.create({
      component: MisTarjetasComponent,
      backdropDismiss: false, 
      componentProps: { cardNumber }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    this.actualizar_datos();
  }
  async inscribir_tarjetas() {
    this.cargando_service.terminaCargando();
    const modal = await this.modal_controller.create({
      component: InscribirTarjetaEtixComponent,
      backdropDismiss: false
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
  }
  async mi_wallet() {
    const modal = await this.modal_controller.create({
      component: MiWalletComponent,
      backdropDismiss: false,
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
  }
  async recompensas() {
    const modal = await this.modal_controller.create({
      component: RecompensasComponent,
      backdropDismiss: false
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
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
