import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select-metod-pay',
  templateUrl: './select-metod-pay.component.html',
  styleUrls: ['./select-metod-pay.component.scss'],
})
export class SelectMetodPayComponent {
  @Input() total: number = 0;
  @Output() select: EventEmitter<any> = new EventEmitter();

  eleccionUnica: boolean = false;

  tipo = null;

  constructor() { }

  seleccionar(tipo) {
    if(this.eleccionUnica) return;
    if(this.total == 0) return;
    this.tipo = tipo;
    this.eleccionUnica = true;
    this.select.emit(tipo);
  }

}
