import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ContactDetail } from 'src/app/models/register-company/contactDetail.model';
import { ServicesRegCompany } from '../../../../services/reg-company.service';
import { CountryAuthorized } from '../../../../models/register-company/countryAuthorized.model';
import { AlertController } from '@ionic/angular';
import { ResponseSendSMS } from '../../../../models/register-company/responseSendSMS.model';
import { CargandoService } from 'src/app/services/cargando.service';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss'],
})
export class ContactDetailComponent implements OnInit {

  isEmail = false;
  // sendCode = false;
  minutes = '00';
  seconds = '00';
  receivedCode = false;
  finalTime = false;
  // verifiedCode = false;
  digit1 = '';
  digit2 = '';
  digit3 = '';
  digit4 = '';
  digit5 = '';
  digit6 = '';
  countries: CountryAuthorized[] = [];
  interval: any;
  dataSMS: ResponseSendSMS;
  verifying = false;
  loading: any;
  invalidMail = '';
  message = '';
  @Input ('contactDetail') contactDetail: ContactDetail = new ContactDetail();
  @Input ('stepNumber') stepNumber = 0;
  @Input ('fromSummary') fromSummary = false;
  @Output ('nextStepNumber') nextStepNumber: EventEmitter<number> = new EventEmitter<number>();
  @Output ('setContactDetail') setContactDetail: EventEmitter<ContactDetail> = new EventEmitter<ContactDetail>();
  @ViewChild('input1') input1;
  @ViewChild('input2') input2;
  @ViewChild('input3') input3;
  @ViewChild('input4') input4;
  @ViewChild('input5') input5;
  @ViewChild('input6') input6;

  constructor(
    private servicesRegCompany: ServicesRegCompany,
    private alertController: AlertController,
    private cargandoService: CargandoService,
    private translate: TranslateService
  ) {
    this.translate.get('EMAILINVALID').subscribe(value => {
      this.invalidMail = value;
    });

    this.translate.get('MESSAGE').subscribe(value => {
      this.message = value;
    });
   }

  ngOnInit() {
    this.getCountries();
    if (this.contactDetail.sendCode && !this.contactDetail.verifiedCode) {
      this.finalTime = true;
    }
  }

  getCountries() {
    this.servicesRegCompany.getCountries().subscribe(
      (response) => {
        this.countries = response.data;
        const language = localStorage.getItem('lenguaje');
        const codeCountry = language;
        if (!this.contactDetail.codeCountry) {
          const country = this.countries.find( coun => coun.paisISO2 === codeCountry);
          if (country) {
            this.contactDetail.codeCountry = country.id;
            this.contactDetail.contryISO = country.paisISO2;
          } else {
            this.contactDetail.codeCountry = 107;
            this.contactDetail.contryISO = 'IT';
          }
        }
      }
    );
  }

  getContryISO() {
    const country = this.countries.find( coun => coun.id == this.contactDetail.codeCountry);
    if (country) {
      this.contactDetail.contryISO = country.paisISO2;
    } else {
      this.contactDetail.contryISO = 'IT';
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
    const codePhone = this.countries.find( country => country.id == this.contactDetail.codeCountry);
    this.contactDetail.phoneFull = '+' + codePhone.paisINDICATIVO + this.contactDetail.phone;
    // this.contactDetail.codeCompany = this.dataSMS.data.empresaCODIGO;
    this.setContactDetail.emit(this.contactDetail);
  }

  validateEmail(email: string) {
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    this.isEmail = regex.test(email) ? true : false;
  }

  timeLeft() {
    this.cargandoService.iniciaCargando();
    this.contactDetail.code.digit1 = '';
    this.contactDetail.code.digit2 = '';
    this.contactDetail.code.digit3 = '';
    this.contactDetail.code.digit4 = '';
    this.contactDetail.code.digit5 = '';
    this.contactDetail.code.digit6 = '';
    this.receivedCode = false;
    this.finalTime = false;
    this.contactDetail.verifiedCode = false;
    if (this.input1) this.input1.setFocus();
    const dataCountry = this.countries.find( country => country.id == this.contactDetail.codeCountry);
    let phone = this.contactDetail.phone
    if (dataCountry) {
      phone = dataCountry.paisINDICATIVO + this.contactDetail.phone
    } 

    let date = new Date(moment('1900/01/01 00:01:30').format("YYYY/MM/DD HH:mm:ss"));
    const padLeft = n => "00".substring(0, "00".length - n.length) + n;
    this.interval = setInterval(() => {
      this.minutes = padLeft(date.getMinutes() + "");
      this.seconds = padLeft(date.getSeconds() + "");
      date = new Date(date.getTime() - 1000);
      date = new Date(moment(date).format("YYYY/MM/DD HH:mm:ss"));
      if( this.minutes == '00' && this.seconds == '00' ) {
        this.finalTime = true;
        clearInterval(this.interval); 
      }
    }, 1000);

    this.servicesRegCompany.sendSMS(phone).subscribe(
      (response) => {
        this.contactDetail.sendCode = true;
        this.dataSMS = response;
        this.contactDetail.codeCompany = this.dataSMS.data.empresaCODIGO;
        this.cargandoService.terminaCargando();
      },
      () => {
        this.cargandoService.terminaCargando();
      }
    );
  }

  convertDateForIos(date) {
    var arr = date.split(/[- :]/);
    date = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);
    return date;
  }

  codeRecived(nroInput: number) {
    if (!this.contactDetail.verifiedCode) {
      if (nroInput == 1 && this.contactDetail.code.digit1) this.input2.setFocus();
      if (nroInput == 2 && this.contactDetail.code.digit2) this.input3.setFocus();
      if (nroInput == 3 && this.contactDetail.code.digit3) this.input4.setFocus();
      if (nroInput == 4 && this.contactDetail.code.digit4) this.input5.setFocus();
      if (nroInput == 5 && this.contactDetail.code.digit5) this.input6.setFocus();
      if (this.contactDetail.code.digit1 && this.contactDetail.code.digit2 && this.contactDetail.code.digit3 && this.contactDetail.code.digit4 && this.contactDetail.code.digit5 && this.contactDetail.code.digit6) {
        this.verifying = true;
        const code = this.contactDetail.code.digit1 + this.contactDetail.code.digit2 + this.contactDetail.code.digit3 + this.contactDetail.code.digit4 + this.contactDetail.code.digit5 + this.contactDetail.code.digit6;
        this.cargandoService.iniciaCargando();
        this.servicesRegCompany.verifyCodeSMS({empresaTOKEN: code, empresaCODIGO: this.contactDetail.codeCompany}).subscribe(
          (response: any) => {
            if (response.success) {
              this.contactDetail.verifiedCode = true;
              this.finalTime = true;
              clearInterval(this.interval); 
              this.verifying = false;
            } 
            this.cargandoService.terminaCargando();
          },
          () => {
            this.contactDetail.verifiedCode = false;
            this.finalTime = true;
            clearInterval(this.interval); 
            this.verifying = false;
            this.cargandoService.terminaCargando();
          }
        );
      }
    }
  }

  validatedEmail() {
    this.servicesRegCompany.validatedEmail(this.contactDetail.email).subscribe(
      (response: any) => {
        if (response.data) {
          this.infoEmail();
          this.contactDetail.email = '';
        }
      }
    );
  }

  async infoEmail() {
    const alert = await this.alertController.create({
      cssClass: 'modal-info',
      mode: 'ios',
      header: this.message,
      message: this.invalidMail,
      buttons: ['OK']
    });
    await alert.present();
    await alert.onDidDismiss();
  }

}
