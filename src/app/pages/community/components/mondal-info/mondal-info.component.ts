import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-mondal-info',
  templateUrl: './mondal-info.component.html',
  styleUrls: ['./mondal-info.component.scss'],
})
export class MondalInfoComponent implements OnInit {

  @Input('typeModalInfo') typeModalInfo = '';
  @Output ('setModalInfo') setModalInfo: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output ('setTypeModalInfo') setTypeModalInfo: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {}

  hideModal() {
    this.setModalInfo.emit(false);
  }

}
