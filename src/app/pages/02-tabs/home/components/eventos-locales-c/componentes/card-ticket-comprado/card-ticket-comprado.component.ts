import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DescripcionEventoCompradoComponent } from '../descripcion-evento-comprado/descripcion-evento-comprado.component';

@Component({
  selector: 'app-card-ticket-comprado',
  templateUrl: './card-ticket-comprado.component.html',
  styleUrls: ['./card-ticket-comprado.component.scss'],
})
export class CardTicketCompradoComponent implements OnInit {
  @Input() ticket: any;
  @Input() mostrar_filtro: any;
  @Input() tickets_comprados: any;

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {}
  salir() {
    this.modalController.dismiss({data: true})
  }
  async descripcion_del_evento_comprado() {
    if (this.mostrar_filtro.validacion) return;
    const modal = await this.modalController.create({
      component: DescripcionEventoCompradoComponent,
      componentProps: {
        ticket_comprado: this.ticket,
        tickets_comprados: this.tickets_comprados
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
  }

}
