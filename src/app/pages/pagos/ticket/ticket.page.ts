import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.page.html',
  styleUrls: ['./ticket.page.scss'],
})
export class TicketPage {
  informacion: any = {};
  cantidad = 0;
  opcion: number = 1;

  constructor(private route: ActivatedRoute) { 
    this.route.queryParams.subscribe( params => {
      this.informacion = JSON.parse(params.order);
    })
  }
  
  funcion(evento) {
    this.cantidad = evento.cantidad;
    this.opcion = evento.opcion;
  }
  
}
