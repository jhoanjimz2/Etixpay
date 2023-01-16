import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-valoracion-con-estrellas',
  templateUrl: './valoracion-con-estrellas.component.html',
  styleUrls: ['./valoracion-con-estrellas.component.scss'],
})
export class ValoracionConEstrellasComponent implements OnInit , OnChanges {
  @Input() estrella;
  @Input() tipo = false;

  constructor(
    ) { }

  ngOnInit() {
  }
  ngOnChanges() {
    if (this.estrella == null) this.estrella = 0;
  }
}
