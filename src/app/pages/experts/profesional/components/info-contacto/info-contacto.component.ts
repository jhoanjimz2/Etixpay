import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CargandoService } from '../../../../../services/cargando.service';
import { Profesional } from '../../interface/experts.model';

@Component({
  selector: 'app-info-contacto',
  templateUrl: './info-contacto.component.html',
  styleUrls: ['./info-contacto.component.scss'],
})
export class InfoContactoComponent {
  @Input() profesional: Profesional = new Profesional();
  localEmail = JSON.parse(localStorage.getItem('user')).username;

  openEmail() {
    if (this.localEmail == this.profesional) return;
    open('mailto:'+this.profesional, "_system");
  }

}
