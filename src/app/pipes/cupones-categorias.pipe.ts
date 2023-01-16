import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cuponesCategorias'
})
export class CuponesCategoriasPipe implements PipeTransform {

  transform(cupones: any[], texto: string): any[] {
    if (texto.length === 0) {
      return cupones;
    }
    return cupones.filter( cupon => {
      console.log(cupon.vouchers.voucher_tipoID)
      return (cupon.vouchers.voucher_tipoID.indexOf(texto.toLowerCase()) > -1)
    });
  }

}
