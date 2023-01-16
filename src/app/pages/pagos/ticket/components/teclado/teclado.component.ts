import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-teclado',
  templateUrl: './teclado.component.html',
  styleUrls: ['./teclado.component.scss'],
})
export class TecladoComponent {

  @Output() teclado: EventEmitter<any> = new EventEmitter();

  constructor() { }

  click(tipado) {
    this.teclado.emit(tipado)
  }

}
