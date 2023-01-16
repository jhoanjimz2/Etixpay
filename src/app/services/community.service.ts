import { Injectable } from '@angular/core';

import { ConexionService } from './conexion.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicesCommunity extends ConexionService {

  constructor(private http: HttpClient) {
    super(http);
  }

  getInfoCommunityMain() {
    return this.getCommunityMain('etixpay/community/main');
  }

  getInfoCommunityNetwork() {
    return this.getCommunityNetwork('etixpay/community/network');
  }

  getInfoListMyLevel() {
    return this.getListMyLevel('etixpay/community/my-list-level?punto_recompensaVOLUMEN=0');
  }

  getInfoLisPeriod() {
    return this.getListPeriod('etixpay/community/list-period');
  }

  getInfoListByPeriod(period: number) {
    return this.getListByPeriod('etixpay/community/list-by-period/' + period);
  }

  getInfoHistory() {
    return this.getHistory('etixpay/community/history');
  }

  getInfoNetworkDirect() {
    return this.getNetworkDirectc('etixpay/community/network-directc-hildren');
  }

  getInfoUserCode() {
    return this.getUserCode('cliente/qrs');
  }
  mostrarCashback(wallet, page) {
    return this.consultaGETAUTENTICADA('cliente/cashback/' + wallet + '/listado/pendientes?page=' + page);
  }
  mostrar_cashback_historial(wallet, page, fecha_uno = null, fecha_dos = null) {
    if (!fecha_uno || !fecha_dos) return this.consultaGETAUTENTICADA('cliente/cashback/' + wallet + '/listado/aprobadas?page=' + page);
    return this.consultaGETAUTENTICADA('cliente/cashback/' + wallet + '/listado/aprobadas?page=' + page + '&dateStart=' +fecha_uno+'&dateEnd='+fecha_dos);
  }
  aprobarCashback(wallet, comisionesUUID) {
    let data = { 'comisionesUUID' : comisionesUUID };
    return this.consultaALTERPUTAUTENTICADA('cliente/cashback/' + wallet + '/aprobar', data);
  }

}
