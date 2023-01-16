import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { ComprarTicketEventoComponent } from '../comprar-ticket-evento/comprar-ticket-evento.component';

@Component({
  selector: 'app-descripcion-evento',
  templateUrl: './descripcion-evento.component.html',
  styleUrls: ['./descripcion-evento.component.scss'],
})
export class DescripcionEventoComponent implements OnInit {
  @ViewChild('sliderRef', { static: false }) slide: IonSlides;
  @Input() evento: any;
  @Input() eventos_all: any = [];
  @Input() eventos_mios: any = [];
  @Input() eventos_likes: any = [];
  @Input() bandera = false;
  option = {
    spaceBetween: 10,
    centeredSlides: true,
    speed: 1500,
    autoplay: {
      delay: 1000,
      disableOnInteraction: false
    },
    loop: true
  };
  megusta = false;

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }
  salirSinArgumentos() {
    this.modalController.dismiss();
  }
  async comprar() {
    const modal = await this.modalController.create({
      component: ComprarTicketEventoComponent,
      componentProps: {
        detalle_evento: this.evento.events_tickets_details,
        boton_seleccionado: this.evento.events_tickets_details[0]
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
  }
  get voucher_standart_precio() {
    let detalle_voucher_standart = this.evento.events_tickets_details.find(detail => detail.event_ticket_category.evento_ticket_categoriaCODIGO == 'standard');
    return detalle_voucher_standart.voucher_event.voucherPRECIO;
  }
  get voucher_standart_punto_recompensa() {
    let detalle_voucher_standart = this.evento.events_tickets_details.find(detail => detail.event_ticket_category.evento_ticket_categoriaCODIGO == 'standard');
    let valor_comision = ((detalle_voucher_standart.voucher_event.voucherPRECIO * detalle_voucher_standart.voucher_event.voucherCOMISION )/100);
    return ((valor_comision * detalle_voucher_standart.voucher_event.voucherPUNTORECOMPENSA ) / 100);
  }


}
