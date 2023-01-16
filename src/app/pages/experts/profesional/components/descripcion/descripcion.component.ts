import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime } from 'rxjs/operators';
import { Profesional } from '../../interface/experts.model';

@Component({
  selector: 'app-descripcion',
  templateUrl: './descripcion.component.html',
  styleUrls: ['./descripcion.component.scss'],
})
export class DescripcionComponent {
  @Input() profesional: Profesional = new Profesional();


}
