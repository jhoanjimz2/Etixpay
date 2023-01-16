export class ticket_edit {
    ticket_evento = {
        id: null,
        evento_ticket_detallePRECIO: null,
        evento_ticket_detalleNOTA: null,
        evento_ticket_detalleCANTIDADTICKETDISPONIBLE: null,
        evento_ticket_detalleCANTIDADPUNTORECOMPENSA: 0
    }
    set_editar(id, precio, nota, cantidad_disponible) {
        this.ticket_evento.id = id;
        this.ticket_evento.evento_ticket_detallePRECIO = precio;
        this.ticket_evento.evento_ticket_detalleNOTA = nota;
        this.ticket_evento.evento_ticket_detalleCANTIDADTICKETDISPONIBLE = cantidad_disponible;
        return this.ticket_evento;
    }
    get() {
        return this.ticket_evento;
    }
}