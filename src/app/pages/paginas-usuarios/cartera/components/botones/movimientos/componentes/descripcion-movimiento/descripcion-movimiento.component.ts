import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-descripcion-movimiento',
  templateUrl: './descripcion-movimiento.component.html',
  styleUrls: ['./descripcion-movimiento.component.scss'],
})
export class DescripcionMovimientoComponent implements OnInit {
  @Input() movimiento;

  constructor(
    private modal_controller: ModalController
  ) { }

  ngOnInit() {
  }

  salir_sin_argumentos() {
    this.modal_controller.dismiss({data: false});
  }

}
