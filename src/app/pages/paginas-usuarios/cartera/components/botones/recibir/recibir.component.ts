import { Component } from '@angular/core';
import { formatCurrency } from '@angular/common';

@Component({
  selector: 'app-recibir',
  templateUrl: './recibir.component.html',
  styleUrls: ['./recibir.component.scss'],
})
export class RecibirComponent {
  formulario: boolean = false;

  cantidadUno: number = 0;
  cantidadDos: number = 0;

  cantidadSeleccionada: boolean = false;

  metodPay = null;


  banderaComaUno: boolean = false;
  banderaComaDos: boolean = false;

  constructor() {}

  get total(){
    return this.cantidadDos + this.cantidadUno;
  } 

  formularios(event) {
    this.formulario = event;
    this.cantidadDos = 0;
  }
  seleccionarCantidad(event) {
    if (!event) this.cantidadSeleccionada = false;
    if (event && this.formulario) this.cantidadSeleccionada = true;
  }
  selectMetod(event) {
    this.metodPay = event;
  }
  reiniciar() {
    this.metodPay = null;
    this.cantidadUno = 0;
    this.cantidadDos = 0;
    this.formulario = false;
    this.cantidadSeleccionada = false;
  }



  teclado(evento) {
    if (!this.cantidadSeleccionada) {
      switch (evento) {
        case 'coma':
          this.comaUno();
        break;
        case 'borrar':
          this.eliminarUno();
        break;
        default:
          this.agregarUno(evento);
        break;
      }
    }
    if (this.cantidadSeleccionada) {
      switch (evento) {
        case 'coma':
          this.comaDos();
        break;
        case 'borrar':
          this.eliminarDos();
        break;
        default:
          this.agregarDos(evento);
        break;
      }
    }
  }
  agregarUno(evento) {
    if (this.banderaComaUno) if (!this.exitePuntoUno) return this.cantidadUno = parseFloat(this.cantidadUno.toString().concat('.' + evento));
    if (this.exitePuntoUno) if (this.cantidadDecimalesUno >= 2) return;
    this.cantidadUno = parseFloat(this.cantidadUno.toString().concat(evento));
  }
  get cantidadDecimalesUno() {
    return this.cantidadUno.toString().substr(this.posicionPuntoUno).length
  }
  get exitePuntoUno() {
    return this.cantidadUno.toString().includes('.');
  }
  get posicionPuntoUno() {
    return this.cantidadUno.toString().indexOf('.') + 1;
  }
  eliminarUno() {
    if (this.banderaComaUno) this.banderaComaUno = false;
    if(this.cantidadUno.toString().length == 1) return this.cantidadUno = 0; 
    this.cantidadUno = parseFloat(this.cantidadUno.toString().substring(0,this.cantidadUno.toString().length -1));
  }
  comaUno() {
    if (this.exitePuntoUno && !this.banderaComaUno) return;
    this.cantidadUno = parseFloat(this.cantidadUno.toString().concat('.'));
    this.banderaComaUno = true;
  }



  agregarDos(evento) {
    if (this.banderaComaDos) if (!this.existePuntoDos) return this.cantidadDos = parseFloat(this.cantidadDos.toString().concat('.' + evento));
    if (this.existePuntoDos) if (this.cantidadDecimalesDos >= 2) return;
    this.cantidadDos = parseFloat(this.cantidadDos.toString().concat(evento));
  }
  get cantidadDecimalesDos() {
    return this.cantidadDos.toString().substr(this.posicionPuntoDos).length
  }
  get existePuntoDos() {
    return this.cantidadDos.toString().includes('.');
  }
  get posicionPuntoDos() {
    return this.cantidadDos.toString().indexOf('.') + 1;
  }
  eliminarDos() {
    if (this.banderaComaDos) this.banderaComaDos = false;
    if(this.cantidadDos.toString().length == 1) return this.cantidadDos = 0; 
    this.cantidadDos = parseFloat(this.cantidadDos.toString().substring(0,this.cantidadDos.toString().length -1));
  }
  comaDos() {
    if (this.existePuntoDos && !this.banderaComaDos) return;
    this.cantidadDos = parseFloat(this.cantidadDos +'.');
    this.banderaComaDos = true;
  }









}
