import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-reg-company',
  templateUrl: './header-reg-company.component.html',
  styleUrls: ['./header-reg-company.component.scss'],
})
export class HeaderRegCompanyComponent implements OnInit {

  @Input ('title') title = '';
  @Input ('stepNumber') stepNumber = 0;
  @Output('backStepNumber') backStepNumber: EventEmitter<number> = new EventEmitter<number>();
 
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  back() {
    if (this.stepNumber === 1) {
      this.router.navigate(["tabs/cuenta"]);
    } else {
      let step = this.stepNumber - 1;
      if (step <= 0) {
        step = 1
      }
      this.backStepNumber.emit(step);
    }
  }

}
