import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'experts'
})
export class ExpertsPipe implements PipeTransform {

  transform(arreglo: any[], texto, tipo): any {
    
    if (tipo == 'servicio') {
      return arreglo.filter( arre => {
        if (arre.service_name) return arre.service_name.toLowerCase().indexOf(texto.toLowerCase()) > -1;
      });
    } if (tipo == 'profesional') {
      return arreglo.filter( arre => {
        if (arre.profesionalNAMEMAP) return arre.profesionalNAMEMAP.toLowerCase().indexOf(texto.toLowerCase()) > -1;
      });
    } if (tipo == 'categorias') {
      return arreglo.filter( arre => {
        if (arre.profession_name) return arre.profession_name.toLowerCase().indexOf(texto.toLowerCase()) > -1;
      });
    } else {
      return arreglo
    }
  }

}
