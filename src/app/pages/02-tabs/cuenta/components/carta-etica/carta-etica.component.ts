import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carta-etica',
  templateUrl: './carta-etica.component.html',
  styleUrls: ['./carta-etica.component.scss'],
})
export class CartaEticaComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  carta_etica() {
    window.open('https://youetix.com/#/ethical-code');
  }


}
