import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { EcommerceService } from '../../services/ecommerce.service';
import { CargandoService } from '../../services/cargando.service';

@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.page.html',
  styleUrls: ['./ecommerce.page.scss'],
})
export class EcommercePage {
  
  shoppingEvidenza: any = [];
  categorySelect = 'All';
  shops: any = []


  topPr: any = [];
  cargarTops = false;
  paginaActualT = 1;
  paginasTotalesT = 0;


  categoriesShopping: any = [
    {
      categoria_empresaCODIGO: 'All',
      categoria_empresaTITULO: 'ALLE'
    }
  ];
  listaSearch: any = [];
  noEncontrado = false;
  cargando = false;

  constructor(
    private navCtrl: NavController,
    private ecommerService: EcommerceService,
    private cargandoService: CargandoService
  ) { 
    this.cargarCategorias();
    this.cargarDestacadas();
    this.selectCategory('ALL');
    this.cargarTopPr();
  }
  back() {
    this.navCtrl.back();
  }


  cargarCategorias() {
    this.ecommerService.categories().subscribe((data: any) => {
      let cate = this.categoriesShopping.concat(data.data);
      this.categoriesShopping = cate;
    });
  }
  cargarDestacadas() {
    this.ecommerService.inEvidenza().subscribe((data: any) => {
      this.shoppingEvidenza = data.data;
    })
  }
  cargarTopPr() {
    this.cargarTops = true;
    this.ecommerService.topPr(this.paginaActualT).subscribe((data: any) => {
      if (this.paginaActualT > 1) {
        let stores = this.topPr.concat(data.data.data);
        this.topPr = stores;
      } else {
        this.topPr = data.data.data;
        this.paginasTotalesT = data.data.last_page;
      }
      this.cargarTops = false;
    }, error => {
      this.cargarTops = false;
    })
  }
  nextTop() {
    if (this.paginaActualT < this.paginasTotalesT) {
      this.paginaActualT = this.paginaActualT + 1;
      this.cargarTopPr();
    }
  }

  selectCategory(event) {
    this.categorySelect = event;
    this.cargandoService.iniciaCargando();
    this.ecommerService.byCategory(this.categorySelect.toString().toUpperCase()).subscribe((data: any) => {
      this.cargandoService.terminaCargando();
      this.shops = data.data.data;
    }, error => {
      this.cargandoService.terminaCargando();
    });
  }



  
  buscar(text) {
    this.cargando = true;
    if ( text.toString().length == 0){ this.listaSearch = []; this.noEncontrado = false; this.cargando = false;return}
    this.ecommerService.search(text).subscribe((data: any) => {
      this.listaSearch = data.data;
      if (this.listaSearch.length == 0) this.noEncontrado = true;
      else this.noEncontrado = false;
      
      this.cargando = false;
    }, error => {
      this.cargando = false;
      console.log(error)
    })
  }

}
