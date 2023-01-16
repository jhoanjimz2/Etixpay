import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { CargandoService } from 'src/app/services/cargando.service';
import { NegoziService } from 'src/app/services/negozi.service';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-alternativo',
  templateUrl: './alternativo.component.html',
  styleUrls: ['./alternativo.component.scss'],
})
export class AlternativoComponent {
  @Output() actualizarAlternativo: EventEmitter<any> = new EventEmitter();
  @Input() alternativo: string = "";
  @Input() uuid: string;
  @Input() editar: boolean  = false;
  debounce: Subject<string> = new Subject();

  formulario: FormGroup = this.formBuilder.group({
    alternativoTel: new FormControl()
  }); 


  constructor(
    private negoziService: NegoziService,
    private formBuilder: FormBuilder,
    private cargandoService: CargandoService
  ) { 
    this.cargarDebounces();
  }
  llamarTelefonoAlternativo() {
    let url = 'tel:' + this.alternativo;
    window.open(url);
  }


  cargarDebounces() {
    this.debounce.pipe(debounceTime(2000)).subscribe(valor => {
      this.editarAlternativo();
    })
  }
  debounceInput() {
    this.debounce.next();
  }
  editarAlternativo() {
    this.cargandoService.iniciaCargando();
    this.negoziService.cambiarAlternativo(this.uuid, this.formulario.controls.alternativoTel.value).subscribe((data: any) => {
      this.actualizarAlternativo.emit();
    }, error => {
      this.cargandoService.terminaCargando();
    })
  }

}
