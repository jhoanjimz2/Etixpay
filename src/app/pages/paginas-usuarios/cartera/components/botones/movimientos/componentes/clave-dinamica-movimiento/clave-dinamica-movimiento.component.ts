import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-clave-dinamica-movimiento',
  templateUrl: './clave-dinamica-movimiento.component.html',
  styleUrls: ['./clave-dinamica-movimiento.component.scss'],
})
export class ClaveDinamicaMovimientoComponent implements OnInit {
  fmClaveDinamica;

  constructor(
    private formBuilder: FormBuilder,
    private popover_controller: PopoverController
    ) { }

  ngOnInit() {
    this.cargarFormularioClaveDinamica();
  }
  cargarFormularioClaveDinamica() {
    this.fmClaveDinamica = this.formBuilder.group({
      claveDinamica: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
        Validators.pattern('^[0-9]*$')
      ])
    });
  }
  salirSinSeleccion() {
    this.popover_controller.dismiss({seleccionado: false});
  }
  salirConSeleccion() {
    this.popover_controller.dismiss({
      seleccionado: true,
      clave: this.fmClaveDinamica.controls.claveDinamica.value
    });
  }

}
