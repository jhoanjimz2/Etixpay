import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Card } from '../../../paginas-usuarios/cartera/components/botones/recargas/recargas.component';

@Component({
  selector: 'app-form-card',
  templateUrl: './form-card.component.html',
  styleUrls: ['./form-card.component.scss'],
})
export class FormCardComponent {
  @Output() selectForm: EventEmitter<any> = new EventEmitter();
  @Output() recarga: EventEmitter<any> = new EventEmitter();
  @Input() activeForm = [];
  activeSave = false;
  
  card: Card = {
    number: null,
    exp_month: null,
    exp_year: null,
    cvc: null,
    name: null
  };


  formulario: FormGroup = this.form_builder.group({
    number: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    fecha: new FormControl('', [Validators.required,Validators.maxLength(5),Validators.minLength(5)]),
    cvc: new FormControl('', [Validators.required,Validators.maxLength(3),Validators.minLength(3)])
  });

  constructor(
    private form_builder: FormBuilder
  ) { }

  seleccionarForm() {
    this.formulario.reset();
    this.recarga.emit({valid: false});
    this.selectForm.emit(this.activeForm[0]);
  }

  rellenar_card() {
    this.card.number = this.formulario.controls.number.value.replace(/\s/g, '');
    this.card.exp_month = this.formulario.controls.fecha.value.substr(0,2);
    this.card.exp_year = this.formulario.controls.fecha.value.substr(3,4);
    this.card.cvc = this.formulario.controls.cvc.value;
    this.card.name = this.formulario.controls.name.value;
  }
  tarjeta() {
    if (this.formulario.valid) { 
      this.rellenar_card();
      if (this.activeSave) this.recarga.emit({valid: true,card: this.card, save: true}); 
      else this.recarga.emit({valid: true, card: this.card, save: false});
    }
    else this.recarga.emit({valid: false});
  }
  numero_tarjeta() {
    let valor_input = this.formulario.controls.number.value;
    this.formulario.controls['number'].setValue(valor_input.replace(/\s/g, '').replace(/\D/g, '').replace(/([0-9]{4})/g, '$1 ').trim());
  }
  numero_cvc() {
    let valor_input = this.formulario.controls.cvc.value;
    if (valor_input.toString().length) this.formulario.controls['cvc'].setValue(valor_input.replace(/\s/g, '').replace(/\D/g, '').trim());
  }
  fecha_caducidad() {
    let valor_input = this.formulario.controls.fecha.value;
    if (valor_input.toString().length) this.formulario.controls['fecha'].setValue(valor_input.replace(/\s/g, '').replace(/\D/g, '').replace(/( 00|01|02|03|04|05|06|07|08|09|10|11|12|00 {2}?)/g, '$1/').trim());
  }

}
