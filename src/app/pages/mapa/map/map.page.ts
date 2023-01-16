import { Component, ElementRef, ViewChild } from '@angular/core';
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { ModalController, PopoverController, ToastController, NavController } from '@ionic/angular';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { TranslateService } from '@ngx-translate/core';
import { MapaService } from '../../../services/mapa.service';
import { PopoverSugerenciaComponent } from '../components/popover-sugerencia/popover-sugerencia.component';
import { SugerenciaTiendaComponent } from '../components/sugerencia-tienda/sugerencia-tienda.component';
import { Router } from '@angular/router';
declare var google: any;
import { Plugins, CameraResultType } from'@capacitor/core';
const { Geolocation, Camera } = Plugins;
import { CamaraService } from 'src/app/services/camara.service';
import { FiltrosMapaComponent } from '../components/filtros-mapa/filtros-mapa.component';
import {AdvertenciaPayComponent} from '../../pagos/advertencia-pay/advertencia-pay.component';
import {InfoMapComponent} from './components/info-map/info-map.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage {
  @ViewChild('map', { read: ElementRef }) mapRef: ElementRef;
  mapa: any;
  mapaSinEtiquetas = [
    {
      "featureType": "poi",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.business",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    }
  ]
  categorias: any = [];
  categoriasSeleccionadas: any = [];
  typesSeleccionados: any = ['companies','invest', 'suggestion'];
  objeto = {
    tipo: "sugerencia"
  };
  markerMiPosicion: any;
  markerMiCentroDePantalla: any;
  geo = {
    lat: 39.2941091,
    lng: -3.8983071
  }
  
  todosLosMakers = [];
  todosLosObjetos = [];
  markerCluster;
  iconMarkerUno = 'assets/tabs/home/componentes/mapa/marker_no_select.png';
  iconMarkerDos = 'assets/tabs/home/componentes/mapa/marker_select.png';
  markerSeleccionado;
  setT;
  bandera = false;
  radio = 100;

  botonSelect = false;

  constructor(
    private modalController: ModalController,
    private popoverController: PopoverController,
    private toastController: ToastController,
    private translateService: TranslateService,
    private mapaService: MapaService,
    private navCtrl: NavController,
    private router: Router,
    private camaraService: CamaraService
  ) {
    this.cargar_categorias();
    //this.sacarPosicion();
  }

  ngAfterViewInit(){
    this.sacarPosicion()
      .then(() => this.mapa_con_mis_coordenadas())
      .catch(() => {
        this.permissionNotActive();
      });
  }

  async permissionNotActive()
  {
    const modal = await this.modalController.create({
      component: InfoMapComponent,
      cssClass: 'modalpay',
      backdropDismiss: true,
      swipeToClose: true
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data.data) {
      Geolocation.requestPermissions()
        .then((resp) => {
          this.geo.lat = 42.8333000;
          this.geo.lng = 12.8333000;
          this.mapa_con_mis_coordenadas();
        });
    }
  }
  cargar_categorias() {
    this.mapaService.cargarCategorias().subscribe((data: any) => {
      this.categorias = data.data;
    }, error => {
    });
  }
  async sacarPosicion() {
    const coordinates = await Geolocation.getCurrentPosition();
    if (coordinates.coords) {
      this.geo.lat = coordinates.coords.latitude;
      this.geo.lng = coordinates.coords.longitude;
    }
  }
  mapa_con_mis_coordenadas() {
    const location = new google.maps.LatLng(this.geo.lat, this.geo.lng);
    var customMapType = new google.maps.StyledMapType(this.mapaSinEtiquetas, { name: 'Custom Style' });
    var customMapTypeId = 'custom_style';
    const options = {
      center: location,
      maxZoom: 22,
      minZoom: 4,
      zoom: 12,
      streetViewControl: false,
      fullscreenControl: false,
      zoomControl: false,
      mapTypeControl: false,
      clickableIcons: false,
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
      }
    };
    this.mapa = new google.maps.Map(this.mapRef.nativeElement, options);
    this.mapa.mapTypes.set(customMapTypeId, customMapType);
    this.mapa.setMapTypeId(customMapTypeId);
    this.mapa.addListener("idle", () => {
      if (!this.bandera) this.evento_mapa();
      else this.bandera = false;
    });
    this.geo.lat = this.mapa.getCenter().lat(); 
    this.geo.lng = this.mapa.getCenter().lng();
    this.buscar_aqui();
  }
  mapa_por_defecto() {
    const location = new google.maps.LatLng(41.3818, 2.1685);
    var customMapType = new google.maps.StyledMapType(this.mapaSinEtiquetas, { name: 'Custom Style' });
    var customMapTypeId = 'custom_style';
    const options = {
      center: location,
      maxZoom: 22,
      minZoom: 4,
      zoom: 12,
      streetViewControl: false,
      fullscreenControl: false,
      zoomControl: false,
      mapTypeControl: false,
      clickableIcons: false,
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
      }
    };
    this.mapa = new google.maps.Map(this.mapRef.nativeElement, options);
    this.mapa.mapTypes.set(customMapTypeId, customMapType);
    this.mapa.setMapTypeId(customMapTypeId);
    this.mapa.addListener("idle", () => {
      if (!this.bandera) this.evento_mapa();
      else this.bandera = false;
    });
    this.geo.lat = this.mapa.getCenter().lat(); 
    this.geo.lng = this.mapa.getCenter().lng();
    this.buscar_aqui();
  }
  evento_mapa() {
    this.radio = ( 40000/(Math.pow(2, this.mapa.getZoom())) ) * 2;
    if (this.mapa.getZoom() > 10) this.radio = 100;
    
    this.geo.lat = this.mapa.getCenter().lat(); 
    this.geo.lng = this.mapa.getCenter().lng();
    if (this.objeto) this.objeto = null;
    if (this.markerSeleccionado) this.markerSeleccionado.setIcon({ url: this.iconMarkerUno, scaledSize: new google.maps.Size(30, 30) });
  }

  //--------------------------------------------SALIR DEL MAPA --------------------------------------------//
  salir_sin_argumentos() {
    this.navCtrl.back();
  }
  //--------------------------------------------SALIR DEL MAPA --------------------------------------------//

  //--------------------------------------------MI UBICACION--------------------------------------------//
  async mi_ubicacion() {
    const coordinates = await Geolocation.getCurrentPosition();
    if (coordinates.coords) {
      this.geo.lat = coordinates.coords.latitude;
      this.geo.lng = coordinates.coords.longitude;
    }
    this.crear_maker_mi_posicion(this.geo.lat, this.geo.lng);
  }
  crear_maker_mi_posicion(lat, lng) {
    this.markerMiPosicion = new google.maps.Marker({
      position: new google.maps.LatLng(lat, lng),
      map: this.mapa,
      icon: {
        url: 'assets/tabs/home/componentes/mapa/mi_posicion.png',
        scaledSize: new google.maps.Size(30, 30)
      },
      animation: google.maps.Animation.DROP,
      visible: true
    });
    this.mapa.panTo(this.markerMiPosicion.position);
    this.mapa.setZoom(18)
  }
  crear_marker_central(lat, lng) {
    if (this.markerMiCentroDePantalla) this.markerMiCentroDePantalla.setMap(null);
    this.markerMiCentroDePantalla = new google.maps.Marker({
      position: new google.maps.LatLng(lat, lng),
      map: this.mapa,
      animation: google.maps.Animation.DROP,
      visible: true
    });
  }
  //--------------------------------------------MI UBICACION--------------------------------------------//


  //--------------------------------------------BUSCAR AQUI --------------------------------------------//
  buscar_aqui(click?) {
    if (click) {
      this.botonSelect = true;
      let mensaje; 
      this.translateService.get('SEARCHMPT').subscribe((data) => {mensaje = data});
      this.toast(mensaje);
      this.evento_mapa();
      //this.crear_marker_central(this.misCoordenadas.lat, this.misCoordenadas.lon)
    }
    if (this.todosLosObjetos.length) this.eliminar_todos_los_makers();
    this.mapaService.companiesLocalize(this.geo.lat,this.geo.lng, this.radio, this.categoriasSeleccionadas, this.typesSeleccionados).subscribe((data: any) => {

      if (data.data.suggestion) if (data.data.suggestion.length) this.cargar_suggestion(data.data.suggestion);
      if (data.data.companies) if (data.data.companies.length) this.cargar_datos_tiendas(data.data.companies);
      if (data.data.events) if (data.data.events.length) this.cargar_datos_eventos(data.data.events);
      if (data.data.invest) if (data.data.invest.length) this.cargar_inversiones(data.data.invest);      

      let data_ = [];
      if (data.data.suggestion) if (data.data.suggestion.length) data_ = [].concat(data_,data.data.suggestion);
      if (data.data.companies) if (data.data.companies.length) data_ = [].concat(data_,data.data.companies);
      if (data.data.events) if (data.data.events.length) data_ = [].concat(data_, data.data.events);
      if (data.data.invest) if (data.data.invest.length) data_ = [].concat(data_,data.data.invest);

      this.todosLosObjetos = data_;
      
      if (this.todosLosObjetos.length) this.crear_todos_los_makers();
      
      if (click) {
        this.botonSelect = false;
        this.toastController.dismiss();
        let mensaje_dos; 
        this.translateService.get('NOENCONTRADO').subscribe((data) => {mensaje_dos = data});
        if (!this.todosLosObjetos.length) this.toast_encontrado(mensaje_dos);
      }

    }, error => {
      this.toastController.dismiss();
      let mensaje_dos; 
      this.translateService.get('NOENCONTRADO').subscribe((data) => {mensaje_dos = data});
      this.toast_encontrado(mensaje_dos);
    })
  }
  cargar_datos_tiendas(data) {
    data.forEach(tienda => {
      tienda['distancia'] = tienda.distance;
      tienda['tipo'] = 'tienda';
      tienda['latitud'] = tienda.empresaLATITUD;
      tienda['longitud'] = tienda.empresaLONGITUD; 
      tienda['id'] = tienda.uuid;
      tienda['categoria'] = tienda.empresaCATEGORIA;
    });
  }
  cargar_datos_eventos(data) {
    data.forEach(evento => {
      evento['tipo'] = 'evento'; 
      evento['latitud'] = evento.eventoLATITUD;
      evento['longitud'] = evento.eventoLONGITUD; 
      evento['id'] = evento.id;
      evento['nombre'] = evento.eventoTITULO;
    });
  }
  cargar_inversiones(data) {
    data.forEach(invers => {
      invers['tipo'] = 'invers'; 
      invers['latitud'] = invers.proyectoLATITUD;
      invers['longitud'] = invers.proyectoLONGITUD; 
      invers['id'] = invers.uuid;
      invers['nombre'] = invers.proyectoNOMBRE;
    });
  }
  cargar_suggestion(data) {
    data.forEach(suggestion => {
      suggestion['tipo'] = 'suggestion'; 
      suggestion['latitud'] = suggestion.empresa_sugerenciaLATITUD;
      suggestion['longitud'] = suggestion.empresa_sugerenciaLONGITUD; 
      suggestion['id'] = suggestion.uuid;
      suggestion['nombre'] = suggestion.empresa_sugerenciaNOMBRE;
    });
  }
  //--------------------------------------------BUSCAR AQUI --------------------------------------------//


  //--------------------------------------------ELIMINAR TODOS LOS MAKERS --------------------------------------------//  
  eliminar_todos_los_makers() {
    if (this.todosLosMakers.length != 0) {
      this.todosLosMakers.forEach(marker => { marker.setMap(null); this.markerCluster.removeMarker(marker);});
      this.todosLosMakers = [];
    }
  }
  //--------------------------------------------ELIMINAR TODOS LOS MAKERS --------------------------------------------//  

  
  //--------------------------------------------CREAR MAKERS EMPRESAS--------------------------------------------//
  crear_todos_los_makers() {
    this.todosLosObjetos.forEach(objeto => {
      this.crear_makers(objeto);
    })    
    this.markerCluster = new MarkerClusterer({ markers: this.todosLosMakers, map: this.mapa });
  }
  crear_makers(objeto) {
    let distancia, categoria;
    if (objeto.tipo == 'tienda') distancia = objeto.distancia;
    else distancia = null;
    if (objeto.tipo == 'tienda') categoria = objeto.categoria;
    else categoria = null;
    let marker = new google.maps.Marker({
      id: objeto.id,
      distancia: distancia,
      tipo: objeto.tipo,
      objeto: objeto,
      categoria: categoria,
      position: new google.maps.LatLng(objeto.latitud, objeto.longitud),
      map: this.mapa,
      icon: { url: this.iconMarkerUno, scaledSize: new google.maps.Size(30, 30) },  
      animation: google.maps.Animation.DROP,
      visible: true
    });
    this.todosLosMakers.push(marker);
    this.evento_click_makers(marker);
  }
  evento_click_makers(marker) {
    marker.addListener('click', () => {
      this.bandera = true;
      this.mapa.panTo(marker.position);
      //this.mapa.setZoom(17);
      this.cambiar_marker_icono(marker);
      if (marker.tipo == 'tienda') this.cargar_tienda_individual(marker.id, marker.distancia);
      else this.objeto = marker.objeto;
    });
  }
  cambiar_marker_icono(marker) {
    let marker_seleccionado = this.markerSeleccionado;
    if (this.markerSeleccionado) marker_seleccionado.setIcon({ url: this.iconMarkerUno, scaledSize: new google.maps.Size(30, 30) });
    this.markerSeleccionado = marker;
    this.markerSeleccionado.setIcon({ url: this.iconMarkerDos, scaledSize: new google.maps.Size(30, 30) });
  }
  cargar_tienda_individual(uuid, distancia) {
    this.mapaService.cargarTiendaIndividual(uuid).subscribe((data: any) => {
      data.data['tipo'] = 'tienda';
      data.data['latitud'] = data.data.empresa.empresaLATITUD;
      data.data['longitud'] = data.data.empresa.empresaLONGITUD; 
      data.data['id'] = data.data.empresa.uuid;
      data.data['nombre'] = data.data.empresa.empresaNOMBREMAP;
      data.data['distancia'] = distancia;
      this.objeto = data.data;
    }, error => {
      this.Alert(error.error.message, 'OK', true)
    })
  }
  //--------------------------------------------CREAR MAKERS EMPRESAS--------------------------------------------//






  //-------------------------------------------ZOOM ACERCANDO AL MARKER------------------------------------------//
  zoomToMaker(loca) {
    let zoomCoords = loca;
    let zoomFluid = this.mapa.getZoom();
    this.mapa.panTo(zoomCoords);
    if (zoomFluid >= 15) {
      return 0;
    } else {
      zoomFluid++;
      this.mapa.setZoom(zoomFluid);
      setTimeout(() => {
        this.zoomTo(loca);
      }, 100);
    }
  }
  zoomTo(loca) {
    let zoomFluid = this.mapa.getZoom();
    if (zoomFluid >= 18) {
      return 0;
    } else {
      zoomFluid++;
      this.mapa.setZoom(zoomFluid);
      this.setT = setTimeout(() => {
        this.zoomTo(loca);
      }, 100);
    }
  }
  //-------------------------------------------ZOOM ACERCANDO AL MARKER------------------------------------------//




  //--------------------------------------------FILTROS MAPA----------------------------------------------------//
  async filtros_mapa() {
    const modal = await this.modalController.create({
      component: FiltrosMapaComponent,
      componentProps: {
        categorias: this.categorias,
        categorias_seleccionadas: this.categoriasSeleccionadas,
        types_seleccionados: this.typesSeleccionados
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data) if (data.data) {
      this.categoriasSeleccionadas = data.categorias;
      this.typesSeleccionados = data.types;
      this.buscar_aqui(true);
    }
  }
  /* filtros_mapa() {
    let data = { categorias: this.categorias, categorias_seleccionadas: this.categoriasSeleccionadas, types_seleccionados: this.typesSeleccionados }
    this.router.navigate(["/pages/mapa/filtros"], { queryParams: {  data: JSON.stringify(data) }});
  } */
  


  async toast(message) {
    const toast = await this.toastController.create({
      message: message,
      mode: 'ios',
      color: 'light',
    });
    toast.present();
  }
  async toast_encontrado(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000,
      mode: 'ios',
      color: 'light'
    });
    toast.present();
  }







  //SUGERENCIAS
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


  votosActualizar(event, objeto) {
    objeto.count_votes = event;
  }




  async Alert(tex, bot, tipo) {
    const popover = await this.popoverController.create({
      component: AlertComponent,
      cssClass: 'popover_central',
      mode: 'ios',
      componentProps: {
        texto: tex,
        boton: bot,
        img: tipo
      },
      translucent: false,
      backdropDismiss: false
    });
    return await popover.present();
  }
}

