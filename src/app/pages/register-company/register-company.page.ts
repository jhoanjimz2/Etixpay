import { Component, OnInit } from '@angular/core';
import { Authorization } from '../../models/register-company/authorization.model';
import { ContactDetail } from '../../models/register-company/contactDetail.model';
import { Description } from '../../models/register-company/description.model';
import { FiscalDataReward } from '../../models/register-company/fiscalDataRewars.model';
import { SummaryRegCompany } from '../../models/register-company/summaryRegCompany.model';


@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.page.html',
  styleUrls: ['./register-company.page.scss'],
})
export class RegisterCompanyPage implements OnInit {

  enableBackdropDismiss = false;
  showBackdrop = false;
  shouldPropagate = false;
  title = 'TITLEAUTHORIZATION';
  step = 1;
  fromSummary = false;
  authorization: Authorization = new Authorization();
  modalAuthorization = false;
  modalMap = {modal: false, nroAddress: 0, position: {latitude: 0, logitude: 0}};
  contactDetail: ContactDetail = new ContactDetail();
  fiscalDataReward: FiscalDataReward = new FiscalDataReward();
  description: Description = new Description();
  summary: SummaryRegCompany = new SummaryRegCompany();

  constructor( ) { }

  ngOnInit() {
    this.getTitle(this.step);
  }

  getTitle(stepNumber: number) {
    switch (stepNumber) {
      case 1:
        this.title = 'TITLEAUTHORIZATION';
        break;
      case 2:
        this.title = 'TITLECONTACT';
        break;
      case 3:
        this.title = 'TITLEFISCALDATA';
        break;
      case 4:
        this.title = 'TITLEDESCRIPTION';
        break;
      case 5:
        this.title = '';
        break;
      default:
        this.title = 'TITLEAUTHORIZATION';
    }
  }

  setStepNumber(stepNumber: number) {
    this.step = stepNumber;
  }

  backStepNumber(stepNumber: number) {
    this.step = stepNumber;
    this.getTitle(this.step);
  }

  getAuthorization(authorization: Authorization) {
    this.authorization = authorization;
    this.summary.authorization = this.authorization;
  }

  continue(step: number) {
    this.step = step;
    this.getTitle(this.step);
  }

  getModalAuthorization(res: boolean) {
    this.modalAuthorization = res;
  }

  getContactDetail(res: ContactDetail) {
    this.contactDetail = res;
    this.summary.contactDetail = this.contactDetail;
  }

  getFiscalDataReward(res: FiscalDataReward) {
    this.fiscalDataReward = res;
    this.summary.fiscalData = this.fiscalDataReward;
  }

  getDescription(res: Description) {
    this.description = res;
    this.summary.description = this.description;
  }

  getFromSummary(res: boolean) {
    this.fromSummary = res;
  }

  getModalMap(res: any) {
    this.modalMap = res;
    if (!res.cancel) {
      if (res.nroAddress === 1) {
        this.fiscalDataReward.legalAddress = res.address;
        this.fiscalDataReward.geoLegalAddress.latitude = res.position.latitude;
        this.fiscalDataReward.geoLegalAddress.longitude = res.position.longitude;
        const arrayLegalAddress = this.fiscalDataReward.legalAddress.split(',');
        // this.fiscalDataReward.legalCountry = arrayLegalAddress[arrayLegalAddress.length - 1].substring(1);
      }
      if (res.nroAddress === 2) {
        this.fiscalDataReward.operativeAddress = res.address;
        this.fiscalDataReward.geoOperativeAddress.latitude = res.position.latitude;
        this.fiscalDataReward.geoOperativeAddress.longitude = res.position.longitude;
        const arrayOperativeAddress = this.fiscalDataReward.operativeAddress.split(',');
        // this.fiscalDataReward.operativeCountry = arrayOperativeAddress[arrayOperativeAddress.length - 1].substring(1);
      }
    }
  }

}





