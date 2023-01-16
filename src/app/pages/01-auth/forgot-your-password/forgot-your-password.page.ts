import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { NavController, PopoverController } from '@ionic/angular';
import { CargandoService } from 'src/app/services/cargando.service';
import { AlertComponent } from '../../../shared/alert/alert.component';
import { PaginasAuthService } from '../../../services/paginas-auth.service';

@Component({
  selector: 'app-forgot-your-password',
  templateUrl: './forgot-your-password.page.html',
  styleUrls: ['./forgot-your-password.page.scss'],
})
export class ForgotYourPasswordPage implements OnInit {
  fmEmail;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private paginasAuthService: PaginasAuthService,
    private cargandoService: CargandoService,
    private popover_controller: PopoverController
    ) { }

  ngOnInit() {
    this.cargarFormularioLogin();
  }
  cargarFormularioLogin() {
    this.fmEmail = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ])
    });
  }
  enviarCodigoAEmail() {
    this.cargandoService.iniciaCargando();
    this.paginasAuthService.solicitudResetPassword(this.fmEmail.controls.email.value).subscribe((datos: any) => {
      this.cargandoService.terminaCargando();
      this.router.navigate(["/auth/check-your-email/" + this.fmEmail.controls.email.value]);
    },
    errorServicio => {
      this.cargandoService.terminaCargando();
      this.fmEmail.reset();
      this.Alert(errorServicio.error.message, 'OK', true);
    });
  }
  
  async Alert(tex, bot, tipo) {
    const popover = await this.popover_controller.create({
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
