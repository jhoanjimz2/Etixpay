import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConexionService } from './conexion.service';

@Injectable({
  providedIn: 'root'
})
export class CuentaService extends ConexionService {

  constructor(
    private http: HttpClient
    ) { super(http); }

  datosPersona() {
    return this.consultaGETAUTENTICADA('cliente/perfil');
  }
  datosEmpresa() {
    return this.consultaGETAUTENTICADA('empresas/perfil');
  }
  datosColaborador() {
    return this.consultaGETAUTENTICADA('empresas/colaboradores/perfil');
  }
  logout() {
    return this.consultaGETAUTENTICADA('logout');
  }
  consultarEventos() {
    return this.consultaGETV2('events');
  }

  //PROFESIONALES
  cargar_mis_perfiles_profesionales() {
    return this.consultaGETAUTENTICADAV2('profesionals/apps/main/professional/myprofiles');
  }
  consultar_categorias() {
    return this.consultaGETV2('profesionals/apps/activities');
  }
  consultar_profesiones() {
    return this.consultaGETAUTENTICADAV2('profesionals/apps/professions/');
  }
  consultar_especializaciones_por_categorias(categoria) {
    return this.consultaGETV2('profesionals/apps/activity/' + categoria + '/specialties');
  }
  consultar_especializaciones() {
    return this.consultaGETV2('profesionals/apps/specialties');
  }
  crear_cuenta_profesional(profession_id, display_name, address, note, reward, suggested, latitude, longitude, range, isOnline, tags_name, specialties_id, category_id) {
    let data = {
      profession_id,  display_name,  address,  note,  reward,
      suggested,  latitude,  longitude,    range,
      isOnline,  tags_name,  specialties_id, category_id
    };
    return this.consultaPOSTAUTENTICADAV2_form_data_1('profesionals/apps/main/create', data);
  }
  crear_pre_registro_empresas(
    empresaNOMBRE, empresaCATEGORIA, empresaFOTO, empresaDESCRIPCION,
    empresaFOTOPRINCIPALCUADRADA, empresaFOTOPRINCIPALRECTANGULAR, empresaTIENDAONLINE,
    empresaNOMBRELEGAL, empresaEMAIL, empresaPAGINAWEB, empresaDESCUENTOCASHBACK,
    empresaGANANCIAETIX, empresaNIT, empresaDIRECCIONLEGAL, empresaLONGITUD, empresaLATITUD,
    empresaTELEFONO, empresaREPRESENTANTELEGAL, empresaCIUDADLEGAL, empresaPAISLEGAL, empresaCOMMUNITYCODE
    ) {
    let data = {
      empresaNOMBRE, empresaCATEGORIA, empresaFOTO, empresaDESCRIPCION,
      empresaFOTOPRINCIPALCUADRADA, empresaFOTOPRINCIPALRECTANGULAR, empresaTIENDAONLINE,
      empresaNOMBRELEGAL, empresaEMAIL, empresaPAGINAWEB, empresaDESCUENTOCASHBACK,
      empresaGANANCIAETIX, empresaNIT, empresaDIRECCIONLEGAL, empresaLONGITUD, empresaLATITUD,
      empresaTELEFONO, empresaREPRESENTANTELEGAL, empresaCIUDADLEGAL, empresaPAISLEGAL, empresaCOMMUNITYCODE
    };
    return this.consultaPOSTAUTENTICADAV2('etixpay/companies/create-pre-register-company', data);
  }
  cargar_perfil_profesional(profesional) {
    return this.consultaGETV2('profesionals/apps/main/professional/' + profesional + '/profile');
  }
  cambiar_profesion(uuid, profession_id) {
    let data = { profession_id };
    return this.consultaPOSTAUTENTICADAV2('profesionals/apps/main/professional/' + uuid + '/profile/updateprofession', data)
  }
  cambiar_numero_vat(uuid, vat) {
    let data = { 'vat': vat };
    return this.consultaPOSTAUTENTICADAV2('profesionals/apps/main/professional/' + uuid + '/profile/updatevat', data)
  }
  cambiar_numero_telefono(uuid, phone) {
    let data = { 'phone': phone };
    return this.consultaPOSTAUTENTICADAV2('profesionals/apps/main/professional/' + uuid + '/profile/updatephone', data)
  }
  cambiar_email(uuid, email) {
    let data = { 'email': email };
    return this.consultaPOSTAUTENTICADAV2('profesionals/apps/main/professional/' + uuid + '/profile/updatemail', data)
  }
  cargar_horario(uuid) {
    return this.consultaGETAUTENTICADAV2('profesionals/apps/main/professional/' + uuid + '/profile/shedules')
  }
  cargar_especializaciones(uuid) {
    return this.consultaGETAUTENTICADAV2('profesionals/apps/main/professional/' + uuid + '/specialties')
  }
  cargar_servicios_x_especializacion(id) {
    return this.consultaGETAUTENTICADAV2('profesionals/apps/specialties/' + id + '/services')
  }
  crear_servicio(services) {
    let data = {  services  };
    return this.consultaPOSTAUTENTICADAV2_sin_form_data('profesionals/apps/main/professionals/services/add' , data);
  }
  eliminar_servicio(services) {
    let data = {  services  };
    return this.consultaPOSTAUTENTICADAV2_sin_form_data('profesionals/apps/main/professionals/services/remove' , data);
  }
  crear_servicio_adicional(start, end, additional_service_type_id, price_hour, unique_cost) {
    let data = {  start, end, additional_service_type_id, price_hour, unique_cost  };
    return this.consultaPOSTAUTENTICADAV2_sin_form_data('profesionals/apps/main/professionals/services/additional' , data);
  }
  cargar_tipos_de_servicios_adicionales() {
    return this.consultaGETAUTENTICADAV2('profesionals/apps/main/professionals/services/additional/types')
  }
  eliminar_servicio_adicional(id) {
    return this.consultaGETAUTENTICADAV2('profesionals/apps/main/professionals/services/additional/' + id + '/remove')
  }
  eliminar_horario(uuid, id) {
    return this.consultaGETAUTENTICADAV2('profesionals/apps/main/professional/' + uuid + '/profile/shedules/' + id + '/remove');
  }
  cargar_galeria(uuid) {
    return this.consultaGETAUTENTICADAV2('profesionals/apps/main/professional/' + uuid + '/galery')
  }
  add_comentario_profesional(id, comment, rating) {
    let data = {  'comment': comment,   'rating': rating  };
    return this.consultaPOSTAUTENTICADAV2('profesionals/apps/professional/' + id + '/addcomment' , data);
  }
  agregar_horario(id, day, start_time, end_time) {
    let data = { day, start_time, end_time };
    return this.consultaPOSTAUTENTICADAV2_form_data_1('profesionals/apps/main/professional/' + id + '/profile/shedules', data)
  }
  cargar_solicitudes_de_un_profesional(uuid) {
    return this.consultaGETAUTENTICADAV2('profesionals/apps/main/professional/' + uuid + '/requests');
  }
  cargar_servicios_de_profesional(uuid) {
    return this.consultaGETAUTENTICADAV2('profesionals/apps/main/professional/' + uuid + '/services')
  }
  cargar_servicios_adicionales_de_profesional(uuid) {
    return this.consultaGETAUTENTICADAV2('profesionals/apps/main/professionals/' + uuid + '/services/additionals')
  }
  cargar_comentarios_de_profesional(id) {
    return this.consultaGETAUTENTICADAV2('profesionals/apps/comments/professional/' + id)
  }
  ver_comentario(id) {
    return this.consultaGETAUTENTICADAV2('profesionals/apps/comments/' + id)
  }
  eliminar_comentario_profesional(id) {
    return this.consultaGETAUTENTICADAV2('profesionals/apps/comments/' + id + '/delete')
  }
  eliminar_imagen_galeria_profesional(uuid, id) {
    return this.consultaGETAUTENTICADAV2('profesionals/apps/main/professional/'+ uuid +'/galery/'+ id +'/remove')
  }
  autocompletar_tags(palabra) {
    return this.consultaGETAUTENTICADAV2('profesionals/apps/tags/search/' + palabra);
  }
  //PROFESIONALES

  //EMPRESAS
  
  cargar_empresas_por_categorias() {
    return this.consultaGETAUTENTICADA('empresas/categorias');
  }
  cargar_categorias() {
    return this.consultaGETAUTENTICADA('empresas/categorias');
  }
  cargar_comentarios(uuid) {
    return this.consultaGETAUTENTICADA('empresas/comentarios/listado/' + uuid);
  }
  add_comentario(empresaID, empresa_comentarioCOMENTARIO, empresa_comentarioCALIFICACION) {
    let data = {
      'empresaID': empresaID, 
      'empresa_comentarioCOMENTARIO': empresa_comentarioCOMENTARIO, 
      'empresa_comentarioCALIFICACION': empresa_comentarioCALIFICACION
    };
    return this.consultaPOSTAUTENTICADA('empresas/comentarios/store' , data);
  }
  eliminar_comentario(uuid) {
    return this.consultaDELETEAUTENTICADA('empresas/comentarios/delete/' + uuid);
  }
  eliminar_horario_empresa(uuid) {
    return this.consultaDELETEAUTENTICADAV2('etixpay/companies/shedule/' + uuid);
  }
  agregar_horario_tiendas(day, start_time, end_time) {
    let data = {  day, start_time, end_time  };
    return this.consultaPOSTAUTENTICADAV2('etixpay/companies/shedule', data);
  }
  listar_horario_tiendas() {
    return this.consultaGETAUTENTICADAV2('etixpay/companies/shedule/company');
  }

  //EMPRESAS


  //METODOS DE PAGO
  add_cuenta_bancaria_persona(titular, pais_id, iban, swift) {
    let data = {
      'persona_cuenta_bancariaTITULO': titular,
      'paisID': pais_id,
      'persona_cuenta_bancariaIBAN': iban,
      'persona_cuenta_bancariaSWIFT': swift
    };
    return this.consultaPOSTAUTENTICADA('cliente/perfil/cuentas-bancarias', data);
  }
  add_cuenta_bancaria_empresa(titular, pais_id, iban, swift) {
    let data = {
      'empresa_cuenta_bancariaTITULO': titular,
      'paisID': pais_id,
      'empresa_cuenta_bancariaIBAN': iban,
      'empresa_cuenta_bancariaSWIFT': swift
    };
    return this.consultaPOSTAUTENTICADA('empresas/perfil/cuentas-bancarias', data);
  }
  eliminar_cuenta_bancaria_persona(uuid) {
    return this.consultaDELETEAUTENTICADA('cliente/perfil/cuentas-bancarias/remover/' + uuid);
  }
  eliminar_cuenta_bancaria_empresa(uuid) {
    return this.consultaDELETEAUTENTICADA('empresas/perfil/cuentas-bancarias/remover/' + uuid);
  }
  cargar_cuentas_bancarias_personas() {
    return this.consultaGETAUTENTICADA('cliente/perfil/cuentas-bancarias');
  }
  cargar_cuentas_bancarias_empresas() {
    return this.consultaGETAUTENTICADA('empresas/perfil/cuentas-bancarias');
  }
  paises() {
    return this.consultaGET('paises/habilitados');
  }
  cargar_tarjetas_credito() {
    return this.consultaGETAUTENTICADAV2('etixpay/payments/cards-user');
  }
  add_tarjeta_credito(card, email) {
    let data = {  card,  email   }
    return this.consultaPOSTAUTENTICADAV2_sin_form_data('etixpay/payments/save-card', data);
  }
  //METODOS DE PAGO



  //QR MENU 
  
  qr_persona() {
    return this.consultaGETAUTENTICADA('apps/cliente/dashboard');
  }
  qr_empresas() {
    return this.consultaGETAUTENTICADA('empresas/dashboard');
  }
  qr_colaboradores() {
    return this.consultaGETAUTENTICADA('empresas/colaboradores/dashboard');
  }
  //QR MENU


  editar_perfil(personaNOMBRES, personaAPELLIDOS, personaIDENTIFICACION, personaFECHANACIMIENTO, paisDOMICILIO, ciudadDOMICILIO, personaDIRECCION) {
    let data = { personaNOMBRES, personaAPELLIDOS,  personaIDENTIFICACION, personaFECHANACIMIENTO, paisDOMICILIO, ciudadDOMICILIO,  personaDIRECCION };
    return this.consultaPUTAUTENTICADAV2('etixpay/clients/profile/person' , data);
  }
  cambiar_password(password_new, password_old) {
    let data = { 'password_new': password_new, 'password_old': password_old};
    return this.consultaPUTAUTENTICADA2('cliente/perfil/seguridad' , data);
  }
  ciudades(id_pais) {
    return this.consultaGET('paises/' + id_pais + '/ciudades');
  }
  actualizarImgPerfil(personaFOTO) {
    let data = {personaFOTO}
    return this.consultaPOSTAUTENTICADA('cliente/perfil/documentos/foto-perfil', data);
  }



  //TIENDAS
  crear_voucher_tienda(
    empresaUID,voucherPRECIO,voucherFECHACADUCIDAD, voucherCANTIDADLIMITADA, 
    voucherDESCRIPCION, voucherTITULO, voucherCOMISION, voucherIMAGENDESTACADA, 
    voucherIMAGENSECUNDARIA, voucherFECHAINICIO, voucher_tipoID) {
    let data = {
      empresaUID,  voucherPRECIO,  voucherFECHACADUCIDAD,  voucherCANTIDADLIMITADA, 
      voucherDESCRIPCION,  voucherTITULO,  voucherCOMISION,  voucherIMAGENDESTACADA,
      voucherIMAGENSECUNDARIA, voucherFECHAINICIO, voucher_tipoID
    };
    return this.consultaPOSTAUTENTICADAV2('etixpay/companies/create-voucher-companies', data);
  }
  cargar_categorias_vouchers() {
    return this.consultaGETAUTENTICADAV2('vouchers/list-type-voucher');
  }
  cargar_categorias_vouchers_tienda() {
    return this.consultaGETAUTENTICADAV2('vouchers/list-type-voucher-company');
  }
  recibir_voucher(voucherID, voucher_generadoCODIGO, voucherable_id) {
    let data = {voucherID, voucher_generadoCODIGO, voucherable_id};
    return this.consultaPOSTAUTENTICADAV2('vouchers/read-voucher', data);
  }
  cargar_descripcion_voucher(codigo) {
    return this.consultaGETAUTENTICADAV2('vouchers/voucher-get-by-code?voucherCODIGO='+codigo);
  }






  //ETIXCASH
  
  muestra_listado_recargas() {
    return this.consultaGETAUTENTICADA('empresas/transacciones/atm/recargas');
  }
  muestra_listado_retiros() {
    return this.consultaGETAUTENTICADA('empresas/transacciones/atm/retiros');
  }
  muestra_listado_movimientos() {
    return this.consultaGETAUTENTICADA('empresas/transacciones/atm/movimientos');
  }
  movimientos_aprobar(wallet, uuid) {
    return this.consultaPUTAUTENTICADASINDATA('empresas/transacciones/atm/recargas/' + wallet + '/aprobar/' + uuid);
  }
  movimientos_denegar(wallet, uuid, solicitud_en_empresaOBSERVACIONES) {
    let data = { solicitud_en_empresaOBSERVACIONES };
    return this.consultaPUTAUTENTICADA('empresas/transacciones/atm/recargas/' + wallet + '/denegar/' + uuid, data);
  }
  //

}
