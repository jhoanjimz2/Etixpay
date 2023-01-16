import { Component, Input, ViewChild, ElementRef } from '@angular/core';
declare var google: any;

@Component({
  selector: 'app-mapa-store',
  templateUrl: './mapa-store.component.html',
  styleUrls: ['./mapa-store.component.scss'],
})
export class MapaStoreComponent {

  @Input() direccion: string = "";
  @Input() latitud: number = 0;
  @Input() longitud: number = 0;
  @ViewChild('map', { read: ElementRef }) mapRef: ElementRef;
  map: any;
  makerPosicionPersona = new google.maps.Marker({
    position: new google.maps.LatLng(null, null),
    map: null,
    icon: {
      url: 'assets/tabs/home/componentes/mapa/map_1.svg',
      scaledSize: new google.maps.Size(55, 55)
    },
    animation: google.maps.Animation.DROP,
    visible: true
  });

  constructor() { 
    setTimeout( () => {this.cargar_mapa();},1000)
  }
  cargar_mapa() {
    const location = new google.maps.LatLng(this.latitud, this.longitud);
    var customMapType = new google.maps.StyledMapType({name: 'Custom Style'});
    var customMapTypeId = 'custom_style';
    const options = {
      center: location,
      maxZoom: 22,
      minZoom: 1,
      zoom: 14,
      streetViewControl: false,
      fullscreenControl: false,
      zoomControl: false,
      mapTypeControl: false,
      gestureHandling: "none",
      clickableIcons: false,
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
      }
    };
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.map.mapTypes.set(customMapTypeId, customMapType);
    this.map.setMapTypeId(customMapTypeId);
    this.makerPosicionPersona.position = new google.maps.LatLng(this.latitud, this.longitud);
    this.makerPosicionPersona.setMap(this.map);
  }

}
