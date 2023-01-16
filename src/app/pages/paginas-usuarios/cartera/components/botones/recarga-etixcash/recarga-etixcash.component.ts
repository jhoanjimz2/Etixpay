import { Component, Input, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { CargandoService } from '../../../../../../services/cargando.service';
import { CarterasService } from '../../../carteras.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { SelectCantidadComponent } from 'src/app/shared/select-cantidad/select-cantidad.component';
import { LectorQrComponent } from 'src/app/shared/lector-qr/lector-qr.component';

@Component({
  selector: 'app-recarga-etixcash',
  templateUrl: './recarga-etixcash.component.html',
  styleUrls: ['./recarga-etixcash.component.scss'],
})
export class RecargaEtixcashComponent implements OnInit {
  @Input() modal;
  opcion = 1;
  cantidad = 0;
  botones = [
    {valor: 2000, size: 12},
    {valor: 1000, size: 7},
    {valor: 500, size: 5},
    {valor: 200, size: 4.5},
    {valor: 100, size: 4.5},
    {valor: 50, size: 3}
  ]
  formulario_wallet;

  constructor(
    private form_builder: FormBuilder,
    private modal_controller: ModalController,
    private popover_controller: PopoverController,
    private translate_service: TranslateService,
    private cargando_service: CargandoService,
    private cartera_service: CarterasService
  ) { }

  ngOnInit() {
    this.cargar_formulario_wallet();
  }
  salir_sin_argumentos() {
    this.modal_controller.dismiss({data: false});
  }
  cargar_formulario_wallet() {
    this.formulario_wallet = this.form_builder.group({
      wallet: new FormControl('', [
        Validators.required
      ])
    });
  }
  async cantidad_popover() {
    const popover = await this.popover_controller.create({
      component: SelectCantidadComponent,
      cssClass: 'popoverCantidad',
      mode: 'ios',
      translucent: false,
      backdropDismiss: false
    });
    await popover.present();
    const { data } = await popover.onDidDismiss();
    if (data.datos) this.cantidad = data.cantidad ;
  }
  click(id) {
    if (id == 1) this.modal.cssClass = 'modal_recargas'; 
    if (id == 2) this.modal.cssClass = 'modal_recargas_cerrado'; 
    if (id == 3) this.modal.cssClass = 'modal_recargas_cerrado'; 
    if (id == 4) return this.pagar_etixcash(); 
    this.opcion = id;
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
  pagar_etixcash() {
    this.cargando_service.iniciaCargando();
    this.cartera_service.comprar_tix_con_etixcash(
      localStorage.getItem('wallet'), this.cantidad, '1', '1',  this.cantidad,
      this.formulario_wallet.controls.wallet.value ).subscribe((datos: any) => {
      this.cargando_service.terminaCargando();
      this.modal_controller.dismiss({data: true});
      this.Alert(datos.message, 'OK', false);
    }, error => {
      this.cargando_service.terminaCargando();
      this.Alert(error.error.message, 'OK', true);
    });
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
