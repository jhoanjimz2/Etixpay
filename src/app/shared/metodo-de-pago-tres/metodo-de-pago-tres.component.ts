import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MetodosPagoService } from 'src/app/services/metodos-pago.service';
import { TranslateService } from '@ngx-translate/core';
import { AddMetodoPagoComponent } from '../../pages/ajustes/components/add-metodo-pago/add-metodo-pago.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-metodo-de-pago-tres',
  templateUrl: './metodo-de-pago-tres.component.html',
  styleUrls: ['./metodo-de-pago-tres.component.scss'],
})
export class MetodoDePagoTresComponent implements OnInit {
  @Input() prev_select: any = [{}];
  cuentas = [];
  tipo_user = JSON.parse(localStorage.getItem('user')).tipoUsuario;
  constructor(
    private metodos_pago_service: MetodosPagoService,
    private translate_service: TranslateService,
    private modal_controller: ModalController
  ) { }

  ngOnInit() {
    this.cargarCuentas();
  }
  cargarCuentas() {
    this.cuentas = [];
    if (this.tipo_user == 3) this.personas(); 
    else this.empresas();
  }
  personas() {
    this.metodos_pago_service.cuentas_bancarias_personas().subscribe((datos: any) => {
      this.cuentas = datos.data.persona.cuentas_bancarias;
      this.rellenar_datos_personas();
    }, error => {
    });
  }
  empresas() {
    this.metodos_pago_service.cuentas_bancarias_empresas().subscribe((datos: any) => {
      this.cuentas = datos.data.empresa.cuentas_bancarias;
      this.rellenar_datos_empresas();
    }, error => {
    });
  }
  rellenar_datos_personas() {
    this.cuentas.forEach(cuenta => {
      cuenta['SWIFT'] = cuenta.persona_cuenta_bancariaSWIFT;
      cuenta['IBAN'] = cuenta.persona_cuenta_bancariaIBAN;
    })
    this.prev_select[0] = this.cuentas[0];
  }
  rellenar_datos_empresas() {
    this.cuentas.forEach(cuenta => {
      cuenta['SWIFT'] = cuenta.empresa_cuenta_bancariaIBAN;
      cuenta['IBAN'] = cuenta.empresa_cuenta_bancariaSWIFT;
    })
    this.prev_select[0] = this.cuentas[0];
  }
  async add_metodo_pago() {
    const modal = await this.modal_controller.create({
      component: AddMetodoPagoComponent,
      componentProps: {  tipo: 'bank'   },
      cssClass: 'modal_add_metodo_pago'
    });
    await modal.present();
  }

}
