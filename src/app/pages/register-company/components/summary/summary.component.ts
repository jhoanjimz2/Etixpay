import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CompanyCategory } from 'src/app/models/register-company/categoryCompany.model';
import { ServicesRegCompany } from 'src/app/services/reg-company.service';
import { SummaryRegCompany } from '../../../../models/register-company/summaryRegCompany.model';
import { RequestRegCompany } from '../../../../models/register-company/requetsRegCompany.model';
import { CargandoService } from 'src/app/services/cargando.service';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {

  @Input ('summary') summary: SummaryRegCompany = new SummaryRegCompany();
  @Input ('stepNumber') stepNumber = 0;
  @Output ('nextStepNumber') nextStepNumber: EventEmitter<number> = new EventEmitter<number>();
  @Output ('setSummary') setSummary: EventEmitter<SummaryRegCompany> = new EventEmitter<SummaryRegCompany>();
  @Output ('fromSummary') fromSummary: EventEmitter<boolean> = new EventEmitter<boolean>();
  categories: CompanyCategory[] = [];
  idLanguage = '';
  requestRegCompany: RequestRegCompany = new RequestRegCompany();
  message = '';
  messageNotSaved = ''
  communityCode = '';

  constructor(
    private servicesRegCompany: ServicesRegCompany,
    private cargandoService: CargandoService,
    private alertController: AlertController,
    private translate: TranslateService
  ) { 
    this.translate.get('MESSAGE').subscribe(value => {
      this.message = value;
    });
    this.translate.get('NOTSAVED').subscribe(value => {
      this.messageNotSaved = value;
    });
  }

  ngOnInit() {
    this.getCategoriesCompanys();
    const user = JSON.parse(localStorage.getItem('user'));
    this.communityCode = user.username;
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

  continue() {
    this.cargandoService.iniciaCargando();

    // Athorization
    this.requestRegCompany.empresaTIENDAONLINE = this.summary.authorization.typeStore === 1 ? '1' : '0';          
    this.requestRegCompany.empresaCATEGORIA = this.summary.authorization.idCategory;              
    this.requestRegCompany.empresaPAGINAWEB = this.summary.authorization.linkWebSide;               
    
    // Contact
    this.requestRegCompany.empresaEMAIL = this.summary.contactDetail.email;
    this.requestRegCompany.empresaTELEFONO = this.summary.contactDetail.phone;
    this.requestRegCompany.empresaCOMMUNITYCODE = this.communityCode;
    this.requestRegCompany.empresaCODIGO = this.summary.contactDetail.codeCompany;
    
    // Fiscal data
    this.requestRegCompany.empresaNOMBRE = this.summary.fiscalData.companyName;
    this.requestRegCompany.empresaREPRESENTANTELEGAL = this.summary.fiscalData.legalRepresentative;
    this.requestRegCompany.companyRepresentative = this.summary.authorization.isRepresentativeLegal === 'NO' ? false : true;
    this.requestRegCompany.empresa_forma_legalID = this.summary.fiscalData.legalForm.toString();
    this.requestRegCompany.empresaNIT = this.summary.fiscalData.taxNumber;
    this.requestRegCompany.empresaDIRECCIONLEGAL =  this.summary.fiscalData.legalAddress;     
    // this.requestRegCompany.empresaPAISLEGAL = this.summary.fiscalData.legalCountry
    this.requestRegCompany.empresaLONGITUDLEGAL = this.summary.fiscalData.geoLegalAddress.longitude.toString();                
    this.requestRegCompany.empresaLATITUDLEGAL = this.summary.fiscalData.geoLegalAddress.latitude.toString();
    this.requestRegCompany.empresaDIRECCION =  this.summary.fiscalData.operativeAddress; 
    // this.requestRegCompany.empresaPAIS = this.summary.contactDetail.codeCountry.toString();    
    this.requestRegCompany.empresaLONGITUD = this.summary.fiscalData.geoOperativeAddress.longitude.toString();                
    this.requestRegCompany.empresaLATITUD = this.summary.fiscalData.geoOperativeAddress.latitude.toString();
    this.requestRegCompany.empresaDIRECCIONIGUAL = this.summary.fiscalData.checkAddress ? '1' : '0';                   
    this.requestRegCompany.empresaDESCUENTOCASHBACK = this.summary.fiscalData.rewardEtix.toString();
    this.requestRegCompany.empresaGANANCIAETIX = this.summary.fiscalData.suggestedReward.toString();
    
    // Description
    this.requestRegCompany.empresaNOMBREMAP = this.summary.description.brandName;
    this.requestRegCompany.empresaDESCRIPCION = this.summary.description.companyDescription;
    this.requestRegCompany.empresaFOTO = this.summary.description.previewPhoto;   
    this.requestRegCompany.empresaFOTOPRINCIPALRECTANGULAR = this.summary.description.coverPhoto;
    this.requestRegCompany.empresaFOTOPRINCIPALCUADRADA = this.summary.description.smallPhoto;
    this.requestRegCompany.empresasImagenes = [
      this.summary.description.photosProfile.photo1,
      this.summary.description.photosProfile.photo2,
      this.summary.description.photosProfile.photo3,
      this.summary.description.photosProfile.photo4,
      this.summary.description.photosProfile.photo5
    ];
    this.requestRegCompany.empresaREFERENCIACOMERCIAL = ''
    
    // console.log('this.requestRegCompany', JSON.stringify(this.requestRegCompany));
    this.servicesRegCompany.saveCompany(this.requestRegCompany).subscribe(
      (response) => {
        this.cargandoService.terminaCargando();
        let stepNumber = this.stepNumber + 1;
        if (stepNumber > 6) {
          stepNumber = 6;
        }
        this.nextStepNumber.emit(stepNumber);
        this.setSummary.emit(this.summary);
      },
      (error) => {
        console.log(error);
        this.cargandoService.terminaCargando();
        this.info();
      }
    );
  }

  editInfo(stepNUmber: number) {
    this.nextStepNumber.emit(stepNUmber);
    this.fromSummary.emit(true);
  }

  async info() {
    const alert = await this.alertController.create({
      cssClass: 'modal-info',
      mode: 'ios',
      header: this.message,
      message: this.messageNotSaved,
      buttons: ['OK']
    });
    await alert.present();
    await alert.onDidDismiss();
  }

}