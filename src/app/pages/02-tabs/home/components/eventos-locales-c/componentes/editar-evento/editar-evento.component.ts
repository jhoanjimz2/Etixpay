import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { HomeService } from '../../../../../../../services/home.service';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AlertComponent } from 'src/app/shared/alert/alert.component';
declare var google;
import * as moment from 'moment';
import { CargandoService } from '../../../../../../../services/cargando.service';
import { ticket_edit } from '../../clases/ticket_editar';
import { TranslateService } from '@ngx-translate/core';
import { ExitoComponent } from '../exito/exito.component';
import { ValidacionServiceService } from 'src/app/validator/validacion-service.service';
import { Plugins } from'@capacitor/core';
const { Geolocation } = Plugins;

@Component({
  selector: 'app-editar-evento',
  templateUrl: './editar-evento.component.html',
  styleUrls: ['./editar-evento.component.scss'],
})
export class EditarEventoComponent implements OnInit {
  @Input() evento: any;
  geoCoder = new google.maps.Geocoder();
  paises: any = [];
  pais: any = []; 
  page = 1; size = 15;
  cargando = false;
  
  tickets  = [];

  file: File;
  img_para_subir = null;
  img_html = null;

  galeria_para_subir = [null,null,null];
  galeria_html = [];
  validar_boton_eliminar = [];
  imagenes_para_eliminar = [];


  coordenadas = {latitud: null,longitud: null}
  @ViewChild('map', { read: ElementRef }) mapRef: ElementRef; 
  map: any;
  marker: any = new google.maps.Marker({
    map: null,
    icon: {
      url: 'assets/tabs/home/componentes/mapa/navigate.png',
      scaledSize: new google.maps.Size(30, 30)
    },
    animation: google.maps.Animation.DROP,
    draggable: true,
    visible: true
  });
  standart: any;
  luxury: any;
  vip: any;
  datetime_min = moment(new Date()).format('YYYY-MM-DD');
  datetime_max = moment(new Date('2999-12-31')).format('YYYY-MM-DD');


  
  formulario: FormGroup = this.formBuilder.group({
    titulo: new FormControl('', [
      Validators.required
    ]),
    fecha_inicial_del_evento: new FormControl('', [
      Validators.required
    ]),
    fecha_final_del_evento: new FormControl('', [
      Validators.required
    ]),
    fecha_final_de_compra: new FormControl('', [
      Validators.required
    ]),
    descripcion: new FormControl('', [
    ]),
    pais: new FormControl( '', [
      Validators.required
    ]),
    direccion: new FormControl('', [
      Validators.required
    ]),
    indicativo_uno: new FormControl( '', [
      Validators.required
    ]),
    numero_principal: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$')
    ]),
    indicativo_dos: new FormControl( '', [
    ]),
    numero_secundario: new FormControl('', [
      Validators.pattern('^[0-9]*$')
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    sitio_web: new FormControl('', [
    ]),
    precio_ticket_standard: new FormControl('', [
      Validators.pattern('^[0-9]*$')
    ]),
    disponibilidad_ticket_standard: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$')
    ]),
    nota_ticket_standard: new FormControl('', [
    ]),
    precio_ticket_luxury: new FormControl('', [
      Validators.pattern('^[0-9]*$')
    ]),
    disponibilidad_ticket_luxury: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$')
    ]),
    nota_ticket_luxury: new FormControl('', [
    ]),
    precio_ticket_vip: new FormControl('', [
      Validators.pattern('^[0-9]*$')
    ]),
    disponibilidad_ticket_vip: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$')
    ]),
    nota_ticket_vip: new FormControl('', [
    ]),
    comision: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$')
    ]),
    check_teminos_condiciones: new FormControl(false, [
      Validators.required,
      Validators.requiredTrue
    ]),
    check_politicas_privacidad: new FormControl(false, [
      Validators.required,
      Validators.requiredTrue
    ]),
    check_direccion: new FormControl(false, [
    ]),
  }, {
    validators: [
      this.validaciones.validar_fechas('fecha_inicial_del_evento', 'fecha_final_del_evento','fecha_final_de_compra'),
      this.validaciones.validar_numeros_diferentes('numero_principal','numero_secundario','indicativo_uno','indicativo_dos')
    ]
  });

  evento_free = false;
  geo = {
    lat: 39.2941091,
    lng: -3.8983071
  }

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private popover_controller: PopoverController,
    private homeService: HomeService,
    private translateService: TranslateService,
    private cargandoService: CargandoService,
    private validaciones: ValidacionServiceService
  ) { }

  ngOnInit() {
    this.cargar_paises();
    this.cargar_datos();
    setTimeout( () => {this.mapa();}, 100)
  }
  cargar_paises() {
    this.homeService.paises().subscribe((data: any) => {
      this.paises = data.data;
      this.getPaises(this.page, this.size);
    });
  }
  cargar_datos() {
    this.rellenar_tickets();
    this.evento.events_image.forEach(element => {this.galeria_html.push(element.evento_imagenLINK); this.validar_boton_eliminar.push(false)});
    this.img_html = this.evento.eventoIMAGENDESTACADA;
    this.img_para_subir = this.img_html;
    this.coordenadas.latitud = this.evento.eventoLATITUD;
    this.coordenadas.longitud = this.evento.eventoLONGITUD;
    this.formulario.controls['titulo'].setValue(this.evento.eventoTITULO);
    this.formulario.controls['fecha_inicial_del_evento'].setValue(this.evento.eventoFECHAINICIO);
    this.formulario.controls['fecha_final_del_evento'].setValue(this.evento.eventoFECHAFINAL);
    this.formulario.controls['fecha_final_de_compra'].setValue(this.evento.eventoFECHAFINALCOMPRA);
    this.formulario.controls['descripcion'].setValue(this.evento.eventoDESCRIPCION);
    this.formulario.controls['pais'].setValue(this.evento.country);
    this.formulario.controls['direccion'].setValue(this.evento.eventoDIRECCION);
    this.formulario.controls['indicativo_uno'].setValue(this.evento.country);
    this.formulario.controls['numero_principal'].setValue(this.evento.eventoNUMEROTELEFONICO);
    this.formulario.controls['indicativo_dos'].setValue(this.evento.country);
    this.formulario.controls['numero_secundario'].setValue(this.evento.eventoSEGUNDONUMERO);
    this.formulario.controls['email'].setValue(this.evento.eventoEMAIL);
    this.formulario.controls['comision'].setValue(new Intl.NumberFormat('it-IT', { minimumSignificantDigits: 1 }).format(this.evento.eventoCOMISION));
    this.formulario.controls['check_teminos_condiciones'].setValue(true);
    this.formulario.controls['check_politicas_privacidad'].setValue(true);
    this.formulario.controls['check_direccion'].setValue(false);
  }
  rellenar_tickets() {
    this.standart = this.evento.events_tickets_details.find(element => element.evento_ticket_categoriaID == 1);
    if (this.evento.events_tickets_details.length == 1) { 
      if (this.evento.events_tickets_details[0].evento_ticket_categoriaID == 1) { 
        this.evento_free = true; 
        this.formulario.controls['disponibilidad_ticket_standard'].setValue(this.standart.evento_ticket_detalleCANTIDADTICKETDISPONIBLE);
      } 
    } else {
      this.luxury = this.evento.events_tickets_details.find(element => element.evento_ticket_categoriaID == 2);
      this.vip = this.evento.events_tickets_details.find(element => element.evento_ticket_categoriaID == 3);
      this.formulario.controls['precio_ticket_standard'].setValue(new Intl.NumberFormat('it-IT', { minimumSignificantDigits: 2 }).format(this.standart.evento_ticket_detallePRECIO));
      this.formulario.controls['disponibilidad_ticket_standard'].setValue(this.standart.evento_ticket_detalleCANTIDADTICKETDISPONIBLE);
      this.formulario.controls['nota_ticket_standard'].setValue(this.standart.evento_ticket_detalleNOTA);
      this.formulario.controls['precio_ticket_luxury'].setValue(new Intl.NumberFormat('it-IT', { minimumSignificantDigits: 2 }).format(this.luxury.evento_ticket_detallePRECIO));
      this.formulario.controls['disponibilidad_ticket_luxury'].setValue(this.luxury.evento_ticket_detalleCANTIDADTICKETDISPONIBLE);
      this.formulario.controls['nota_ticket_luxury'].setValue(this.luxury.evento_ticket_detalleNOTA);
      this.formulario.controls['precio_ticket_vip'].setValue(new Intl.NumberFormat('it-IT', { minimumSignificantDigits: 2 }).format(this.vip.evento_ticket_detallePRECIO));
      this.formulario.controls['disponibilidad_ticket_vip'].setValue(this.vip.evento_ticket_detalleCANTIDADTICKETDISPONIBLE);
      this.formulario.controls['nota_ticket_vip'].setValue(this.vip.evento_ticket_detalleNOTA);
    }
  }
  evento_free_click() {
    this.evento_free = !this.evento_free;
    if (this.evento_free) {
      this.invalidar_required('disponibilidad_ticket_luxury');
      this.invalidar_required('disponibilidad_ticket_vip');
      this.invalidar_required('comision');
    } else {
      this.validar_required('disponibilidad_ticket_luxury');
      this.validar_required('disponibilidad_ticket_vip');
      this.validar_required('comision');
    }
  }


  validar_required(name) {
    this.formulario.controls[name].setValidators(Validators.required);
    this.formulario.controls[name].updateValueAndValidity();
  }

  invalidar_required(name) {
    this.formulario.controls[name].clearValidators();
    this.formulario.controls[name].updateValueAndValidity();
  }
  campo_no_valido( campo: string ) {
    return this.formulario.get(campo)?.invalid  && this.formulario.get(campo)?.touched;
  }
  salirSinArgumentos(data) { this.modalController.dismiss({ data: data }) }

  //CREAR EVENTO 
  add_img(event, id) {
    if (event.target.files.length === 0)return; 
    var mimeType = event.target.files[0].type;
    let texto, texto2;
    this.translateService.get('THEFILEMUST').subscribe(value => { texto = value; });
    this.translateService.get('MAXIMO8MG2').subscribe(value => { texto2 = value; });
    if (mimeType.match(/image\/*/) == null) return this.Alert(texto, 'OK', true);
    if (event.target.files[0].size > 2000000) return this.Alert(texto2, 'OK', true);
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]); 
    reader.onload = (_event) => { 
      this.file = event.target.files[0];
      if (id == 'destacada') {
        this.img_para_subir = this.file;
        this.img_html = reader.result;
        return;      
      }
      this.galeria_para_subir[id] = this.file;
      this.galeria_html[id] = reader.result;
      return;
    }
  }
  elimina_imagen(id) {
    if (this.galeria_html[id]) {
      this.galeria_html[id] = null;
      this.imagenes_para_eliminar.push(this.evento.events_image[id].id)
      this.validar_boton_eliminar[id] = true;
    }
  }
  format_fecha(fecha) {
    return moment(fecha).format('YYYY-MM-DD H:mm:ss');
  }
  editar_evento() {
    let comision = 0;
    this.cargandoService.iniciaCargando();
    if (!this.evento_free) { this.crear_tickets(); comision = this.formulario.controls.comision.value}
    else { this.crear_ticket_standart(); }
    this.homeService.editar_evento(
      this.evento.id,
      this.formulario.controls.titulo.value,
      this.format_fecha(this.formulario.controls.fecha_inicial_del_evento.value),
      this.format_fecha(this.formulario.controls.fecha_final_del_evento.value),
      this.format_fecha(this.formulario.controls.fecha_final_de_compra.value),
      this.img_para_subir,
      this.formulario.controls.descripcion.value,
      this.formulario.controls.pais.value.id,
      this.formulario.controls.direccion.value,
      this.formulario.controls.indicativo_uno.value.paisINDICATIVO+''+this.formulario.controls.numero_principal.value,
      this.formulario.controls.indicativo_dos.value.paisINDICATIVO+''+this.formulario.controls.numero_secundario.value,
      this.formulario.controls.email.value,
      this.formulario.controls.sitio_web.value,
      this.tickets,
      comision,
      this.coordenadas.latitud,
      this.coordenadas.longitud,
      this.galeria_para_subir.filter(Boolean),
      this.imagenes_para_eliminar
    ).subscribe( (data: any) => {
      this.cargandoService.terminaCargando();
      this.salirSinArgumentos(true);
      this.evento_creado_con_exito();
    }, error => {
      this.cargandoService.terminaCargando();
      this.Alert(error.error.message, 'OK', true)
    }) 
  }
  async evento_creado_con_exito() {
    const modal = await this.modalController.create({
      component: ExitoComponent,
      componentProps:{
        tipo: 2
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
  }
  crear_tickets() {
    this.tickets = [];
    this.crear_ticket(
      this.luxury.id,
      this.formulario.controls.precio_ticket_luxury.value,
      this.formulario.controls.nota_ticket_luxury.value,
      this.formulario.controls.disponibilidad_ticket_luxury.value
    );
    this.crear_ticket(
      this.standart.id,
      this.formulario.controls.precio_ticket_standard.value,
      this.formulario.controls.nota_ticket_standard.value,
      this.formulario.controls.disponibilidad_ticket_standard.value
    );
    this.crear_ticket(
      this.vip.id,
      this.formulario.controls.precio_ticket_vip.value,
      this.formulario.controls.nota_ticket_vip.value,
      this.formulario.controls.disponibilidad_ticket_vip.value
    );
  }
  crear_ticket_standart() {
    this.tickets = [];
    this.crear_ticket(
      'standard',
      0,
      this.formulario.controls.nota_ticket_standard.value,
      this.formulario.controls.disponibilidad_ticket_standard.value
    );
  }
  crear_ticket(id, precio, nota, cantidad) {
    let ticke: any = new ticket_edit;
    ticke.set_editar(id,precio,nota,cantidad);
    this.tickets.push(ticke.get())
  }
  //CREAR EVENTO

  //MAPA
  mapa() {
    const location = new google.maps.LatLng(this.evento.eventoLATITUD, this.evento.eventoLONGITUD);
    var customMapType = new google.maps.StyledMapType({name: 'Custom Style'});
    var customMapTypeId = 'custom_style';
    const options = {
      center: location,
      maxZoom: 22,
      minZoom: 1,
      zoom: 22,
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
    this.marker.setPosition(location);
    this.marker.addListener("dragend", () => {
      this.cargando = !this.cargando;
      this.coordenadas.latitud = this.marker.position.lat();
      this.coordenadas.longitud = this.marker.position.lng();
      this.direccion_con_google_coordenadas(this.coordenadas.latitud, this.coordenadas.longitud);
    });
    this.marker.setMap(this.map);
  }
  async sacarPosicion() {
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
      this.coordenadas.latitud = resultados[0].geometry.location.lat();
      this.coordenadas.longitud = resultados[0].geometry.location.lng();
      this.formulario.controls['direccion'].setValue(resultados[0].address_components[1].long_name +' # '+ resultados[0].address_components[0].long_name);
      this.cambia_coordenadas_centrales();
    });
  }
  direccion_con_google_address() {
    this.geoCoder.geocode({ 'address': this.formulario.controls.direccion.value }, (resultados, status) => {
      if (resultados) {
        this.coordenadas.latitud = resultados[0].geometry.location.lat();
        this.coordenadas.longitud = resultados[0].geometry.location.lng();
        this.cambia_coordenadas_centrales();
      }
    });
  }
  cambia_coordenadas_centrales() {
    let location = new google.maps.LatLng(this.coordenadas.latitud, this.coordenadas.longitud);
    this.marker.setPosition(location);
    this.map.setCenter(location)
    this.map.setZoom(22)
  }
  //MAPA

  


  //-------------------------------------------------------------------------SIGN UP PAISES-----------------------------------------------------//
  getPaises(page?: number, size?: number) {
    if (page && size) {
      this.pais = this.pais.concat(this.paises.slice((page - 1) * size, ((page - 1) * size) + size));
    }
    this.page++;
    return this.pais;
  }
  close() {
    this.page = 1;
    this.size = 15;
    this.getPaises(this.page, this.size);
  }
  obtenerPaises(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
    if (this.page > this.paises.length / this.size) {
      event.component.disableInfiniteScroll();
      return;
    }
    setTimeout(() => {
      let paisesArray = this.getPaises(this.page, this.size);
      paisesArray = event.component.items.concat(paisesArray);
      event.component.items = paisesArray;
      event.component.endInfiniteScroll();
    }, 500);
  }

  buscarPais(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
    let text = event.text.trim().toLowerCase();
    event.component.startSearch();

    if (!text) {
      event.component.items = this.getPaises(this.page, this.size);
      event.component.endSearch();
      event.component.enableInfiniteScroll();
      return;
    }

    setTimeout(() => {
      event.component.items = this.filterPorts(text);
      event.component.endSearch();
    }, 500);
  }

  filterPorts(text: string) {
    return this.paises.filter(pais => {
      return pais.paisNOMBRE.toLowerCase().indexOf(text) !== -1;
    });
  }


  async Alert(tex, bot, tipo) {
    const popover = await this.popover_controller.create({
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
