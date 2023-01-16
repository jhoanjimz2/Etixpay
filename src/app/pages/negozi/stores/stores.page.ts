import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { NegoziService } from 'src/app/services/negozi.service';
import { CargandoService } from 'src/app/services/cargando.service';
import { Plugins } from'@capacitor/core';
const { Geolocation } = Plugins;

@Component({
  selector: 'app-stores',
  templateUrl: './stores.page.html',
  styleUrls: ['./stores.page.scss'],
})
export class StoresPage {

  geo = {
    lat: 39.2941091,
    lng: -3.8983071
  }

  categoriesStores: any = [
    {
      categoria_empresaCODIGO: 'All',
      categoria_empresaTITULO: 'ALLE'
    }
  ];
  categorySelect = 'All';


  
  stores: any = [];
  paginaActual = 1;
  paginasTotales = 0;
  cargar = false;

  
  topPr: any = [];
  cargarTops = false;
  paginaActualT = 1;
  paginasTotalesT = 0;

  storesDestacadas: any = [];
  cargarDestacadas = false;
  paginaActualD = 1;
  paginasTotalesD = 0;



  listaSearch: any = [];
  noEncontrado = false;
  cargando = false;


  constructor(
    private negoziService: NegoziService,
    private navCtrl: NavController,
    private http: HttpClient,
    private cargandoService: CargandoService
  ) { 
    this.cargarTiendasDestacadas();
    this.categorias();
    this.sacarPosicion();
  }
  back() {
    this.navCtrl.back();
  }
  async sacarPosicion() {
    const coordinates = await Geolocation.getCurrentPosition();
    if (coordinates.coords) {
      this.geo.lat = coordinates.coords.latitude;
      this.geo.lng = coordinates.coords.longitude;
    }
    this.cargarTiendasTopPr();
    this.selectCategory('ALL');
  }

  cargarTiendasTopPr() {
    this.cargarTops = true;
    this.negoziService.topPR(this.geo.lat, this.geo.lng, this.paginaActualT ).subscribe((data: any) => {
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
      this.cargarTiendasTopPr();
    }
  }

  
  cargarTiendasDestacadas() {
    this.cargarDestacadas = true;
    this.negoziService.destacadas(this.paginaActualD).subscribe((data: any) => {
      if (this.paginaActualD > 1) {
        let stores = this.storesDestacadas.concat(data.data.data);
        this.storesDestacadas = stores;
      } else {
        this.storesDestacadas = data.data.data;
        this.paginasTotalesD = data.data.last_page;
      }
      this.cargarDestacadas = false;
    }, error => {
      this.cargarDestacadas = false;
    })
  }
  nextDestacadas() {
    if (this.paginaActualD < this.paginasTotalesD) {
      this.paginaActualD = this.paginaActualD + 1;
      this.cargarTiendasDestacadas();
    }
  }





  categorias() {
    this.negoziService.categories().subscribe((data: any) => {
      let cate = this.categoriesStores.concat(data.data);
      this.categoriesStores = cate;
    });
  }
  buscar(text) {
    this.cargando = true;
    if ( text.toString().length == 0){ this.listaSearch = []; this.noEncontrado = false; this.cargando = false;return}
    this.negoziService.search(text).subscribe((data: any) => {
      this.listaSearch = data.data.data;
      if (this.listaSearch.length == 0) this.noEncontrado = true;
      else this.noEncontrado = false;
    
      this.cargando = false;
    }, error => {
      this.cargando = false;
      console.log(error)
    })
  }


  selectCategory(event: string) {
    this.categorySelect = event;
    this.paginaActual = 1;
    return this.cargarStoresByCategory();
  }
  cargarStoresByCategory() {
    this.cargandoService.iniciaCargando();
    this.cargar = true;
    this.negoziService.byCategory(this.geo.lat, this.geo.lng, this.paginaActual, this.categorySelect.toString().toUpperCase()).subscribe((data: any) => {
      if (this.paginaActual > 1) {
        let stores = this.stores.concat(data.data.data);
        this.stores = stores;
      } else {
        this.stores = data.data.data;
        this.paginasTotales = data.data.last_page;
      }
      this.cargandoService.terminaCargando();
      this.cargar = false;
    }, error => {
      this.cargandoService.terminaCargando();
      this.cargar = false;
    });
  }
  nextCategory() {
    if (this.paginaActual < this.paginasTotales) {
      this.paginaActual = this.paginaActual + 1;
      this.cargarStoresByCategory();
    }
  }















}
