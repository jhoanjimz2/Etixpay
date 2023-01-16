import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CargandoService } from '../../../services/cargando.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PaginasAuthService } from '../../../services/paginas-auth.service';
import { MarketplaceService } from '../../../services/marketplace.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage{


  formulario: FormGroup = this.formBuilder.group({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    remember: new FormControl(false, [])
  });
  show = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private nav: NavController,
    private cargandoService: CargandoService,
    private popoverController: PopoverController,
    private paginasAuthService: PaginasAuthService,
    private marketPlaceService: MarketplaceService
  ) {
    if (localStorage.getItem('recuerdame')) {
      this.formulario.controls['email'].setValue(JSON.parse(localStorage.getItem('recuerdame')).email);
      this.formulario.controls['remember'].setValue(true);
    }
  }

  login() {
    this.cargandoService.iniciaCargando();
    this.paginasAuthService.login(this.formulario.controls.email.value, this.formulario.controls.password.value).subscribe((datos: any) => {
      if (datos.success == true) {
        if (this.formulario.controls.remember.value) this.togle(true);
        localStorage.setItem('user', JSON.stringify(datos.data));
        this.tokenMarket();
      }
    }, error => {
        this.cargandoService.terminaCargando();
        this.Alert(error.error.message, 'OK', true);
    });
  }
  tokenMarket() {
    this.marketPlaceService.loginMarketplace().subscribe((data: any) => {
      this.cargandoService.terminaCargando();
      localStorage.setItem('tokenmarket', JSON.stringify(data.data.access_token));
      this.cargarWallet();
    }, error => {
      localStorage.removeItem('user');
      this.cargandoService.terminaCargando();
      this.Alert(error.error.message, 'OK', true);
    });
  }
  togle(evento) {
    if (evento) this.recuerdame(); 
    else this.olvidame();
  }
  recuerdame() {
    let rec = { 'email': this.formulario.controls.email.value };
    localStorage.setItem('recuerdame', JSON.stringify(rec));
  }
  olvidame() {
    localStorage.removeItem('recuerdame');
  }
  cargarWallet() {
    var tipo_user = JSON.parse(localStorage.getItem('user'));
    switch (tipo_user.tipoUsuario) {
      case 3:
        this.wallet_usuraio();
      break;
      case 6:
        this.wallet_colaborador();
      break;
      default:
        this.wallet_empresa();
      break;
    }
  }
  wallet_usuraio() {
    this.paginasAuthService.Home().subscribe((data_home: any) => {
      localStorage.setItem('wallet', data_home.data.wallets[0].walletCODIGO);
      this.paginasAuthService.codigoPromocionalPersona().subscribe((data_perfil: any) => {
        localStorage.setItem('codepromo', data_perfil.data.usuarioCODIGO);
      });
      this.router.navigate(["/tabs/home"]);
      this.nav.navigateBack("/tabs/home");
    });
  }
  wallet_empresa() {
    this.paginasAuthService.HomeEMPRESAS().subscribe((data_home: any) => {
      localStorage.setItem('wallet', data_home.data.wallets[0].walletCODIGO);
      localStorage.setItem('uuidMiEmpresa', data_home.data.empresa.uuid);
      this.paginasAuthService.codigoPromocionalEmpresa().subscribe((data_perfil: any) => {
        localStorage.setItem('codepromo', data_perfil.data.usuarioCODIGO);
      });
      this.router.navigate(["/tabs/home"]);
      this.nav.navigateBack("/tabs/home");
    });
  }
  wallet_colaborador() {
    this.paginasAuthService.HomeCOLABORADORES().subscribe((data_home: any) => {
      localStorage.setItem('wallet', data_home.data.wallets[0].walletCODIGO);
      localStorage.setItem('uuidMiEmpresa', data_home.data.empresa.uuid);
      this.paginasAuthService.codigoPromocionalColaborador().subscribe((data_perfil: any) => {
        localStorage.setItem('codepromo', data_perfil.data.Cliente.usuarioCODIGO);
      });
      this.router.navigate(["/home-colaboradores/" + data_home.data.tipo_usuarioID]);
      this.nav.navigateBack("/home-colaboradores/" + data_home.data.tipo_usuarioID);
    });
  }
  olvidoContrasena() {
    this.router.navigate(["/auth/forgot-your-password"]);
  }
  registro() {
    this.router.navigate(["/auth/register"]);
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
