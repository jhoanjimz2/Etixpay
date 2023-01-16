import { Injectable } from '@angular/core';
import { ConexionService } from './conexion.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NegoziService extends ConexionService {


  constructor(private http: HttpClient
    ) {
    super(http);
  }

  welcomeNewsShops() {
    return this.consultaGETAUTENTICADAV2('etixpay/companies/welcome-news-shops');
  }
  nearbyStores(latitude, longitude, page) {
    let parametros = { latitude, longitude, page, category: 'ALL', radius: 100000 }
    return this.consultaGETAUTENTICADAV2('etixpay/companies/list-nearby-store', parametros)
  }
  topPR(latitude, longitude,  page) {
    let parametros = { latitude, longitude, page, category: 'ALL', radius: 100000, sortByPR: 1 }
    return this.consultaGETAUTENTICADAV2('etixpay/companies/list-nearby-store', parametros)
  }
  destacadas(page) {
    let parametros = { page , language: localStorage.getItem('lenguaje').toString().toUpperCase()}
    return this.consultaGETAUTENTICADAV2('etixpay/companies/store-in-evidence', parametros);
  }
  categories() {
    let parametros = { language: localStorage.getItem('lenguaje').toString().toUpperCase() }
    return this.consultaGETAUTENTICADAV2('etixpay/shopping-online/category', parametros)
  }
  search(text) {
    let parametros = { text, paginate: 1 }
    return this.consultaGETAUTENTICADAV2('etixpay/companies/find-store', parametros)
  }
  byCategory(latitude, longitude,  page, category) {
    let parametros = { latitude, longitude, page, category, radius: 100000, language: localStorage.getItem('lenguaje').toString().toUpperCase() }
    return this.consultaGETAUTENTICADAV2('etixpay/companies/list-nearby-store', parametros)
  }
  openShop(uuid) {
    return this.consultaGETAUTENTICADA('empresas/show/'+ uuid);
  }








  //---------------------PERFIL TIENDA--------------------------------//
  cargarTienda(uuid) {
    let parametros = { language: localStorage.getItem('lenguaje').toString().toUpperCase() }
    return this.consultaGETAUTENTICADAV2('etixpay/companies/store/get/'+ uuid, parametros);
  }

  cargarGaleria(uuid) {
    return this.consultaGETAUTENTICADAV2('etixpay/companies/store/get-images/' + uuid);
  }
  eliminarImg(uuidImg) {
    return this.consultaDELETEAUTENTICADAV2('etixpay/companies/store/gallery/delete/' + uuidImg)
  }


  cargarAlternativo(uuid) {
    return this.consultaGETAUTENTICADAV2('etixpay/companies/store/get-second-phone/' + uuid);
  }
  cambiarAlternativo(uuid, phone) {
    let data = { phone }
    return this.consultaPOSTAUTENTICADAV2('etixpay/companies/store/update-second-phone/'+ uuid, data)
  }

  cargarInfo(uuid) {
    return this.consultaGETAUTENTICADAV2('etixpay/companies/store/get-additional-info/' + uuid);
  }
  cambiarTIX(uuid) {
    return this.consultaPOSTAUTENTICADAV2SINDATA('etixpay/companies/store/update-receive-tix/'+ uuid)
  }
  cambiarEURO(uuid) {
    return this.consultaPOSTAUTENTICADAV2SINDATA('etixpay/companies/store/update-receive-euro/'+ uuid)
  }
  cambiarANIMALS(uuid) {
    return this.consultaPOSTAUTENTICADAV2SINDATA('etixpay/companies/store/update-receive-pets/'+ uuid)
  }


  cargarEvents(uuid) {
    return this.consultaGETAUTENTICADAV2('etixpay/companies/store/get-events/' + uuid);
  }
  cargarVouches(uuid) {
    let parametros = { language: localStorage.getItem('lenguaje').toString().toUpperCase() }
    return this.consultaGETAUTENTICADAV2('etixpay/companies/store/get-vouchers/' + uuid, parametros);
  }


  cargarDescripcion(uuid) {
    return this.consultaGETAUTENTICADAV2('etixpay/companies/store/get-description/' + uuid);
  }
  cambiarDescripcionTienda(uuid, text) {
    let data = { text }
    return this.consultaPOSTAUTENTICADAV2('etixpay/companies/store/update-description/'+ uuid, data)
  }


  getCategories() {
    return this.getCategoriesMP('etix-market/settings/categories/protected');
  }
  getProductsShop(uuid) {
    return this.getProductsShopMP('etix-market/products/available/'+uuid);
  }



  cargarHorarios(uuid) {
    return this.consultaGETAUTENTICADAV2('etixpay/companies/store/get-schedule/' + uuid);
  }


  crearJornadaCompletaOCerrada( uuid, empresa_horarioDIA, empresa_horarioJORNADA) {
    let data = { empresa_horarioDIA, empresa_horarioJORNADA}
    return this.consultaPOSTAUTENTICADAV2('etixpay/companies/store/create-schedule/'+ uuid, data)
  }
  cambiarJornadaCompletaOCerrada( uuid, empresa_horarioJORNADA) {
    let data = { empresa_horarioJORNADA}
    return this.consultaPOSTAUTENTICADAV2('etixpay/companies/store/update-schedule/'+ uuid, data)
  }


  crearHorarioJornadaDoble(uuid,empresa_horarioDIA, empresa_horarioJORNADA, empresa_horarioHORAAPERTURA, 
    empresa_horarioHORACIERRE, empresa_horarioHORAAPERTURASECUNDARIA, empresa_horarioHORACIERRESECUNDARIA) {
    let data = { empresa_horarioDIA, empresa_horarioJORNADA, empresa_horarioHORAAPERTURA, 
      empresa_horarioHORACIERRE, empresa_horarioHORAAPERTURASECUNDARIA, empresa_horarioHORACIERRESECUNDARIA }
    return this.consultaPOSTAUTENTICADAV2('etixpay/companies/store/create-schedule/'+ uuid, data)
  }
  cambiarHorarioJornadaDoble( uuid, empresa_horarioJORNADA, empresa_horarioHORAAPERTURA, 
    empresa_horarioHORACIERRE, empresa_horarioHORAAPERTURASECUNDARIA, empresa_horarioHORACIERRESECUNDARIA) {
    let data = { empresa_horarioJORNADA, empresa_horarioHORAAPERTURA, 
      empresa_horarioHORACIERRE, empresa_horarioHORAAPERTURASECUNDARIA, empresa_horarioHORACIERRESECUNDARIA }
    return this.consultaPOSTAUTENTICADAV2('etixpay/companies/store/update-schedule/'+ uuid, data)
  }


  crearHorarioJornadaUnica(uuid, empresa_horarioDIA, empresa_horarioJORNADA, empresa_horarioHORAAPERTURA,empresa_horarioHORACIERRE) {
    let data = { empresa_horarioDIA, empresa_horarioJORNADA, empresa_horarioHORAAPERTURA, empresa_horarioHORACIERRE }
    return this.consultaPOSTAUTENTICADAV2('etixpay/companies/store/create-schedule/'+ uuid, data)
  }
  cambiarHorarioJornadaUnica( uuid, empresa_horarioJORNADA, empresa_horarioHORAAPERTURA, empresa_horarioHORACIERRE ) {
    let data = { empresa_horarioJORNADA, empresa_horarioHORAAPERTURA, empresa_horarioHORACIERRE }
    return this.consultaPOSTAUTENTICADAV2('etixpay/companies/store/update-schedule/'+ uuid, data)
  }



  cambiarImgPrincipal( uuid, img) {
    let data = { img }
    return this.consultaPOSTAUTENTICADAV2_form_data_1('etixpay/companies/store/update-img-principal/'+ uuid, data)
  }
  cambiarImgCuadrada( uuid, img) {
    let data = { img }
    return this.consultaPOSTAUTENTICADAV2_form_data_1('etixpay/companies/store/update-img-principal-square/'+ uuid, data)
  }
  cambiarImgRectangular( uuid, img) {
    let data = { img }
    return this.consultaPOSTAUTENTICADAV2_form_data_1('etixpay/companies/store/update-img-principal-rectangle/'+ uuid, data)
  }
  cambiarImgGaleria( uuid, img) {
    let data = { img }
    return this.consultaPOSTAUTENTICADAV2_form_data_1('etixpay/companies/store/gallery/store/'+ uuid, data)
  }



  cargarComentarios(uuid) {
    return this.consultaGETAUTENTICADA('empresas/comentarios/listado/' + uuid);
  }
  eliminarComentario(uuid) {
    return this.consultaDELETEAUTENTICADA('empresas/comentarios/delete/' + uuid);
  }
  agregarComentario(empresaID, empresa_comentarioCOMENTARIO, empresa_comentarioCALIFICACION) {
    let data = { empresaID,  empresa_comentarioCOMENTARIO, empresa_comentarioCALIFICACION };
    return this.consultaPOSTAUTENTICADA('empresas/comentarios/store' , data);
  }
  datosPersona() {
    return this.consultaGETAUTENTICADA('cliente/perfil');
  }
  datosEmpresa() {
    return this.consultaGETAUTENTICADA('empresas/perfil');
  }
  datosColaborador() {
    return this.consultaGETAUTENTICADA('empresas/colaboradores/perfil');
  }
  recibirVoucher(voucherID, voucher_generadoCODIGO, voucherable_id) {
    let data = {voucherID, voucher_generadoCODIGO, voucherable_id};
    return this.consultaPOSTAUTENTICADAV2('vouchers/read-voucher', data);
  }
  cargarDescripcionVoucher(voucherCODIGO) {
    let parametros = { voucherCODIGO }
    return this.consultaGETAUTENTICADAV2('vouchers/voucher-get-by-code', parametros);
  }
  cargarCategoriasVouchersTienda() {
    return this.consultaGETAUTENTICADAV2('vouchers/list-type-voucher-company');
  }
  crearVoucherTienda(
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
}
