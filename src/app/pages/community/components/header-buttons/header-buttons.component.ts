import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header-buttons',
  templateUrl: './header-buttons.component.html',
  styleUrls: ['./header-buttons.component.scss'],
})
export class HeaderButtonsComponent implements OnInit {

  @Input ('nroButton') nroButton = 0;
  @Output ('setNroButton') setNroButton: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {}

  go(nroButton: number) {
    this.setNroButton.emit(nroButton);
  }

}
