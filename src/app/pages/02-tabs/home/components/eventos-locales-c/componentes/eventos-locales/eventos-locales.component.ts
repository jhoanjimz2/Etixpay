import { Component, Input, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { HomeService } from '../../../../../../../services/home.service';
import { CrearUnEventoComponent } from '../crear-un-evento/crear-un-evento.component';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { CargandoService } from '../../../../../../../services/cargando.service';
import { TranslateService } from '@ngx-translate/core';
import { LectorQrComponent } from 'src/app/shared/lector-qr/lector-qr.component';

@Component({
  selector: 'app-eventos-locales',
  templateUrl: './eventos-locales.component.html',
  styleUrls: ['./eventos-locales.component.scss'],
})
export class EventosLocalesComponent implements OnInit {
  @Input() mios = false;
  eventosBuscadasPorLaBarra = [];
  segment = 1;
  eventos_all = []; control_paginacion_all = 1; ultima_pagina_all;
  eventos_mios = []; control_paginacion_mios = 1; ultima_pagina_mios;
  eventos_likes = []; control_paginacion_likes = 1; ultima_pagina_likes;
  tickets_comprados = []; tickets_comprados_ejecutados = [];
  variable_filtro = 'A_Z';
  filtros = [
    { nombre:'FROMATOZ', codigo: 'A_Z'},
    { nombre:'FROMZTOA', codigo: 'Z_A'},
    { nombre:'FROMHIGH', codigo: 'MAYOR_A_MENOR'},
    { nombre:'FROMLOW', codigo: 'MENOR_A_MAYOR'},
  ]
  mostrar_filtro = { validacion: false };

  fecha_de_hoy = new Date();


  constructor(
    private modalController: ModalController,
    private home_service: HomeService,
    private cargando_service: CargandoService,
    private popover_controller: PopoverController,
    private translate_service: TranslateService
  ) { }

  ngOnInit() {
    if (this.mios) this.segment = 3;
    this.cargar_todos_eventos();
  }
  salirConArgumentos() {
    this.modalController.dismiss();
  }
  cargar_todos_eventos() {
    this.cargar_eventos(this.control_paginacion_all);
    this.cargar_mis_eventos(this.control_paginacion_mios);
    this.cargar_eventos_con_likes(this.control_paginacion_likes);
    this.cargar_mis_tickets_de_eventos();
    this.cargar_mis_tickets_de_eventos_ejecutados();
    this.cargar_categoria_tickets();
  }
  cargar_eventos(pagina) {
    this.home_service.ver_eventos(pagina).subscribe((data: any) =>{
      if (this.control_paginacion_all > 1) {
        let arrayPROV = this.eventos_all.concat(data.data.data);
        this.eventos_all = arrayPROV;
      } else {
        this.eventos_all = data.data.data;
        this.ultima_pagina_all = data.data.last_page;
      }
    })
  }
  cargar_mis_eventos(pagina) {
    this.home_service.ver_mis_eventos(pagina).subscribe((data: any) =>{
      if (this.control_paginacion_mios > 1) {
        let arrayPROV = this.eventos_mios.concat(data.data.data);
        this.eventos_mios = arrayPROV;
      } else {
        this.eventos_mios = data.data.data;
        this.ultima_pagina_mios = data.data.last_page;
      }
    })
  }
  cargar_eventos_con_likes(pagina) {
    this.home_service.ver_mis_eventos_con_likes(pagina).subscribe((data: any) =>{
      if (this.control_paginacion_likes > 1) {
        let arrayPROV = this.eventos_likes.concat(data.data.data);
        this.eventos_likes = arrayPROV;
      } else {
        this.eventos_likes = data.data.data;
        this.ultima_pagina_likes = data.data.last_page;
      }
    })
  }
  cargar_mis_tickets_de_eventos() {
    this.home_service.ver_mis_tickets_de_eventos().subscribe((data: any) =>{
      this.tickets_comprados = data.data;
    })
  }
  cargar_mis_tickets_de_eventos_ejecutados() {
    this.home_service.ver_mis_tickets_de_eventos_ejecutados().subscribe((data: any) =>{
      this.tickets_comprados_ejecutados = data.data;
    })
  }
  cargar_categoria_tickets() {
    this.home_service.ver_categorias_de_tickets().subscribe((data: any) =>{
    })
  }
  buscar(event) { 
    this.variable_filtro = event.detail.value;
  }
  cancelar() { }
  
  cargaInfinitiScroll(event) {
    switch (this.segment) {
      case 1:
        this.paginacion_all_eventos(event);
        break;
      case 2:
        event.target.complete();
        break;
      case 3:
        this.paginacion_mios_eventos(event);
        break;
      case 4:
        this.paginacion_likes_eventos(event);
        break;
    }
  }
  paginacion_all_eventos(event) {
    if (this.control_paginacion_all < this.ultima_pagina_all) {
      this.control_paginacion_all = this.control_paginacion_all + 1;
      this.cargar_eventos(this.control_paginacion_all);
      setTimeout(() => {
        event.target.complete();
      }, 1000);
    } else {
      event.target.complete();
    }
  }
  paginacion_mios_eventos(event) {
    if (this.control_paginacion_mios < this.ultima_pagina_mios) {
      this.control_paginacion_mios = this.control_paginacion_mios + 1;
      this.cargar_mis_eventos(this.control_paginacion_mios);
      setTimeout(() => {
        event.target.complete();
      }, 1000);
    } else {
      event.target.complete();
    }
  }
  paginacion_likes_eventos(event) {
    if (this.control_paginacion_likes < this.ultima_pagina_likes) {
      this.control_paginacion_likes = this.control_paginacion_likes + 1;
      this.cargar_eventos_con_likes(this.control_paginacion_likes);
      setTimeout(() => {
        event.target.complete();
      }, 1000);
    } else {
      event.target.complete();
    }
  }

  async crear_evento() {
    /* this.modalController.dismiss(); */
    const modal = await this.modalController.create({
      component: CrearUnEventoComponent,
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    /* if (!data.data) {
      const modal = await this.modalController.create({
        component: EventosLocalesComponent
      });
      await modal.present();
      const { data } = await modal.onDidDismiss();
    } */
  }
  async lectorQr() {
    const modal = await this.modalController.create({
      component: LectorQrComponent,
      backdropDismiss: true,
      swipeToClose: true
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data.data) { setTimeout(() => {this.recibir_voucher(JSON.parse(data.data).voucherID, JSON.parse(data.data).voucherCode, JSON.parse(data.data).voucherable_id);},500) }
  }
  recibir_voucher(voucherID, voucher_generadoCODIGO, voucherable_id) {
    this.cargando_service.iniciaCargando();
    this.home_service.recibir_voucher(voucherID, voucher_generadoCODIGO, voucherable_id).subscribe((data: any) => {
      this.cargando_service.terminaCargando();
      this.Alert(data.message, 'OK', false);
    }, error => {
      this.cargando_service.terminaCargando();
      this.Alert(error.error.message, 'OK', true);
    })
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
