import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tiendas'
})
export class TiendasPipe implements PipeTransform {
  transform(tiendas: any[], texto, filtro, tiendas_tipo = null): any[] {


    
    if (tiendas_tipo) {
      if (filtro == '1') {
        tiendas.sort( function(a, b) {
          if (a.empresaNOMBREMAP < b.empresaNOMBREMAP) return -1;
          if (a.empresaNOMBREMAP > b.empresaNOMBREMAP) return 1;
        });
      }
      if (filtro == '2') {
        tiendas.sort( function(a, b) {
          if (a.empresaNOMBREMAP > b.empresaNOMBREMAP) return -1;
          if (a.empresaNOMBREMAP < b.empresaNOMBREMAP) return 1;
        });
      }
      if (filtro == '3') {
        tiendas.sort( function(a, b) {
          if (a.kilometros_de_distancia > b.kilometros_de_distancia) return -1;
          if (a.kilometros_de_distancia < b.kilometros_de_distancia) return 1;
        });
      }
      return tiendas.filter( tienda => {
        if (tienda.empresaNOMBREMAP) return (tienda.empresaNOMBREMAP.toLowerCase().indexOf(texto.toLowerCase()) > -1)
        else return tienda
      });
    }





    if (!tiendas_tipo) {
      if (filtro == '1') {
        tiendas.sort( function(a, b) {
          if (a.empresa.empresaNOMBREMAP < b.empresa.empresaNOMBREMAP) return -1;
          if (a.empresa.empresaNOMBREMAP > b.empresa.empresaNOMBREMAP) return 1;
        });
      }
      if (filtro == '2') {
        tiendas.sort( function(a, b) {
          if (a.empresa.empresaNOMBREMAP > b.empresa.empresaNOMBREMAP) return -1;
          if (a.empresa.empresaNOMBREMAP < b.empresa.empresaNOMBREMAP) return 1;
        });
      }
      if (filtro == '3') {
        tiendas.sort( function(a, b) {
          if (a.empresa.KM < b.empresa.KM) return -1;
          if (a.empresa.KM > b.empresa.KM) return 1;
        });
      }
      return tiendas.filter( tienda => {
        if (tienda.empresa.empresaNOMBREMAP) return (tienda.empresa.empresaNOMBREMAP.toLowerCase().indexOf(texto.toLowerCase()) > -1)
        else return tienda
      });
    }
  }

}
