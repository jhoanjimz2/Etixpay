import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NegoziService } from '../../../../../services/negozi.service';
import { CargandoService } from '../../../../../services/cargando.service';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
})
export class DescriptionComponent{
  @Output() actualizarDescripcion: EventEmitter<any> = new EventEmitter();
  @Input() descripcion: string;
  @Input() uuid: string;
  @Input() editar: boolean  = false;
  debounce: Subject<string> = new Subject();



  formulario: FormGroup = this.formBuilder.group({
    descripcion: new FormControl()
  });

  constructor(
    private negoziService: NegoziService,
    private formBuilder: FormBuilder,
    private cargandoService: CargandoService
  ) { 
    this.cargarDebounces();
  }


  cargarDebounces() {
    this.debounce.pipe(debounceTime(2000)).subscribe(valor => {
      this.cambiarDescripcion();
    })
  }
  debounceInput() {
    this.debounce.next();
  }

  cambiarDescripcion() {
    this.cargandoService.iniciaCargando();
    this.negoziService.cambiarDescripcionTienda(this.uuid, this.formulario.controls.descripcion.value).subscribe((data: any) => {
      this.actualizarDescripcion.emit();
    }, error => {
      this.cargandoService.terminaCargando();
    });
  }

}
