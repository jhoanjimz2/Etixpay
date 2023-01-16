import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stars-coments',
  templateUrl: './stars-coments.component.html',
  styleUrls: ['./stars-coments.component.scss'],
})
export class StarsComentsComponent {
  @Input() valoracion: number = 0;
  estrellas: any [] = [];
  noEstrellas: any [] = [];

  constructor() { }
  ngOnChanges() {
    this.estrellas.length = Math.round(this.valoracion);
    this.noEstrellas.length = (5-Math.round(this.valoracion));
  }


}
