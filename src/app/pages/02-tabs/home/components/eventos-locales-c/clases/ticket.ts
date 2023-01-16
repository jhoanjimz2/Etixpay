export class ticket {
  ticket_evento = {
    evento_ticket_detalleCODIGO: null,
    evento_ticket_detallePRECIO: null,
    evento_ticket_detalleNOTA: null,
    evento_ticket_detalleCANTIDADTICKETDISPONIBLE: null,
    evento_ticket_detalleCANTIDADPUNTORECOMPENSA: 0
  }

  set(codigo, precio, nota, cantidad_disponible) {
    this.ticket_evento.evento_ticket_detalleCODIGO = codigo;
    if (precio) this.ticket_evento.evento_ticket_detallePRECIO = precio;
    else this.ticket_evento.evento_ticket_detallePRECIO = 0;
    if (nota) this.ticket_evento.evento_ticket_detalleNOTA = nota;
    else this.ticket_evento.evento_ticket_detalleNOTA = null;
    if (cantidad_disponible) this.ticket_evento.evento_ticket_detalleCANTIDADTICKETDISPONIBLE = cantidad_disponible;
    else  this.ticket_evento.evento_ticket_detalleCANTIDADTICKETDISPONIBLE = 0;
    return this.ticket_evento;
  }
  get() {
    return this.ticket_evento;
  }
}