import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-info-dev',
  templateUrl: './modal-info-dev.component.html',
  styleUrls: ['./modal-info-dev.component.scss'],
})
export class ModalInfoDevComponent implements OnInit {

  @Input('typeModalInfoDev') typeModalInfo = '';
  @Output ('setModalInfoDev') setModalInfoDev: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {}

  hideModal() {
    this.setModalInfoDev.emit(false);
  }

}
