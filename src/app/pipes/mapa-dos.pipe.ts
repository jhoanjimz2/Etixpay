import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapaDos'
})
export class MapaDosPipe implements PipeTransform {

  transform(objetos: any[], palabra_busqueda): any[] {
    
    if (!palabra_busqueda) return objetos;

    return objetos.filter( objeto => {
      return objeto.nombre.toString().toLowerCase().indexOf(palabra_busqueda.toLowerCase()) > -1;
    });
  }

}
