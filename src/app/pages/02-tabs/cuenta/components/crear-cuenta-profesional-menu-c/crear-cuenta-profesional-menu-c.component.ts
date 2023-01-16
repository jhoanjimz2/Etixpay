import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-cuenta-profesional-menu-c',
  templateUrl: './crear-cuenta-profesional-menu-c.component.html',
  styleUrls: ['./crear-cuenta-profesional-menu-c.component.scss'],
})
export class CrearCuentaProfesionalMenuCComponent implements OnInit {

  constructor(
    private router: Router
    ) { }

  ngOnInit() {}
  
  crearCuentaProfesionales(){
    this.router.navigate(["/pages/select-create-account"]);
  }

}
