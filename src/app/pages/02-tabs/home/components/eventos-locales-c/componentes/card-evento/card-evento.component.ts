import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DescripcionEventoComponent } from '../descripcion-evento/descripcion-evento.component';
import { EditarEventoComponent } from '../editar-evento/editar-evento.component';
import { EventosLocalesComponent } from '../eventos-locales/eventos-locales.component';

@Component({
  selector: 'app-card-evento',
  templateUrl: './card-evento.component.html',
  styleUrls: ['./card-evento.component.scss'],
})
export class CardEventoComponent implements OnInit {
  @Input() evento: any;
  @Input() eventos_all: any;
  @Input() eventos_likes: any;
  @Input() eventos_mios: any;
  @Input() tipo;
  @Input() mostrar_filtro: any;

  constructor(
    private modal_controller: ModalController
  ) { }

  ngOnInit() { 
  }
  modalabrir() {
    switch (this.tipo) {
      case 1:
        this.descripcion_del_evento();
        break
      case 3:
        //this.editar_evento();
        break;
    }
  }
  async descripcion_del_evento() {
    if (this.mostrar_filtro.validacion) return;
    const modal = await this.modal_controller.create({
      component: DescripcionEventoComponent,
      componentProps: {
        evento: this.evento,
        eventos_all: this.eventos_all,
        eventos_likes: this.eventos_likes,
        eventos_mios: this.eventos_mios
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
  }
  async editar_evento() {
    if (this.mostrar_filtro.validacion) return;
    this.modal_controller.dismiss();
    const modal = await this.modal_controller.create({
      component: EditarEventoComponent,
      componentProps: {
        evento: this.evento
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (!data.data) {
      const modal = await this.modal_controller.create({
        component: EventosLocalesComponent
      });
      await modal.present();
      const { data } = await modal.onDidDismiss();
    }
  }
  get precio_standart() {
    let codigo;
    codigo = this.evento.events_tickets_details.find(detalle_ticket => detalle_ticket.event_ticket_category.evento_ticket_categoriaCODIGO == 'standard');
    return codigo.evento_ticket_detallePRECIO;
  }

}
