import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { HomeService } from '../../../../../../../services/home.service';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ticket } from '../../clases/ticket'
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { CargandoService } from '../../../../../../../services/cargando.service';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime } from 'rxjs/operators';
import { ExitoComponent } from '../exito/exito.component';
import { ValidacionServiceService } from '../../../../../../../validator/validacion-service.service';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
declare var google;
import { Plugins } from'@capacitor/core';
import { environment } from 'src/environments/environment';
const { Geolocation } = Plugins;

@Component({
  selector: 'app-crear-un-evento',
  templateUrl: './crear-un-evento.component.html',
  styleUrls: ['./crear-un-evento.component.scss'],
})
export class CrearUnEventoComponent implements OnInit {
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();
  @ViewChild('myInput') input_imagenes: ElementRef;
  debounce_coordenadas: Subject<string> = new Subject();
  geoCoder = new google.maps.Geocoder();
  paises: any = [];
  pais: any = [];
  page = 1; size = 15;
  cargando = false;



  img_para_subir = null;
  img_html = null;

  galeria_para_subir = [null, null, null];
  galeria_html = [null, null, null];
  tickets = [];


  file: File;
  geo = {
    lat: 39.2941091,
    lng: -3.8983071
  }
  @ViewChild('map', { read: ElementRef }) mapRef: ElementRef;
  map: any;
  marker: any = new google.maps.Marker({
    position: new google.maps.LatLng(39.2941091, -3.8983071),
    map: null,
    icon: {
      url: 'assets/tabs/home/componentes/mapa/mi_posicion.png',
      scaledSize: new google.maps.Size(30, 30)
    },
    animation: google.maps.Animation.DROP,
    draggable: true,
    visible: true
  });

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
      Validators.required
    ]),
    pais: new FormControl('', [
      Validators.required
    ]),
    direccion: new FormControl('', [
      Validators.required
    ]),
    indicativo_uno: new FormControl('', [
      Validators.required
    ]),
    numero_principal: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$')
    ]),
    indicativo_dos: new FormControl('', [
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
      Validators.pattern('^[0-9]*$'),
      Validators.min(1)
    ]),
    nota_ticket_standard: new FormControl('', [
    ]),
    precio_ticket_luxury: new FormControl('', [
      Validators.pattern('^[0-9]*$')
    ]),
    disponibilidad_ticket_luxury: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.min(1)
    ]),
    nota_ticket_luxury: new FormControl('', [
    ]),
    precio_ticket_vip: new FormControl('', [
      Validators.pattern('^[0-9]*$')
    ]),
    disponibilidad_ticket_vip: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.min(1)
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
      this.validaciones.validar_fechas('fecha_inicial_del_evento', 'fecha_final_del_evento', 'fecha_final_de_compra'),
      this.validaciones.validar_numeros_diferentes('numero_principal', 'numero_secundario', 'indicativo_uno', 'indicativo_dos')
    ]
  });

  evento_free = false;

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
    this.cargar_debounces();
    this.cargar_paises();
    setTimeout(() => { this.mapa(); }, 100)
  }
  cargar_paises() {
    this.homeService.paises().subscribe((data: any) => {
      this.paises = data.data;
      this.get_paises(this.page, this.size);
    });
  }
  salir_sin_argumentos(data) { this.modalController.dismiss({ data: data }) }

  terminos_y_condiciones() {
    window.open(environment.TyC);
  }
  politicas_de_seguridad() {
    window.open(environment.PdP);
  }

  campo_no_valido(campo: string) {
    return this.formulario.get(campo)?.invalid && this.formulario.get(campo)?.touched;
  }


  //CREAR EVENTO 
  add_img(event, id) {
    if (event.target.files.length === 0) return;
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
  validar_imagenes() {
    let bandera = true;
    this.galeria_para_subir.forEach((element) => { if (element == null) bandera = false; });
    return bandera;
  }
  format_fecha(fecha) {
    return moment(fecha).format('YYYY-MM-DD H:mm:ss');
  }
  valida_imagenes() {
    let mensaje;
    this.translateService.get('THE4IMAGES').subscribe(value => { mensaje = value; });
    if (!this.validar_imagenes() || !this.img_para_subir) { this.Alert(mensaje, 'OK', true); return true; }
    return false;
  }
  crear_evento() {
    let comision = 0;
    if (this.valida_imagenes()) return;
    this.proggress_bar();
    if (!this.evento_free) { this.crear_tickets(); comision = this.formulario.controls.comision.value}
    else { this.crear_ticket_standart(); }
    this.homeService.crear_evento(
      this.formulario.controls.titulo.value,
      this.format_fecha(this.formulario.controls.fecha_inicial_del_evento.value),
      this.format_fecha(this.formulario.controls.fecha_final_del_evento.value),
      this.format_fecha(this.formulario.controls.fecha_final_de_compra.value),
      this.img_para_subir,
      this.galeria_para_subir,
      this.formulario.controls.descripcion.value,
      this.formulario.controls.pais.value.id,
      this.formulario.controls.direccion.value,
      this.formulario.controls.indicativo_uno.value.paisINDICATIVO + '' + this.formulario.controls.numero_principal.value,
      this.formulario.controls.indicativo_dos.value.paisINDICATIVO + '' + this.formulario.controls.numero_secundario.value,
      this.formulario.controls.email.value,
      this.formulario.controls.sitio_web.value,
      this.tickets,
      comision,
      this.geo.lat,
      this.geo.lng
    ).subscribe((data: any) => {
      this.popover_controller.dismiss();
      this.salir_sin_argumentos(true);
      this.evento_creado_con_exito();2
    }, error => {
      this.popover_controller.dismiss();
      if (error.error.message) this.Alert(error.error.message, 'OK', true);
      else this.Alert(error.message, 'OK', true);
    });
  }
  async evento_creado_con_exito() {
    const modal = await this.modalController.create({
      component: ExitoComponent,
      componentProps: {
        tipo: 1
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
  }
  crear_tickets() {
    this.tickets = [];
    this.crear_ticket(
      'luxury',
      this.formulario.controls.precio_ticket_luxury.value,
      this.formulario.controls.nota_ticket_luxury.value,
      this.formulario.controls.disponibilidad_ticket_luxury.value
    );
    this.crear_ticket(
      'standard',
      this.formulario.controls.precio_ticket_standard.value,
      this.formulario.controls.nota_ticket_standard.value,
      this.formulario.controls.disponibilidad_ticket_standard.value
    );
    this.crear_ticket(
      'vip',
      this.formulario.controls.precio_ticket_vip.value,
      this.formulario.controls.nota_ticket_vip.value,
      this.formulario.controls.disponibilidad_ticket_vip.value
    );
  }
  crear_ticket(codigo, precio, nota, cantidad) {
    let ticke: any = new ticket;
    ticke.set(codigo, precio, nota, cantidad);
    this.tickets.push(ticke.get())
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
  //CREAR EVENTO

  //MAPA
  mapa() {
    const location = new google.maps.LatLng( this.geo.lat,this.geo.lng);
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
      this.direccion_con_google_coordenadas(this.geo.lat,this.geo.lng);
    });
    this.marker.setMap(this.map);
  }
  async miPosicion() {
    this.cargando = !this.cargando;
    const coordinates = await Geolocation.getCurrentPosition();
    if (coordinates.coords) {
      this.geo.lat = coordinates.coords.latitude;
      this.geo.lng = coordinates.coords.longitude;
      this.direccion_con_google_coordenadas(this.geo.lat, this.geo.lng)
    } else {
      this.cargando = !this.cargando;
      let mensaje;
      this.translateService.get('COORDENADASNOENCONTRADAS').subscribe(value => { mensaje = value; });
      this.Alert(mensaje, 'OK', true);
    }
  }
  direccion_con_google_coordenadas(lat, lng) {
    let latlng = { lat: lat, lng: lng }
    this.geoCoder.geocode({ 'location': latlng }, (resultados, status) => {
      this.cargando = !this.cargando;
      this.geo.lat = resultados[0].geometry.location.lat();
      this.geo.lng = resultados[0].geometry.location.lng();
      this.formulario.controls['direccion'].setValue(resultados[0].formatted_address);
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
    this.debounce_coordenadas.next(this.formulario.controls.direccion.value);
  }
  cambia_coordenadas_centrales() {
    let location = new google.maps.LatLng(this.geo.lat, this.geo.lng);
    this.marker.setPosition(location);
    this.map.setCenter(location)
    this.map.setZoom(22)
  }
  //MAPA

  reset() {
    this.tickets = [];
    this.img_para_subir = null;
    this.img_html = null;
    this.galeria_para_subir = [null, null, null];
    this.galeria_html = [null, null, null];
    this.input_imagenes.nativeElement.value = '';
    this.formulario.reset();
  }




  //-------------------------------------------------------------------------SIGN UP PAISES-----------------------------------------------------//
  get_paises(page?: number, size?: number) {
    if (page && size) {
      this.pais = this.pais.concat(this.paises.slice((page - 1) * size, ((page - 1) * size) + size));
    }
    this.page++;
    return this.pais;
  }
  close() {
    this.page = 1;
    this.size = 15;
    this.get_paises(this.page, this.size);
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
      let paisesArray = this.get_paises(this.page, this.size);
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
      event.component.items = this.get_paises(this.page, this.size);
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

  async proggress_bar() {
    const modal = await this.popover_controller.create({
      component: ProgressBarComponent,
      backdropDismiss: false,
      cssClass: 'loading-progress'
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
  }


  

  evento_free_click() {
    this.evento_free = !this.evento_free;
    if (this.evento_free) {
      this.invalidar_required('disponibilidad_ticket_luxury');
      this.invalidar_required('disponibilidad_ticket_vip');
      this.validar_cantidad_disponible('disponibilidad_ticket_luxury', 0);
      this.validar_cantidad_disponible('disponibilidad_ticket_vip', 0);
      this.invalidar_required('comision');
    } else {
      this.validar_required('disponibilidad_ticket_luxury');
      this.validar_required('disponibilidad_ticket_vip');
      this.validar_cantidad_disponible('disponibilidad_ticket_luxury', 1);
      this.validar_cantidad_disponible('disponibilidad_ticket_vip', 1);
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

  validar_cantidad_disponible(name, cantidad) {
    this.formulario.controls[name].setValidators(Validators.min(cantidad));
    this.formulario.controls[name].updateValueAndValidity();
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
