import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CardRecompensaComponent } from '../card-recompensa/card-recompensa.component';
import { PopoverController } from '@ionic/angular';
import { DataFiscal } from 'src/app/models/register-expert/dataFiscal.model';
import { ModalMapComponent } from '../modal-map/modal-map.component';
import { ExpertsService } from '../../../../../services/experts.service';
import { ProfesionalID } from 'src/app/models/register-expert/profesionalID.model';
import { CargandoService } from '../../../../../services/cargando.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

@Component({
  selector: 'app-data-fiscal',
  templateUrl: './data-fiscal.component.html',
  styleUrls: ['./data-fiscal.component.scss'],
})
export class DataFiscalComponent implements OnInit {
  @Output()funcion :EventEmitter<any> = new EventEmitter();
  @Input() dataFiscal: DataFiscal = new DataFiscal();
  @Input() profesionalID: ProfesionalID = new ProfesionalID();
  @Input() final;
  @Input() sitioWeb = '';
  formaJuridica: any = [];
  direccionOperativa = '';
  disabledLink: boolean = false;

  constructor(
    private popoverController: PopoverController,
    private expertsService: ExpertsService,
    private cargandoService: CargandoService
  ) { 
    this.expertsService.getFormaJuridica().subscribe((data: any) => {
      this.formaJuridica = data.data;
    })
  }

  ngOnInit() {}

  ngOnChanges() {
    if (this.sitioWeb) this.disabledLink = true;
    else this.disabledLink = false;
    this.direccionOperativa = this.dataFiscal.operativeAddress.addressMAIN;
  }
  soloNumero() {
    let valor_input = this.dataFiscal.profesionalTAXNUMBER;
    this.dataFiscal.profesionalTAXNUMBER = valor_input
      //Elimina espacios
      .replace(/\s/g, '')
      //Elimina las letras
      .replace(/\D/g, '')
      //Elimina ultimo espaciado
      .trim();
  }

  continuar() {
    this.cargandoService.iniciaCargando();
    this.expertsService.preRegisterInfoProfesional(this.dataFiscal, this.profesionalID.profesionalID).subscribe((data: any) => {
      this.cargandoService.terminaCargando();
      this.funcion.emit({opcion: 4});
    }, error => {
      this.Alert(error.error.message, 'OK', true);
      this.cargandoService.terminaCargando();
    })
  }
  volverAlFinal() {
    this.cargandoService.iniciaCargando();
    this.expertsService.preRegisterInfoProfesional(this.dataFiscal, this.profesionalID.profesionalID).subscribe((data: any) => {
      this.cargandoService.terminaCargando();
      this.final.final = false;
      this.funcion.emit({opcion: 5});
    }, error => {
      this.Alert(error.error.message, 'OK', true);
      this.cargandoService.terminaCargando();
    })
  }
  setearCheck(tipo = false, event?) {
    if (!tipo) {
      if (this.dataFiscal.isLegalEqualsOperativeAddress == 0) this.dataFiscal.isLegalEqualsOperativeAddress = 1;
      else this.dataFiscal.isLegalEqualsOperativeAddress = 0;
    }
    else {
      if (event.detail.checked) this.dataFiscal.isLegalEqualsOperativeAddress = 1;
      else this.dataFiscal.isLegalEqualsOperativeAddress = 0;
    }
  }
  async authorizar() {
    const popover = await this.popoverController.create({
      component: CardRecompensaComponent,
      cssClass: 'popover_central_authorizar',
      translucent: false,
      backdropDismiss: false
    });
    await popover.present();
    const { data } = await popover.onDidDismiss();
    if (data.data) this.continuar();
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
      this.dataFiscal.legalAddress.addressLATITUD = data.lat;
      this.dataFiscal.legalAddress.addressLONGITUD = data.lng;
      this.dataFiscal.legalAddress.addressMAIN = data.address;
    } else if (type == 2) {
      this.dataFiscal.operativeAddress.addressLATITUD = data.lat;
      this.dataFiscal.operativeAddress.addressLONGITUD = data.lng;
      this.dataFiscal.operativeAddress.addressMAIN = data.address;
      this.direccionOperativa = data.address;
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
