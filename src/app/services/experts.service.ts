import { Injectable } from '@angular/core';
import { ConexionService } from './conexion.service';
import { HttpClient } from '@angular/common/http';
import { EditProfesional } from '../pages/experts/profesional/interface/editExperts.model';

@Injectable({
  providedIn: 'root'
})
export class ExpertsService extends ConexionService {


  constructor(private http: HttpClient
    ) {
    super(http);
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
  cargarImgPerfil(img, uuid) {
    let data = {'main-image': img }
    return this.consultaPOSTAUTENTICADAV2('etixpay/professionals-news/update/images/'+ uuid, data);
  }
  cargarImgRectangular(img, uuid) {
    let data = {'rectangular-image':img}
    return this.consultaPOSTAUTENTICADAV2('etixpay/professionals-news/update/images/'+ uuid, data);
  }
  cargarImgCuadrada(img, uuid) {
    let data = {'square-image':img}
    return this.consultaPOSTAUTENTICADAV2('etixpay/professionals-news/update/images/'+ uuid, data);
  }
  cargarImgGaleria(image_file, professional_uuid) {
    let data = { professional_uuid, image_file }
    return this.consultaPOSTAUTENTICADAV2('etixpay/professionals-news/images', data);
  }
  cambiarImgGaleria(image_file, image, uuid) {
    let data = { image_file, image }
    return this.consultaPOSTAUTENTICADAV2('etixpay/professionals-news/images/'+uuid, data);
  }
  eliminarImgGaleria(image, uuid) {
    let data = { image }
    return this.consultaDELETEAUTENTICADAV2_con_data('etixpay/professionals-news/images/'+uuid, data);
  }





  preRegistro(proffesions, profesionalID) {
    if (profesionalID) proffesions['profesionalID'] = profesionalID;
    return this.consultaPOSTAUTENTICADAV2_sin_form_data('etixpay/professionals-news/pre-register', proffesions);
  }
  preRegisterUser(proffesions, profesionalID) {
    if (profesionalID) proffesions['profesionalID'] = profesionalID;
    return this.consultaPOSTAUTENTICADAV2_sin_form_data('etixpay/professionals-news/pre-register/user', proffesions);
  }
  validarCodigo(code,profesionalID) {
    return this.consultaPOSTAUTENTICADAV2_sin_form_data('etixpay/professionals-news/pre-register/user/validate', {code, profesionalID});
  }
  preRegisterInfoProfesional(proffesions, profesionalID) {
    if (profesionalID) proffesions['profesionalID'] = profesionalID;
    return this.consultaPOSTAUTENTICADAV2_sin_form_data('etixpay/professionals-news/pre-register/info-professional', proffesions);
  }
  preRegisterImages(proffesions, profesionalID) {
    if (profesionalID) proffesions['profesionalID'] = profesionalID;
    return this.consultaPOSTAUTENTICADAV2_form_data_1('etixpay/professionals-news/pre-register/images', proffesions);
  }
  preRegisterSuccess(profesionalID) {
    return this.consultaPOSTAUTENTICADAV2_sin_form_data('etixpay/professionals-news/pre-register/success', {profesionalID});
  }
  

  editarPerfil(data: EditProfesional, uuid) {
    return this.consultaPUTAUTENTICADAV2_sin_form_data('etixpay/professionals-news/update/information/'+uuid, data);
  }




  registroInfo(profesionalID, profesionalNAMEMAP, profesionalALTERPHONE, profesionalisSERVICEVIRTUAL, profesionalDESRIPTION, profesionalWEB, profesionalADDRESS) {
    let data = { profesionalID, profesionalNAMEMAP, profesionalALTERPHONE, profesionalisSERVICEVIRTUAL, profesionalDESRIPTION, profesionalWEB, profesionalADDRESS }
    return this.consultaPOSTAUTENTICADAV2_form_data_3('etixpay/professionals-news/pre-register/info-professional', data);
  }
  registroImg(profesionalID, mainImage, imageRectangular, imageCuadrada, gallery) {
    let data = { profesionalID, 'main-image': mainImage, 'rectangular-image': imageRectangular, 'square-image': imageCuadrada, gallery}
    return this.consultaPOSTAUTENTICADAV2('etixpay/professionals-news/pre-register/images', data);
  }
  getServiceByProfesions(profesion) {
    return this.consultaGETAUTENTICADAV2('etixpay/professionals-news/services/professions/' + profesion);
  }
  getEstado() {
    return this.consultaGETAUTENTICADAV2('etixpay/professionals-news/pre-register/data');
  }
  registroCompletado() {
    return this.consultaPOSTAUTENTICADAV2SINDATA('etixpay/professionals-news/pre-register/success');
  }
  getNewExperts() {
    return this.consultaGETAUTENTICADAV2('etixpay/professionals-news/news');
  }
  validar() {
    return this.consultaGETAUTENTICADAV2('etixpay/professionals-news/validate');
  }
  
  getServicePopulares() {
    return this.consultaGETAUTENTICADAV2('etixpay/professionals-news/services/top');
  }
  getProfesions() {
    return this.consultaGETAUTENTICADAV2('etixpay/professionals-news/professions');
  }
  getProfesionsTop() {
    return this.consultaGETAUTENTICADAV2('etixpay/professionals-news/professions/top');
  }
  getProfesionalesTop() {
    return this.consultaGETAUTENTICADAV2('etixpay/professionals-news/top');
  }
  getServiceByProfesion(id) {
    return this.consultaGETAUTENTICADAV2('etixpay/professionals-news/services/professions/'+id);
  }
  getProfesionalByService(id) {
    return this.consultaGETAUTENTICADAV2('etixpay/professionals-news/filter-services?services[0]='+id);
  }
  getProfesionalesAll() {
    return this.consultaGETAUTENTICADAV2('etixpay/professionals-news');
  }
  getProfesionalesProfile(uuid) {
    return this.consultaGETAUTENTICADAV2('etixpay/professionals-news/' + uuid);
  }
  getCountries() {
    return this.consultaGET('paises/habilitados');
  }




  getFormaJuridica() {
    return this.consultaGETAUTENTICADAV2('etixpay/professionals-news/legal-forms');
  }
  validatedEmail(email: string) {
    return this.validatedEmailContact('etixpay/companies/validate-email', email);
  }
  getDataRegisterProfesional() {
    return this.consultaGETAUTENTICADAV2('etixpay/professionals-news/pre-register/data');
  }





  updateCatSubcat(proffesions,uuid) {
    return this.consultaPUTAUTENTICADAV2_sin_form_data('etixpay/professionals-news/update/information/'+uuid, proffesions);
  }
}
