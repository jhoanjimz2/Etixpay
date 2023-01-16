import { Injectable } from '@angular/core';
import { ConexionService } from './conexion.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EcommerceService  extends ConexionService {

  constructor(private http: HttpClient
    ) {
    super(http);
  }

  categories() {
    let parametros = { language: localStorage.getItem('lenguaje').toString().toUpperCase() }
    return this.consultaGETAUTENTICADAV2('etixpay/shopping-online/category', parametros)
  }
  inEvidenza() {
    return this.consultaGETAUTENTICADAV2('etixpay/shopping-online/list-banners')
  }
  search(text) {
    let parametros = { text, paginate: 1 }
    return this.consultaGETAUTENTICADAV2('etixpay/shopping-online/find', parametros)
  }
  topPr(page) {
    let parametros = { category: 'ALL', sortByPR: true, page }
    return this.consultaGETAUTENTICADAV2('etixpay/shopping-online/index', parametros);
  }
  byCategory(category) {
    let parametros = { category, sortByPR: true, page: 1 }
    return this.consultaGETAUTENTICADAV2('etixpay/shopping-online/index', parametros)
  }

}
