import { Component, OnInit } from '@angular/core';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PopoverController, ModalController } from '@ionic/angular';
import { CarterasService } from './carteras.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-cartera',
  templateUrl: './cartera.page.html',
  styleUrls: ['./cartera.page.scss'],
})
export class CarteraPage implements OnInit {
  saldo_tix = 0;
  saldo_tickets = 0;
  proyectos = [];
  proyectos_grafica = [];
  tipo_user = JSON.parse(localStorage.getItem('user')).tipoUsuario;

  constructor(
    private popover_controller: PopoverController,
    private carterasService: CarterasService,
    private settingsService: SettingsService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {   
    this.actualizar(); 
    this.settingsService.default();
  }
  actualizar() {
    if (this.tipo_user == 3) {
      this.persona();
    } else {
      this.empresa();
    }
  }
  persona() {
    this.carterasService.cargarSaldoTixPersonas().subscribe((data: any) => {
      this.saldo_tix = data.data.wallets[0].walletSALDOATM;
      this.saldo_tickets = data.data.wallets[0].walletSALDOTOK;
      this.proyectos_grafica = data.data.wallets[0].proyectos;
      this.proyectos = data.data.locals;
    } , errorServicio => {
      this.Alert(errorServicio.error.message, 'OK', true);
    });
  }
  empresa() {
    this.carterasService.cargarSaldoTixEmpresas().subscribe((data: any) => {
      this.saldo_tix = data.data.wallets[0].walletSALDOATM;
      this.saldo_tickets = data.data.wallets[0].walletSALDOTOK;
      this.proyectos_grafica = data.data.wallets[0].proyectos;
      this.proyectos = data.data.locals;
    } , errorServicio => {
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
