import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavController, PopoverController } from '@ionic/angular';
import { CargandoService } from 'src/app/services/cargando.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PaginasAuthService } from '../../../services/paginas-auth.service';

@Component({
  selector: 'app-set-new-password',
  templateUrl: './set-new-password.page.html',
  styleUrls: ['./set-new-password.page.scss'],
})
export class SetNewPasswordPage implements OnInit {
  fmNewPassword;
  show = false; show2 = false;
  email; codigo;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private nav: NavController,
    private router: Router,
    private paginasAuthService: PaginasAuthService,
    private cargandoService: CargandoService,
    public popover_controller: PopoverController
  ) { }

  ngOnInit() {
    this.cargarFormularioLogin();
    this.email = this.route.snapshot.params['email'];
    this.codigo = this.route.snapshot.params['codigo'];
  }
  cargarFormularioLogin() {
    this.fmNewPassword = this.formBuilder.group({
      password: new FormControl('', [
        Validators.required,
        Validators.maxLength(6),
        Validators.minLength(6),
        Validators.pattern('^[0-9]*$')
      ]),
      c_password: new FormControl('', [
        Validators.required,
        Validators.maxLength(6),
        Validators.minLength(6),
        Validators.pattern('^[0-9]*$')
      ])
    });
  }
  setNewPassword() {
    if (this.fmNewPassword.controls.password.value != this.fmNewPassword.controls.c_password.value) {
      return;
    }    
    this.cargandoService.iniciaCargando();
    this.paginasAuthService.resetPassword(this.email, this.fmNewPassword.controls.password.value, this.codigo).subscribe((datos: any) => {
      this.cargandoService.terminaCargando();
      this.router.navigate(["/auth/login"]);
      this.nav.navigateBack("/auth/login");
      return this.popuvAlert(datos.message, 'OK', false);
    },
      errorServicio => {
        this.cargandoService.terminaCargando();
        this.fmNewPassword.reset();
        return this.popuvAlert(errorServicio.error.message, 'OK', true);
      }
    );
  }
  async popuvAlert(tex, bot, tipo) {
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
