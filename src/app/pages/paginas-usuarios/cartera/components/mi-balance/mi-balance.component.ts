import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mi-balance',
  templateUrl: './mi-balance.component.html',
  styleUrls: ['./mi-balance.component.scss'],
})
export class MiBalanceComponent implements OnInit {
  @Input() saldo_tix;
  @Input() saldo_tickets;
  muestra = false;
  muestra2 = false;

  constructor() { }

  ngOnInit() {}

}
