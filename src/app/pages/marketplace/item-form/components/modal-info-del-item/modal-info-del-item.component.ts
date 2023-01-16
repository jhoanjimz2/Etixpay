import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-info-del-item',
  templateUrl: './modal-info-del-item.component.html',
  styleUrls: ['./modal-info-del-item.component.scss'],
})
export class ModalInfoDelItemComponent implements OnInit {

  @Input ('modalDelete') stepNumber = false;
  @Output('setModalDelete') setModalDelete: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor() { }

  ngOnInit() {}

  hideModalTrue() {
    this.setModalDelete.emit(true);
  }

  hideModal() {
    this.setModalDelete.emit(false);
  }

}
