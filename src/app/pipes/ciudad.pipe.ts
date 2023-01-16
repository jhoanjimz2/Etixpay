import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ciudad'
})
export class CiudadPipe implements PipeTransform {

  transform(arreglo: any[], texto: string): any[] {
    if (texto) {
      if (texto.length === 0) {
        return arreglo;
      }
    }
    let ciudad = arreglo.filter( ciudad => ciudad.id == texto);
    if (ciudad.length) {return ciudad[0].ciudadNOMBRE;}
    else {return null;}
  }

}
