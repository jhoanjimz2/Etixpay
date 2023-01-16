import { Component, Input, OnInit } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';
import { Code } from 'src/app/models/register-expert/code.model';
import { CreateUser } from 'src/app/models/register-expert/createUser';
import { DataFiscal } from 'src/app/models/register-expert/dataFiscal.model';
import { DataMapa } from 'src/app/models/register-expert/dataMapa.model';
import { PreRegistro } from 'src/app/models/register-expert/preRegistro.model';
import { ProfesionalID } from 'src/app/models/register-expert/profesionalID.model';
import { ExpertsService } from 'src/app/services/experts.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { CargandoService } from '../../../services/cargando.service';
import { EstadoUser } from '../../../models/register-expert/estado.model';
import { CamaraService } from '../../../services/camara.service';

@Component({
  selector: 'app-profesional-register',
  templateUrl: './profesional-register.page.html',
  styleUrls: ['./profesional-register.page.scss'],
})
export class ProfesionalRegisterPage implements OnInit {
  final = {
    final: false
  }

  step: number = 1;
  authorization: boolean = false;
  savePre;


  preRegistro: PreRegistro = new PreRegistro();
  contactDetail: CreateUser = new CreateUser();
  dataFiscal: DataFiscal = new DataFiscal();
  dataMapa: DataMapa = new DataMapa();
  codigo: Code = new Code();
  profesionalID: ProfesionalID = new ProfesionalID();
  estado: EstadoUser = new EstadoUser();
  galeriaHTML = {
    imgPrincipal: '',
    imgSecundaria: '',
    imgTerciaria: '',
    galeria: ['','','','','']
  }
  

  
  constructor(
    private expertsService: ExpertsService,
    private cargandoService: CargandoService,
    private popoverController: PopoverController,
    private navCtrl: NavController,
    private camaraService: CamaraService
  ) { }

  ngOnInit() {
    this.cargandoService.iniciaCargando();
    setTimeout(() => {
      this.cargarInfoRegistrada();
    }, 3000)
  }

  cargarInfoRegistrada() {
    this.expertsService.getDataRegisterProfesional().subscribe((data:any) => {
      if(data.data != null){
        this.estado.EstadoUser = data.data.profesionalREGISTERSTATUS.toString();
        if(this.estado.EstadoUser == 'pre-register-completed') this.preRegisterCompleted(data);
        if(this.estado.EstadoUser == 'user-register') this.userRegister(data);
        if(this.estado.EstadoUser == 'user-active') this.userActive(data);
        if(this.estado.EstadoUser == 'information-completed') this.informationCompleted(data);
        if(this.estado.EstadoUser == 'summary') this.summary(data);
      }
      this.cargandoService.terminaCargando();
    });
  }
  preRegisterCompleted(data) {
    if (!data.data.user_representative_id) this.preRegistro.isRepresentative = 0;
    else this.preRegistro.isRepresentative = 1;
    this.preRegistro.profesionalisSERVICEVIRTUAL = data.data.profesionalisSERVICEVIRTUAL;
    this.preRegistro.proffesions[0].proffesionID = data.data.professions_data[0].id.toString();
    data.data.professions_data[0].services.forEach(element => this.preRegistro.proffesions[0].services.push(element.id.toString()));
    this.preRegistro.profesionalWEB = data.data.profesionalWEB;
    this.profesionalID.profesionalID = data.data.id;
    this.step = 2;
  }
  userRegister(data) {
    if (!data.data.user_representative_id) this.preRegistro.isRepresentative = 0;
    else this.preRegistro.isRepresentative = 1;
    this.preRegistro.profesionalisSERVICEVIRTUAL = data.data.profesionalisSERVICEVIRTUAL;
    this.preRegistro.proffesions[0].proffesionID = data.data.professions_data[0].id.toString();
    data.data.professions_data[0].services.forEach(element => this.preRegistro.proffesions[0].services.push(element.id.toString()));
    this.preRegistro.profesionalWEB = data.data.profesionalWEB;
    this.profesionalID.profesionalID = data.data.id;
    this.contactDetail.countryID = data.data.countryID;
    this.contactDetail.email = data.data.email_user;
    this.contactDetail.phone = data.data.profesionalPHONE;
    this.step = 2;
  }
  userActive(data) {
    if (!data.data.user_representative_id) this.preRegistro.isRepresentative = 0;
    else this.preRegistro.isRepresentative = 1;
    this.preRegistro.profesionalisSERVICEVIRTUAL = data.data.profesionalisSERVICEVIRTUAL;
    this.preRegistro.proffesions[0].proffesionID = data.data.professions_data[0].id.toString();
    data.data.professions_data[0].services.forEach(element => this.preRegistro.proffesions[0].services.push(element.id.toString()));
    this.preRegistro.profesionalWEB = data.data.profesionalWEB;
    this.profesionalID.profesionalID = data.data.id;
    this.contactDetail.countryID = data.data.countryID;
    this.contactDetail.email = data.data.email_user;
    this.contactDetail.phone = data.data.profesionalPHONE;
    this.step = 3;
  }
  informationCompleted(data) {
    if (!data.data.user_representative_id) this.preRegistro.isRepresentative = 0;
    else this.preRegistro.isRepresentative = 1;
    this.preRegistro.profesionalisSERVICEVIRTUAL = data.data.profesionalisSERVICEVIRTUAL;
    this.preRegistro.proffesions[0].proffesionID = data.data.professions_data[0].id.toString();
    data.data.professions_data[0].services.forEach(element => this.preRegistro.proffesions[0].services.push(element.id.toString()));
    this.preRegistro.profesionalWEB = data.data.profesionalWEB;
    this.profesionalID.profesionalID = data.data.id;
    this.contactDetail.countryID = data.data.countryID;
    this.contactDetail.email = data.data.email_user;
    this.contactDetail.phone = data.data.profesionalPHONE;
    if(!data.data.operative_address) {
      this.dataFiscal.isLegalEqualsOperativeAddress = 1; 
      this.dataFiscal.operativeAddress.addressLATITUD = data.data.legal_address.latitud;
      this.dataFiscal.operativeAddress.addressLONGITUD = data.data.legal_address.longitud;
      this.dataFiscal.operativeAddress.addressMAIN = data.data.legal_address.address;
    } else {
      this.dataFiscal.isLegalEqualsOperativeAddress = 0; 
      this.dataFiscal.operativeAddress.addressLATITUD = data.data.operative_address.latitud;
      this.dataFiscal.operativeAddress.addressLONGITUD = data.data.operative_address.longitud;
      this.dataFiscal.operativeAddress.addressMAIN = data.data.operative_address.address;
    }
    this.dataFiscal.legalAddress.addressLATITUD = data.data.legal_address.latitud;
    this.dataFiscal.legalAddress.addressLONGITUD = data.data.legal_address.longitud;
    this.dataFiscal.legalAddress.addressMAIN = data.data.legal_address.address;
    this.dataFiscal.legal_form_id = data.data.legal_form_id;
    this.dataFiscal.profesionalREPRESENTATIVENAME = data.data.profesionalREPRESENTATIVENAME;
    this.dataFiscal.profesionalTAXNUMBER = data.data.profesionalTAXNUMBER;
    this.step = 4;
  }
  summary(data) {
    if (!data.data.user_representative_id) this.preRegistro.isRepresentative = 0;
    else this.preRegistro.isRepresentative = 1;
    this.preRegistro.profesionalisSERVICEVIRTUAL = data.data.profesionalisSERVICEVIRTUAL;
    this.preRegistro.proffesions[0].proffesionID = data.data.professions_data[0].id.toString();
    data.data.professions_data[0].services.forEach(element => this.preRegistro.proffesions[0].services.push(element.id.toString()));
    this.preRegistro.profesionalWEB = data.data.profesionalWEB;
    this.profesionalID.profesionalID = data.data.id;
    this.contactDetail.countryID = data.data.countryID;
    this.contactDetail.email = data.data.email_user;
    this.contactDetail.phone = data.data.profesionalPHONE;
    if(!data.data.operative_address) {
      this.dataFiscal.isLegalEqualsOperativeAddress = 1; 
      this.dataFiscal.operativeAddress.addressLATITUD = data.data.legal_address.latitud;
      this.dataFiscal.operativeAddress.addressLONGITUD = data.data.legal_address.longitud;
      this.dataFiscal.operativeAddress.addressMAIN = data.data.legal_address.address;
    } else {
      this.dataFiscal.isLegalEqualsOperativeAddress = 0; 
      this.dataFiscal.operativeAddress.addressLATITUD = data.data.operative_address.latitud;
      this.dataFiscal.operativeAddress.addressLONGITUD = data.data.operative_address.longitud;
      this.dataFiscal.operativeAddress.addressMAIN = data.data.operative_address.address;
    }
    this.dataFiscal.legalAddress.addressLATITUD = data.data.legal_address.latitud;
    this.dataFiscal.legalAddress.addressLONGITUD = data.data.legal_address.longitud;
    this.dataFiscal.legalAddress.addressMAIN = data.data.legal_address.address;
    this.dataFiscal.legal_form_id = data.data.legal_form_id;
    this.dataFiscal.profesionalREPRESENTATIVENAME = data.data.profesionalREPRESENTATIVENAME;
    this.dataFiscal.profesionalTAXNUMBER = data.data.profesionalTAXNUMBER;
    this.dataMapa.profesionalDESRIPTION = data.data.profesionalDESRIPTION;
    this.dataMapa.profesionalNAMEMAP = data.data.profesionalNAMEMAP;
    this.galeriaHTML.imgPrincipal = data.data.main_image;
    this.galeriaHTML.imgSecundaria = data.data.square_image;
    this.galeriaHTML.imgTerciaria = data.data.rectangular_image;
    if(data.data.gallery) {
      this.galeriaHTML.galeria = data.data.gallery;
      for (let i = data.data.gallery.length; i < 5; i++) {
        this.galeriaHTML.galeria.push('')
      }
    }
    this.step = 5;
  }

  autorizar(event) {
    this.savePre = event;
    this.authorization = true;
  }

  aprobado(event) {
    this.authorization = false;
    if (event) {
      this.savePre = event;
      this.preRegistro_(this.savePre);
    }
  }
  
  funcion(event) {
    this.step = event.opcion;
  }

  preRegistro_(event) {
    this.cargandoService.iniciaCargando();
    this.expertsService.preRegistro(this.preRegistro, this.profesionalID.profesionalID).subscribe((data: any) => {
      this.cargandoService.terminaCargando();
      this.profesionalID.profesionalID = data.data.id;
      this.step = event.opcion;
    }, error => {
      this.cargandoService.terminaCargando();
      this.navCtrl.back();
      this.Alert(error.error.message, 'OK', true);
    })
  }
  setContactDetail(event) {
    this.step = event.opcion;
  }
  setDataFiscal(event) {
    this.step = event.opcion;
  }
  setMapaDesFoto(event) {
    this.step = event.opcion;
  }
  resumen(event) {
    this.step = event.opcion;
  }
  async Alert(tex, bot, tipo) {
    const popover = await this.popoverController.create({
      component: AlertComponent,
      cssClass: 'popover_central',
      mode: 'ios',
      componentProps: {
        texto: tex,
        boton: bot,
        img: tipo
      },
      translucent: false,
      backdropDismiss: false
    });
    return await popover.present();
  }

}
