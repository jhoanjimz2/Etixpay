import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ExpertsService } from '../../../../../services/experts.service';
import { ValidacionServiceService } from 'src/app/validator/validacion-service.service';
import * as moment from 'moment';
import { CreateUser } from 'src/app/models/register-expert/createUser';
import { Code } from 'src/app/models/register-expert/code.model';
import { AlertController, PopoverController } from '@ionic/angular';
import { CargandoService } from 'src/app/services/cargando.service';
import { TranslateService } from '@ngx-translate/core';
import { ProfesionalID } from 'src/app/models/register-expert/profesionalID.model';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { EstadoUser } from '../../../../../models/register-expert/estado.model';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss'],
})
export class ContactDetailComponent implements OnInit {

  @Input() contactDetail: CreateUser = new CreateUser();
  @Input() codigo:Code = new Code();
  @Input() final;
  @Input() profesionalID: ProfesionalID = new ProfesionalID();
  @Input() estado: EstadoUser = new EstadoUser();

  codigoEnviado = false;
  isEmail= false;

  codigoVerificado = false;
  @ViewChild('input1') input1;
  @ViewChild('input2') input2;
  @ViewChild('input3') input3;
  @ViewChild('input4') input4;
  @ViewChild('input5') input5;
  @ViewChild('input6') input6;

  countries = [];


  minutes = '00';
  seconds = '00';
  interval: any;
  finalTime = false;

  @Output()funcion :EventEmitter<any> = new EventEmitter();

  
  constructor(
    private alertController: AlertController,
    private cargandoService: CargandoService,
    private translate: TranslateService,
    private expertsService: ExpertsService,
    private popoverController: PopoverController
  ) {
    this.getCountries();
  }

  ngOnInit() {
  }
  getCountries() {
    this.expertsService.getCountries().subscribe((response: any) => { 
      this.countries = response.data;
    });
  }
  validateEmail(email: string) {
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    this.isEmail = regex.test(email) ? true : false;
  }
  validatedEmail() {
    this.expertsService.validatedEmail(this.contactDetail.email).subscribe(
      (response: any) => {
        if (response.data) {
          this.infoEmail();
          this.contactDetail.email = '';
        }
      }
    );
  }

  enviarCodigo(reenviar = false) {
    if (!this.codigoEnviado || reenviar) {
      this.cargandoService.iniciaCargando();
      this.expertsService.preRegisterUser(this.contactDetail, this.profesionalID.profesionalID).subscribe((data:any) => {
        this.codigoEnviado = true;
        this.iniciarConteo();
        this.cargandoService.terminaCargando();
      }, error => {
        this.Alert(error.error.message, 'OK', true);
        this.cargandoService.terminaCargando();
      })
    }
  }

  iniciarConteo() {
    this.codigo.digit1 = '';
    this.codigo.digit2 = '';
    this.codigo.digit3 = '';
    this.codigo.digit4 = '';
    this.codigo.digit5 = '';
    this.codigo.digit6 = '';
    let date = new Date(moment('1900/01/01 00:01:30').format("YYYY/MM/DD HH:mm:ss"));
    const padLeft = n => "00".substring(0, "00".length - n.length) + n;
    this.interval = setInterval(() => {
      this.minutes = padLeft(date.getMinutes() + "");
      this.seconds = padLeft(date.getSeconds() + "");
      date = new Date(date.getTime() - 1000);
      date = new Date(moment(date).format("YYYY/MM/DD HH:mm:ss"));
      if( this.minutes == '00' && this.seconds == '00' ) {
        this.reiniciar();
      }
    }, 1000);
  }

  reiniciar() {
    clearInterval(this.interval); 
    this.codigoEnviado = false;
  }

  codeRecived(nroInput: number) {
    if (!this.codigoVerificado) {
      if (nroInput == 1 && this.codigo.digit1) this.input2.setFocus();
      if (nroInput == 2 && this.codigo.digit2) this.input3.setFocus();
      if (nroInput == 3 && this.codigo.digit3) this.input4.setFocus();
      if (nroInput == 4 && this.codigo.digit4) this.input5.setFocus();
      if (nroInput == 5 && this.codigo.digit5) this.input6.setFocus();
      if (nroInput == 2 && !this.codigo.digit2) this.input1.setFocus();
      if (nroInput == 3 && !this.codigo.digit3) this.input2.setFocus();
      if (nroInput == 4 && !this.codigo.digit4) this.input3.setFocus();
      if (nroInput == 5 && !this.codigo.digit5) this.input4.setFocus();
      if (nroInput == 6 && !this.codigo.digit6) this.input5.setFocus();
      if (this.codigo.digit1 && this.codigo.digit2 && this.codigo.digit3 && this.codigo.digit4 && this.codigo.digit5 && this.codigo.digit6) {
        const code = this.codigo.digit1 + this.codigo.digit2 + this.codigo.digit3 + this.codigo.digit4 + this.codigo.digit5 + this.codigo.digit6;
        this.cargandoService.iniciaCargando();
        this.expertsService.validarCodigo(code, this.profesionalID.profesionalID).subscribe((data:any) => {
          this.cargandoService.terminaCargando();
          clearInterval(this.interval);
          this.finalTime = true;
          this.codigoVerificado = true;
        }, error => {
          this.cargandoService.terminaCargando();
          this.Alert(error.error.message, 'OK', true);
          this.reiniciar();
        })
      }
    }
  }

  continue() {
    this.funcion.emit({opcion: 3});
  }
  volverAlFinal() {
    this.final.final = false;
    this.funcion.emit({opcion: 5});
  }
  soloNumero() {
    let valor_input = this.contactDetail.phone;
    this.contactDetail.phone = valor_input
      //Elimina espacios
      .replace(/\s/g, '')
      //Elimina las letras
      .replace(/\D/g, '')
      //Elimina ultimo espaciado
      .trim();
  }



  async infoEmail() {
    let message, invalidMail;
    this.translate.get('EMAILINVALID').subscribe(value => { invalidMail = value; });
    this.translate.get('MESSAGE').subscribe(value => { message = value; });
    const alert = await this.alertController.create({
      cssClass: 'modal-info',
      mode: 'ios',
      header: message,
      message: invalidMail,
      buttons: ['OK']
    });
    await alert.present();
    await alert.onDidDismiss();
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
