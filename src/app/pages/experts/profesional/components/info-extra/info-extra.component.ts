import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Profesional } from '../../interface/experts.model';

@Component({
  selector: 'app-info-extra',
  templateUrl: './info-extra.component.html',
  styleUrls: ['./info-extra.component.scss'],
})
export class InfoExtraComponent {
  @Input() profesional: Profesional = new Profesional();

}
