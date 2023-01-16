import { Component, Input } from '@angular/core';
import { ExpertsService } from '../../../../../services/experts.service';
import { PopoverController, ModalController } from '@ionic/angular';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

@Component({
  selector: 'app-add-comentario',
  templateUrl: './add-comentario.component.html',
  styleUrls: ['./add-comentario.component.scss'],
})
export class AddComentarioComponent {
  @Input() uuid;
  formulario = {
    valoracion: 5,
    mensaje: ''
  }
  data = {
    imagen: 'assets/negozi/perfil.png',
    nombre: '',
    apellido: '',
    wallet: localStorage.getItem('wallet')
  }
  
  constructor (
    private expertsService: ExpertsService,
    private popoverController: PopoverController,
    private modalController: ModalController
  ) {
    var user = JSON.parse(localStorage.getItem('user'));
    if (user.tipoUsuario == 3) this.dataUsuario();
    if (user.tipoUsuario == 6) this.dataColaborador();
    if (user.tipoUsuario != 3 && user.tipoUsuario != 6) this.dataEmpresa();
  }
  dataUsuario() {
    this.expertsService.datosPersona().subscribe((data: any) => {
      if (data.data.persona.personaFOTO) this.data.imagen = data.data.persona.personaFOTO;
      this.data.nombre = data.data.persona.personaNOMBRES;
      this.data.apellido = data.data.persona.personaAPELLIDOS;
    },  error => {
      this.Alert(error.error.message, 'OK' , true);
    });
  }
  dataEmpresa() {
    this.expertsService.datosEmpresa().subscribe((data: any) => {
      if (data.data.empresa.empresaFOTO) this.data.imagen = data.data.empresa.empresaFOTO;
      this.data.nombre = data.data.empresa.empresaNOMBREMAP;
    },  error => {
      this.Alert(error.error.message, 'OK' , true);
    });
  }
  dataColaborador() {
    this.expertsService.datosColaborador().subscribe((data: any) => {
      if (data.data.Cliente.persona.personaFOTO) this.data.imagen = data.data.Cliente.persona.personaFOTO;
      this.data.nombre = data.data.Cliente.persona.personaNOMBRES;
    },  error => {
      this.Alert(error.error.message, 'OK' , true);
    });
  }
  addComment() {
    
    this.modalController.dismiss({data: true});
  }
  async Alert(tex, bot, bol) {
    const popover = await this.popoverController.create({
      component: AlertComponent,
      cssClass: 'popover_central',
      mode: 'ios',
      componentProps: {
        texto: tex,
        boton: bot,
        img: bol
      },
      translucent: false,
      backdropDismiss: false
    });
    return await popover.present();
  }

}
