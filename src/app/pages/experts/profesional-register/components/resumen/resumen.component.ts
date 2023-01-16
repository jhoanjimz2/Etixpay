import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { CreateUser } from 'src/app/models/register-expert/createUser';
import { DataFiscal } from 'src/app/models/register-expert/dataFiscal.model';
import { DataMapa } from 'src/app/models/register-expert/dataMapa.model';
import { PreRegistro } from 'src/app/models/register-expert/preRegistro.model';
import { ProfesionalID } from 'src/app/models/register-expert/profesionalID.model';
import { ExpertsService } from '../../../../../services/experts.service';
import { CargandoService } from '../../../../../services/cargando.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.scss'],
})
export class ResumenComponent implements OnInit {

  @Output() funcion :EventEmitter<any> = new EventEmitter();
  @Input()  preRegistro: PreRegistro = new PreRegistro();
  @Input()  contactDetail: CreateUser = new CreateUser();
  @Input()  dataFiscal: DataFiscal = new DataFiscal();
  @Input()  dataMapa: DataMapa = new DataMapa();
  @Input()  profesionalID: ProfesionalID = new ProfesionalID();
  @Input() final;
  profesions = [];
  countries = [];
  formasJuridicas = [];
  email = null;

  constructor(
    private expertsService: ExpertsService,
    private cargandoService: CargandoService,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) this.email = user.username;

    this.expertsService.getFormaJuridica().subscribe((data: any) => { this.formasJuridicas = data.data; });
    this.expertsService.getProfesions().subscribe((data: any) => { this.profesions = data.data; });
    this.expertsService.getCountries().subscribe((response: any) => { this.countries = response.data; });
  }

  continue(opcion) {
    this.funcion.emit({opcion});
    this.final.final = true;
  }
  success() {
    this.cargandoService.iniciaCargando();
    this.expertsService.preRegisterSuccess(this.profesionalID.profesionalID).subscribe((data:any) => {
      this.cargandoService.terminaCargando();
      this.funcion.emit({opcion: 6});
    }, error => {
      this.Alert(error.error.message, 'OK', true);
      this.cargandoService.terminaCargando();
    })
  }
  

  get profesion() {
    return this.profesions.find(profesion => profesion.id == this.preRegistro.proffesions[0].proffesionID);
  }
  get indicativo() {
    return this.countries.find(country => country.id == this.contactDetail.countryID);
  }
  get formaJuridica() {
    return this.formasJuridicas.find(formaJuridica => formaJuridica.id == this.dataFiscal.legal_form_id);
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
