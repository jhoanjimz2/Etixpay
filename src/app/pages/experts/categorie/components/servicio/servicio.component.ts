import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.scss'],
})
export class ServicioComponent {
  @Input() servicio: any = {}

  constructor( private router: Router ) { }

  serviceUno() {
    this.router.navigate(["/pages/experts/service"], { queryParams: { id: this.servicio.id,  name: this.servicio.service_name }});
  }

}
