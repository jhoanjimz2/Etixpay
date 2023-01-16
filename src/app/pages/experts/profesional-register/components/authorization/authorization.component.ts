import { Component, EventEmitter, Output, Input } from '@angular/core';
import { ExpertsService } from '../../../../../services/experts.service';
import { NavController, PopoverController } from '@ionic/angular';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { CargandoService } from '../../../../../services/cargando.service';
import { CardAuthorizationComponent } from '../card-authorization/card-authorization.component';
import { PreRegistro } from 'src/app/models/register-expert/preRegistro.model';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
})
export class AuthorizationComponent {
  @Output() funcion: EventEmitter<any> = new EventEmitter();
  
  email = null;

  @Input() preRegistro:PreRegistro = new PreRegistro();
  @Input() final;
  
  profesions: any[] = [];
  services: any[] = [];

  constructor(
    private popoverController: PopoverController,
    private expertsService: ExpertsService,
    private navCtrl: NavController
  ) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) this.email = user.username;
    this.getProfesions();
  }
  atras() {
    this.navCtrl.back(); 
  }
  
  continue() {
    if (this.preRegistro.isRepresentative == 0){
      this.atras();
      return;
    }
    this.preRegistro_();
  }


  preRegistro_() {
    this.funcion.emit({opcion: 2});
  }

  getProfesions() {
    this.expertsService.getProfesions().subscribe((data: any) => {
      this.profesions = data.data;
    })
  }
  getServiceByProfesions() {
    this.expertsService.getServiceByProfesions(this.preRegistro.proffesions[0].proffesionID).subscribe((data: any) => {
      this.services = data.data;
    })
  }
  volverAlFinal() {
    this.final.final = false;
    this.funcion.emit({opcion: 5});
  }
  async authorizar() {
    const popover = await this.popoverController.create({
      component: CardAuthorizationComponent,
      cssClass: 'popover_central_authorizar',
      translucent: false,
      backdropDismiss: false
    });
    await popover.present();
    const { data } = await popover.onDidDismiss();
    if (data.data) this.preRegistro_();
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
