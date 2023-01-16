import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-header-tabs',
  templateUrl: './header-tabs.component.html',
  styleUrls: ['./header-tabs.component.scss'],
})
export class HeaderTabsComponent {
  constructor(
    private router: Router,
    private nav: NavController
  ) { }

  menu() {
    this.nav.navigateBack("/tabs/cuenta");
    this.router.navigate(["/tabs/cuenta"])
  }
  home() {
    this.nav.navigateBack("/tabs/home");
    this.router.navigate(["/tabs/home"])
  }
  etixwin() {
    this.nav.navigateBack("/pages/etix-win");
    this.router.navigate(["/pages/etix-win"])
  }



}
