import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';

import { ConexionService } from './conexion.service';

@Injectable({
  providedIn: 'root'
})
export class MapaService   extends ConexionService {
  constructor(private http: HttpClient
    ) {
    super(http);
  }
  cargarCategorias() {
    return this.consultaGET('empresas/categorias');
  }
  companiesLocalize(lat, lon, rad, categories, types) {
    let data = { lat, lon, rad, categories, types }
    return this.consultaPOSTAUTENTICADAV2FORM1('etixpay/companies/maps/types/localize', data);
  }
  cargarTiendaIndividual(uuid) {
    return this.consultaGETAUTENTICADA('empresas/show/'+ uuid);
  }
  soyPropietario(uuid, empresa_sugerenciaNOMBREPROPIETARIO, empresa_sugerenciaTELEFONOPROPIETARIO) {
    let data = { empresa_sugerenciaNOMBREPROPIETARIO, empresa_sugerenciaTELEFONOPROPIETARIO };
    return this.consultaPOSTAUTENTICADAV2('etixpay/companies/add-owner/'+uuid, data);
  }
  votarTiendaSugerida(uuid) {
    return this.consultaPOSTAUTENTICADAV2SINDATA('etixpay/companies/add-vote/'+uuid);
  }
  crearSugerencia(
    empresa_sugerenciaNOMBRE, categoria_empresaID, empresa_sugerenciaEMAIL, empresa_sugerenciaCONTACTO,
    empresa_sugerenciaDIRECCION, empresa_sugerenciaDESCRIPCION, empresa_sugerenciaLATITUD, empresa_sugerenciaLONGITUD, empresa_sugerenciaFOTO) {
    let data = { 
      empresa_sugerenciaNOMBRE, categoria_empresaID, empresa_sugerenciaEMAIL, empresa_sugerenciaCONTACTO,
      empresa_sugerenciaDIRECCION, empresa_sugerenciaDESCRIPCION, empresa_sugerenciaLATITUD, empresa_sugerenciaLONGITUD, empresa_sugerenciaFOTO
    };
    return this.consultaPOSTAUTENTICADAV2_form_data_1('etixpay/companies/create-suggestion-company', data);
  }
}
