import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HomeService } from '../../../../../services/home.service';
import { DescripcionEventoComponent } from './componentes/descripcion-evento/descripcion-evento.component';
import { EventosLocalesComponent } from './componentes/eventos-locales/eventos-locales.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-eventos-locales-c',
  templateUrl: './eventos-locales-c.component.html',
  styleUrls: ['./eventos-locales-c.component.scss'],
})
export class EventosLocalesCComponent implements OnInit {
  slideEventos = {
    initialSlide: 0,
    slidesPerView:1,
    observer: true,
    observeParents: true
  };
  
  eventos_all = [];
  control_paginacion = 1;
  ultima_pagina;

  constructor(
    private modalController: ModalController,
    private homeService: HomeService
    ) { }

  ngOnInit() {
    this.cargar_eventos(1);
  }
  cargar_eventos(pagina) {
    this.homeService.ver_eventos(pagina).subscribe((data: any) =>{
      if (this.control_paginacion > 1) {
        let arrayPROV = this.eventos_all.concat(data.data.data);
        this.eventos_all = arrayPROV;
      } else {
        this.eventos_all = data.data.data;
        this.ultima_pagina = data.data.last_page;
      }
    })
  }
  cargar_mas_eventos() {
    if (this.control_paginacion < this.ultima_pagina) {
      this.control_paginacion = this.control_paginacion + 1;
      this.cargar_eventos(this.control_paginacion);
    }
  }
  voucher_standart_precio(evento) {
    let detalle_voucher_standart = evento.events_tickets_details.find(detail => detail.event_ticket_category.evento_ticket_categoriaCODIGO == 'standard');
    return detalle_voucher_standart.voucher_event.voucherPRECIO;
  }
  voucher_standart_punto_recompensa(evento) {
    let detalle_voucher_standart = evento.events_tickets_details.find(detail => detail.event_ticket_category.evento_ticket_categoriaCODIGO == 'standard');
    let valor_comision = ((detalle_voucher_standart.voucher_event.voucherPRECIO * detalle_voucher_standart.voucher_event.voucherCOMISION )/ environment.comisionPorcentaje);
    return ((valor_comision * detalle_voucher_standart.voucher_event.voucherPUNTORECOMPENSA ) / environment.comisionPorcentaje);
  }
  async eventos() {
    const modal = await this.modalController.create({
      component: EventosLocalesComponent
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    this.cargar_eventos(1);
  }
  async descripcion_de_evento(evento) {
    const modal = await this.modalController.create({
      component: DescripcionEventoComponent,
      componentProps: { 
        evento: evento,
        bandera: true
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
  }

}
