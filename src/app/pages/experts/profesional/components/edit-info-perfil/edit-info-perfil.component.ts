import { Component, OnInit,Input, EventEmitter, Output } from '@angular/core';
import { Profesional } from '../../interface/experts.model';
import { PopoverController } from '@ionic/angular';
import { ExpertsService } from '../../../../../services/experts.service';
import { EditProfesional } from '../../interface/editExperts.model';
import { ModalMapComponent } from '../../../profesional-register/components/modal-map/modal-map.component';
import { CargandoService } from '../../../../../services/cargando.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

@Component({
  selector: 'app-edit-info-perfil',
  templateUrl: './edit-info-perfil.component.html',
  styleUrls: ['./edit-info-perfil.component.scss'],
})
export class EditInfoPerfilComponent implements OnInit {
  @Input() profesional: Profesional = new Profesional();
  @Input() uuid: string;
  @Output() editado: EventEmitter<any> = new EventEmitter();
  @Input() activar = { editar: false };
  editProfesional: EditProfesional = new EditProfesional();
  profesions: any[] = [];
  services: any[] = [];
  formaJuridica: any = [];
  countries = [];
  direccionOperativa = '';
  constructor(
    private popoverController: PopoverController,
    private expertsService: ExpertsService,
    private cargandoService: CargandoService
  ) { }

  ngOnInit() {
    this.cargandoService.iniciaCargando();
    this.getCountries();
    this.getDataFiscal();
    this.getProfesions();
    this.getServiceByProfesions();
  }

  preCargarData() {
    let id = '';
    id = this.profesional.professions_data[0].id;
    this.editProfesional.proffesions[0].proffesionID = id;
    let array = [];
    this.profesional.professions_data[0].services.forEach(service => array.push(service.id));
    this.editProfesional.proffesions[0].services = array;
    this.editProfesional.legal_form_id = this.profesional.legal_form_id;
    this.editProfesional.profesionalREPRESENTATIVENAME = this.profesional.profesionalREPRESENTATIVENAME;
    this.editProfesional.profesionalTAXNUMBER = this.profesional.profesionalTAXNUMBER;
    this.editProfesional.profesionalNAMEMAP = this.profesional.profesionalNAMEMAP;
    this.editProfesional.profesionalDESRIPTION = this.profesional.profesionalDESRIPTION;
    this.editProfesional.profesionalEMAIL = this.profesional.email_user;
    this.editProfesional.profesionalWEB = this.profesional.profesionalWEB;
    this.editProfesional.country_id = this.profesional.countryID;
    this.editProfesional.profesionalPHONE = this.profesional.profesionalPHONE;
    this.editProfesional.legalAddress.addressMAIN = this.profesional.legal_address.address;
    this.editProfesional.legalAddress.addressLATITUD = this.profesional.legal_address.latitud;
    this.editProfesional.legalAddress.addressLONGITUD = this.profesional.legal_address.longitud;
    if (this.profesional.operative_address.address) {
      this.direccionOperativa = this.profesional.operative_address.address;
      this.editProfesional.operativeAddress.addressMAIN = this.profesional.operative_address.address;
      this.editProfesional.operativeAddress.addressLATITUD = this.profesional.operative_address.latitud;
      this.editProfesional.operativeAddress.addressLONGITUD = this.profesional.operative_address.longitud;
    }
  }
  guardar() {
    this.cargandoService.iniciaCargando();
    this.expertsService.editarPerfil(this.editProfesional, this.uuid).subscribe((data: any) => {
      this.salirConActualizar();
      this.cargandoService.terminaCargando();
      this.Alert(data.message, 'OK', false);
    }, error => {
      this.cargandoService.terminaCargando();
      this.Alert(error.error.message, 'OK', true);
    })
  }



  salirSinActualizar() {
    this.popoverController.dismiss({data: false});
  }
  salirConActualizar() {
    this.popoverController.dismiss({data: true});
  }
  getProfesions() {
    this.expertsService.getProfesions().subscribe((data: any) => {
      this.profesions = data.data;
    })
  }
  getServiceByProfesions() {
    this.expertsService.getServiceByProfesions(this.profesional.professions_data[0].id).subscribe((data: any) => {
      this.services = data.data;
      setTimeout(() => {this.preCargarData();}, 500);
      this.cargandoService.terminaCargando();
    })
  }
  getServiceByProfesions2() {
    this.expertsService.getServiceByProfesions(this.editProfesional.proffesions[0].proffesionID).subscribe((data: any) => {
      this.services = data.data;
    })
  }
  getDataFiscal() {
    this.expertsService.getFormaJuridica().subscribe((data: any) => {
      this.formaJuridica = data.data;
    })
  }
  getCountries() {
    this.expertsService.getCountries().subscribe((response: any) => { 
      this.countries = response.data;
    });
  }
  soloNumero() {
    let valor_input = this.editProfesional.profesionalTAXNUMBER;
    this.editProfesional.profesionalTAXNUMBER = valor_input
      //Elimina espacios
      .replace(/\s/g, '')
      //Elimina las letras
      .replace(/\D/g, '')
      //Elimina ultimo espaciado
      .trim();
  }
  soloNumero2() {
    let valor_input = this.editProfesional.profesionalPHONE;
    this.editProfesional.profesionalPHONE = valor_input
      //Elimina espacios
      .replace(/\s/g, '')
      //Elimina las letras
      .replace(/\D/g, '')
      //Elimina ultimo espaciado
      .trim();
  }
  async map(type) {
    const popover = await this.popoverController.create({
      component: ModalMapComponent,
      cssClass: 'popover_central_authorizar',
      translucent: false,
      backdropDismiss: false
    });
    await popover.present();
    const { data } = await popover.onDidDismiss();
    if (data.data) this.setInfo(data.data, type);
  }
  setInfo(data, type) {
    if (type == 1) {
      this.editProfesional.legalAddress.addressLATITUD = data.lat;
      this.editProfesional.legalAddress.addressLONGITUD = data.lng;
      this.editProfesional.legalAddress.addressMAIN = data.address;
    } else if (type == 2) {
      this.editProfesional.operativeAddress.addressLATITUD = data.lat;
      this.editProfesional.operativeAddress.addressLONGITUD = data.lng;
      this.editProfesional.operativeAddress.addressMAIN = data.address;
      this.direccionOperativa = data.address;
    }
  }
  setearCheck(tipo = false, event?) {
    if (!tipo) {
      if (this.editProfesional.isLegalEqualsOperativeAddress == 0) this.editProfesional.isLegalEqualsOperativeAddress = 1;
      else this.editProfesional.isLegalEqualsOperativeAddress = 0;
    }
    else {
      if (event.detail.checked) this.editProfesional.isLegalEqualsOperativeAddress = 1;
      else this.editProfesional.isLegalEqualsOperativeAddress = 0;
    }
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
