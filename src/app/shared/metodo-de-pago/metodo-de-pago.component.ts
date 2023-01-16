import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MetodosPagoService } from '../../services/metodos-pago.service';
import { ModalController } from '@ionic/angular';
import { AddMetodoPagoComponent } from '../../pages/ajustes/components/add-metodo-pago/add-metodo-pago.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-metodo-de-pago',
  templateUrl: './metodo-de-pago.component.html',
  styleUrls: ['./metodo-de-pago.component.scss'],
})
export class MetodoDePagoComponent {
  @Output() selectAccount: EventEmitter<any> = new EventEmitter<any>();
  @Input() prev_select = [];

  total_cuentas = [];
  texto;
  tarjetas = [];
  mostrar = false;
  saldo_tix = JSON.parse(localStorage.getItem('SALDOTIX'));
  tipo_user = JSON.parse(localStorage.getItem('user'));

  constructor(
    private metodos_pago_service: MetodosPagoService,
    private modal_controller: ModalController,
    private translate_service: TranslateService
  ) { 
  }
  ngOnInit() {
    this.actualizar();
    this.translate_service.get('PREPAID').subscribe(value => { this.texto = value; });
    this.total_cuentas.push(this.prev_select[0]);
    this.cargar_tarjetas();
  }
  select_cuenta (cuenta) {
    let prev = this.prev_select[0];
    prev.seleccionado = false; 
    this.prev_select[0] = cuenta; 
    this.prev_select[0].seleccionado = true; 
    this.selectAccount.emit(this.prev_select[0])
  }
  cargar_tarjetas() {
    this.metodos_pago_service.cargar_cuentas().subscribe((data: any) => {
      if(data.data) this.tarjetas = data.data;
      this.renombrar_tc();
      this.total_cuentas = [].concat(this.total_cuentas, this.tarjetas);
    }, error => {
      console.log(error)
    })
  }
  renombrar_tc() {
    this.tarjetas.forEach( data => {
      data['texto'] = this.texto + ' •••• ' + data.last4;
      data['nombre'] = data.brand;
      data['correo'] = data.name;
      data['img'] = this.img (data.brand);
      data['seleccionado'] = false;
      data['tipo'] = 'TC';
    })
  }
  img (tipo) {
    if (tipo == 'Diners Club') return "/assets/tabs/componentes/diners.png"; 
    if (tipo == 'American Express') return "/assets/tabs/componentes/american.png"; 
    if (tipo == 'MasterCard') return "/assets/tabs/componentes/mastercard.png"; 
    if (tipo == 'Visa') return "/assets/tabs/componentes/visa.png"; 
  }
  async add_metodo_pago() {
    const modal = await this.modal_controller.create({
      component: AddMetodoPagoComponent,
      componentProps: {  tipo: 'card'   },
      cssClass: 'modal_add_metodo_pago'
    });
    await modal.present();
  }
  actualizar() {
    if (this.tipo_user.tipoUsuario == 3) {
      this.persona();
    } else {
      this.empresa();
    }
  }
  persona() {
    this.metodos_pago_service.saldo_tix_personas().subscribe((data: any) => {
      this.saldo_tix = data.data.wallets[0].walletSALDOATM;
    } , error => {
    });
  }
  empresa() {
    this.metodos_pago_service.saldo_tix_empresas().subscribe((data: any) => {
      this.saldo_tix = data.data.wallets[0].walletSALDOATM;
    } , error => {
    });
  }

}
