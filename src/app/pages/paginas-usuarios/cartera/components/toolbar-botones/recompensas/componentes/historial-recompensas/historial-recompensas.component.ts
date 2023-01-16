import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import * as moment from 'moment';
import { ServicesCommunity } from '../../../../../../../../services/community.service';

@Component({
  selector: 'app-historial-recompensas',
  templateUrl: './historial-recompensas.component.html',
  styleUrls: ['./historial-recompensas.component.scss'],
})
export class HistorialRecompensasComponent implements OnInit {
  cashback_por_cobrar_historial = []; 
  ultima_pagina_historial;  control_paginas_historial = 1;
  ultima_pagina_historial_fechas; control_paginas_historial_fechas = 1;
  formulario;
  filtro_fecha = false;

  constructor(
    private form_builder: FormBuilder,
    private popover_controller: PopoverController,
    private modalController: ModalController,
    private communityService: ServicesCommunity
  ) { }

  ngOnInit() {
    this.cargar_formulario();
    this.cargar_ticket_back_historial(this.control_paginas_historial);
  }
  salirSinArgumentos() {
    this.modalController.dismiss();
  }
  cargar_formulario() {
    this.formulario = this.form_builder.group({
      fecha_inicial: new FormControl('', [
        Validators.required
      ]),
      fecha_final: new FormControl('', [
        Validators.required
      ])
    });
  }
  add() {
    this.filtro_fecha = !this.filtro_fecha;
    this.control_paginas_historial = 1;
    this.ultima_pagina_historial = 0;
  }
  clear() {
    this.filtro_fecha = !this.filtro_fecha;
    this.control_paginas_historial = 1;
    this.ultima_pagina_historial = 0;
    this.formulario.reset();
    this.cargar_ticket_back_historial(this.control_paginas_historial);
  }
  activar_servicio() {
    if (this.formulario.valid && this.filtro_fecha) {
      this.cargar_ticket_back_historial_fechas(
        this.control_paginas_historial_fechas,
        moment(this.formulario.controls.fecha_inicial.value).format('YYYY-MM-DD'), 
        moment(this.formulario.controls.fecha_final.value).format('YYYY-MM-DD')
      );
    }
  }
  cargar_ticket_back_historial(pagina_actual) {
    this.communityService.mostrar_cashback_historial(localStorage.getItem('wallet'), pagina_actual).subscribe((datos: any) => {
      if (this.control_paginas_historial > 1) {
        let arrayPROV = this.cashback_por_cobrar_historial.concat(datos.data.paginacion.data);
        this.cashback_por_cobrar_historial = arrayPROV;
      } else {
        this.cashback_por_cobrar_historial = datos.data.paginacion.data;
        this.ultima_pagina_historial = datos.data.paginacion.last_page;
      }
    }, errorServicio => {
      return this.Alert(errorServicio.error.message, 'OK', true);
    });
  }
  load_data(event) {
    if (this.control_paginas_historial < this.ultima_pagina_historial) {
      this.control_paginas_historial = this.control_paginas_historial + 1;
      this.cargar_ticket_back_historial(this.control_paginas_historial);
      setTimeout(() => {
        event.target.complete();
      }, 1000);
    } else {
      event.target.complete();
    }
  }
  cargar_ticket_back_historial_fechas(pagina_actual, fecha_uno, fecha_dos) {
    this.communityService.mostrar_cashback_historial(
      localStorage.getItem('wallet'),
      pagina_actual,
      fecha_uno,
      fecha_dos
      ).subscribe((datos: any) => {
      if (this.control_paginas_historial_fechas > 1) {
        let arrayPROV = this.cashback_por_cobrar_historial.concat(datos.data.paginacion.data);
        this.cashback_por_cobrar_historial = arrayPROV;
      } else {
        this.cashback_por_cobrar_historial = datos.data.paginacion.data;
        this.ultima_pagina_historial_fechas = datos.data.paginacion.last_page;
      }
    }, error => {
      return this.Alert(error.error.message, 'OK', true);
    });
  }
  load_data_fechas(event) {
    if (this.control_paginas_historial_fechas < this.ultima_pagina_historial_fechas) {
      this.control_paginas_historial_fechas = this.control_paginas_historial_fechas + 1;
      this.cargar_ticket_back_historial_fechas(
        this.control_paginas_historial_fechas,
        moment(this.formulario.controls.fecha_inicial.value).format('YYYY-MM-DD'), 
        moment(this.formulario.controls.fecha_final.value).format('YYYY-MM-DD')
      );
      setTimeout(() => {
        event.target.complete();
      }, 1000);
    } else {
      event.target.complete();
    }
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
