import { Component, OnInit } from '@angular/core';
import { CuentaService } from '../../../../services/cuenta.service';
import { ModalController, PopoverController, NavController } from '@ionic/angular';
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { CargandoService } from '../../../../services/cargando.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage {

  formulario = this.formBuilder.group({
    old_password: new FormControl('', [
      Validators.required,
      Validators.maxLength(6),
      Validators.minLength(6),
      Validators.pattern('^[0-9]*$')
    ]),
    new_password: new FormControl('', [
      Validators.required,
      Validators.maxLength(6),
      Validators.minLength(6),
      Validators.pattern('^[0-9]*$')
    ]),
    re_new_password: new FormControl('', [
      Validators.required,
      Validators.maxLength(6),
      Validators.minLength(6),
      Validators.pattern('^[0-9]*$')
    ])
  });

  constructor(
    private navCtrl: NavController,
    private cuentaService: CuentaService,
    private formBuilder: FormBuilder,
    private popoverController: PopoverController,
    private cargandoService: CargandoService
  ) { }
  cambiar_password() {
    this.cargandoService.iniciaCargando();
    this.cuentaService.cambiar_password(
      this.formulario.controls.new_password.value, 
      this.formulario.controls.old_password.value
      ).subscribe( (data: any) => {
        this.cargandoService.terminaCargando();
        this.navCtrl.back();
      this.Alert(data.message, 'OK', false);
    }, error => {
      this.cargandoService.terminaCargando();
      this.Alert(error.error.message, 'OK', true);
    });
  }
  async Alert(tex, bot, value) {
    const popover = await this.popoverController.create({
      component: AlertComponent,
      cssClass: 'popover_central',
      mode: 'ios',
      componentProps: {
        texto: tex,
        boton: bot,
        img: value
      },
      translucent: false,
      backdropDismiss: false
    });
    return await popover.present();
  }

}
