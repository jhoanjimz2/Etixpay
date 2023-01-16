import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detalle-etixcash',
  templateUrl: './detalle-etixcash.component.html',
  styleUrls: ['./detalle-etixcash.component.scss'],
})
export class DetalleEtixcashComponent {
  @Input() movimiento: any;
  @Input() tipo;
}
