import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CarterasService } from '../../paginas-usuarios/cartera/carteras.service';

@Component({
  selector: 'EtixPay-select-type-pay-orden',
  templateUrl: './select-type-pay-orden.component.html',
  styleUrls: ['./select-type-pay-orden.component.scss'],
})
export class SelectTypePayOrdenComponent {
  saldo_tix = 0;
  tipo_user = JSON.parse(localStorage.getItem('user')).tipoUsuario;
  show: boolean = false;

  constructor(
    private carterasService: CarterasService,
    private modalController: ModalController
  ) { 
    this.actualizar();
  }

  ticket() {
    this.modalController.dismiss({data:true});
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
    });
  }
  empresa() {
    this.carterasService.cargarSaldoTixEmpresas().subscribe((data: any) => {
      this.saldo_tix = data.data.wallets[0].walletSALDOATM;
    });
  }

}
