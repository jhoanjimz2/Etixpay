import { Component, ViewChild } from '@angular/core';
import { IonTabs, ModalController, PopoverController } from '@ionic/angular';
import { CuentaService } from 'src/app/services/cuenta.service';
import { Router } from '@angular/router';
import { AdvertenciaPayComponent } from '../pagos/advertencia-pay/advertencia-pay.component';
import { SelectTypePayComponent } from '../pagos/select-type-pay/select-type-pay.component';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { TranslateService } from '@ngx-translate/core';
import { CargandoService } from '../../services/cargando.service';
import { PagarService } from 'src/app/services/pagar.service';
import { LectorQrComponent } from '../../shared/lector-qr/lector-qr.component';
import { SelectTypePayOrdenComponent } from '../pagos/select-type-pay-orden/select-type-pay-orden.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage {
  @ViewChild('tabs', { static: false }) tabs: IonTabs;
  imagen: string = '';
  tab;
  informacion: any = {};
  dataQr;

  constructor(
    private modalController: ModalController,
    private cuentaService: CuentaService,
    private router: Router,
    private popoverController: PopoverController,
    private translateService: TranslateService,
    private cargandoService: CargandoService,
    private pagarService: PagarService
  ) { 
    this.informacionPersonal();
  }
  cuenta() {
    this.router.navigate(["/tabs/settings"]);
  }
  opcion() {
    if (localStorage.getItem('advertencia-pay')) this.lectorQr();
    else this.advertencia();
  }
  async lectorQr() {
    const modal = await this.modalController.create({
      component: LectorQrComponent,
      backdropDismiss: true,
      swipeToClose: true
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data.data) { setTimeout(() => {this.difernciarQr(data.data);},500) }
  }
  difernciarQr(data) {
    this.dataQr = data;
    if (this.dataQr.indexOf('objetoNOMBRE') == -1) {
      this.consultarWallet(this.dataQr);
    } else {
      this.selectTypePayOrden();
    }
  }
  async advertencia() {
    const modal = await this.modalController.create({
      component: AdvertenciaPayComponent,
      cssClass: 'modalpay',
      backdropDismiss: true,
      swipeToClose: true
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data.data) { this.lectorQr(); }
  }
  consultarWallet(data) {
    this.cargandoService.iniciaCargando();
    this.pagarService.consultaWalletQR(data).subscribe((data: any) => {
      this.cargandoService.terminaCargando();
      this.informacion = data.data;
      this.selectTypePay()
    }, error => {
      this.cargandoService.terminaCargando();
      let texto;
      this.translateService.get('INVALIDQR').subscribe(value => { texto = value; });
      this.Alert(texto, 'OK', true);
    });
  }
  async selectTypePay() {
    const modal = await this.modalController.create({
      component: SelectTypePayComponent,
      cssClass: 'modalpay',
      backdropDismiss: true,
      swipeToClose: true,
      componentProps: { informacion: this.informacion }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
  }
  async selectTypePayOrden() {
    const modal = await this.modalController.create({
      component: SelectTypePayOrdenComponent,
      cssClass: 'modalpayOrden',
      backdropDismiss: true,
      swipeToClose: true
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data.data) this.ver_pay();
  }
  ver_pay() {
    this.cargandoService.iniciaCargando();
    this.pagarService.ver_pay(localStorage.getItem('wallet'), JSON.parse(this.dataQr).uuid).subscribe((data: any) => {
      this.cargandoService.terminaCargando();
      if (data.data.solicitudEnvioTransaccionESTADO == 'NO APROBADO') {
        let cantidad_uno, cantidad_dos;
        if (data.data.solicitudEnvioTransaccionTIPO === 'TICKET') {
          if (data.data.solicitudEnvioTransaccionCANTIDATICKET)  cantidad_uno = parseFloat(data.data.solicitudEnvioTransaccionCANTIDATICKET);
          else if (!data.data.solicitudEnvioTransaccionCANTIDATICKET) cantidad_uno = 0;
          if (data.data.solicitudEnvioTransaccionCANTIDADEXTRATICKET) cantidad_dos = parseFloat(data.data.solicitudEnvioTransaccionCANTIDADEXTRATICKET);
          else if (!data.data.solicitudEnvioTransaccionCANTIDADEXTRATICKET) cantidad_dos = 0;
        } 
        else if (data.data.solicitudEnvioTransaccionTIPO === 'ATM') {
          if (data.data.solicitudEnvioTransaccionCANTIDADATM) cantidad_uno = parseFloat(data.data.solicitudEnvioTransaccionCANTIDADATM);
          else if (!data.data.solicitudEnvioTransaccionCANTIDADATM) cantidad_uno = 0;
          if (data.data.solicitudEnvioTransaccionCANTIDADEXTRAATM) cantidad_dos = parseFloat(data.data.solicitudEnvioTransaccionCANTIDADEXTRAATM);
          else if (!data.data.solicitudEnvioTransaccionCANTIDADEXTRAATM) cantidad_dos = 0;
        }
        let dataPago = { cantidad_uno, cantidad_dos, uuid: JSON.parse(this.dataQr).uuid, tienda: JSON.parse(this.dataQr).objetoNOMBRE, wallet: localStorage.getItem('wallet') }
        this.router.navigate(["/pages/pagos/pay"], { queryParams: {  data: JSON.stringify(dataPago) }});
      } else {
        let texto;
        this.translateService.get('INVALIDQR').subscribe(value => { texto = value; });
        this.Alert(texto, 'OK', true);
      }
    }, error => {
      this.cargandoService.terminaCargando();
      this.Alert(error.error.message, 'OK' , true);
    });
  }
  informacionPersonal() {
    if (JSON.parse(localStorage.getItem('user')) != null) {
      var tipoUSER = JSON.parse(localStorage.getItem('user'));
      switch (tipoUSER.tipoUsuario) {
        case 3:
          this.informacionUsuario();
        break;
        case 6:
          this.informacionColaborador();
        break;
        default:
          this.informacionEmpresa();
        break;
      }
    }
  }
  informacionUsuario() {
    this.cuentaService.datosPersona().subscribe((data: any) => {
      this.imagen = data.data.persona.personaFOTO;
    });
  }
  informacionEmpresa() {
    this.cuentaService.datosEmpresa().subscribe((data: any) => {
      this.imagen = data.data.empresa.empresaFOTO;
    });
  }
  informacionColaborador() {
    this.cuentaService.datosPersona().subscribe((data: any) => {
      this.imagen = data.data.Cliente.persona.personaFOTO;
    });
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
