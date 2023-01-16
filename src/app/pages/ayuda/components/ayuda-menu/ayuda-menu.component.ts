import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ayuda-menu',
  templateUrl: './ayuda-menu.component.html',
  styleUrls: ['./ayuda-menu.component.scss'],
})
export class AyudaMenuComponent {

  constructor(
    private router: Router
  ) { }
  
  abrirAyuda() {
    this.router.navigate(["/pages/ayuda"]);
  }

}
