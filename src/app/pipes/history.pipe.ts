import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'history'
})
export class HistoryPipe implements PipeTransform {

  transform(arreglo: any[], mes: string): any[] {
    arreglo.sort( function(a, b) {
      if (a.period.punto_recompensa_periodoFECHAINICIO < b.period.punto_recompensa_periodoFECHAINICIO) return -1;
      if (a.period.punto_recompensa_periodoFECHAINICIO > b.period.punto_recompensa_periodoFECHAINICIO) return 1;
    });
    if (mes.length === 0) {
      return arreglo;
    }
    return arreglo.filter( arre => {
      return moment(arre.period.punto_recompensa_periodoFECHAINICIO).format('MM').indexOf(mes) > -1;
    });
  }

}
