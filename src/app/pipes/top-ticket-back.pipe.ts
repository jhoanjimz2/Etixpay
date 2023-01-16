import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'topTicketBack'
})
export class TopTicketBackPipe implements PipeTransform {
  transform(arreglo: any[], texto: string): any[] {

    if ( texto === "") {
      return arreglo;
    }
    if (texto === "CASHBACKEMPRESASHOME" ) {
      if (arreglo === undefined) {
        return arreglo;
      }
      return arreglo.sort( function(a, b) {
        if (a.empresa.cashbackCLIENTE > b.empresa.cashbackCLIENTE) {
          return -1;
        }
        if (a.empresa.cashbackCLIENTE < b.empresa.cashbackCLIENTE) {
          return 1;
        }
      });
    }
    return arreglo.filter( arre => {
      return arre.empresa.empresaNOMBREMAP.includes(texto);
    });

  }
}
