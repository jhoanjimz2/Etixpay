import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { HomeService } from '../../../../../../../services/home.service';

@Component({
  selector: 'app-cupones',
  templateUrl: './cupones.component.html',
  styleUrls: ['./cupones.component.scss'],
})
export class CuponesComponent implements OnInit {

  categorias = [];

  sub_categorias;
  
  vouchers_mostrar = 3;
  vouchers_mostrar_all = null;
  

  vouchers_flash = []; ultima_pagina_flash; control_paginas_flash = 1;
  vouchers_my = []; ultima_pagina_my; control_paginas_my = 1;
  vouchers_my_ejecutados = []; ultima_pagina_my_ejecutados; control_paginas_my_ejecutados = 1;
  vouchers_all = []; ultima_pagina_all; control_paginas_all = 1;

  activar_filtro = false;
  ordenamiento = null;

  constructor(
    private modal_controller: ModalController,
    private home_service: HomeService,
    private http: HttpClient
  ) { }
  ngOnInit() {
    this.cargar_categorias();
    this.cargar_subcategorias();
    this.cargar_my_vouchers_ejecutados(this.control_paginas_my_ejecutados); 
    this.cargar_my_vouchers(this.control_paginas_my);
    this.cargar_flash_vouchers(this.control_paginas_flash);
    this.cargar_all_vouchers(this.control_paginas_all);
  }
  cargar_categorias() {
    this.http.get('../../assets/cupones/cupones.json').subscribe((data: any) => {
      this.categorias = data.categorias;
    })
  }
  cargar_subcategorias() {
    this.home_service.cargar_categorias_vouchers().subscribe((data: any) => {
      this.sub_categorias = data.data;
    }, error => {});
  }
  salir_sin_argumentos() {
    this.modal_controller.dismiss()
  }
  cargar_vouchers() {
    if (this.vouchers_mostrar == 1) {this.cargar_my_vouchers_ejecutados(this.control_paginas_my_ejecutados); this.cargar_my_vouchers(this.control_paginas_my);}
    if (this.vouchers_mostrar == 2) this.cargar_flash_vouchers(this.control_paginas_flash);
    if (this.vouchers_mostrar == 3) this.cargar_all_vouchers(this.control_paginas_all);
  }
  cargar_infinity_scroll(event) {
    if (this.vouchers_mostrar == 1) {this.load_data_my(event); this.load_data_my_ejecutados(event);}
    if (this.vouchers_mostrar == 2) this.load_data_flash(event);
    if (this.vouchers_mostrar == 3) this.load_data_all(event);
  }













  cargar_flash_vouchers(pagina_actual) {
    this.home_service.cargar_flash_vouchers(pagina_actual).subscribe((data: any) => {
      if (this.control_paginas_flash > 1) {
        let array = this.vouchers_flash.concat(data.data.data);
        this.vouchers_flash = array;
      } else {
        this.vouchers_flash = data.data.data;
        this.ultima_pagina_flash = data.data.last_page;
      }
      this.rellenar_vouchers_flash();
    }, error => {
      console.log(error);
    })
  }
  rellenar_vouchers_flash() {
    this.vouchers_flash.forEach(voucher => {
      if (!voucher.voucherable.event_of_detail) {
        if (voucher.voucherable.empresaDIRECCION) voucher['direccion'] = voucher.voucherable.empresaDIRECCION;
        if (voucher.voucherable.empresaPAIS) voucher['pais'] = voucher.voucherable.empresaPAIS;
        if (voucher.voucherable.empresaCIUDAD) voucher['ciudad'] = voucher.voucherable.empresaCIUDAD;
      }
      if (voucher.voucherable.event_of_detail) {
        if (voucher.voucherable.event_of_detail.eventoDIRECCION) voucher['direccion'] = voucher.voucherable.event_of_detail.eventoDIRECCION;
        if (voucher.voucherable.event_of_detail.paisID) voucher['pais'] = voucher.voucherable.event_of_detail.paisID;
        if (voucher.voucherable.event_of_detail.ciudadID) voucher['ciudad'] = voucher.voucherable.event_of_detail.ciudadID;
      }
    })
  }
  load_data_flash(event) {
    if (this.control_paginas_flash < this.ultima_pagina_flash) {
      this.control_paginas_flash = this.control_paginas_flash + 1;
      this.cargar_flash_vouchers(this.control_paginas_flash);
      setTimeout(() => {
        event.target.complete();
      }, 1000);
    } else {
      event.target.complete();
    }
  }















  cargar_my_vouchers(pagina_actual) {
    this.home_service.cargar_my_vouchers(pagina_actual).subscribe((data: any) => {
      if (this.control_paginas_my > 1) {
        let array = this.vouchers_my.concat(data.data.data);
        this.vouchers_my = array;
      } else {
        this.vouchers_my = data.data.data;
        this.ultima_pagina_my = data.data.last_page;
      }
      this.rellenar_vouchers_my();
    }, error => {
      console.log(error);
    })
  }
  rellenar_vouchers_my() {
    this.vouchers_my.forEach(voucher => {
      if (voucher.vouchers_company) {
        voucher['vouchers'] = voucher.vouchers_company;
        voucher['tienda'] = voucher.vouchers_company.voucherable;
        voucher['voucher_type'] = voucher.vouchers_company.voucher_type;
      }
      if (voucher.vouchers_event) {
        voucher['vouchers'] = voucher.vouchers_event;
        voucher['evento'] = voucher.vouchers_event.voucherable.event_of_detail;
        voucher['voucher_type'] = voucher.vouchers_event.voucher_type;
      };
    })
  }
  load_data_my(event) {
    if (this.control_paginas_my < this.ultima_pagina_my) {
      this.control_paginas_my = this.control_paginas_my + 1;
      this.cargar_my_vouchers(this.control_paginas_my);
      setTimeout(() => {
        event.target.complete();
      }, 1000);
    } else {
      event.target.complete();
    }
  }















  cargar_my_vouchers_ejecutados(pagina_actual) {
    this.home_service.cargar_my_vouchers_ejecutados(pagina_actual).subscribe((data: any) => {
      if (this.control_paginas_my_ejecutados > 1) {
        let array = this.vouchers_my_ejecutados.concat(data.data.data);
        this.vouchers_my_ejecutados = array;
      } else {
        this.vouchers_my_ejecutados = data.data.data;
        this.ultima_pagina_my_ejecutados = data.data.last_page;
      }
      this.rellenar_vouchers_my_ejecutados();
    }, error => {
      console.log(error);
    })
  }
  rellenar_vouchers_my_ejecutados() {
    this.vouchers_my_ejecutados.forEach(voucher => {
      if (voucher.vouchers_company) {
        voucher['vouchers'] = voucher.vouchers_company;
        voucher['tienda'] = voucher.vouchers_company.voucherable;
        voucher['voucher_type'] = voucher.vouchers_company.voucher_type;
      }
      if (voucher.vouchers_event) {
        voucher['vouchers'] = voucher.vouchers_event;
        voucher['evento'] = voucher.vouchers_event.voucherable.event_of_detail;
        voucher['voucher_type'] = voucher.vouchers_event.voucher_type;
      };
    })
  }
  load_data_my_ejecutados(event) {
    if (this.control_paginas_my_ejecutados < this.ultima_pagina_my_ejecutados) {
      this.control_paginas_my_ejecutados = this.control_paginas_my_ejecutados + 1;
      this.cargar_my_vouchers_ejecutados(this.control_paginas_my_ejecutados);
      setTimeout(() => {
        event.target.complete();
      }, 1000);
    } else {
      event.target.complete();
    }
  }















  cargar_all_vouchers(pagina) {
    this.home_service.cargar_all_voucher_active(pagina).subscribe((data: any) => {
      if (this.control_paginas_all > 1) {
        let array = this.vouchers_all.concat(data.data.data);
        this.vouchers_all = array;
      } else {
        this.vouchers_all = data.data.data;
        this.ultima_pagina_all = data.data.last_page;
      }
      this.rellenar_vouchers_all();
    }, error => {
      console.log(error);
    })
  }
  rellenar_vouchers_all() {
    this.vouchers_all.forEach(voucher => {
      if (!voucher.voucherable.event_of_detail) {
        if (voucher.voucherable.empresaDIRECCION) voucher['direccion'] = voucher.voucherable.empresaDIRECCION;
        if (voucher.voucherable.empresaPAIS) voucher['pais'] = voucher.voucherable.empresaPAIS;
        if (voucher.voucherable.empresaCIUDAD) voucher['ciudad'] = voucher.voucherable.empresaCIUDAD;
      }
      if (voucher.voucherable.event_of_detail) {
        if (voucher.voucherable.event_of_detail.eventoDIRECCION) voucher['direccion'] = voucher.voucherable.event_of_detail.eventoDIRECCION;
        if (voucher.voucherable.event_of_detail.paisID) voucher['pais'] = voucher.voucherable.event_of_detail.paisID;
        if (voucher.voucherable.event_of_detail.ciudadID) voucher['ciudad'] = voucher.voucherable.event_of_detail.ciudadID;
      }
    })
  }
  load_data_all(event) {
    if (this.control_paginas_all < this.ultima_pagina_all) {
      this.control_paginas_all = this.control_paginas_all + 1;
      this.cargar_all_vouchers(this.control_paginas_all);
      setTimeout(() => {
        event.target.complete();
      }, 1000);
    } else {
      event.target.complete();
    }
  }
  categorias_titulos(categoria) {
    if (localStorage.getItem('lenguaje') == 'it') return categoria.voucher_tipoTITULOIT;
    if (localStorage.getItem('lenguaje') == 'en') return categoria.voucher_tipoTITULOEN;
    if (localStorage.getItem('lenguaje') == 'es') return categoria.voucher_tipoTITULOES;
    if (localStorage.getItem('lenguaje') == 'ro') return categoria.voucher_tipoTITULORO;
  }

}
