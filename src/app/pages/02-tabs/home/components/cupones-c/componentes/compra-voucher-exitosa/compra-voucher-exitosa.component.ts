import { Component, OnInit } from '@angular/core';
import { CuponesComponent } from '../cupones/cupones.component';
import { ModalController } from '@ionic/angular';
import { PagarService } from 'src/app/services/pagar.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-compra-voucher-exitosa',
  templateUrl: './compra-voucher-exitosa.component.html',
  styleUrls: ['./compra-voucher-exitosa.component.scss'],
})
export class CompraVoucherExitosaComponent implements OnInit {

  categorias = [];
  categorias_dos = [];
  constructor(
    private modal_controller: ModalController,
    private http: HttpClient,
    private pagar_service: PagarService
  ) { }

  ngOnInit() {
    this.data();
  }
  data() {
    this.http.get('../../assets/cupones/cupones.json').subscribe((data: any) => {
      this.categorias = data.categorias;
    })
    this.cargar_categorias();
  }
  cargar_categorias() {
    this.pagar_service.cargar_categorias_vouchers().subscribe((data: any) => {
      this.categorias_dos = data.data;
      this.categorias = [].concat(this.categorias, data.data);
    }, error => {
    })
  }
  go_yo_my_vocuhers() {
    this.modal_controller.dismiss();
    setTimeout( () => {this.cupones_page_mios()}, 1000)
  }
  async cupones_page_mios() {
    this.modal_controller.dismiss();
    const modal = await this.modal_controller.create({
      component: CuponesComponent,
      componentProps: {
        categoria: this.categorias[0],
        my_vouchers: true,
        categorias: this.categorias_dos
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
  }

}
