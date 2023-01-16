import { Component, Input, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { CargandoService } from 'src/app/services/cargando.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CarterasService } from '../../../carteras.service';
import { LectorQrComponent } from 'src/app/shared/lector-qr/lector-qr.component';

@Component({
  selector: 'app-enviar',
  templateUrl: './enviar.component.html',
  styleUrls: ['./enviar.component.scss'],
})
export class EnviarComponent implements OnInit {
  @Input() saldo_tix = 0;
  scann = false;
  botonClaveDinamica = false;
  receptor = {
    nombre: undefined,
    direccion: undefined,
    ciudad: undefined,
    pais: undefined,
    wallet: undefined
  }
  fmEnviar; fmClaveDinamica;
  tickets: any[] = [];

  ticketSelect = null;

  constructor(
    private modalController: ModalController,
    private carterasService: CarterasService,
    private cargandoService: CargandoService,
    private popover_controller: PopoverController,
    private formBuilder: FormBuilder,
    private translateService: TranslateService
    ) { }

  ngOnInit() {
    this.cargarFormulario(null, null, null);
    this.cargarTickets();
    this.cargarFormularioClave();
  }
  salirSinArgumentos() {
    this.modalController.dismiss();
  }
  selectTicket() {
    if (this.fmEnviar.controls.ticket.value == 'TIX') {
      this.ticketSelect = null;
    } else {
      this.ticketSelect = this.tickets.find(element => element.uuid === this.fmEnviar.controls.ticket.value);
    }
  }
  get conversion() {
    return (this.fmEnviar.controls.cantidad.value / 1) * this.ticketSelect.proyectoPRECIO;
  }
  
  cargarFormulario(re, ca, ti) {
    this.fmEnviar = this.formBuilder.group({
      recipiente: new FormControl(re, [
        Validators.required
      ]),
      cantidad: new FormControl(ca, [
        Validators.required
      ]),
      ticket: new FormControl(ti, [
        Validators.required
      ]),
    });
  }
  cargarFormularioClave() {
    this.fmClaveDinamica = this.formBuilder.group({
      clave: new FormControl('', [
        Validators.required,
        Validators.maxLength(6),
        Validators.minLength(6),
        Validators.pattern('^[0-9]*$')
        
      ])
    });
  }
  cargarTickets() {
    var tipoUSER = JSON.parse(localStorage.getItem('user'));
    if (tipoUSER.tipoUsuario === 3) {
      this.cargarTicketsPersonas();
    } else {
      this.cargarTicketsEmpresas();
    }
  }
  cargarTicketsPersonas() {
    this.carterasService.mostrarTicketsPersonas().subscribe((datos: any) => {
      this.tickets = datos.data.wallets[0].proyectos;
      console.log(this.tickets)
    } , errorServicio => {
      this.cargandoService.terminaCargando();
      this.Alert(errorServicio.error.message, 'OK', true);
    });
  }
  cargarTicketsEmpresas() {
    this.carterasService.mostrarTicketsEmpresas().subscribe((datos: any) => {
      this.tickets = datos.data.wallets[0].proyectos;
    } , errorServicio => {
      this.cargandoService.terminaCargando();
      this.Alert(errorServicio.error.message, 'OK', true);
    });
  }
  async lectorQr() {
    const modal = await this.modalController.create({
      component: LectorQrComponent,
      backdropDismiss: true,
      swipeToClose: true
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data.data) { setTimeout(() => {this.consultar_wallet(data.data);},500) }
  }
  consultar_wallet(data) {
    this.cargandoService.iniciaCargando();
    this.carterasService.consultaWalletQR(data).subscribe((datosWallet: any) => {
      this.cargandoService.terminaCargando();
      this.receptor.nombre = datosWallet.data.ObjetoQR.objetoNOMBRE;
      this.receptor.pais = datosWallet.data.ObjetoQR.objetoPAIS;
      this.receptor.ciudad = datosWallet.data.ObjetoQR.objetoCIUDAD;
      this.receptor.direccion = datosWallet.data.ObjetoQR.objetoDIRECCION;
      this.receptor.wallet = datosWallet.data.walletCODIGO;
      this.scann = true;
      this.fmEnviar.controls['recipiente'].setValue(this.receptor.wallet);
    }, error => {
      this.cargandoService.terminaCargando();
      let texto;
      this.translateService.get('INVALIDQR').subscribe(value => { texto = value; });
      this.Alert(texto, 'OK', true);
    });
  }
  generarClaveDinamica() {
    this.cargandoService.iniciaCargando();
    this.carterasService.claveDinamica(this.fmEnviar.controls.cantidad.value).subscribe((datos: any) => {
      this.cargandoService.terminaCargando();
      if (datos.success === true) {
        this.botonClaveDinamica = true;
      }
    } , errorServicio => {
      this.cargandoService.terminaCargando();
      this.Alert(errorServicio.error.message, 'OK', true);
    });
  }

  hacerTransferencia() {
    if (this.fmEnviar.controls.ticket.value == 'TIX') {
      this.hacerTransferenciaTIX();
    } else {
      this.hacerTransferenciaTicket();
    }
  }
  hacerTransferenciaTicket() {
    let sim2 = this.tickets.find(element => element.uuid === this.fmEnviar.controls.ticket.value);
    let cantidad = (this.fmEnviar.controls.cantidad.value / 1) * sim2.proyectoPRECIO;
    this.cargandoService.iniciaCargando();
    this.carterasService.transferirTICKETENVIAR(
      this.fmClaveDinamica.controls.clave.value,
      localStorage.getItem('wallet'),
      this.fmEnviar.controls.cantidad.value,
      this.fmEnviar.controls.recipiente.value,
      this.fmEnviar.controls.ticket.value,
      cantidad
    ).subscribe((datos: any) => {
      this.reset();
      this.salirSinArgumentos();
      this.Alert(datos.message , 'OK', false);
      console.log(datos)
      this.cargandoService.terminaCargando();
    }, error => {
      this.reset();
      this.Alert(error.error.message, 'OK', true);
      this.cargandoService.terminaCargando();
    }
    );
  }
  hacerTransferenciaTIX() {    
    this.cargandoService.iniciaCargando();
    this.carterasService.transferirTIXENVIAR(
      this.fmClaveDinamica.controls.clave.value,
      this.fmEnviar.controls.cantidad.value,
      this.fmEnviar.controls.recipiente.value,
      localStorage.getItem('wallet')
      ).subscribe((datos: any) => {
      this.reset();
      this.salirSinArgumentos();
      this.Alert(datos.message , 'OK', false);
      this.cargandoService.terminaCargando();
    }, error => {
      this.reset();
      this.Alert(error.error.message, 'OK', true);
      this.cargandoService.terminaCargando();
    });
  }
  reset() {
    this.fmEnviar.reset();
    this.fmClaveDinamica.reset();
    this.botonClaveDinamica = false;
    this.scann = false;
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
