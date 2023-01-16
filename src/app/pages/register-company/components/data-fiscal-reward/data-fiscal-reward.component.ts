import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CompanyLegalForm } from 'src/app/models/register-company/companyLegalForm.model';
import { FiscalDataReward } from 'src/app/models/register-company/fiscalDataRewars.model';
import { ServicesRegCompany } from '../../../../services/reg-company.service';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { SummaryRegCompany } from 'src/app/models/register-company/summaryRegCompany.model';

@Component({
  selector: 'app-data-fiscal-reward',
  templateUrl: './data-fiscal-reward.component.html',
  styleUrls: ['./data-fiscal-reward.component.scss'],
})
export class DataFiscalRewardComponent implements OnInit {

  @Input ('fiscalDataReward') fiscalDataReward: FiscalDataReward = new FiscalDataReward();
  @Input ('stepNumber') stepNumber = 0;
  @Input ('fromSummary') fromSummary = false;
  @Input ('summary') summary: SummaryRegCompany;
  @Output ('nextStepNumber') nextStepNumber: EventEmitter<number> = new EventEmitter<number>();
  @Output ('setFiscalDataReward') setFiscalDataReward: EventEmitter<FiscalDataReward> = new EventEmitter<FiscalDataReward>();
  @Output('setModalMap') setModalMap: EventEmitter<any> = new EventEmitter<any>();
  legalForms: CompanyLegalForm[] = [];
  titleAlertReward: string;
  messageAlertReward: string;
  messageAlertReward2: string;

  constructor(
    private servicesRegCompany: ServicesRegCompany,
    private alertController: AlertController,
    private translate: TranslateService
  ) { 
    this.translate.get('ETIXREWARD').subscribe(value => {
      this.titleAlertReward = value;
    });
    this.translate.get('INDICATEPERCENTAGE').subscribe(value => {
      this.messageAlertReward = value;
    });
    this.translate.get('REMEMBERYOURDISCOUNT').subscribe(value => {
      this.messageAlertReward2 = value;
    });
  }

  ngOnInit() {
    this.getDataSummary();
    // this.getLegalForms('IT');
    this.getLegalForms(this.summary.contactDetail.contryISO);
    this.infoTaxReward();
  }

  async infoTaxReward() {
    const alert = await this.alertController.create({
      cssClass: 'modal-info',
      mode: 'ios',
      header: this.titleAlertReward,
      subHeader: this.messageAlertReward,
      message: this.messageAlertReward2,
      buttons: ['OK']
    });
    await alert.present();
    await alert.onDidDismiss();
  }

  getLegalForms(contryISO: string) {
    this.servicesRegCompany.getLegalForm(contryISO).subscribe(
      (response) => {
        this.legalForms = response.data;
      }
    );
  }

  getDataLegalForm() {
    const dataLegalForm = this.legalForms.find( legalForm => legalForm.id == this.fiscalDataReward.legalForm);
    if (dataLegalForm) {
      this.fiscalDataReward.legalFormCode = dataLegalForm.empresa_forma_legalCODIGO;
    }
  }

  checkAddress() {
    if (this.fiscalDataReward.checkAddress) {
      this.fiscalDataReward.operativeAddress = this.fiscalDataReward.legalAddress;
      this.fiscalDataReward.geoOperativeAddress = this.fiscalDataReward.geoLegalAddress;
    } else {
      this.fiscalDataReward.operativeAddress = '';
      this.fiscalDataReward.geoOperativeAddress = {latitude: 0, longitude: 0};
    }
  }

  continue() {
    if (this.fromSummary) {
      this.nextStepNumber.emit(5);
    } else {
      let stepNumber = this.stepNumber + 1;
      if (stepNumber > 5) {
        stepNumber = 5;
      }
      this.nextStepNumber.emit(stepNumber);
    }
    this.setFiscalDataReward.emit(this.fiscalDataReward);
  }

  modalMap(modal: boolean, nroAddress: number) {
    let address = '';
    let position: any = {}
    if (nroAddress === 1) {
      address = this.fiscalDataReward.legalAddress;
      position = {
        latitude: this.fiscalDataReward.geoLegalAddress.latitude,
        longitude: this.fiscalDataReward.geoLegalAddress.longitude
      }
    }

    if (nroAddress === 2) {
      address = this.fiscalDataReward.operativeAddress;
      position = {
        latitude: this.fiscalDataReward.geoOperativeAddress.latitude,
        longitude: this.fiscalDataReward.geoOperativeAddress.longitude
      }
    }

    this.setModalMap.emit({
      modal,
      nroAddress,
      address: address,
      position: position
    });
  }
  
  getDataSummary() {
    if (this.summary.authorization.category) {
      this.fiscalDataReward.linkWebSide = this.summary.authorization.linkWebSide;
    }
    this.fiscalDataReward.suggestedReward = this.summary.authorization.discountCategory;
  }

}
