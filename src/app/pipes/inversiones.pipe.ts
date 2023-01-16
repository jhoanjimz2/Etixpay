import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inversiones'
})
export class InversionesPipe implements PipeTransform {

  transform(inversiones: any[], variable, filtro): any[] {
    if (filtro == '1') {
      inversiones.sort( function(a, b) {
        if (a.proyectoNOMBRE > b.proyectoNOMBRE) return -1;
        if (a.proyectoNOMBRE < b.proyectoNOMBRE) return 1;
      });
    }
    if (filtro == '2') {
      inversiones.sort( function(a, b) {
        if (a.proyectoNOMBRE < b.proyectoNOMBRE) return -1;
        if (a.proyectoNOMBRE > b.proyectoNOMBRE) return 1;
      });
    }
    if (filtro == '3') {
      inversiones.sort( function(a, b) {
        if (a.kilometros_de_distancia > b.kilometros_de_distancia) return -1;
        if (a.kilometros_de_distancia < b.kilometros_de_distancia) return 1;
      });
    }
    if (filtro == '5') {
      inversiones.sort( function(a, b) {
        if (a.proyectoPRECIO > b.proyectoPRECIO) return -1;
        if (a.proyectoPRECIO < b.proyectoPRECIO) return 1;
      });
    }
    if (filtro == '6') {
      inversiones.sort( function(a, b) {
        if (a.proyectoPRECIO < b.proyectoPRECIO) return -1;
        if (a.proyectoPRECIO > b.proyectoPRECIO) return 1;
      });
    }
    return inversiones.filter( inversion => {
      return inversion.proyectoNOMBRE.toString().indexOf(variable) > -1;
    });
  }

}
