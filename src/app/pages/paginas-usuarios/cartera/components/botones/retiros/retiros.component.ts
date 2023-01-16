import { Component, Input, OnInit } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CarterasService } from '../../../carteras.service';
import { CargandoService } from '../../../../../../services/cargando.service';
import { TranslateService } from '@ngx-translate/core';
import { LectorQrComponent } from 'src/app/shared/lector-qr/lector-qr.component';

@Component({
  selector: 'app-retiros',
  templateUrl: './retiros.component.html',
  styleUrls: ['./retiros.component.scss'],
})
export class RetirosComponent implements OnInit {
  @Input() saldo_tix = 0;
  boton_select = null;
  prev_select: any = [{}];
  clave = { clave: null };
  formulario;
  formulario_wallet;
  clave_dinamica = false;
  boton_select_vali = false;
  constructor(
    private popover_controller: PopoverController,
    private form_builder: FormBuilder,
    private cartera_service: CarterasService,
    private cargando_service: CargandoService,
    private modal_controller: ModalController,
    private translate_service: TranslateService
  ) { }

  ngOnInit() {
    this.cargar_formulario();
    this.cargar_formulario_wallet();
  }
  cargar_formulario() {
    this.formulario = this.form_builder.group({
      cantidad: new FormControl('', [
        Validators.required,
        Validators.min(0.00001),
        Validators.max(this.saldo_tix)
      ])
    });
  }
  cargar_formulario_wallet() {
    this.formulario_wallet = this.form_builder.group({
      wallet: new FormControl('', [
        Validators.required
      ])
    });
  }
  consultar_wallet(data) {
    this.cargando_service.iniciaCargando();
    this.cartera_service.walletQR(data).subscribe((data: any) => {
      this.formulario_wallet.controls['wallet'].setValue(data.data.walletCODIGO);
      this.cargando_service.terminaCargando();
    }, error => {
      this.cargando_service.terminaCargando();
      this.Alert(error.error.message, 'OK', true);
    });
  }
  async lectorQr() {
    const modal = await this.modal_controller.create({
      component: LectorQrComponent,
      backdropDismiss: true,
      swipeToClose: true
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data.data) { setTimeout(() => {this.consultar_wallet(data.data);},500) }
  }
  generar_clave_cinamica() {
    this.cargando_service.iniciaCargando();
    this.cartera_service.clave_dinamica(this.formulario.controls.cantidad.value).subscribe((datos: any) => {
      this.clave_dinamica = true;
      this.cargando_service.terminaCargando();
    }, error => {
      this.cargando_service.terminaCargando();
      this.Alert(error.message, 'OK', true);
    });
  }
  retiro_banco() {
    this.cargando_service.iniciaCargando();
    this.cartera_service.retiro_transfer_banco(
      this.clave.clave,
      this.boton_select, 
      this.formulario.controls.cantidad.value, 
      this.prev_select[0].uuid, 
      localStorage.getItem('wallet')
    ).subscribe((data: any) => {
      this.cargando_service.terminaCargando();
      this.Alert(data.message, 'OK', false);
      this.modal_controller.dismiss({data: true});
    }, error => {
      this.cargando_service.terminaCargando();
      this.modal_controller.dismiss({data: false});
      this.Alert(error.error.message, 'OK', true);
    })
  }
  retiro_etixcash() {
    this.cargando_service.iniciaCargando();
    this.cartera_service.retiro_etixcash(
      localStorage.getItem('wallet'),
      this.formulario.controls.cantidad.value, 
      this.formulario.controls.cantidad.value, 
      this.formulario_wallet.controls.wallet.value,
      this.clave.clave
    ).subscribe((data: any) => {
      this.cargando_service.terminaCargando();
      this.Alert(data.message, 'OK', false);
      this.modal_controller.dismiss({data: true});
    }, error => {
      this.cargando_service.terminaCargando();
      this.modal_controller.dismiss({data: false});
      this.Alert(error.error.message, 'OK', true);
    })
  }
  async Alert(tex, bot, value) {
    const popover = await this.popover_controller.create({
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
