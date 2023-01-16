import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pais'
})
export class PaisPipe implements PipeTransform {

  transform(arreglo: any[], texto: string): any[] {
    if (texto) {
      if (texto.length === 0) {
        return arreglo;
      }
    }

    let pais = arreglo.filter( pais => pais.id == texto);
    if (pais.length) {return pais[0].paisNOMBRE;}
    else {return null;}
  }

}
