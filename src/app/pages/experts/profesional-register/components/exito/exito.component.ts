import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-exito',
  templateUrl: './exito.component.html',
  styleUrls: ['./exito.component.scss'],
})
export class ExitoComponent implements OnInit {

  constructor(
    private router: Router,
    private nav: NavController
  ) { }

  ngOnInit() {}

  home() {
    this.router.navigate(["/tabs/home"]);
    this.nav.navigateBack("/tabs/home");
  }

}
