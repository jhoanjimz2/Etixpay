import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listaDeAmigos'
})
export class ListaDeAmigosPipe implements PipeTransform {
  transform(arreglo: any[], texto: string): any[] {
    if (texto.length === 0) {
      return arreglo;
    }

    return arreglo.filter( arre => {
      return (arre.email.toLowerCase().indexOf(texto.toLowerCase()) > -1)
    });
  }

}
