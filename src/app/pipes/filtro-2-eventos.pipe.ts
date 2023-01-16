import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro2Eventos'
})
export class Filtro2EventosPipe implements PipeTransform {
  transform(vouchers: any[], texto: string): any[] {
    if (texto.length === 0) {
      return vouchers;
    }
    
    //A-Z
    if (texto === "A_Z" ) {
      return vouchers.sort( function(a, b) {
        if (a.ticketEVENTO.eventoTITULO > b.ticketEVENTO.eventoTITULO) return 1;
        if (a.ticketEVENTO.eventoTITULO < b.ticketEVENTO.eventoTITULO) return -1;
      });
    }
    //Z-A
    if (texto === "Z_A" ) {
      return vouchers.sort( function(a, b) {
        if (a.ticketEVENTO.eventoTITULO < b.ticketEVENTO.eventoTITULO) return 1;
        if (a.ticketEVENTO.eventoTITULO > b.ticketEVENTO.eventoTITULO) return -1;
      });
    }
    //MAYOR A MENOR
    if (texto === "MAYOR_A_MENOR" ) {
      return vouchers.sort( function(a, b) {
        if (parseFloat(a.ticketVOUCHER.voucherPRECIO) > parseFloat(b.ticketVOUCHER.voucherPRECIO)) return -1;
        if (parseFloat(a.ticketVOUCHER.voucherPRECIO) < parseFloat(b.ticketVOUCHER.voucherPRECIO)) return 1;
      });
    }
    //MENOR A MAYOR
    if (texto === "MENOR_A_MAYOR" ) {
      return vouchers.sort( function(a, b) {
        if (parseFloat(a.ticketVOUCHER.voucherPRECIO) < parseFloat(b.ticketVOUCHER.voucherPRECIO)) return -1;
        if (parseFloat(a.ticketVOUCHER.voucherPRECIO) > parseFloat(b.ticketVOUCHER.voucherPRECIO)) return 1;
      });
    }

    return vouchers.filter( voucher => {
      return voucher.ticketEVENTO.eventoTITULO.toLowerCase().indexOf(texto.toLowerCase()) > -1;
    });
  }

}
