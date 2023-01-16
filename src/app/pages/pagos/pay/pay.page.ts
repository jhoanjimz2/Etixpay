import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PagarService } from 'src/app/services/pagar.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CargandoService } from '../../../services/cargando.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PopoverController, NavController } from '@ionic/angular';

@Component({
  selector: 'EtixPay-pay',
  templateUrl: './pay.page.html',
  styleUrls: ['./pay.page.scss'],
})
export class PayPage {
  data = {
    cantidad_uno: null,
    cantidad_dos: null,
    uuid: null,
    tienda: null,
    wallet: null
  }
  total;
  verificar_pago = false;
  pagar_verificado = false;
  formulario;
  pago = false;

  constructor(
    public route: ActivatedRoute,
    private pagarService: PagarService,
    private formBuilder: FormBuilder,
    private cargandoService: CargandoService,
    private popoverController: PopoverController,
    private navCtrl: NavController
    ) { 
    this.cargarParametros();
    this.cargar_formulario();
  }
  ngOnDestroy() {
    if (!this.pago) this.anular_qr_pay();
  }
  anular_qr_pay() {
    this.pagarService.anular_pay(this.data.wallet, this.data.uuid).subscribe((data: any) => {}, error => {});
  }
  cargarParametros() {
    this.route.queryParams.subscribe( (params: any) => {
      this.data = JSON.parse(params.data);
      this.cargarCantidades();
    })
  }
  cargarCantidades() {
    this.total = this.data.cantidad_uno + this.data.cantidad_dos;
    if (this.total > 30) this.verificar_pago = true;
  }
  cargar_formulario() {
    this.formulario = this.formBuilder.group({
      password: new FormControl('', [
        Validators.required
      ])
    });
  }
  pagar() {
    let ps = null;
    if (this.pagar_verificado) ps = this.formulario.controls.password.value;
    this.cargandoService.iniciaCargando();
    this.pagarService.aprovar_pay(this.data.wallet, this.data.uuid, ps).subscribe((data: any) => {
      this.pago = true;
      this.cargandoService.terminaCargando();
      this.Alert(data.message, 'OK', false);
      this.navCtrl.back();
    }, error => {
      this.cargandoService.terminaCargando();
      this.formulario.reset();
      this.Alert(error.error.message, 'OK', true);
    });
  }
  nuevo_pay() {
    this.navCtrl.back();
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
