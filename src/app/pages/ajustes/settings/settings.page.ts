import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController, PopoverController, AlertController, ToastController } from '@ionic/angular';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { TranslateService } from '@ngx-translate/core';
import { ClipboardService } from 'ngx-clipboard';
import { CuentaService } from 'src/app/services/cuenta.service';
import { CargandoService } from '../../../services/cargando.service';
import { CamaraService } from 'src/app/services/camara.service';
import {Plugins, CameraResultType } from'@capacitor/core';
import { SettingsService } from 'src/app/services/settings.service';
const {Camera} = Plugins;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  infoPersonal: any = {
    imagen: '',
    nombres: '',
    apellidos: '',
    telefono: '',
    iso: '',
    uuid: ''
  };
  datosPerfilCambiaron = false;
  tipo_user = JSON.parse(localStorage.getItem('user')).tipoUsuario;
  cuenta_tienda;
  wallet = localStorage.getItem('wallet');
  idioma = localStorage.getItem('lenguaje');

  constructor(
    private modalController: ModalController,
    private popoverController: PopoverController,
    private cuentaService: CuentaService,
    private router: Router,
    private nav: NavController,
    private alertController: AlertController,
    private translateService: TranslateService,
    private clipboardApi: ClipboardService,
    private toastController: ToastController,
    private cargandoService: CargandoService,
    private camaraService: CamaraService,
    private settingsService: SettingsService
  ) { 
  }
  ionViewWillEnter() {
    this.cargarInfo();
    this.settingsService.default();
  }
  ngOnDestroy(): void {
    this.modalController.dismiss();
  }
  copiar() {
    this.clipboardApi.copyFromContent(this.wallet);
    this.toast(); 
  }
  async toast() {
    let texto; this.translateService.get('COPIADO').subscribe(value => { texto = value; });
    const toast = await this.toastController.create({
      message: texto,
      mode: 'md',
      duration: 1500
    });
    toast.present();
  }
  cargarInfo() {
    if (JSON.parse(localStorage.getItem('user')) != null) {
      var tipoUSER = JSON.parse(localStorage.getItem('user'));
      if (tipoUSER.tipoUsuario == 3) return this.infoUser();
      else if (tipoUSER.tipoUsuario == 6) return this.infoCola();
      else return this.infoEmp();
    }
  }
  infoUser() {
    this.cuentaService.datosPersona().subscribe((data: any) => {
      this.infoPersonal = data.data;
      if (data.data.persona.personaFOTO) this.infoPersonal.imagen = data.data.persona.personaFOTO;
      this.infoPersonal.nombres = data.data.persona.personaNOMBRES;
      this.infoPersonal.apellidos = data.data.persona.personaAPELLIDOS;
      this.infoPersonal.telefono = data.data.persona.personaTELEFONO;
      this.infoPersonal.iso = data.data.persona.pais_domicilio.paisISO3;
    });
  }
  infoEmp() {
    this.cuentaService.datosEmpresa().subscribe((data: any) => {
      this.infoPersonal = data.data;
      this.infoPersonal.uuid = data.data.empresa.uuid;
      if (data.data.empresa.empresaFOTO) this.infoPersonal.imagen = data.data.empresa.empresaFOTO;
      this.infoPersonal.nombres = data.data.empresa.empresaNOMBREMAP;
      this.infoPersonal.telefono = data.data.empresa.pais.paisINDICATIVO +' '+ data.data.empresa.empresaTELEFONO;
      this.infoPersonal.iso = data.data.empresa.pais.paisISO3;
    });
  }
  infoCola() {
    this.cuentaService.datosColaborador().subscribe((data: any) => {
      if (data.data.Cliente.persona.personaFOTO) this.infoPersonal.imagen = data.data.Cliente.persona.personaFOTO;
      this.infoPersonal.imagen = data.data.Cliente.persona.personaFOTO;
      this.infoPersonal.nombres = data.data.Cliente.persona.personaNOMBRES;
    });
  }
  informacion_personal() {
    this.router.navigate(['/pages/ajustes/personal-information'], { queryParams: { order: JSON.stringify(this.infoPersonal) } });
  }
  perfil_tienda() {
    this.router.navigate(["/pages/negozi/store-page/"+ this.infoPersonal.uuid]);
  }
  seguridad() {
    this.router.navigate(['/pages/ajustes/security']);
  }
  changeLanguage(event) {
    localStorage.removeItem('lenguaje');
    localStorage.setItem('lenguaje', event.detail.value);
    this.translateService.use(event.detail.value);
  }
  metodos_de_pago() {
    this.router.navigate(['/pages/ajustes/payment-methods']);
  }
  async alerta_confirmar() {
    let ok, cancel, mensaje, confirm;
    this.translateService.get('OK2').subscribe( data => ok = data);
    this.translateService.get('CANCEL14').subscribe( data => cancel = data);
    this.translateService.get('CONFIRMLOGOUT').subscribe( data => mensaje = data);
    this.translateService.get('CONFIRM11').subscribe( data => confirm = data);
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: confirm,
      message: mensaje,
      buttons: [
        {
          text: cancel,
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: ok,
          handler: () => {
            this.cerrar_sesion();
          }
        }
      ]
    });
    await alert.present();
  }
  cerrar_sesion() {
    this.router.navigate(["auth/login"]);
    this.nav.navigateBack("auth/login");
    this.cuentaService.logout().subscribe( (logout: any) => {
      this.remueveTodo();
    } , errorServicio => {
      if (errorServicio.message) {
        if (errorServicio.error.message === 'Unauthenticated.') {
          this.remueveTodo();
        } else {
          this.Alert(errorServicio.error.message, 'OK', true);
        }
      }
    });
  }
  remueveTodo() {
    localStorage.removeItem('ciudades');
    localStorage.removeItem('paises');
    localStorage.removeItem('uuidMiEmpresa');
    localStorage.removeItem('user');
    localStorage.removeItem('codepromo');
    localStorage.removeItem('wallet');
    localStorage.removeItem('TIPOUSER');
    localStorage.removeItem('COLABORADOR');
  }
  async cargarCamara() {
    const camara = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl
    });
    const imageUrl = camara.dataUrl;
    const imageFile = this.camaraService.dataURItoBlob(imageUrl);
    if (!imageUrl) return null;
    else {
      this.cargandoService.iniciaCargando();
      this.cuentaService.actualizarImgPerfil(imageFile).subscribe( (data: any) => {
        this.cargandoService.terminaCargando();
        this.infoPersonal.imagen = imageUrl;
      }, error => { 
        this.cargandoService.terminaCargando();
        this.Alert(error.error.message, 'OK', true);
      });
    }
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
