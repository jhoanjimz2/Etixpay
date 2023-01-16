import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { Profesional } from '../../interface/experts.model';
declare var google: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent {

  @Input() profesional: Profesional = new Profesional();
  @ViewChild('map', { read: ElementRef }) mapRef: ElementRef;
  map: any;
  markeruno = new google.maps.Marker({
    position: new google.maps.LatLng(null, null),
    map: null,
    icon: {
      url: 'assets/tabs/home/componentes/mapa/map_1.svg',
      scaledSize: new google.maps.Size(55, 55)
    },
    animation: google.maps.Animation.DROP,
    visible: true
  });
  markerdos = new google.maps.Marker({
    position: new google.maps.LatLng(null, null),
    map: null,
    icon: {
      url: 'assets/tabs/home/componentes/mapa/map_1.svg',
      scaledSize: new google.maps.Size(55, 55)
    },
    animation: google.maps.Animation.DROP,
    visible: true
  });


  ngOnChanges(): void {
    if (this.profesional.legal_address.address) this.cargar_mapa()
  }
  cargar_mapa() {
    const location = new google.maps.LatLng(this.profesional.legal_address.latitud, this.profesional.legal_address.longitud);
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
      clickableIcons: false,
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
      }
    };
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.map.mapTypes.set(customMapTypeId, customMapType);
    this.map.setMapTypeId(customMapTypeId);
    this.markeruno.position = new google.maps.LatLng(this.profesional.legal_address.latitud, this.profesional.legal_address.longitud);
    this.markeruno.setMap(this.map);
    if(this.profesional.operative_address) {
      this.markerdos.position = new google.maps.LatLng(this.profesional.operative_address.latitud, this.profesional.operative_address.longitud);
      this.markerdos.setMap(this.map);
    }
  }

}
