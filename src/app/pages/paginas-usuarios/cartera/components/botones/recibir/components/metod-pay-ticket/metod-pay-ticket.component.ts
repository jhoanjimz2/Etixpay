import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CargandoService } from '../../../../../../../../services/cargando.service';
import { CarterasService } from '../../../../../carteras.service';
import { PopoverController, ModalController } from '@ionic/angular';
import { AlertComponent } from '../../../../../../../../shared/alert/alert.component';
import { AlertDosComponent } from '../alert-dos/alert-dos.component';

@Component({
  selector: 'app-metod-pay-ticket',
  templateUrl: './metod-pay-ticket.component.html',
  styleUrls: ['./metod-pay-ticket.component.scss'],
})
export class MetodPayTicketComponent {
  @Input() cantidadUno: number = 0;
  @Input() cantidadDos: number = 0;
  @Output() cancelar: EventEmitter<any> = new EventEmitter();
  transaccion = {
    uuid: undefined,
    codigoQR: undefined,
    pr: 0
  };
  timer;

  constructor(
    private cargandoService: CargandoService,
    private carteraService: CarterasService,
    private popoverController: PopoverController,
    private modalController: ModalController
  ) { 
    setTimeout(() =>  this.generarQR(), 100)
  }

  ngOnDestroy() {
    this.detener_intervalo();
  }

  get total(){
    return this.cantidadDos + this.cantidadUno;
  } 
  cancelando() {
    this.cancelar.emit();
  }
  generarQR() {
    this.cargandoService.iniciaCargando();
    this.carteraService.crearPayATM(localStorage.getItem('wallet'),this.cantidadUno,this.cantidadDos).subscribe((data: any) => {
      this.transaccion.uuid = data.data.uuid;
      this.transaccion.codigoQR = data.data.solicitudEnvioTransaccionaOBSERVACIONES;
      this.transaccion.pr = data.data.rewardPoint;
      this.cargandoService.terminaCargando();
      this.intervalo();
    }, errorServicio => {
      this.cargandoService.terminaCargando();
      this.cancelando();
      this.alert(errorServicio.error.message, 'OK', true);
    });
  }
  intervalo() {
    this.timer = setInterval(() => {
      this.verEstadoPay();
    }, 5000);
  }
  detener_intervalo() {
    clearInterval(this.timer);
  }
  verEstadoPay() {
    this.carteraService.verPAY(localStorage.getItem('wallet'), this.transaccion.uuid).subscribe((qr: any) => {
      if (qr.data.solicitudEnvioTransaccionESTADO == 'APROBADO') {
        this.alertDos(true);
        this.detener_intervalo();
      } else if (qr.data.solicitudEnvioTransaccionESTADO == 'ANULADO') {
        this.alertDos(false);
        this.detener_intervalo();
      }
    }, error => {
      this.cargandoService.terminaCargando();
      this.alert(error.error.message, 'OK', true);
    });
  }
  async alertDos(tipo) {
    const modal = await this.modalController.create({
      component: AlertDosComponent,
      cssClass: 'modal_alerta_dos',
      backdropDismiss: true,
      componentProps: {  tipo  }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (!data.data) this.cancelando();
    else setTimeout(()=> this.modalController.dismiss(), 100);
  }
  async alert(tex, bot, tipo) {
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
