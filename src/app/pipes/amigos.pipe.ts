import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amigos'
})
export class AmigosPipe implements PipeTransform {
  transform(arreglo: any[], texto: string): any[] {
    if (texto.length === 0) {
      return arreglo;
    }

    return arreglo.filter( arre => {
      return arre.nombre.toLowerCase().indexOf(texto.toLowerCase()) > -1;
    });
  }

}
