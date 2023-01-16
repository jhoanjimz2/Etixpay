import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverSugerenciaComponent } from '../popover-sugerencia/popover-sugerencia.component';
import { SugerenciaTiendaComponent } from '../sugerencia-tienda/sugerencia-tienda.component';
import { ModalController, PopoverController } from '@ionic/angular';
declare var google: any;
import { Plugins, CameraResultType } from'@capacitor/core';
import { CamaraService } from 'src/app/services/camara.service';
const { Geolocation, Camera } = Plugins;

@Component({
  selector: 'app-mapa-home',
  templateUrl: './mapa-home.component.html',
  styleUrls: ['./mapa-home.component.scss'],
})
export class MapaHomeComponent implements OnInit {
  @ViewChild('map', { read: ElementRef }) mapRef: ElementRef;
  map: any;
  makerPosicionPersona = new google.maps.Marker({
    position: new google.maps.LatLng(null, null),
    map: null,
    icon: {
      url: 'assets/tabs/home/componentes/mapa/mi_posicion.png',
      scaledSize: new google.maps.Size(30, 30)
    },
    animation: google.maps.Animation.DROP,
    visible: true
  });
  geo = {
    lat: 39.2941091,
    lng: -3.8983071
  }

  constructor(
    private router: Router,
    private popoverController: PopoverController,
    private modalController: ModalController,
    private camaraService: CamaraService
    ) { 
  }
  ngOnInit() {
    //setTimeout( () => {this.showMap();}, 2000)
  }
  ngAfterViewInit(){
    this.showMap().then(() => {
      this.mapPosition();
    });
    this.mapPosition();
  }
  async showMap() {
    const coordinates = await Geolocation.getCurrentPosition();
    if (coordinates.coords) {
      this.geo.lat = coordinates.coords.latitude;
      this.geo.lng = coordinates.coords.longitude;
    }
    //localStorage.setItem('position',JSON.stringify(this.geo));
  }
  mapPosition() {
    const location = new google.maps.LatLng(this.geo.lat, this.geo.lng);
    var customMapType = new google.maps.StyledMapType({ name: 'Custom Style' });
    var customMapTypeId = 'custom_style';
    const options = {
      center: location,
      maxZoom: 22,
      minZoom: 1,
      zoom: 8,
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
    this.makerPosicionPersona.position = new google.maps.LatLng(this.geo.lat, this.geo.lng);
    this.makerPosicionPersona.setMap(this.map);
  }
  mapa() {
    this.router.navigate(["/pages/mapa/map"]);
  }

  seleccion_sugerencia() {
    if (localStorage.getItem('sugerencia')) this.cargar_camara();
    else this.popover_sugerencia();
  }
  async cargar_camara() {
    const camara = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl
    });
    if (camara.dataUrl) {
      this.superencia(camara.dataUrl, this.camaraService.dataURItoBlob(camara.dataUrl));
    }
  }
  async popover_sugerencia() {
    const popover = await this.popoverController.create({
      component: PopoverSugerenciaComponent,
      cssClass: 'popover_central_sugerencia',
      mode: 'ios',
      translucent: false,
      backdropDismiss: false
    });
    return await popover.present();
  }
  async superencia(imagen, imagen_para_subir) {
    const modal = await this.modalController.create({
      component: SugerenciaTiendaComponent,
      componentProps: {
        imagen,
        imagen_para_subir
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
  }

}
