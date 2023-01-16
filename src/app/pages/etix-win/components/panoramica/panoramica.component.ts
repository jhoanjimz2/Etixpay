import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-panoramica',
  templateUrl: './panoramica.component.html',
  styleUrls: ['./panoramica.component.scss'],
})
export class PanoramicaComponent {

  @Input() sorteo:any;

}
