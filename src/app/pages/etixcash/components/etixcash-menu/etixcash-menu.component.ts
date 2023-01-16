import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-etixcash-menu',
  templateUrl: './etixcash-menu.component.html',
  styleUrls: ['./etixcash-menu.component.scss'],
})
export class EtixcashMenuComponent {

  constructor(
    private router: Router
  ) { }

  etixcash() {
    this.router.navigate(["/pages/etixcash"]);
  }

}
