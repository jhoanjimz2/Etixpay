import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NegoziService } from '../../../../services/negozi.service';
import { Plugins } from'@capacitor/core';
const { Geolocation } = Plugins;

@Component({
  selector: 'app-nearby-stores',
  templateUrl: './nearby-stores.component.html',
  styleUrls: ['./nearby-stores.component.scss'],
})
export class NearbyStoresComponent {
  geo = {
    lat: 39.2941091,
    lng: -3.8983071
  }

  stores: any = [];
  cargar = false;
  paginaActual = 1;
  paginasTotales = 0;

  constructor(
    private negoziService: NegoziService,
    private router: Router
  ) { 
    this.sacarPosicion();
  }
  async sacarPosicion() {
    const coordinates = await Geolocation.getCurrentPosition();
    if (coordinates.coords) {
      this.geo.lat = coordinates.coords.latitude;
      this.geo.lng = coordinates.coords.longitude;
    }
    this.cargarTiendas();
  }
  cargarTiendas() {
    this.cargar = true;
    this.negoziService.nearbyStores(this.geo.lat, this.geo.lng, this.paginaActual ).subscribe((data: any) => {
      if (this.paginaActual > 1) {
        let stores = this.stores.concat(data.data.data);
        this.stores = stores;
      } else {
        this.stores = data.data.data;
        this.paginasTotales = data.data.last_page;
      }
      this.cargar = false;
    }, error => {
      this.cargar = false;
    })
  }
  siguiente() {
    if (this.paginaActual < this.paginasTotales) {
      this.paginaActual = this.paginaActual + 1;
      this.cargarTiendas();
    }
  }
  irNegoziAll() {
    this.router.navigate(["/pages/negozi/stores"]);
  }
  irNegoziPage(uuid) {
    this.router.navigate(["/pages/negozi/store-page/"+ uuid]);
  }

}
