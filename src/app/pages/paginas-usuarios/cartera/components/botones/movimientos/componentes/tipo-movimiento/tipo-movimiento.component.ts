import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tipo-movimiento',
  templateUrl: './tipo-movimiento.component.html',
  styleUrls: ['./tipo-movimiento.component.scss'],
})
export class TipoMovimientoComponent implements OnInit {
  @Input() mensaje;

  constructor() { }

  ngOnInit() {}

}
