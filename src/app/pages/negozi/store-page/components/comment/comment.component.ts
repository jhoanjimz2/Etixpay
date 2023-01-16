import { Component, Input } from '@angular/core';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PopoverController, ModalController } from '@ionic/angular';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { CargandoService } from '../../../../../services/cargando.service';
import { NegoziService } from '../../../../../services/negozi.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  @Input() uuid;
  formulario: FormGroup = this.formBuilder.group({
    valoracion: new FormControl(5, [Validators.required]),
    mensaje: new FormControl('', [Validators.required])
  });
  data = {
    imagen: 'assets/negozi/perfil.png',
    nombre: '',
    apellido: '',
    wallet: localStorage.getItem('wallet')
  }

  constructor(
    private popoverController: PopoverController,
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private cargandoService: CargandoService,
    private negoziService: NegoziService
  ) {
    var user = JSON.parse(localStorage.getItem('user'));
    if (user.tipoUsuario == 3) this.dataUsuario();
    if (user.tipoUsuario == 6) this.dataColaborador();
    if (user.tipoUsuario != 3 && user.tipoUsuario != 6) this.dataEmpresa();
  }
  dataUsuario() {
    this.negoziService.datosPersona().subscribe((data: any) => {
      if (data.data.persona.personaFOTO) this.data.imagen = data.data.persona.personaFOTO;
      this.data.nombre = data.data.persona.personaNOMBRES;
      this.data.apellido = data.data.persona.personaAPELLIDOS;
    },  error => {
      this.Alert(error.error.message, 'OK' , true);
    });
  }
  dataEmpresa() {
    this.negoziService.datosEmpresa().subscribe((data: any) => {
      if (data.data.empresa.empresaFOTO) this.data.imagen = data.data.empresa.empresaFOTO;
      this.data.nombre = data.data.empresa.empresaNOMBREMAP;
    },  error => {
      this.Alert(error.error.message, 'OK' , true);
    });
  }
  dataColaborador() {
    this.negoziService.datosColaborador().subscribe((data: any) => {
      if (data.data.Cliente.persona.personaFOTO) this.data.imagen = data.data.Cliente.persona.personaFOTO;
      this.data.nombre = data.data.Cliente.persona.personaNOMBRES;
    },  error => {
      this.Alert(error.error.message, 'OK' , true);
    });
  }
  addComment() {
    this.cargandoService.iniciaCargando();
    this.negoziService.agregarComentario(this.uuid, this.formulario.controls.mensaje.value, this.formulario.controls.valoracion.value).subscribe((data: any) => {
      this.cargandoService.terminaCargando();
      this.Alert(data.message, 'OK' , false);
      this.modalController.dismiss({data: true});
    },error => {
      this.cargandoService.terminaCargando();
      this.Alert(error.error.message, 'OK' , true);
    });
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
