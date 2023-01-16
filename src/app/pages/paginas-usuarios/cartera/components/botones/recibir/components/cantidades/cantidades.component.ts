import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cantidades',
  templateUrl: './cantidades.component.html',
  styleUrls: ['./cantidades.component.scss'],
})
export class CantidadesComponent {
  @Input() formulario: boolean = false;
  @Input() cantidadUno: number = 0;
  @Input() cantidadDos: number = 0;
  @Output() seleccionar: EventEmitter<any> = new EventEmitter();
  @Output() formularioChange: EventEmitter<any> = new EventEmitter();

  constructor() { }

  formularios() {
    this.seleccionarCantidad(false);
    this.formularioChange.emit(!this.formulario);
    this.formulario = !this.formulario;
  }
  get total() {
    return this.cantidadUno + this.cantidadDos;
  }
  seleccionarCantidad(event) {
    this.seleccionar.emit(event);
  }
 


}
