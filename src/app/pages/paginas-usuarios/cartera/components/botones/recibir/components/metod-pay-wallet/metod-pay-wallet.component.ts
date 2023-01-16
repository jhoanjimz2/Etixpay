import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PopoverController, ModalController } from '@ionic/angular';
import { CargandoService } from 'src/app/services/cargando.service';
import { TranslateService } from '@ngx-translate/core';
import { CarterasService } from 'src/app/pages/paginas-usuarios/cartera/carteras.service';
import { AlertDosComponent } from '../alert-dos/alert-dos.component';
import { ConfirmPayComponent } from '../confirm-pay/confirm-pay.component';
import { LectorQrComponent } from 'src/app/shared/lector-qr/lector-qr.component';

@Component({
  selector: 'app-metod-pay-wallet',
  templateUrl: './metod-pay-wallet.component.html',
  styleUrls: ['./metod-pay-wallet.component.scss'],
})
export class MetodPayWalletComponent  {
  @Input() cantidadUno: number = 0;
  @Input() cantidadDos: number = 0;
  @Output() cancelar: EventEmitter<any> = new EventEmitter();

  formulario: FormGroup = this.formBuilder.group({
    wallet: new FormControl('', [ 
      Validators.required
    ]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private popoverController: PopoverController,
    private translateService: TranslateService,
    private cargandoService: CargandoService,
    private carteraService: CarterasService,
    private modalController: ModalController
    ) {
    }

  get total(){
    return this.cantidadDos + this.cantidadUno;
  } 
  cancelando() {
    this.formulario.reset();
    this.cancelar.emit();
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
    this.carteraService.consultaWalletQR(data).subscribe((data: any) => {
      this.formulario.controls['wallet'].setValue(data.data.walletCODIGO);
      this.confirmPay();
    }, error => {
      this.alert(error.error.message, 'OK', true);
    });
  }
  async confirmPay() {
    const modal = await this.modalController.create({
      component: ConfirmPayComponent,
      cssClass: 'modal_alerta_dos',
      backdropDismiss: true
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data.data) this.pagarConEfectivo();
  }
  pagarConEfectivo() {
    this.cargandoService.iniciaCargando();
    this.carteraService.pagar_con_efectivo(
      this.cantidadUno, 
      this.cantidadDos, 
      'RECOMPENSA PAGO EFECTIVO', 
      localStorage.getItem('wallet'),
      this.formulario.controls.wallet.value
    ).subscribe( (datos: any) => {
      this.cargandoService.terminaCargando();
      this.alertDos(true);
    }, error => {
      this.cargandoService.terminaCargando();
      this.alertDos(false);
    });
  }
  async alertDos(tipo) {
    const modal = await this.modalController.create({
      component: AlertDosComponent,
      cssClass: 'modal_alerta_dos',
      backdropDismiss: true,
      componentProps: {  tipo  }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (!data.data) this.cancelando();
    else setTimeout(()=> this.modalController.dismiss(), 100);
  }
  async alert(tex, bot, tipo) {
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
