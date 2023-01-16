import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-boton-segment',
  templateUrl: './boton-segment.component.html',
  styleUrls: ['./boton-segment.component.scss'],
})
export class BotonSegmentComponent {

  @Input() imagen: string;
  @Input() nombre: string;
  @Output() abrir_modal: EventEmitter<any> = new EventEmitter();


  click_boton() {
    this.abrir_modal.emit();
  }


}
