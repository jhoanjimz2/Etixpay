import { Component } from '@angular/core';
import { AddMetodoPagoComponent } from '../add-metodo-pago/add-metodo-pago.component';
import { ModalController } from '@ionic/angular';
import { CuentaService } from '../../../../services/cuenta.service';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.page.html',
  styleUrls: ['./payment-methods.page.scss'],
})
export class PaymentMethodsPage {


  cuentas_bancarias = [];
  tarjetas_credito = [];
  tipo_user = JSON.parse(localStorage.getItem('user')).tipoUsuario;

  constructor(
    private modalController: ModalController,
    private cuentaService: CuentaService
  ) { 
    this.cargar_cuentas();
  }
  async add_metodo_pago(tipo) {
    const modal = await this.modalController.create({
      component: AddMetodoPagoComponent,
      componentProps: {  tipo   },
      cssClass: 'modal_add_metodo_pago',
      backdropDismiss: true,
      swipeToClose: true
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data) if (data.data) this.cargar_cuentas();
  }
  cargar_cuentas() {
    if ( this.tipo_user == 3)  this.cargar_cuentas_bancarias_personas();
    if ( this.tipo_user != 3)  this.cargar_cuentas_bancarias_empresas();
    this.cargar_tarjetas_credito();
  }
  cargar_cuentas_bancarias_personas() {
    this.cuentaService.cargar_cuentas_bancarias_personas().subscribe((data: any) => {
      this.cuentas_bancarias = data.data.persona.cuentas_bancarias;
      this.renombrar_personas_cb();
    });
  }
  cargar_cuentas_bancarias_empresas() {
    this.cuentaService.cargar_cuentas_bancarias_empresas().subscribe((data: any) => {
      this.cuentas_bancarias = data.data.empresa.cuentas_bancarias;
      this.renombrar_empresas_cb();
    });
  }
  cargar_tarjetas_credito() {
    this.cuentaService.cargar_tarjetas_credito().subscribe((data: any) => {
      if(data.data) this.tarjetas_credito = data.data;
      this.renombrar_tc();
    });
  }
  renombrar_personas_cb() {
    this.cuentas_bancarias.forEach( data => {
      data['numero'] = data.persona_cuenta_bancariaIBAN.slice(-4);
      data['nombre'] = data.persona_cuenta_bancariaSWIFT;
      data['img'] = 'assets/tabs/componentes/banco.png';
      data['icono'] = 'assets/tabs/componentes/banco.png';
      data['css'] = 'icono_bank';
    })
  } 
  renombrar_empresas_cb() {
    this.cuentas_bancarias.forEach( data => {
      data['numero'] = data.empresa_cuenta_bancariaIBAN.slice(-4);
      data['nombre'] = data.empresa_cuenta_bancariaSWIFT;
      data['img'] = 'assets/tabs/componentes/banco.png';
      data['icono'] = 'assets/tabs/componentes/banco.png';
      data['css'] = 'icono_bank';
    })
  } 
  renombrar_tc() {
    this.tarjetas_credito.forEach( data => {
      data['numero'] = data.last4;
      data['nombre'] = data.brand;
      data['img'] = this.tipo_tc(data.brand);
      data['icono'] = 'assets/tabs/componentes/tarjeta.png';
      data['css'] = 'icono_card';
    })
  }
  tipo_tc(tipo) {
    if (tipo == 'Visa') return 'assets/tabs/componentes/visa.png';
    if (tipo == 'American Express') return 'assets/tabs/componentes/american.png';
    if (tipo == 'Diners Club') return 'assets/tabs/componentes/diners.png';
    if (tipo == 'MasterCard') return 'assets/tabs/componentes/mastercard.png';
    return 'assets/tabs/componentes/tarjeta.png';
  }

}
