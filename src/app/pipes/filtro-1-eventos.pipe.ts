import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro1Eventos'
})
export class Filtro1EventosPipe implements PipeTransform {
  transform(eventos: any[], texto: string): any[] {
    if (texto.length === 0) {
      return eventos;
    }

    //A-Z
    if (texto === "A_Z" ) {
      return eventos.sort( function(a, b) {
        if (a.eventoTITULO > b.eventoTITULO) return 1;
        if (a.eventoTITULO < b.eventoTITULO) return -1;
      });
    }
    //Z-A
    if (texto === "Z_A" ) {
      return eventos.sort( function(a, b) {
        if (a.eventoTITULO < b.eventoTITULO) return 1;
        if (a.eventoTITULO > b.eventoTITULO) return -1;
      });
    }
    //MAYOR A MENOR
    if (texto === "MAYOR_A_MENOR" ) {
      return eventos.sort( function(a, b) {
        let codigo_a, codigo_b;
        codigo_a = a.events_tickets_details.find(tipo => tipo.event_ticket_category.evento_ticket_categoriaCODIGO == 'standard');
        codigo_b = b.events_tickets_details.find(tipo => tipo.event_ticket_category.evento_ticket_categoriaCODIGO == 'standard');
        if (parseFloat(codigo_a.evento_ticket_detallePRECIO) > parseFloat(codigo_b.evento_ticket_detallePRECIO)) return -1;
        if (parseFloat(codigo_a.evento_ticket_detallePRECIO) < parseFloat(codigo_b.evento_ticket_detallePRECIO)) return 1;
      });
    }
    //MENOR A MAYOR
    if (texto === "MENOR_A_MAYOR" ) {
      return eventos.sort( function(a, b) {
        let codigo_a, codigo_b;
        codigo_a = a.events_tickets_details.find(tipo => tipo.event_ticket_category.evento_ticket_categoriaCODIGO == 'standard');
        codigo_b = b.events_tickets_details.find(tipo => tipo.event_ticket_category.evento_ticket_categoriaCODIGO == 'standard');
        if (parseFloat(codigo_a.evento_ticket_detallePRECIO) < parseFloat(codigo_b.evento_ticket_detallePRECIO)) return -1;
        if (parseFloat(codigo_a.evento_ticket_detallePRECIO) > parseFloat(codigo_b.evento_ticket_detallePRECIO)) return 1;
      });
    }

    return eventos.filter( evento => {
      return evento.eventoTITULO.toLowerCase().indexOf(texto.toLowerCase()) > -1;
    });
  }

}
