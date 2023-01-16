import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { ConexionService } from './conexion.service';

@Injectable({
  providedIn: 'root'
})
export class PaginasAuthService extends ConexionService {
  url: string = this.url;


  constructor(
    private http: HttpClient
    ) {
    super(http);
  }
  login(email: string, password: string) {
    let data = {'email': email,'password': password};
    return this.consultaPOST('apps/login', data);
  }
  registro(email, password, c_password, paisDOMICILIO, personaTELEFONO, usuarioAFILIADO?) {
    let data = {  
        'username': email, 
        email, 
        password, 
        c_password,
        'usuarioLENGUAJE' : localStorage.getItem('lenguaje'),
        paisDOMICILIO, 
        personaTELEFONO, 
        usuarioAFILIADO
      };
    return this.consultaPOSTV2('etixpay/users/create-fast-register', data);
  }
  logout() {
    return this.consultaGETAUTENTICADA('logout');
  }
  codigoPromocionalPersona() {
    return this.consultaGETAUTENTICADA('cliente/perfil');
  }
  codigoPromocionalEmpresa() {
    return this.consultaGETAUTENTICADA('empresas/perfil');
  }
  codigoPromocionalColaborador() {
    return this.consultaGETAUTENTICADA('empresas/colaboradores/perfil');
  }
  Home() {
    return this.consultaGETAUTENTICADA('apps/cliente/dashboard');
  }
  HomeEMPRESAS() {
    return this.consultaGETAUTENTICADA('empresas/dashboard');
  }
  HomeCOLABORADORES() {
    return this.consultaGETAUTENTICADA('empresas/colaboradores/dashboard');
  }
  solicitudResetPassword(email: string) {
    let data = { 'email': email };
    return this.consultaPOST('apps/password/solicitud/reset', data);
  }
  validarSolicitudResetPassword(codigo: string) {
    return this.consultaGET('apps/password/solicitud/' + codigo);
  }
  resetPassword(email: string, password: string, codigo: number) {
    let data = { 'email': email, 'password': password, 'token': codigo };
    return this.consultaPOST('apps/password/reset', data);
  }
  paises() {
    return this.consultaGET('paises/habilitados');
  }
  verificarCodigo(codigo) {
    return this.consultaPUTSINDATA('cliente/seguridad/telefono/activar/'+ codigo);
  }
  reenviarCodigoTelefono (email, usuarioTELEFONO) {
    let data = { 'email': email,'usuarioTELEFONO':usuarioTELEFONO };
    return this.consultaPOST('cliente/seguridad/telefono/re-enviar', data);
  }
  registrarNuevoTelefono(usuarioTELEFONO) {
    let data = { 'usuarioTELEFONO':usuarioTELEFONO };
    return this.consultaPOSTAUTENTICADA2('cliente/seguridad/telefono/registrar', data);
  }
}
