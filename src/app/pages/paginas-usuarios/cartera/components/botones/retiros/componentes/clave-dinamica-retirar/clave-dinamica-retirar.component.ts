import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-clave-dinamica-retirar',
  templateUrl: './clave-dinamica-retirar.component.html',
  styleUrls: ['./clave-dinamica-retirar.component.scss'],
})
export class ClaveDinamicaRetirarComponent implements OnInit {
  @Input() clave;
  formulario
  constructor(
    private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.cargarFormulario();
  }
  cargarFormulario() {
    this.formulario = this.formBuilder.group({
      clave: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ])
    });
  }

}
