import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card-authorization',
  templateUrl: './card-authorization.component.html',
  styleUrls: ['./card-authorization.component.scss'],
})
export class CardAuthorizationComponent implements OnInit {

  @Input ('stepNumber') stepNumber = 0;
  @Input ('fromSummary') fromSummary = false;
  @Input('category') category = [];
  @Output('nextStepNumber') nextStepNumber: EventEmitter<number> = new EventEmitter<number>();
  @Output('setModalAuthorization') setModalAuthorization: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {}

  continue() {
    let stepNumber = this.stepNumber + 1;
    if (stepNumber > 5) {
      stepNumber = 5;
    }
    this.nextStepNumber.emit(stepNumber);
  }

  authorize(res: boolean) {
    if (this.fromSummary) {
      this.nextStepNumber.emit(5);
    } else {
      if (res) {
        this.continue();
      } else {
        this.nextStepNumber.emit(1);
      }
    }
    this.setModalAuthorization.emit(false);
  }

}
