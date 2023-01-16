import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConexionService } from './conexion.service';

@Injectable({
  providedIn: 'root'
})
export class EtixwinService extends ConexionService {

  constructor(
    private http: HttpClient
    ) {
    super(http);
  }


  etixwin() {
    return this.consultaGETAUTENTICADAV2('etixpay/rewards/lottery/active');
  }




}
