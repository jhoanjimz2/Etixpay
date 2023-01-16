import { Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-select-cantidad',
  templateUrl: './select-cantidad.component.html',
  styleUrls: ['./select-cantidad.component.scss'],
})
export class SelectCantidadComponent {
  @Input() tipo = null;
  fm_cantidad: FormGroup = this.form_builder.group({
    cantidad: new FormControl('', [ 
      Validators.min(0.00001), 
      Validators.required
    ]),
  });
  
  constructor(
    private form_builder: FormBuilder,
    private popover_controller: PopoverController
  ) { }

  salir_sin_argumentos() {
    this.popover_controller.dismiss({
      datos: false
    })
  }
  salir_con_argumentos() {
    if (!this.fm_cantidad.valid) return this.fm_cantidad.markAllAsTouched();
    this.popover_controller.dismiss({
      datos: true,
      tipo: this.tipo,
      cantidad: this.fm_cantidad.controls.cantidad.value
    })
  }
}
