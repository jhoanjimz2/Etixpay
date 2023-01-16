import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonInput, PopoverController } from '@ionic/angular';
import { CargandoService } from 'src/app/services/cargando.service';
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { AlertComponent } from '../../../shared/alert/alert.component';
import { PaginasAuthService } from '../../../services/paginas-auth.service';

@Component({
  selector: 'app-check-your-email',
  templateUrl: './check-your-email.page.html',
  styleUrls: ['./check-your-email.page.scss'],
})
export class CheckYourEmailPage implements OnInit {
  fmForgotCodigo;
  @ViewChild('input1') input1: IonInput; @ViewChild('input2') input2: IonInput;
  @ViewChild('input3') input3: IonInput; @ViewChild('input4') input4: IonInput;
  @ViewChild('input5') input5: IonInput; @ViewChild('input6') input6: IonInput;
  tiempo = 59; setT;
  email;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private cargandoService: CargandoService,
    private popover_controller: PopoverController,
    private paginasAuthService: PaginasAuthService
  ) { }

  ngOnInit() {
    this.email = this.route.snapshot.params['email'];
    this.cargarFormularioLogin();
    this.tiempoRestante();
  }
  ionViewWillLeave() {
    this.resetTimeOut();
  }
  cargarFormularioLogin() {
    this.fmForgotCodigo = this.formBuilder.group({
      input1: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ]),
      input2: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ]),
      input3: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ]),
      input4: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ]),
      input5: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ]),
      input6: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ])
    });
  }
  tiempoRestante() {
    if (this.tiempo >= 1) {
      this.setT = setTimeout(() => {
        this.tiempo = this.tiempo - 1;
        this.tiempoRestante();
       }, 1000);
    } else {
      this.nuevoCodigo();
    }
  }
  resetTimeOut(){
    clearTimeout(this.setT);
  }
  adelante() {
    this.resetTimeOut();
    this.cargandoService.iniciaCargando();
    let codigoValidacion = this.fmForgotCodigo.controls.input1.value +""+ this.fmForgotCodigo.controls.input2.value +""+ this.fmForgotCodigo.controls.input3.value +""+ this.fmForgotCodigo.controls.input4.value+""+ this.fmForgotCodigo.controls.input5.value+""+ this.fmForgotCodigo.controls.input6.value;
    this.paginasAuthService.validarSolicitudResetPassword(codigoValidacion).subscribe((datos: any) => {
      this.cargandoService.terminaCargando();
      this.router.navigate(["/auth/set-new-password/" + this.email + '/' + codigoValidacion]);
    },
    errorServicio => {
      this.cargandoService.terminaCargando();
      this.fmForgotCodigo.reset();
      this.Alert(errorServicio.error.message, 'OK', true);
    });
  }
  nuevoCodigo() {
    clearTimeout(this.setT);
    this.cargandoService.iniciaCargando();
    this.fmForgotCodigo.reset();
    this.paginasAuthService.solicitudResetPassword(this.email).subscribe((datos: any) => {
      this.tiempo = 59;
      this.tiempoRestante();
      this.cargandoService.terminaCargando();
    },
    errorServicio => {
      this.cargandoService.terminaCargando();
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
