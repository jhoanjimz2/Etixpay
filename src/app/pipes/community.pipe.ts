import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'community'
})
export class CommunityPipe implements PipeTransform {
  transform(arreglo: any[], texto: string): any[] {
    if (texto.length == 0) {
      return arreglo;
    }

    return arreglo.filter( arre => {
      if (!arre.nombres) return arre;
      else return arre.nombres.toLowerCase().indexOf(texto.toLowerCase()) > -1;
    });
  }

}
