import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-metodo-pago',
  templateUrl: './card-metodo-pago.component.html',
  styleUrls: ['./card-metodo-pago.component.scss'],
})
export class CardMetodoPagoComponent implements OnInit {
  @Input() cuenta;

  constructor() { }

  ngOnInit() {}

}
