import { Injectable } from '@angular/core';

import { ConexionService } from './conexion.service';
import { HttpClient } from '@angular/common/http';
import { RequestRegCompany } from '../models/register-company/requetsRegCompany.model';

@Injectable({
  providedIn: 'root'
})
export class ServicesRegCompany extends ConexionService {

  constructor(private http: HttpClient) {
    super(http);
  }

  getCategories() {
    return this.getCategoriesCompanies('etixpay/companies/list-category-companies');
  }

  getCountries() {
    return this.getCountriesAuthorized('paises/habilitados');
  }

  getLegalForm(contryISO: string) {
    return this.getCompanyLegalForm('etixpay/companies/list-company-legal-form/' + contryISO);
  }

  validatedEmail(email: string) {
    return this.validatedEmailContact('etixpay/companies/validate-email', email);
  }
  
  saveCompany(data: RequestRegCompany) {
    return this.registerCompany('etixpay/companies/create-pre-register-company-app', data);
  }

  sendSMS(nroPhone: string) {
    return this.sendSMSRegCompany('etixpay/companies/send-message-pre-register-company', nroPhone);
  }

  verifyCodeSMS(data: any) {
    return this.verifySendSMSCode('etixpay/companies/validate-message-pre-register-company', data);
  }
}
