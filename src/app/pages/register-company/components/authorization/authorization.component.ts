import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Authorization } from 'src/app/models/register-company/authorization.model';
import { ServicesRegCompany } from 'src/app/services/reg-company.service';
import { CompanyCategory } from '../../../../models/register-company/categoryCompany.model';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
})
export class AuthorizationComponent implements OnInit {
  
  categories: CompanyCategory[] = [];
  idLanguage = '';
  @Input('authorization') authorization: Authorization = new Authorization();
  @Input ('stepNumber') stepNumber = 0;
  @Input ('fromSummary') fromSummary = false;
  @Output ('setAuthorization') setAuthorization: EventEmitter<Authorization> = new EventEmitter<Authorization>();
  @Output ('setModalAuthorization') setModalAuthorization: EventEmitter<boolean> = new EventEmitter<boolean>();
  dataValid = false;
  email = '';
 
  constructor(
    private servicesRegCompany: ServicesRegCompany
  ) { 
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.email = user.username;
    }
  }

  ngOnInit() {
    this.validateData();
    this.getLanguage();
    this.getCategoriesCompanys();
    if (this.fromSummary) {
      this.dataValid = true;
    }
  }

  getLanguage () {
    const language = localStorage.getItem('lenguaje');
    this.idLanguage = language;
  }

  getCategoriesCompanys() {
    this.servicesRegCompany.getCategories().subscribe(
      (response) => {
        this.categories = response.data.data;
      }
    );
  }

  getCategory() {
    const dataCategory = this.categories.find( categ => categ.id === parseInt(this.authorization.idCategory));
    if (dataCategory) {
      this.authorization.discountCategory = parseFloat(dataCategory.categoria_empresaDESCUENTO)
      if (this.idLanguage === 'en') {
        this.authorization.category = dataCategory.categoria_empresaTITULO
      }
      if (this.idLanguage === 'it') {
        this.authorization.category = dataCategory.categoria_empresaTITULOIT
      }
      if (this.idLanguage === 'es') {
        this.authorization.category = dataCategory.categoria_empresaTITULOES
      }
      if (this.idLanguage === 'ro') {
        this.authorization.category = dataCategory.categoria_empresaTITULORO
      }
    } 
  }

  isRepresentativeLegal(res: string) {
    this.authorization.isRepresentativeLegal = res;
  }

  typeStore(res: number) {
    this.authorization.typeStore = res;
  }
  
  continue() {
    this.setAuthorization.emit(this.authorization);
    this.setModalAuthorization.emit(true);
  }

  validateData() {
    this.dataValid = false;
    if (this.authorization.typeStore === 1) {
      if (this.authorization.idCategory && this.authorization.linkWebSide) {
        this.dataValid = true;
      }
    }

    if (this.authorization.typeStore === 2) {
      if (this.authorization.idCategory) {
        this.dataValid = true;
      }
    }
  }

}
