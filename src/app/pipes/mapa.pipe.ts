import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapa'
})
export class MapaPipe implements PipeTransform {

  transform(objetos: any[], variable): any[] {
    
    if (!variable) return objetos;

    return objetos.filter( objeto => {
      return objeto.tipo.toString().indexOf(variable) > -1;
    });
  }

}
