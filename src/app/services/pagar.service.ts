import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';

import { ConexionService } from './conexion.service';

@Injectable({
  providedIn: 'root'
})
export class PagarService  extends ConexionService {
  url: string = this.url;
  constructor(
    private http: HttpClient
    ) {
    super(http);
  }
  qrwalletpersona() {
    return this.consultaGETAUTENTICADA('apps/cliente/dashboard');
  }
  qrwalletempresa() {
    return this.consultaGETAUTENTICADA('empresas/dashboard');
  }
  cargar_categorias_vouchers() {
    return this.consultaGETAUTENTICADAV2('vouchers/list-type-voucher');
  }
  aprovar_pay(wallet, uuid, password) {
    let data; 
    if (password) data  = { password };
    return this.consultaPUTAUTENTICADA2('cliente/recibe/' + wallet + '/aprobar/' + uuid, data);
  }
  ver_pay(wallet, uuid) {
    return this.consultaGETAUTENTICADA('cliente/pay/' + wallet + '/show/' + uuid);
  }
  anular_pay(wallet, uuid) {
    return this.consultaPUTAUTENTICADASINDATA('cliente/pay/' + wallet + '/anular/' + uuid);
  }
  consultaWalletQR(uuid) {
    return this.consultaGETAUTENTICADAV2('etixpay/companies/qr/' + uuid);
  }
  pagar(paymentMethod, walletFrom, cantidadATM, emailCompany) {
    let data = { paymentMethod, walletFrom, cantidadATM, emailCompany };
    return this.consultaPOSTAUTENTICADAV2('etixpay/companies/payments', data);
  }

}
