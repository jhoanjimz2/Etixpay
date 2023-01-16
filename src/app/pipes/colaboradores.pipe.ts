import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colaboradores'
})
export class ColaboradoresPipe implements PipeTransform {
  transform(arreglo: any[], texto: string): any[] {
    if (texto.length === 0) {
      return arreglo;
    }

    return arreglo.filter( arre => {
      return arre.cliente.persona.personaNOMBRES.toLowerCase().indexOf(texto.toLowerCase()) > -1;
    });
  }
}
