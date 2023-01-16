import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Card } from '../recargas.component';

@Component({
  selector: 'app-formulario-tarjeta',
  templateUrl: './formulario-tarjeta.component.html',
  styleUrls: ['./formulario-tarjeta.component.scss'],
})
export class FormularioTarjetaComponent {
  @Output() elimina: EventEmitter<any> = new EventEmitter();
  @Output() recarga: EventEmitter<any> = new EventEmitter();
  @Input() cantidad: number = 0;
  @Input() reset_form: boolean;
  form_card: FormGroup = this.form_builder.group({
    number: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    fecha_exp: new FormControl('', [Validators.required,Validators.maxLength(5),Validators.minLength(5)]),
    cvc: new FormControl('', [Validators.required,Validators.maxLength(3),Validators.minLength(3)]),
    check: new FormControl(false, [])
  });
  card: Card = {
    number: null,
    exp_month: null,
    exp_year: null,
    cvc: null,
    name: null
  };

  constructor(
    private form_builder: FormBuilder
  ) { }
  ngOnChanges() {
    this.form_card.reset();
  }
  numero_tarjeta() {
    let valor_input = this.form_card.controls.number.value;
    this.form_card.controls['number'].setValue(valor_input.replace(/\s/g, '').replace(/\D/g, '').replace(/([0-9]{4})/g, '$1 ').trim());
  }
  numero_cvc() {
    let valor_input = this.form_card.controls.cvc.value;
    if (valor_input.toString().length) this.form_card.controls['cvc'].setValue(valor_input.replace(/\s/g, '').replace(/\D/g, '').trim());
  }
  fecha_caducidad() {
    let valor_input = this.form_card.controls.fecha_exp.value;
    if (valor_input.toString().length) this.form_card.controls['fecha_exp'].setValue(valor_input.replace(/\s/g, '').replace(/\D/g, '').replace(/( 00|01|02|03|04|05|06|07|08|09|10|11|12|00 {2}?)/g, '$1/').trim());
  }
  eliminar_seleccion() {
    this.elimina.emit();
  }
  recargar() {
    if (this.form_card.valid) { 
      this.rellenar_card();
      if (this.form_card.controls.check.value) this.recarga.emit({valid: true,card: this.card, save: true}); 
      else this.recarga.emit({valid: true, card: this.card, save: false});
    }
    else this.recarga.emit({valid: false});
  }
  rellenar_card() {
    this.card.number = this.form_card.controls.number.value.replace(/\s/g, '');
    this.card.exp_month = this.form_card.controls.fecha_exp.value.substr(0,2),
    this.card.exp_year = this.form_card.controls.fecha_exp.value.substr(3,4),
    this.card.cvc = this.form_card.controls.cvc.value;
    this.card.name = this.form_card.controls.name.value;
  }


}
