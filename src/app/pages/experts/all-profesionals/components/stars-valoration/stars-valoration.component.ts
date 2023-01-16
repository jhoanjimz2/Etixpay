import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stars-valoration',
  templateUrl: './stars-valoration.component.html',
  styleUrls: ['./stars-valoration.component.scss'],
})
export class StarsValorationComponent {
  @Input() valoracion: number = 0;
  estrellas: any [] = [];
  noEstrellas: any [] = [];

  constructor() {
  }
  ngOnChanges() {
    this.estrellas.length = Math.round(this.valoracion);
    this.noEstrellas.length = (5-Math.round(this.valoracion));
  }
}
