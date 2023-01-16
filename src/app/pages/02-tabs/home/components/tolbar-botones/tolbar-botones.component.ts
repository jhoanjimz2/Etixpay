import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tolbar-botones',
  templateUrl: './tolbar-botones.component.html',
  styleUrls: ['./tolbar-botones.component.scss'],
})
export class TolbarBotonesComponent {
  constructor(
    private router: Router,
    private nav: NavController
  ) { }

  ecommerce() {
    this.nav.navigateBack("/pages/ecommerce");
    this.router.navigate(["/pages/ecommerce"]);
  } 
  stores() {
    this.nav.navigateBack("/pages/negozi/stores");
    this.router.navigate(["/pages/negozi/stores"]);
  }
  expertos() {
    this.nav.navigateBack("/pages/experts/profesionals");
    this.router.navigate(["/pages/experts/profesionals"]);
  }
  etixmall() {
    window.open(environment.urlEtixmall);
  }
}
