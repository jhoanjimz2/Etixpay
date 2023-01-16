import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PopoverController } from '@ionic/angular';
import { CargandoService } from 'src/app/services/cargando.service';
import { CarterasService } from '../../../carteras.service';
import * as moment from 'moment';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.scss'],
})
export class MovimientosComponent implements OnInit {
  movimientosAll: any[] = []; ultimaPaginaALL; controlPaginasALL = 1; ultimaPaginaALLFecha; controlPaginasALLFecha = 1;
  movimientosIN: any[] = []; ultimaPaginaIN; controlPaginasIN = 1;
  movimientosOUT: any[] = []; ultimaPaginaOUT; controlPaginasOUT = 1;
  movimientosPEN: any[] = []; ultimaPaginaPEN; controlPaginasPEN = 1;
  fmFecha; movimientos = 'All'; filtroFecha = false;
  constructor(
    private formBuilder: FormBuilder,
    private popover_controller: PopoverController,
    private carteraService: CarterasService,
    private cargandoService: CargandoService
  ) { }

  ngOnInit() {
    this.actualizar();
    this.cargarFormularioFechasFiltros();
  }
  get fecha_limite() {
    return moment(new Date()).format('YYYY-MM-DD');
  }
  cargarFormularioFechasFiltros() {
    this.fmFecha = this.formBuilder.group({
      fechaIni: new FormControl('', [
        Validators.required
      ]),
      fechaFin: new FormControl('', [
        Validators.required
      ])
    });
  }
  activarServicio() {
    if (this.fmFecha.valid && this.filtroFecha) {
      this.movimientosALLFILTROFECHAS(this.fmFecha.controls.fechaIni.value, this.fmFecha.controls.fechaFin.value, this.controlPaginasALLFecha);
    }
  }
  actualizar() {
    this.movimientosALL(this.controlPaginasALL);
    this.movimientosIn(this.controlPaginasIN);
    this.movimientosOut(this.controlPaginasOUT);
    this.movimientosPendientes(this.controlPaginasPEN);
  }
  movimientosALL(pagina) {
    this.carteraService.movimientosALL(localStorage.getItem('wallet'), pagina).subscribe((datosMOVIMIENTOS: any) => {
      if (this.controlPaginasALL > 1) {
        let arrayPROV = this.movimientosAll.concat(datosMOVIMIENTOS.data.data);
        this.movimientosAll = arrayPROV;
      } else {
        this.movimientosAll = datosMOVIMIENTOS.data.data;
        this.ultimaPaginaALL = datosMOVIMIENTOS.data.last_page;
      }
    }, errorServicio => {
      this.Alert(errorServicio.error.message, 'OK', true);
    });
  }
  movimientosALLFILTROFECHAS(fecha1, fecha2, paginaActual) {
    this.carteraService.movimientosALLFechaIniFechaFin(localStorage.getItem('wallet'), fecha1, fecha2, paginaActual).subscribe((datosMOVIMIENTOS: any) => {
      if (this.controlPaginasALLFecha > 1) {
        let arrayPROV = this.movimientosAll.concat(datosMOVIMIENTOS.data.data);
        this.movimientosAll = arrayPROV;
      } else {
        this.movimientosAll = datosMOVIMIENTOS.data.data;
        this.ultimaPaginaALLFecha = datosMOVIMIENTOS.data.last_page;
      }
    }, errorServicio => {
      this.Alert(errorServicio.error.message, 'OK', true);
    });
  }
  movimientosIn(paginaActual) {
    this.carteraService.movimientosIN(localStorage.getItem('wallet'), paginaActual).subscribe((datosMOVIMIENTOS: any) => {
      if (this.controlPaginasIN > 1) {
        let arrayPROV = this.movimientosIN.concat(datosMOVIMIENTOS.data.data);
        this.movimientosIN = arrayPROV;
      } else {
        this.movimientosIN = datosMOVIMIENTOS.data.data;
        this.ultimaPaginaIN = datosMOVIMIENTOS.data.last_page;
      }
      this.movimientosIN.forEach(element => {
        if (!element.transaccionCONCEPTO) element['transaccionCONCEPTO'] = 'INGRESO';
      })
    }, errorServicio => {
      this.Alert(errorServicio.error.message, 'OK', true);
    });
  }
  movimientosOut(paginaActual) {
    this.carteraService.movimientosOUT(localStorage.getItem('wallet'), paginaActual).subscribe((datosMOVIMIENTOS: any) => {
      if (this.controlPaginasOUT > 1) {
        let arrayPROV = this.movimientosOUT.concat(datosMOVIMIENTOS.data.data);
        this.movimientosOUT = arrayPROV;
      } else {
        this.movimientosOUT = datosMOVIMIENTOS.data.data;
        this.ultimaPaginaOUT = datosMOVIMIENTOS.data.last_page;
      }
      this.movimientosOUT.forEach(element => {
        if (!element.transaccionCONCEPTO) element['transaccionCONCEPTO'] = 'RETIRO';
      })
    }, errorServicio => {
      this.Alert(errorServicio.error.message, 'OK', true);
    });
  }
  movimientosPendientes(paginaActual) {
    this.carteraService.movimientosPENDIENTES(localStorage.getItem('wallet'), paginaActual).subscribe((datosMOVIMIENTOS: any) => {
      if (this.controlPaginasPEN > 1) {
        let arrayPROV = this.movimientosPEN.concat(datosMOVIMIENTOS.data.data);
        this.movimientosPEN = arrayPROV;
      } else {
        this.movimientosPEN = datosMOVIMIENTOS.data.data;
        this.ultimaPaginaPEN = datosMOVIMIENTOS.data.last_page;
      }
    }, errorServicio => {
      this.Alert(errorServicio.error.message, 'OK', true);
    });
  }

  add() {
    this.filtroFecha = !this.filtroFecha;
    this.controlPaginasALL = 1;
    this.ultimaPaginaALL = 0;
  }
  clear() {
    this.filtroFecha = !this.filtroFecha;
    this.controlPaginasALLFecha = 1;
    this.ultimaPaginaALLFecha = 0;
    this.fmFecha.reset();
    this.movimientosALL(this.controlPaginasALL);
  }
  cargaInfinitiScroll(event) {
    switch (this.movimientos) {
      case 'All':
        if (!this.filtroFecha) this.loadDataALL(event);
        if (this.filtroFecha) this.loadDataALLFecha(event);
        break;
      case 'Received':
        this.loadDataIn(event);
        break;
      case 'Paid':
        this.loadDataOut(event);
        break;
      case 'Pending':
        this.loadDataPen(event);
        break;
    }
  }

  loadDataALL(event) {
    if (this.controlPaginasALL < this.ultimaPaginaALL) {
      this.controlPaginasALL = this.controlPaginasALL + 1;
      this.movimientosALL(this.controlPaginasALL);
      setTimeout(() => {
        event.target.complete();
      }, 1000);
    } else {
      event.target.complete();
    }
  }
  loadDataALLFecha(event) {
    if (this.controlPaginasALLFecha < this.ultimaPaginaALLFecha) {
      this.controlPaginasALLFecha = this.controlPaginasALLFecha + 1;
      this.movimientosALLFILTROFECHAS(this.fmFecha.controls.fechaIni.value, this.fmFecha.controls.fechaFin.value, this.controlPaginasALLFecha);
      setTimeout(() => {
        event.target.complete();
      }, 1000);
    } else {
      event.target.complete();
    }
  }
  loadDataIn(event) {
    if (this.controlPaginasIN < this.ultimaPaginaIN) {
      this.controlPaginasIN = this.controlPaginasIN + 1;
      this.movimientosIn(this.controlPaginasIN);
      setTimeout(() => {
        event.target.complete();
      }, 1000);
    } else {
      event.target.complete();
    }
  }
  loadDataOut(event) {
    if (this.controlPaginasOUT < this.ultimaPaginaOUT) {
      this.controlPaginasOUT = this.controlPaginasOUT + 1;
      this.movimientosOut(this.controlPaginasOUT);
      setTimeout(() => {
        event.target.complete();
      }, 1000);
    } else {
      event.target.complete();
    }
  }
  loadDataPen(event) {
    if (this.controlPaginasPEN < this.ultimaPaginaPEN) {
      this.controlPaginasPEN = this.controlPaginasPEN + 1;
      this.movimientosPendientes(this.controlPaginasPEN);
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
