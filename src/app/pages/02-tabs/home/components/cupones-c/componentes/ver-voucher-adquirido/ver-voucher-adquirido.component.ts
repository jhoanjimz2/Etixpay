import { Component, Input, OnInit } from '@angular/core';
import { EnviarVoucherComponent } from '../enviar-voucher/enviar-voucher.component';
import { ModalController, PopoverController } from '@ionic/angular';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
declare var google;
import { Plugins } from'@capacitor/core';
const { Geolocation } = Plugins;

@Component({
  selector: 'app-ver-voucher-adquirido',
  templateUrl: './ver-voucher-adquirido.component.html',
  styleUrls: ['./ver-voucher-adquirido.component.scss'],
})
export class VerVoucherAdquiridoComponent implements OnInit {
  @Input() voucher: any;
  geo_coder = new google.maps.Geocoder();
  slide = {
    spaceBetween: 10,
    centeredSlides: true,
    speed: 1500,
    autoplay: {
      delay: 1000,
      disableOnInteraction: false
    },
    loop: true
  };
  direccion = null;
  telefono = null;
  descripcion = null;
  titulo_uno;
  titulo_dos;
  galeria: any = [];
  geo = {
    lat: 39.2941091,
    lng: -3.8983071
  }

  constructor(
    private modal_controller: ModalController,
    private popover_controller: PopoverController
  ) { }

  ngOnInit() {
    if( this.voucher.evento ) this.datos_evento();
    if( this.voucher.tienda ) this.datos_tienda();
    if( this.voucher.expert ) this.datos_experto();
  }
  async enviar_voucher() {
    const modal = await this.modal_controller.create({
      component: EnviarVoucherComponent,
      componentProps: {
        voucher: this.voucher
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
  }
  get categoria() {
    if (localStorage.getItem('lenguaje') == 'it') if (this.voucher.voucher_type) return this.voucher.voucher_type.voucher_tipoTITULOIT;
    if (localStorage.getItem('lenguaje') == 'en') if (this.voucher.voucher_type) return this.voucher.voucher_type.voucher_tipoTITULOEN;
    if (localStorage.getItem('lenguaje') == 'es') if (this.voucher.voucher_type) return this.voucher.voucher_type.voucher_tipoTITULOES;
    if (localStorage.getItem('lenguaje') == 'ro') if (this.voucher.voucher_type) return this.voucher.voucher_type.voucher_tipoTITULORO;
  }
  datos_evento() {
    this.geo = { lat: parseFloat(this.voucher.evento.eventoLATITUD), lng: parseFloat(this.voucher.evento.eventoLONGITUD) }
    this.geo_coder.geocode({ 'location': this.geo }, (resultados, status) => {
      this.direccion = resultados[0].formatted_address
    });
    this.telefono = this.voucher.evento.country.paisINDICATIVO + ' ' +this.voucher.evento.eventoNUMEROTELEFONICO;
    this.descripcion = this.voucher.evento.eventoDESCRIPCION;
    this.titulo_uno = "Event";
    this.titulo_dos = this.voucher.evento.eventoTITULO;
    this.galeria = this.voucher.evento.events_image;
    this.galeria.forEach(imagen => { imagen['imagen'] = imagen.evento_imagenLINK });
  }
  datos_tienda() {
    this.geo = { lat: parseFloat(this.voucher.tienda.empresaLATITUD), lng: parseFloat(this.voucher.tienda.empresaLONGITUD) }
    this.geo_coder.geocode({ 'location': this.geo }, (resultados, status) => {
      this.direccion = resultados[0].formatted_address
    });
    this.telefono = this.voucher.tienda.pais.paisINDICATIVO + ' ' +this.voucher.tienda.empresaTELEFONO;
    this.descripcion = this.voucher.tienda.empresaDESCRIPCION;
    this.titulo_uno = "Store";
    this.titulo_dos = this.voucher.tienda.empresaNOMBREMAP;
    this.galeria = this.voucher.tienda.galeria;
    this.galeria.forEach(imagen => { imagen['imagen'] = imagen.empresa_imagenURL });
  }
  datos_experto() {
    this.geo = { lat: parseFloat(this.voucher.expert.expertLATITUD), lng: parseFloat(this.voucher.expert.expertLONGITUD) }
    this.geo_coder.geocode({ 'location': this.geo }, (resultados, status) => {
      this.direccion = resultados[0].formatted_address
    });
    this.titulo_uno = "Expert";
  }
  async posicion_persona() {
    const coordinates = await Geolocation.getCurrentPosition();
    if (coordinates.coords) {
      this.geo.lat = coordinates.coords.latitude;
      this.geo.lng = coordinates.coords.longitude;
    }
    this.abrir_google_maps(this.geo.lat, this.geo.lng); 
  }
  abrir_google_maps(lat, lng) {
    let url: string = `https://www.google.es/maps/dir/${lat},${lng}/${this.voucher.expert.expertLATITUD},${this.voucher.expert.expertLONGITUD}`;
    window.open(url);
  }
  get voucher_punto_recompensa() {
    let valor_comision = ((this.voucher.vouchers.voucherPRECIO * this.voucher.vouchers.voucherCOMISION )/100);
    return ((valor_comision * this.voucher.vouchers.voucherPUNTORECOMPENSA ) / 100);
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
