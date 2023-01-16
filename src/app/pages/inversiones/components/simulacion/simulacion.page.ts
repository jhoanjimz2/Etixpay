import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-simulacion',
  templateUrl: './simulacion.page.html',
  styleUrls: ['./simulacion.page.scss'],
})
export class SimulacionPage {
  proyecto;
  formulario;

  constructor(
    private form_builder: FormBuilder,
    private router: Router,
    public route: ActivatedRoute
    ) { 
      this.route.queryParams.subscribe( params => {
        this.proyecto = JSON.parse(params.order); 
      })
    this.cargar_formulario();
  }
  cargar_formulario() {
    this.formulario = this.form_builder.group({
      cantidad: new FormControl('', [
        Validators.required
      ])
    });
  }
  get beneficio_mensual () {
    return ((this.formulario.controls.cantidad.value  * this.proyecto.fase_actual.proyectoBONOS) / 100);
  }
  get beneficio_total () {
    return (this.beneficio_mensual * this.proyecto.fase_actual.proyectoPERIODOS);
  }
  get beneficio () {
    return (this.beneficio_mensual  * this.proyecto.fase_actual.proyectoPERIODOS);
  }
  get total() {
    return this.beneficio_mensual * this.proyecto.fase_actual.proyectoPERIODOS + parseInt(this.formulario.controls.cantidad.value) ;
  }
  salir_con_argumentos() {
    this.router.navigate(['/pages/invest/buy-invest'], { queryParams: { order: JSON.stringify(this.proyecto) } });
  }


}
