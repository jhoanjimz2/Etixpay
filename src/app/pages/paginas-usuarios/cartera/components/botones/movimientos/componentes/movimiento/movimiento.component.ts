import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DescripcionMovimientoComponent } from '../descripcion-movimiento/descripcion-movimiento.component';

@Component({
  selector: 'app-movimiento',
  templateUrl: './movimiento.component.html',
  styleUrls: ['./movimiento.component.scss'],
})
export class MovimientoComponent implements OnInit {
  @Input() movimiento: any;
  tipo = JSON.parse(localStorage.getItem('user')).tipoUsuario;

  constructor(
    private modal_controller: ModalController
  ) { }

  ngOnInit() {  
    this.ajustar_concepto();
  }
  ajustar_concepto() {
    if (this.movimiento.transaccionCONCEPTO == 'RETIRO' && this.movimiento.wallet_h_a_c_i_a && this.tipo != 3) this.movimiento['concepto'] = this.movimiento.wallet_h_a_c_i_a.walletCODIGO;
    if (this.movimiento.transaccionCONCEPTO == 'INGRESO' && this.movimiento.wallet_d_e_s_d_e && this.tipo != 3) this.movimiento['concepto'] = this.movimiento.wallet_d_e_s_d_e.walletCODIGO;
    if (this.movimiento.transaccionCONCEPTO == 'RETIRO' && this.movimiento.wallet_h_a_c_i_a && this.tipo == 3) return this.movimiento['concepto'] = this.movimiento.wallet_h_a_c_i_a.users[0].email;
    if (this.movimiento.transaccionCONCEPTO == 'INGRESO' && this.movimiento.wallet_d_e_s_d_e && this.tipo == 3) return this.movimiento['concepto'] = this.movimiento.wallet_d_e_s_d_e.users[0].email;
  }
  async descripcion_movimiento() {
    const modal = await this.modal_controller.create({
      component: DescripcionMovimientoComponent,
      componentProps: {
        movimiento: this.movimiento
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
  }

}
