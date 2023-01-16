import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
declare var google;
import { Plugins } from'@capacitor/core';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { debounceTime } from 'rxjs/operators';
import { PopoverController } from '@ionic/angular';
const { Geolocation } = Plugins;


@Component({
  selector: 'app-modal-map',
  templateUrl: './modal-map.component.html',
  styleUrls: ['./modal-map.component.scss'],
})
export class ModalMapComponent implements OnInit {

  address = '';
  geo = {
    lat: 39.2941091,
    lng: -3.8983071
  }
  debounce_coordenadas: Subject<string> = new Subject();
  @ViewChild('map', { read: ElementRef }) mapRef: ElementRef;
  map: any;
  marker: any;
  cargando = false;
  geoCoder = new google.maps.Geocoder();

  @ViewChild("placesRef") placesRef : GooglePlaceDirective;

  options="{types: [],componentRestrictions: { country: 'ES' }}"

  constructor(
    private popoverController: PopoverController
  ) { }

  ngOnInit() {
    this.cargarMapaInit();
  }
  async cargarMapaInit() {
    const coordinates = await Geolocation.getCurrentPosition();
    if (coordinates.coords) {
      this.geo.lat = coordinates.coords.latitude;
      this.geo.lng = coordinates.coords.longitude;
    }
    this.getGeolocation();
  } 

  handleAddressChange(address: Address) {
    this.address = address.formatted_address;
    this.geo.lat = address.geometry.location.lat();
    this.geo.lng = address.geometry.location.lng();
    this.getGeolocation();
  }

  async getGeolocation(){
    if (this.geo.lat === 0 && this.geo.lng === 0) {
      const geoposition = await Geolocation.getCurrentPosition();
      this.geo.lat = geoposition.coords.latitude;
      this.geo.lng = geoposition.coords.longitude;
      this.marker = new google.maps.Marker({
        position: new google.maps.LatLng(this.geo.lat, this.geo.lng),
        map: null,
        icon: {
          url: 'assets/img/home/componentes/mapa/mi_posicion.png',
          scaledSize: new google.maps.Size(30, 30)
        },
        animation: google.maps.Animation.DROP,
        draggable: true,
        visible: true
      });
      this.cargar_debounces();
      setTimeout(() => { this.mapa(); }, 100);
    } else {
      this.marker = new google.maps.Marker({
        position: new google.maps.LatLng(this.geo.lat, this.geo.lng),
        map: null,
        icon: {
          url: 'assets/tabs/home/componentes/mapa/mi_posicion.png',
          scaledSize: new google.maps.Size(30, 30)
        },
        animation: google.maps.Animation.DROP,
        draggable: true,
        visible: true
      });
      this.cargar_debounces();
      setTimeout(() => { this.mapa(); }, 100);
    }
  }

  mapModal(cancel: boolean) {
    if (cancel)  {
      let data = {
        address: this.address,
        lat: this.geo.lat,
        lng: this.geo.lng
      }
      this.popoverController.dismiss({data})
    } else {
      this.popoverController.dismiss()
    }
  }

  //MAPA
  mapa() {
    const location = new google.maps.LatLng(this.geo.lat, this.geo.lng);
    var customMapType = new google.maps.StyledMapType({ name: 'Custom Style' });
    var customMapTypeId = 'custom_style';
    const options = {
      center: location,
      maxZoom: 22,
      minZoom: 1,
      zoom: 6,
      streetViewControl: false,
      fullscreenControl: false,
      zoomControl: false,
      mapTypeControl: false,
      clickableIcons: false,
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
      }
    };
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.map.mapTypes.set(customMapTypeId, customMapType);
    this.map.setMapTypeId(customMapTypeId);
    this.marker.addListener("dragend", () => {
      this.cargando = !this.cargando;
      this.geo.lat = this.marker.position.lat();
      this.geo.lng = this.marker.position.lng();
      this.direccion_con_google_coordenadas(this.geo.lat, this.geo.lng);
    });
    this.marker.setMap(this.map);
  }

  async validarGeoposicion() {
    this.cargando = !this.cargando;
    const coordinates = await Geolocation.getCurrentPosition();
    if (coordinates.coords) {
      this.geo.lat = coordinates.coords.latitude;
      this.geo.lng = coordinates.coords.longitude;
    }
    this.direccion_con_google_coordenadas(this.geo.lat, this.geo.lng)
  }
  
  direccion_con_google_coordenadas(lat, lng) {
    let latlng = { lat: lat, lng: lng }
    this.geoCoder.geocode({ 'location': latlng }, (resultados, status) => {
      this.cargando = !this.cargando;
      this.geo.lat = resultados[0].geometry.location.lat();
      this.geo.lng = resultados[0].geometry.location.lng();
      this.address = resultados[0].formatted_address;
      this.cambia_coordenadas_centrales();
    });
  }

  direccion_con_google_address(valor) {
    this.geoCoder.geocode({ 'address': valor }, (resultados, status) => {
      if (resultados) {
        this.geo.lat = resultados[0].geometry.location.lat();
        this.geo.lng = resultados[0].geometry.location.lng();
        this.cambia_coordenadas_centrales();
      }
    });
  }
  
  cargar_debounces() {
    this.debounce_coordenadas.pipe(debounceTime(1000)).subscribe(valor => {
      this.direccion_con_google_address(valor);
    })
  }

  debounce_input_coordenadas() {
    this.debounce_coordenadas.next(this.address);
  }

  cambia_coordenadas_centrales() {
    let location = new google.maps.LatLng(this.geo.lat, this.geo.lng);
    this.marker.setPosition(location);
    this.map.setCenter(location)
    // this.map.setZoom(14);
  }
  //MAPA
}