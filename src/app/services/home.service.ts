import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';

import { ConexionService } from './conexion.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService  extends ConexionService {
  url: string = this.url;
  url2: string = this.url2;
  constructor(private http: HttpClient
    ) {
    super(http);
  }
  logout() {
    return this.consultaGETAUTENTICADA('logout');
  }
  validacion() {
    return this.consultaGETAUTENTICADA('cliente/sorteo/activo');
  }
  datostelefonopersona() {
    return this.consultaGETAUTENTICADA('cliente/perfil');
  }
  datostelefonoempresa() {
    return this.consultaGETAUTENTICADA('empresas/dashboard');
  }
  paises() {
    return this.consultaGET('paises/habilitados');
  }
  ciudades() {
    return this.consultaGET('ciudades');
  }

  //VERIFICAR NUMERO TELEFONICO//
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
  estadoTelefono() {
    return this.consultaGETAUTENTICADA('cliente/seguridad/telefono/estado');
  }
  //VERIFICAR NUMERO TELEFONICO//


  
  //PUBLICIDAD//
  publicidad() {
    return this.consultaGETV2('marketing/ads/actives?appZone=2');
  }
  tutoriales() {
    return this.consultaGETV2('marketing/ads/actives?language='+localStorage.getItem('lenguaje')+'&appZone=3');
  }
  //PUBLICIDAD//

  //TIENDAS EN LINEA//
  cargar_categorias_y_empresas() {
    return this.consultaGETAUTENTICADAV2('etixpay/companies/list-category-companies');
  }  
  //TIENDAS EN LINEA//

  //TIENDAS CERCANAS//
  cargar_tiendas_cercanas(personaLONGITUD, personaLATITUD, empresaRADIO, page) {
    let data = {personaLONGITUD, personaLATITUD, empresaRADIO };
    return this.consultaPOSTAUTENTICADAV2('etixpay/companies/list/search/location/filtre/prioridad?page=' + page , data);
  }
  cargar_tiendas_mapa_inicial(personaLONGITUD, personaLATITUD) {
    let data = {'personaLONGITUD': personaLONGITUD, 'personaLATITUD': personaLATITUD };
    return this.consultaPOST('empresas/listado/search/ubicacion-cercana' , data);
  }
  cargar_tiendas_mapa(personaLONGITUD, personaLATITUD, empresaRADIO, empresaCATEGORIAS?) {
    let data = {personaLONGITUD,personaLATITUD,empresaRADIO,empresaCATEGORIAS, 'empresaALMENOSUNA': true };
    return this.consultaPOST('empresas/listado/search/ubicacion' , data);
  }
  cargar_eventos_mapa(latitud, longitud, radio) {
    return this.consultaGETAUTENTICADAV2('events/events-list-by-location?eventoLATITUD='+latitud+'&eventoLONGITUD='+longitud+'&radio='+ radio);
  }
  cargar_markers_mapa(){
    return this.consultaGETAUTENTICADAV2('etixpay/companies/maps');
  }
  cargar_tienda_individual(uuid) {
    return this.consultaGETAUTENTICADA('empresas/show/'+ uuid);
  }
  cargar_categorias() {
    return this.consultaGET('empresas/categorias');
  }
  like(empresaID) {
    let data = {empresaID};
    return this.consultaPOSTAUTENTICADA('cliente/empresas/favoritos/agregar' , data);
  }
  dis_like(empresaID) {
    return this.consultaDELETEAUTENTICADA('cliente/empresas/favoritos/remover?empresaID=' + empresaID);
  }
  //TIENDAS CERCANAS//
  //INVERSIONES LOCALES
  localsPersona() {
    return this.consultaGETAUTENTICADA('apps/cliente/dashboard');
  }
  localsEmpresa() {
    return this.consultaGETAUTENTICADA('empresas/dashboard');
  }
  comprar_proyecto_con_tix(proyectoID, trasaccionAMOUNT, walletCODIGO) {
    let data = {proyectoID,trasaccionAMOUNT,walletCODIGO};
    return this.consultaPOSTAUTENTICADA('cliente/proyectos/transacciones/atm', data);
  }
  comprar_proyecto_con_tarjeta(proyectoID, walletCODIGO, trasaccionAMOUNT, pay_intentID) {
    let data = {  proyectoID, walletCODIGO, trasaccionAMOUNT, promocional_code: null, metodo_pagoID: 1, pay_intentID, };
    return this.consultaPOSTAUTENTICADA2('cliente/proyectos/transacciones/tarjetas-creditos', data);
  }
  comprar_proyecto_con_tarjeta_ingresada(proyectoID, walletCODIGO, trasaccionAMOUNT, token) {
    let data = { proyectoID, walletCODIGO, trasaccionAMOUNT, token };
    return this.consultaPOSTAUTENTICADA('cliente/proyectos/transacciones/tarjetas-creditos', data);
  }
  add_tarjeta_credito(card, email) {
    let data = {  card,  email   }
    return this.consultaPOSTAUTENTICADAV2_sin_form_data('etixpay/payments/save-card', data);
  }
  //INVERSIONES LOCALES


  //EVENTOS LOCALES
  crear_evento(
    eventoTITULO, eventoFECHAINICIO, eventoFECHAFINAL, eventoFECHAFINALCOMPRA,
    eventoIMAGENDESTACADA, eventsGallery,
    eventoDESCRIPCION, paisID, eventoDIRECCION, eventoNUMEROTELEFONICO,
    eventoSEGUNDONUMERO, eventoEMAIL, eventoWEBSITE,
    eventsDetails,
    eventoCOMISION, eventoLATITUD, eventoLONGITUD
    ) {
    let data = {
      eventoTITULO,  eventoFECHAINICIO,  eventoFECHAFINAL,  eventoFECHAFINALCOMPRA,
      eventoIMAGENDESTACADA,  eventsGallery,  eventoDESCRIPCION,  paisID,
      eventoDIRECCION,  eventoNUMEROTELEFONICO,  eventoSEGUNDONUMERO,  eventoEMAIL,
      eventoWEBSITE,  eventsDetails,  eventoCOMISION,  eventoLATITUD,  eventoLONGITUD
    };
    return this.consultaPOSTAUTENTICADAV2('events/create-events', data);
  }
  editar_evento(
    eventoID,
    eventoTITULO, eventoFECHAINICIO, eventoFECHAFINAL, eventoFECHAFINALCOMPRA,
    eventoIMAGENDESTACADA,
    eventoDESCRIPCION, paisID, eventoDIRECCION, eventoNUMEROTELEFONICO,
    eventoSEGUNDONUMERO, eventoEMAIL, eventoWEBSITE,
    eventsDetails,
    eventoCOMISION, eventoLATITUD, eventoLONGITUD,
    eventsGalleryNew, eventsGalleryDeleteID
    ) {
    let data = {
      eventoID,  eventoTITULO,  eventoDESCRIPCION,  eventoDIRECCION,  eventoCOMISION,
      eventoFECHAINICIO,  eventoFECHAFINAL,  eventoFECHAFINALCOMPRA,  eventoWEBSITE,
      eventoEMAIL,  eventoIMAGENDESTACADA,  eventoNUMEROTELEFONICO,  eventoSEGUNDONUMERO,
      eventsDetails,  paisID,  eventoLATITUD,  eventoLONGITUD,  eventsGalleryNew,  eventsGalleryDeleteID
    };
    return this.consultaPOSTAUTENTICADAV2('events/update', data);
  }
  ver_eventos(pagina) {
    return this.consultaGETAUTENTICADAV2('events/list?page='+pagina+'&status=ACTIVO');
  }
  ver_mis_eventos(pagina) {
    return this.consultaGETAUTENTICADAV2('events/my-list?page='+pagina);
  }
  ver_mis_eventos_con_likes(pagina) {
    return this.consultaGETAUTENTICADAV2('events/like-list?page='+pagina);
  }
  like_a_un_evento(eventoID) {
    let data = { 'eventoID': eventoID }
    return this.consultaPOSTAUTENTICADAV2('events/like-event', data);
  }
  ver_mis_tickets_de_eventos() {
    return this.consultaGETAUTENTICADAV2('events/my-tickets?estado=PENDIENTE');
  }
  ver_mis_tickets_de_eventos_ejecutados() {
    return this.consultaGETAUTENTICADAV2('events/my-tickets?estado=VENCIDO');
  }
  comprar_tickets_evento(eventoID, evento_ticket_ordenCANTIDADITEM, voucherID) {
    let data = { eventoID,  evento_ticket_ordenCANTIDADITEM,  voucherID  };
    return this.consultaPOSTAUTENTICADAV2('events/buy-tickets', data);
  }
  pagar_voucher_evento(
    payIntent, walletFrom,  
    amount, observation, type, status, 
    paymentMethod, voucherID, voucherAmount
    ) {
    let data = { 
      payIntent,  walletFrom,   
      amount, observation, type, status, 
      paymentMethod, voucherID, voucherAmount 
    };
    return this.consultaPOSTAUTENTICADAV2('vouchers/pay-voucher', data);
  }
  ver_categorias_de_tickets() {
    return this.consultaGETAUTENTICADAV2('events/list-category-tickets');
  }
  regalar_voucher(id, walletCODIGO) {
    let data = { 'id': id, 'walletCODIGO': walletCODIGO }
    return this.consultaPOSTAUTENTICADAV2('vouchers/gift-voucher', data);
  }
  contactos(clienteCONTACTOS) {
    let data = {'clienteCONTACTOS': clienteCONTACTOS};
    return this.consultaPOSTAUTENTICADA('cliente/friends/match', data);
  }
  //EVENTOS LOCALES

  //PROFESIONALES
  consultar_profesiones() {
    return this.consultaGETV2('profesionals/apps/activities');
  }
  consultar_especializaciones() {
    return this.consultaGETV2('profesionals/apps/activity/specialties');
  }
  consultar_categorias() {
    return this.consultaGETV2('profesionals/apps/activities');
  }
  consultar_especializaciones_por_categorias(categoria) {
    return this.consultaGETV2('profesionals/apps/activity/' + categoria + '/specialties');
  }
  cargar_servicios_x_especializacion(id) {
    return this.consultaGETAUTENTICADAV2('profesionals/apps/specialties/' + id + '/services')
  }
  cargar_informacion_profesionales() {
    return this.consultaGETV2('profesionals/apps/main');
  }
  consultar_especializaciones_por_profesion(profesion) {
    return this.consultaGETV2('profesionals/apps/activity/' + profesion + '/specialties');
  } 
  cargar_profesionales_por_servicio(especializacion) {
    return this.consultaGETV2('profesionals/apps/specialty/'+ especializacion +'/professionals');
  }
  cargar_perfil_profesional(profesional) {
    return this.consultaGETV2('profesionals/apps/main/professional/'+profesional+'/profile');
  }
  cargar_horario(uuid) {
    return this.consultaGETAUTENTICADAV2('profesionals/apps/main/professional/' + uuid + '/profile/shedules')
  }
  cargar_galeria(uuid) {
    return this.consultaGETAUTENTICADAV2('profesionals/apps/main/professional/' + uuid + '/galery')
  }
  crear_solicitud(id, start_date, end_date,body, services, address, latitude, longitude, type) {
    let data = {
      start_date, end_date, body, services, address, latitude, longitude, type
    };
    return this.consultaPOSTAUTENTICADAV2('profesionals/apps/main/professional/' + id + '/request', data)
  }
  cargar_servicios_de_profesional(id) {
    return this.consultaGETAUTENTICADAV2('profesionals/apps/main/professional/' + id + '/services')
  }
  cargar_servicios_adicionales_de_profesional(uuid) {
    return this.consultaGETAUTENTICADAV2('profesionals/apps/main/professionals/' + uuid + '/services/additionals')
  }
  cargar_comentarios_de_profesional(id) {
    return this.consultaGETAUTENTICADAV2('profesionals/apps/comments/professional/' + id)
  }
  //PROFESIONALES

  //TIENDAS EN LINEA
  cargar_empresas_por_categorias() {
    return this.consultaGETAUTENTICADA('empresas/categorias');
  }
  //TIENDAS EN LINEA




  //VOUCHERS
  cargar_categorias_vouchers() {
    return this.consultaGETAUTENTICADAV2('vouchers/list-type-voucher');
  }
  cargar_flash_vouchers(pagina) {
    return this.consultaGETAUTENTICADAV2('vouchers/list-flash-voucher?page=' + pagina);
  }
  cargar_my_vouchers(pagina) {
    return this.consultaGETAUTENTICADAV2('vouchers/my-vouchers?status=PENDIENTE&page=' + pagina);
  }
  cargar_my_vouchers_ejecutados(pagina) {
    return this.consultaGETAUTENTICADAV2('vouchers/my-vouchers?status=EJECUTADO&page=' + pagina);
  }
  cargar_type_voucher_active(id, pagina) {
    return this.consultaGETAUTENTICADAV2('vouchers/list-voucher-by-type?voucher_tipoID=' + id + '&voucherESTADO=ACTIVO&page=' + pagina);
  }
  cargar_all_voucher_active(pagina) {
    return this.consultaGETAUTENTICADAV2('vouchers/list-voucher?estado=ACTIVO&page=' + pagina);
  }
  recibir_voucher(voucherID, voucher_generadoCODIGO, voucherable_id) {
    let data = {voucherID, voucher_generadoCODIGO, voucherable_id};
    return this.consultaPOSTAUTENTICADAV2('vouchers/read-voucher', data);
  }
  //VOUCHERS
























  verListadoGaleria(uuid) {
    return this.consultaGETAUTENTICADA('empresas/imagenes/listado/' + uuid);
  }
  verListadoComentarios(uuid) {
    return this.consultaGETAUTENTICADA('empresas/comentarios/listado/' + uuid);
  }
  agregarComentarioEmpresa(empresaID, empresa_comentarioCOMENTARIO, empresa_comentarioCALIFICACION) {
    let data = {'empresaID': empresaID, 'empresa_comentarioCOMENTARIO': empresa_comentarioCOMENTARIO, 'empresa_comentarioCALIFICACION': empresa_comentarioCALIFICACION};
    return this.consultaPOSTAUTENTICADA('empresas/comentarios/store' , data);
  }
  eliminarComentario(uuid) {
    return this.consultaDELETEAUTENTICADA('empresas/comentarios/delete/' + uuid);
  }





//-----------cabecera nueva-------------------//
  getCabeceraNueva() {
    return this.consultaGETAUTENTICADAV2('etixpay/users/me');
  }











  //----------------------NUEVO MAPA---------------------------------------//
  
  // companies_localize(lat, lon, radio, categories) {
  //   let httpParams = new HttpParams().append("lat", lat).append('lon', lon).append("radio", radio).append("categories", categories);
  //   return this.consultaPOSTAUTENTICADAV2SINDATAPARAMS('etixpay/companies/maps/localize', httpParams);
  // }
  companies_localize(lat, lon, rad, categories, types) {
    let data = { lat, lon, rad, categories, types }
    return this.consultaPOSTAUTENTICADAV2FORM1('etixpay/companies/maps/types/localize', data);
  }
  crear_sugerencia_negocio(empresa_sugerenciaFOTO, empresa_sugerenciaNOMBRE, categoria_empresaID, empresa_sugerenciaDESCRIPCION, empresa_sugerenciaEMAIL?, empresa_sugerenciaCONTACTO?) {
    let data = { empresa_sugerenciaFOTO, empresa_sugerenciaNOMBRE, categoria_empresaID, empresa_sugerenciaDESCRIPCION, empresa_sugerenciaEMAIL, empresa_sugerenciaCONTACTO };
    return this.consultaPOSTAUTENTICADAV2('etixpay/companies/create-suggestion-company', data);
  }
}
