import { Component } from '@angular/core';
import { HomeService } from '../../../services/home.service';
import { Plugins } from'@capacitor/core';
const { Geolocation } = Plugins;


@Component({
  selector: 'app-local-invest',
  templateUrl: './local-invest.page.html',
  styleUrls: ['./local-invest.page.scss'],
})
export class LocalInvestPage {

  tipo = JSON.parse(localStorage.getItem('user'));
  proyectos: any = [];
  filtro_de_busqueda = '';
  filtro_de_busqueda_dos = '';
  boton_categorias = false;
  filtros = [
    { id: '1', texto: 'AZ' },
    { id: '2', exto: 'ZA' },
    { id: '5', texto: 'LOWERPRICE' },
    { id: '6', texto: 'HIGHERPRICE' }
  ];
  geo = {
    lat: null,
    lng: null
  }


  constructor(
    private homeService: HomeService
    ) {
    this.cargarLocales(); 
  }
  cargarLocales() {
    switch (this.tipo.tipoUsuario) {
      case 3:
        this.localsPersona();
      break;
      default:
        this.localsEmpresa();
      break;
    }
  }
  localsPersona() {
    this.homeService.localsPersona().subscribe( (data: any) => {
      this.proyectos = data.data.locals;
      this.sacarPosicion(); 
    })
  }
  localsEmpresa() {
    this.homeService.localsEmpresa().subscribe( (data: any) => {
      this.proyectos = data.data.locals;
      this.sacarPosicion(); 
    })
  }
  buscar(evento) {
    this.filtro_de_busqueda = evento.detail.value;
  }
  
  async sacarPosicion() {
    const coordinates = await Geolocation.getCurrentPosition();
    if (coordinates.coords) {
      this.geo.lat = coordinates.coords.latitude;
      this.geo.lng = coordinates.coords.longitude;
    } else {
      this.posicion_por_defecto();
    }
  }
  posicion_por_defecto() {
    this.geo.lat = 39.2941091;
    this.geo.lng = -3.8983071;
  }


}
