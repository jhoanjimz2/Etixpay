import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CargandoService } from '../../../services/cargando.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PaginasAuthService } from '../../../services/paginas-auth.service';
import { ValidacionServiceService } from 'src/app/validator/validacion-service.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  formulario: FormGroup = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    email: ['', [ Validators.required, Validators.pattern( this.validaciones.email_pattern ) ] ],
    country: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required,Validators.maxLength(6),Validators.minLength(6),Validators.pattern(this.validaciones.numerico_pattern)]),
    cPassword: new FormControl('', [Validators.required,Validators.maxLength(6),Validators.minLength(6),Validators.pattern(this.validaciones.numerico_pattern)]),
    number: new FormControl('', [Validators.required,Validators.pattern(this.validaciones.numerico_pattern)]),
    code: new FormControl('', []),
    terms: new FormControl(false, [Validators.required,Validators.requiredTrue])
  },{validators: [
    this.validaciones.validar_contraseñas_iguales('password', 'cPassword')
  ]});
  get email_error_msg(): string  {
    const errors = this.formulario.get('email')?.errors;
    if (errors?.required) return 'EMAILISREQUIRED';
    else if (errors?.pattern) return 'THEVALUE';
    return 'false';
  }
  get password(): string {
    const errors = this.formulario.get('password')?.errors;
    if (errors?.required) return 'PASSWORDISREQUIRED';
    else if (errors?.minlength) return 'MINIMO6CARACTERES';
    else if (errors?.pattern) return 'YOURPASSWORD';
    return 'false';
  }
  get c_password(): string {
    const errors = this.formulario.get('cPassword')?.errors;
    if (errors?.required) return 'CONFIRMPASSWORD';
    else if (errors?.minlength) return 'MINIMO6CARACTERES';
    else if (errors?.pattern) return 'YOURPASSWORD';
    else if (errors?.contrasenas_diferentes) return 'PASSWORDARE';
    return 'false';
  }
  get pais_error_msg(): string {
    const errors = this.formulario.get('country')?.errors;
    if (errors?.required) return 'THECOUNTRYIS';
    return 'false';
  }
  get telefono(): string {
    const errors = this.formulario.get('number')?.errors;
    if (errors?.required) return 'TELEPHONE';
    else if (errors?.pattern) return 'THEVALUEENTERED';
    return 'false';
  }
  campo_no_valido( campo: string ) {
    return this.formulario.get(campo)?.invalid && this.formulario.get(campo)?.touched;
  }

  show = false;
  show2 = false;
  paises = []; pais: any = []; page = 1; size = 15;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private cargandoService: CargandoService,
    private popoverController: PopoverController,
    private paginasAuthService: PaginasAuthService,
    private validaciones: ValidacionServiceService,
  ) {
    this.cargarPaises();
  }

  login() {
    this.router.navigate(["/auth/login"]);
  }
  terms() {
    window.open(environment.TyC);
  }  

  register() {
    if (!this.formulario.valid) return this.formulario.markAllAsTouched();
    this.cargandoService.iniciaCargando();
    this.paginasAuthService.registro(
      this.formulario.controls.email.value.toLowerCase(),
      this.formulario.controls.password.value,
      this.formulario.controls.cPassword.value,
      this.formulario.controls.country.value.id,
      this.formulario.controls.number.value,
      this.formulario.controls.code.value
    ).subscribe((datos: any) => {
      this.cargandoService.terminaCargando();
      this.Alert(datos.message, 'OK', false);
      this.router.navigate(["/auth/registrado"]);
      this.formulario.reset();
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
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  //-------------------------------------------------------------------------SIGN UP PAISES-----------------------------------------------------//
  cargarPaises() {
    this.paginasAuthService.paises().subscribe((data: any) => {
      this.paises = data.data;
      this.getPaises(this.page, this.size);
    });
  }
  getPaises(page?: number, size?: number) {
    if (page && size) {
      this.pais = this.pais.concat(this.paises.slice((page - 1) * size, ((page - 1) * size) + size));
    }
    this.page++;
    return this.pais;
  }
  close() {
    this.page = 1;
    this.size = 15;
    this.getPaises(this.page, this.size);
  }
  obtenerPaises(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
    if (this.page > this.paises.length / this.size) {
      event.component.disableInfiniteScroll();
      return;
    }
    setTimeout(() => {
      let paisesArray = this.getPaises(this.page, this.size);
      paisesArray = event.component.items.concat(paisesArray);
      event.component.items = paisesArray;
      event.component.endInfiniteScroll();
    }, 500);
  }

  buscarPais(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
    let text = event.text.trim().toLowerCase();
    event.component.startSearch();

    if (!text) {
      event.component.items = this.getPaises(this.page, this.size);
      event.component.endSearch();
      event.component.enableInfiniteScroll();
      return;
    }

    setTimeout(() => {
      event.component.items = this.filterPorts(text);
      event.component.endSearch();
    }, 500);
  }

  filterPorts(text: string) {
    return this.paises.filter(pais => {
      return pais.paisNOMBRE.toLowerCase().indexOf(text) !== -1;
    });
  }

}
