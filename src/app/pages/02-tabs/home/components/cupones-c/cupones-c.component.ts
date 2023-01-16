import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HomeService } from '../../../../../services/home.service';
import { CuponesComponent } from './componentes/cupones/cupones.component';

@Component({
  selector: 'app-cupones-c',
  templateUrl: './cupones-c.component.html',
  styleUrls: ['./cupones-c.component.scss'],
})
export class CuponesCComponent implements OnInit {
  slide = {
    initialSlide: 0,
    slidesPerView:5.5,
    observer: true,
    observeParents: true
  };
  categorias = [];
  categorias_dos = [];

  constructor(
    private modal_controller: ModalController,
    private home_service: HomeService,
    private http: HttpClient
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
    this.home_service.cargar_categorias_vouchers().subscribe((data: any) => {
      this.categorias_dos = data.data;
      this.categorias = [].concat(this.categorias, data.data);
      this.rellenar_datos();
    }, error => {
    })
  }
  rellenar_datos() {
    this.categorias.forEach((categoria) => {
      if (!categoria.color) categoria['color'] = this.generar_color;  
      if (!categoria.icono) categoria['icono'] = 'ticket.svg';
      if (!categoria.css_img) categoria['css_img'] = 'img_dos'
    })
  }
  categoria_(categoria) {
    if (localStorage.getItem('lenguaje') == 'it') return categoria.voucher_tipoTITULOIT;
    if (localStorage.getItem('lenguaje') == 'en') return categoria.voucher_tipoTITULOEN;
    if (localStorage.getItem('lenguaje') == 'es') return categoria.voucher_tipoTITULOES;
    if (localStorage.getItem('lenguaje') == 'ro') return categoria.voucher_tipoTITULORO;
  }
  get generar_color() {
    var simbolos, color;
    simbolos = "0123456789ABCDEF";
    color = "#";
    for(var i = 0; i < 6; i++) color = color + simbolos[Math.floor(Math.random() * 16)];
    return color
  }

  tipo_vista(categoria) {
    switch (categoria.id_vista) {
      case 1:
        this.cupones_page_mios(categoria);
      break;
      case 2:
        this.cupones_page_flash(categoria);
      break;
      case 3:
        this.cupones_page_all(categoria);
      break;
      default:
        this.cupones_page(categoria);
      break;
    }
  }
  async cupones_page_mios(categoria) {
    const modal = await this.modal_controller.create({
      component: CuponesComponent,
      componentProps: {
        categoria: categoria,
        my_vouchers: true,
        categorias: this.categorias_dos
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
  }
  async cupones_page_flash(categoria) {
    const modal = await this.modal_controller.create({
      component: CuponesComponent,
      componentProps: {
        categoria: categoria,
        flash_vouchers: true,
        categorias: this.categorias_dos
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
  }
  async cupones_page_all(categoria) {
    const modal = await this.modal_controller.create({
      component: CuponesComponent,
      componentProps: {
        categoria: categoria,
        all_vouchers: true,
        categorias: this.categorias_dos
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
  }
  async cupones_page(categoria) {
    const modal = await this.modal_controller.create({
      component: CuponesComponent,
      componentProps: {
        categoria: categoria,
        vouchers_types:  true,
        barra: false
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
  }

}
