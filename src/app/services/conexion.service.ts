import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { RootResponseCompanyCategory } from "../models/register-company/categoryCompany.model";
import { ResponseCountry } from "../models/register-company/countryAuthorized.model";
import { ResponseCompanyLegalForm } from "../models/register-company/companyLegalForm.model";
import { RequestRegCompany } from "../models/register-company/requetsRegCompany.model";
import { ResponseSendSMS } from "../models/register-company/responseSendSMS.model";
import { CommunityMainRespose } from "../models/community/community-main-response.model";
import { CommunityNetworkRespose } from "../models/community/community-network-response.model";
import { ListMyLevelResponse } from "../models/community/list-level-response.model";
import { ResponseListPeriod } from "../models/community/list-period-response.model";
import { ListByPeriodResponse } from "../models/community/list-by-period-response.model";
import { HistoryResponse } from "../models/community/historyResponse.model";
import { NetworkDirectResponse } from "../models/community/network-directc-hildren-response.model";
import { ResponseCategoriesMarketplace } from "../models/marketplace/responseCategories.model";
import { RequetsRegProduct } from "../models/marketplace/requetsRegProduct.model";
import { ResponseProducts } from "../models/marketplace/reponseProducts.model";
import { ResponseProductDetail } from "../models/marketplace/reponseProduct.model";
import { EditProduct } from "../models/marketplace/editProduct.model";
import { environment } from "src/environments/environment";

var fd: any;

@Injectable({
  providedIn: "root",
})
export class ConexionService {
  url = environment.urlBase1;
  url2 = environment.urlBase2;
  urlMarketplace = environment.urlBaseGateway;

  constructor(private conexionHTTP: HttpClient) {}
  lenguaje() {
    return localStorage.getItem("lenguaje");
  }
  consultaGET(ruta: string) {
    var myHeaders = new HttpHeaders({ "X-localization": this.lenguaje() });
    return this.conexionHTTP.get(this.url + ruta, { headers: myHeaders }).pipe(
      map((data) => {
        return data;
      })
    );
  }
  consultaPOST(ruta: string, data: any) {
    var myHeaders = new HttpHeaders({ "X-localization": this.lenguaje() });
    return this.conexionHTTP
      .post(this.url + ruta, this.convertidorFormData(data), {
        headers: myHeaders,
      })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  consultaPUTSINDATA(ruta: string) {
    var myHeaders = new HttpHeaders({ "X-localization": this.lenguaje() });
    return this.conexionHTTP
      .put(this.url + ruta, null, { headers: myHeaders })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  convertidorFormData(object, metodoput = false) {
    const formData = new FormData();
    Object.keys(object).forEach((key) => {
      if (Array.isArray(object[key])) {
        object[key].forEach(function (data, index) {
          if (data) formData.append(key + "[" + index + "]", data);
        });
      } else {
        if (object[key]) formData.append(key, object[key]);
      }
    });
    if (metodoput) {
      formData.append("_method", "PUT");
    }
    return formData;
  }

  convertidorFormData2(data) {
    const fd = new FormData();
    Object.keys(data).forEach(function (key) {
      if (Array.isArray(data[key])) {
        data[key].forEach(function (object, index) {
          if (object) {
            if (
              Object.keys(object).length == 0 ||
              !data ||
              typeof data !== "object"
            ) {
              fd.append(key + "[" + index + "]", object);
            } else {
              Object.keys(object).forEach(function (key_object) {
                fd.append(
                  key + "[" + index + "][" + key_object + "]",
                  object[key_object]
                );
              });
            }
          }
        });
      } else {
        fd.append(key, data[key]);
      }
    });
    return fd;
  }

  convertidorFormData3(data: any) {
    let fd: FormData = new FormData();
    const _this = this;
    fd = this.eachData(data, fd);
    return fd;
  }

  eachData(data: any, formData: FormData, globalKey: string | null = null) {
    let _globalKey: string = "";
    if (
      typeof data == "object" &&
      !(data instanceof File || data instanceof Blob)
    ) {
      Object.keys(data).forEach((key) => {
        if (globalKey == null) _globalKey = key;
        else _globalKey = `${globalKey}[${key}]`;
        return this.eachData(data[key], formData, _globalKey);
      });
    }
    if (Array.isArray(data)) {
      data.forEach((object: any, index: any) => {
        if (globalKey == null) _globalKey = `[${index}]`;
        else _globalKey = `${globalKey}[${index}]`;
        return this.eachData(data[index], formData, _globalKey);
      });
    }
    if (
      !Array.isArray(data) &&
      (!(typeof data == "object") ||
        data instanceof File ||
        data instanceof Blob)
    ) {
      formData.append(`${globalKey}`, data);
    }
    return formData;
  }

  consultaGETAUTENTICADA(ruta: string) {
    var token = JSON.parse(localStorage.getItem("user"));
    var myHeaders = new HttpHeaders({
      Accept: "application/json",
      Authorization: "Bearer " + token.token,
      "X-localization": this.lenguaje(),
    });
    return this.conexionHTTP.get(this.url + ruta, { headers: myHeaders }).pipe(
      map((data) => {
        return data;
      })
    );
  }
  consultaPOSTAUTENTICADA(ruta: string, data: any) {
    var token = JSON.parse(localStorage.getItem("user"));
    var myHeaders = new HttpHeaders({
      Accept: "application/json",
      Authorization: "Bearer " + token.token,
      "X-localization": this.lenguaje(),
    });
    return this.conexionHTTP
      .post(this.url + ruta, this.convertidorFormData(data), {
        headers: myHeaders,
      })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  consultaPOSTAUTENTICADA2(ruta: string, data: any) {
    var token = JSON.parse(localStorage.getItem("user"));
    var myHeaders = new HttpHeaders({
      Accept: "application/json",
      Authorization: "Bearer " + token.token,
      "X-localization": this.lenguaje(),
    });
    return this.conexionHTTP
      .post(this.url + ruta, data, {
        headers: myHeaders,
      })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  consultaPOSTAUTENTICADASINDATA(ruta: string) {
    var token = JSON.parse(localStorage.getItem("user"));
    var myHeaders = new HttpHeaders({
      Accept: "application/json",
      Authorization: "Bearer " + token.token,
      "X-localization": this.lenguaje(),
    });
    return this.conexionHTTP
      .post(this.url + ruta, null, {
        headers: myHeaders,
      })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  consultaALTERPUTAUTENTICADA(ruta: string, data: any) {
    var token = JSON.parse(localStorage.getItem("user"));
    var myHeaders = new HttpHeaders({
      Accept: "application/json",
      Authorization: "Bearer " + token.token,
      "X-localization": this.lenguaje(),
    });
    return this.conexionHTTP
      .post(this.url + ruta, this.convertidorFormData(data, true), {
        headers: myHeaders,
      })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  consultaDELETEAUTENTICADA(ruta: string) {
    var token = JSON.parse(localStorage.getItem("user"));
    var myHeaders = new HttpHeaders({
      Accept: "application/json",
      Authorization: "Bearer " + token.token,
      "X-localization": this.lenguaje(),
    });
    return this.conexionHTTP
      .delete(this.url + ruta, { headers: myHeaders })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  consultaPUTAUTENTICADA(ruta: string, data: any) {
    var token = JSON.parse(localStorage.getItem("user"));
    var myHeaders = new HttpHeaders({
      Accept: "application/json",
      Authorization: "Bearer " + token.token,
      "X-localization": this.lenguaje(),
    });
    return this.conexionHTTP
      .put(this.url + ruta, this.convertidorFormData(data), {
        headers: myHeaders,
      })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  consultaPUTAUTENTICADA2(ruta: string, data: any) {
    var token = JSON.parse(localStorage.getItem("user"));
    var myHeaders = new HttpHeaders({
      Accept: "application/json",
      Authorization: "Bearer " + token.token,
      "X-localization": this.lenguaje(),
    });
    return this.conexionHTTP
      .put(this.url + ruta, data, { headers: myHeaders })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  consultaPUTAUTENTICADASINDATA(ruta: string) {
    var token = JSON.parse(localStorage.getItem("user"));
    var myHeaders = new HttpHeaders({
      Accept: "application/json",
      Authorization: "Bearer " + token.token,
      "X-localization": this.lenguaje(),
    });
    return this.conexionHTTP
      .put(this.url + ruta, null, { headers: myHeaders })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  //VERSION V2
  consultaPOSTV2(ruta: string, data: any) {
    var myHeaders = new HttpHeaders({ "X-localization": this.lenguaje() });
    return this.conexionHTTP
      .post(this.url2 + ruta, this.convertidorFormData(data), {
        headers: myHeaders,
      })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  consultaGETV2(ruta: string, parametros?) {
    var myHeaders = new HttpHeaders({ "X-localization": this.lenguaje() });
    var myParams = new HttpParams({ fromObject: parametros });
    return this.conexionHTTP
      .get(this.url2 + ruta, { headers: myHeaders, params: myParams })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  consultaGETAUTENTICADAV2(ruta: string, parametros?) {
    var token = JSON.parse(localStorage.getItem("user"));
    var myHeaders = new HttpHeaders({
      Accept: "application/json",
      Authorization: "Bearer " + token.token,
      "X-localization": this.lenguaje(),
    });
    var myParams = new HttpParams({ fromObject: parametros });
    return this.conexionHTTP
      .get(this.url2 + ruta, { headers: myHeaders, params: myParams })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  consultaPOSTAUTENTICADAV2_form_data_1(ruta: string, data: any) {
    var token = JSON.parse(localStorage.getItem("user"));
    var myHeaders = new HttpHeaders({
      Accept: "application/json",
      Authorization: "Bearer " + token.token,
      "X-localization": this.lenguaje(),
    });
    return this.conexionHTTP
      .post(this.url2 + ruta, this.convertidorFormData(data), {
        headers: myHeaders,
      })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  consultaPOSTAUTENTICADAV2_form_data_3(ruta: string, data: any) {
    var token = JSON.parse(localStorage.getItem("user"));
    var myHeaders = new HttpHeaders({
      Accept: "application/json",
      Authorization: "Bearer " + token.token,
      "X-localization": this.lenguaje(),
    });
    return this.conexionHTTP
      .post(this.url2 + ruta, this.convertidorFormData3(data), {
        headers: myHeaders,
      })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  consultaPOSTAUTENTICADAV2(ruta: string, data: any) {
    var token = JSON.parse(localStorage.getItem("user"));
    var myHeaders = new HttpHeaders({
      Accept: "application/json",
      Authorization: "Bearer " + token.token,
      "X-localization": this.lenguaje(),
    });
    return this.conexionHTTP
      .post(this.url2 + ruta, this.convertidorFormData2(data), {
        headers: myHeaders,
      })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  consultaPOSTAUTENTICADAV2_sin_form_data(ruta: string, data: any) {
    var token = JSON.parse(localStorage.getItem("user"));
    var myHeaders = new HttpHeaders({
      Accept: "application/json",
      Authorization: "Bearer " + token.token,
      "X-localization": this.lenguaje(),
    });
    return this.conexionHTTP
      .post(this.url2 + ruta, data, {
        headers: myHeaders,
      })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  consultaPUTAUTENTICADAV2_sin_form_data(ruta: string, data: any) {
    var token = JSON.parse(localStorage.getItem("user"));
    var myHeaders = new HttpHeaders({
      Accept: "application/json",
      Authorization: "Bearer " + token.token,
      "X-localization": this.lenguaje(),
    });
    return this.conexionHTTP
      .put(this.url2 + ruta, data, {
        headers: myHeaders,
      })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  consultaPOSTAUTENTICADAV2SINDATA(ruta: string) {
    var token = JSON.parse(localStorage.getItem("user"));
    var myHeaders = new HttpHeaders({
      Accept: "application/json",
      Authorization: "Bearer " + token.token,
      "X-localization": this.lenguaje(),
    });
    return this.conexionHTTP
      .post(this.url2 + ruta, null, {
        headers: myHeaders,
      })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  consultaPOSTAUTENTICADAV2SINDATAPARAMS(ruta: string, httpParams) {
    var token = JSON.parse(localStorage.getItem("user"));
    var myHeaders = new HttpHeaders({
      Accept: "application/json",
      Authorization: "Bearer " + token.token,
      "X-localization": this.lenguaje(),
    });
    return this.conexionHTTP
      .post(this.url2 + ruta, null, {
        headers: myHeaders,
        params: httpParams,
      })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  consultaPUTAUTENTICADAV2(ruta: string, data: any) {
    var token = JSON.parse(localStorage.getItem("user"));
    var myHeaders = new HttpHeaders({
      Accept: "application/json",
      Authorization: "Bearer " + token.token,
      "X-localization": this.lenguaje(),
    });
    return this.conexionHTTP
      .put(this.url2 + ruta, data, { headers: myHeaders })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  consultaPUTAUTENTICADAV2form(ruta: string, data: any) {
    var token = JSON.parse(localStorage.getItem("user"));
    var myHeaders = new HttpHeaders({
      Accept: "application/json",
      Authorization: "Bearer " + token.token,
      "X-localization": this.lenguaje(),
    });
    return this.conexionHTTP
      .put(this.url2 + ruta, this.convertidorFormData2(data), {
        headers: myHeaders,
      })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  consultaDELETEAUTENTICADAV2(ruta: string) {
    var token = JSON.parse(localStorage.getItem("user"));
    var myHeaders = new HttpHeaders({
      Accept: "application/json",
      Authorization: "Bearer " + token.token,
      "X-localization": this.lenguaje(),
    });
    return this.conexionHTTP
      .delete(this.url2 + ruta, { headers: myHeaders })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  consultaDELETEAUTENTICADAV2_con_data(ruta: string, data?) {
    var token = JSON.parse(localStorage.getItem("user"));
    var myHeaders = new HttpHeaders({
      Accept: "application/json",
      Authorization: "Bearer " + token.token,
      "X-localization": this.lenguaje(),
    });
    let options = { headers: myHeaders, body: data };
    return this.conexionHTTP.delete(this.url2 + ruta, options).pipe(
      map((data) => {
        return data;
      })
    );
  }
  consultaPOSTAUTENTICADAV2FORM1(ruta: string, data: any) {
    var token = JSON.parse(localStorage.getItem("user"));
    var myHeaders = new HttpHeaders({
      Accept: "application/json",
      Authorization: "Bearer " + token.token,
      "X-localization": this.lenguaje(),
    });
    return this.conexionHTTP
      .post(this.url2 + ruta, this.convertidorFormData(data), {
        headers: myHeaders,
      })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  convertidorFormData_params(object, metodoput = false) {
    const formData = new FormData();
    Object.keys(object).forEach((key) => {
      if (Array.isArray(object[key])) {
        object[key].forEach(function (data, index) {
          formData.append(key + "[" + index + "]", data);
        });
      } else {
        formData.append(key, object[key]);
      }
    });
    if (metodoput) {
      formData.append("_method", "PUT");
    }
    return formData;
  }

  // services - reg.  company
  getCategoriesCompanies(ruta: string) {
    const token = JSON.parse(localStorage.getItem("user"));
    const myHeaders = new HttpHeaders({
      Accept: "application/json",
      Authorization: "Bearer " + token.token,
      "X-localization": this.lenguaje(),
    });
    return this.conexionHTTP
      .get<RootResponseCompanyCategory>(this.url2 + ruta, {
        headers: myHeaders,
      })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  getCountriesAuthorized(ruta: string) {
    const token = JSON.parse(localStorage.getItem("user"));
    const myHeaders = new HttpHeaders({
      Accept: "application/json",
      Authorization: "Bearer " + token.token,
      "X-localization": this.lenguaje(),
    });
    return this.conexionHTTP
      .get<ResponseCountry>(this.url + ruta, { headers: myHeaders })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  getCompanyLegalForm(ruta: string) {
    const token = JSON.parse(localStorage.getItem("user"));
    const myHeaders = new HttpHeaders({
      Accept: "application/json",
      Authorization: "Bearer " + token.token,
      "X-localization": this.lenguaje(),
    });
    return this.conexionHTTP
      .get<ResponseCompanyLegalForm>(this.url2 + ruta, { headers: myHeaders })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  validatedEmailContact(ruta: string, email: string) {
    const token = JSON.parse(localStorage.getItem("user"));
    const myHeaders = new HttpHeaders({
      Accept: "application/json",
      Authorization: "Bearer " + token.token,
      "X-localization": this.lenguaje(),
    });
    return this.conexionHTTP
      .post(this.url2 + ruta, this.convertidorFormData({ email: email }), {
        headers: myHeaders,
      })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  registerCompany(ruta: string, data: RequestRegCompany) {
    const token = JSON.parse(localStorage.getItem("user"));
    const myHeaders = new HttpHeaders({
      Accept: "application/json",
      Authorization: "Bearer " + token.token,
      "X-localization": this.lenguaje(),
    });
    return this.conexionHTTP
      .post(this.url2 + ruta, this.convertidorFormData(data), {
        headers: myHeaders,
      })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  sendSMSRegCompany(ruta: string, nroPhone: string) {
    const token = JSON.parse(localStorage.getItem("user"));
    const myHeaders = new HttpHeaders({
      Accept: "application/json",
      Authorization: "Bearer " + token.token,
      "X-localization": this.lenguaje(),
    });
    return this.conexionHTTP
      .post<ResponseSendSMS>(
        this.url2 + ruta,
        this.convertidorFormData({ empresaTELEFONO: nroPhone }),
        { headers: myHeaders }
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  verifySendSMSCode(ruta: string, data: any) {
    const token = JSON.parse(localStorage.getItem("user"));
    const myHeaders = new HttpHeaders({
      Accept: "application/json",
      Authorization: "Bearer " + token.token,
      "X-localization": this.lenguaje(),
    });
    return this.conexionHTTP
      .post(this.url2 + ruta, this.convertidorFormData(data), {
        headers: myHeaders,
      })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  // Services community
  getCommunityMain(ruta: string) {
    const token = JSON.parse(localStorage.getItem("user"));
    const myHeaders = new HttpHeaders({
      Accept: "application/json",
      Authorization: "Bearer " + token.token,
      "X-localization": this.lenguaje(),
    });
    return this.conexionHTTP
      .get<CommunityMainRespose>(this.url2 + ruta, { headers: myHeaders })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  getCommunityNetwork(ruta: string) {
    const token = JSON.parse(localStorage.getItem("user"));
    const myHeaders = new HttpHeaders({
      Accept: "application/json",
      Authorization: "Bearer " + token.token,
      "X-localization": this.lenguaje(),
    });
    return this.conexionHTTP
      .get<CommunityNetworkRespose>(this.url2 + ruta, { headers: myHeaders })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  getListMyLevel(ruta: string) {
    const token = JSON.parse(localStorage.getItem("user"));
    const myHeaders = new HttpHeaders({
      Accept: "application/json",
      Authorization: "Bearer " + token.token,
      "X-localization": this.lenguaje(),
    });
    return this.conexionHTTP
      .get<ListMyLevelResponse>(this.url2 + ruta, { headers: myHeaders })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  getListPeriod(ruta: string) {
    const token = JSON.parse(localStorage.getItem("user"));
    const myHeaders = new HttpHeaders({
      Accept: "application/json",
      Authorization: "Bearer " + token.token,
      "X-localization": this.lenguaje(),
    });
    return this.conexionHTTP
      .get<ResponseListPeriod>(this.url2 + ruta, { headers: myHeaders })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  getListByPeriod(ruta: string) {
    const token = JSON.parse(localStorage.getItem("user"));
    const myHeaders = new HttpHeaders({
      Accept: "application/json",
      Authorization: "Bearer " + token.token,
      "X-localization": this.lenguaje(),
    });
    return this.conexionHTTP
      .get<ListByPeriodResponse>(this.url2 + ruta, { headers: myHeaders })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  getHistory(ruta: string) {
    const token = JSON.parse(localStorage.getItem("user"));
    const myHeaders = new HttpHeaders({
      Accept: "application/json",
      Authorization: "Bearer " + token.token,
      "X-localization": this.lenguaje(),
    });
    return this.conexionHTTP
      .get<HistoryResponse>(this.url2 + ruta, { headers: myHeaders })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  getNetworkDirectc(ruta: string) {
    const token = JSON.parse(localStorage.getItem("user"));
    const myHeaders = new HttpHeaders({
      Accept: "application/json",
      Authorization: "Bearer " + token.token,
      "X-localization": this.lenguaje(),
    });
    return this.conexionHTTP
      .get<NetworkDirectResponse>(this.url2 + ruta, { headers: myHeaders })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  getUserCode(ruta: string) {
    const token = JSON.parse(localStorage.getItem("user"));
    const myHeaders = new HttpHeaders({
      Accept: "application/json",
      Authorization: "Bearer " + token.token,
      "X-localization": this.lenguaje(),
    });
    return this.conexionHTTP.get(this.url + ruta, { headers: myHeaders }).pipe(
      map((data) => {
        return data;
      })
    );
  }

  // Marketplace
  getMetod(ruta: string) {
    const token = JSON.parse(localStorage.getItem("tokenmarket"));
    const myHeaders = new HttpHeaders({
      Authorization: "Bearer " + token,
      "X-localization": this.lenguaje(),
    });
    return this.conexionHTTP
      .get(this.urlMarketplace + ruta, { headers: myHeaders })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  getCategoriesMP(ruta: string) {
    const token = JSON.parse(localStorage.getItem("tokenmarket"));
    const myHeaders = new HttpHeaders({
      Authorization: "Bearer " + token,
      "X-localization": this.lenguaje(),
    });
    return this.conexionHTTP
      .get<ResponseCategoriesMarketplace>(this.urlMarketplace + ruta, {
        headers: myHeaders,
      })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  saveProductMP(ruta: string, data: RequetsRegProduct) {
    const token = JSON.parse(localStorage.getItem("tokenmarket"));
    const myHeaders = new HttpHeaders({
      Authorization: "Bearer " + token,
      "X-localization": this.lenguaje(),
    });
    return this.conexionHTTP
      .post(this.urlMarketplace + ruta, this.convertidorFormData3(data), {
        headers: myHeaders,
      })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  getProductsShopMP(ruta: string) {
    const token = JSON.parse(localStorage.getItem("tokenmarket"));
    const myHeaders = new HttpHeaders({
      Authorization: "Bearer " + token,
      "X-localization": this.lenguaje(),
    });
    return this.conexionHTTP
      .get<ResponseProducts>(this.urlMarketplace + ruta, { headers: myHeaders })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  getMyProductsShopMP(ruta: string) {
    const params = "?my-products=true";
    const token = JSON.parse(localStorage.getItem("tokenmarket"));
    const myHeaders = new HttpHeaders({
      Authorization: "Bearer " + token,
      "X-localization": this.lenguaje(),
    });
    return this.conexionHTTP
      .get<ResponseProducts>(this.urlMarketplace + ruta + params, {
        headers: myHeaders,
      })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  getProductDetailMP(ruta: string, id: string) {
    const token = JSON.parse(localStorage.getItem("tokenmarket"));
    const myHeaders = new HttpHeaders({
      Authorization: "Bearer " + token,
      "X-localization": this.lenguaje(),
    });
    return this.conexionHTTP
      .get<ResponseProductDetail>(this.urlMarketplace + ruta + "/" + id, {
        headers: myHeaders,
      })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  saveOrderMP(ruta: string, data: any) {
    const token = JSON.parse(localStorage.getItem("tokenmarket"));
    const myHeaders = new HttpHeaders({
      Authorization: "Bearer " + token,
      "X-localization": this.lenguaje(),
    });
    return this.conexionHTTP
      .post(this.urlMarketplace + ruta, this.convertidorFormData2(data), {
        headers: myHeaders,
      })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  editProduct(ruta: string, data: EditProduct) {
    const token = JSON.parse(localStorage.getItem("tokenmarket"));
    const myHeaders = new HttpHeaders({
      Authorization: "Bearer " + token,
      "X-localization": this.lenguaje(),
    });
    return this.conexionHTTP
      .put(this.urlMarketplace + ruta, this.convertidorFormData2(data), {
        headers: myHeaders,
      })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  consultaGetMarketPlace(ruta: string) {
    const token = JSON.parse(localStorage.getItem("user"));
    const myHeaders = new HttpHeaders({
      Authorization: "Bearer " + token.token,
    });
    return this.conexionHTTP
      .get(this.urlMarketplace + ruta, { headers: myHeaders })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  deleteProduct(ruta: string) {
    const token = JSON.parse(localStorage.getItem("tokenmarket"));
    const myHeaders = new HttpHeaders({
      Authorization: "Bearer " + token,
      "X-localization": this.lenguaje(),
    });
    return this.conexionHTTP
      .delete(this.urlMarketplace + ruta, { headers: myHeaders })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  payCashService(ruta: string, data: any) {
    const token = JSON.parse(localStorage.getItem("user"));
    const myHeaders = new HttpHeaders({
      Authorization: "Bearer " + token.token,
      "X-localization": this.lenguaje(),
    });
    return this.conexionHTTP
      .post(this.url2 + ruta, this.convertidorFormData(data), {
        headers: myHeaders,
      })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
}
