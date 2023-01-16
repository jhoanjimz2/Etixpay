import { Component, OnInit, ViewChild } from '@angular/core';
import { IonItemSliding, ModalController, PopoverController } from '@ionic/angular';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { CargandoService } from 'src/app/services/cargando.service';
import { HistorialRecompensasComponent } from './componentes/historial-recompensas/historial-recompensas.component';
import { ServicesCommunity } from '../../../../../../services/community.service';

@Component({
  selector: 'app-recompensas',
  templateUrl: './recompensas.component.html',
  styleUrls: ['./recompensas.component.scss'],
})
export class RecompensasComponent implements OnInit {
  @ViewChild('itemSliding', { static: true }) itemSlid: IonItemSliding;
  recompensaPorCobrar: any[] = []; ultimaPagina; controlPaginas = 1;
  uuidComisiones = []; banderaComisiones = false;
  cantidadRewardTotal = 0;
  opacidad = '0';
  mensaje = false;

  constructor(
    private modalController: ModalController,
    private popover_controller: PopoverController,
    private cargandoService: CargandoService,
    private communityService: ServicesCommunity
  ) { }

  ngOnInit() {
    this.cargarCashbacks(this.controlPaginas);
  }
  salirSinArgumentos() {
    this.modalController.dismiss();
  }
  
  evento_swipe(event) {
    if (event.detail.amount < -250) {
      this.itemSlid.close();
      if (this.uuidComisiones.length > 0 && !this.banderaComisiones) {
        this.opacidad = '1';
        this.banderaComisiones = true;
        this.mensaje = false;
        this.recolectarCashback();
      } else {
        if (!this.banderaComisiones) this.mensaje = true;
      }
    } else {
      this.opacidad = '0';
    }
  }
  cargarCashbacks(paginaActual) {
    this.communityService.mostrarCashback(localStorage.getItem('wallet'), paginaActual).subscribe( (datos: any) => {
      if(this.controlPaginas > 1) {
        let arrayPROV = this.recompensaPorCobrar.concat(datos.data.data);
        this.recompensaPorCobrar = arrayPROV;
      } else {
        this.recompensaPorCobrar = datos.data.data;
        this.ultimaPagina = datos.data.last_page;
      }
      this.sumarCantidadEtix();
    } , errorServicio => {
      this.Alert(errorServicio.error.message, 'OK', true);
    });
  }
  sumarCantidadEtix() {
    this.cantidadRewardTotal = 0;
    this.uuidComisiones = [];
    this.recompensaPorCobrar.forEach( element => {
      this.cantidadRewardTotal = this.cantidadRewardTotal + parseFloat(element.comision_individualCANTIDADATM);
      this.uuidComisiones.push(element.uuid);
    })
  }
  recolectarCashback() {
    this.cargandoService.iniciaCargando();
    this.controlPaginas = 1;
    this.cantidadRewardTotal = 0;
    this.communityService.aprobarCashback(localStorage.getItem('wallet'), this.uuidComisiones).subscribe( (datos: any) => {
      this.banderaComisiones = false;
      this.cargandoService.terminaCargando();
      this.cargarCashbacks(this.controlPaginas);
    } , errorServicio => {
      this.cargandoService.terminaCargando();
      this.banderaComisiones = false;
      this.Alert(errorServicio.error.message, 'OK', true);
    });
  }
  loadData(event) {
    if (this.controlPaginas < this.ultimaPagina ) {
      this.controlPaginas = this.controlPaginas + 1;
      this.cargarCashbacks(this.controlPaginas);
      setTimeout(() => {
        event.target.complete();
      }, 1000);
    } else {
      event.target.complete();
    }
  }
  async abrirHistorialRecompensas() {
    const modal = await this.modalController.create({
      component: HistorialRecompensasComponent
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
