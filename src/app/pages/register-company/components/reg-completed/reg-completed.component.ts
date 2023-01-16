import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg-completed',
  templateUrl: './reg-completed.component.html',
  styleUrls: ['./reg-completed.component.scss'],
})
export class RegCompletedComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {}

  backAccount() {
    this.router.navigate(["tabs/cuenta"]);
  }

}
