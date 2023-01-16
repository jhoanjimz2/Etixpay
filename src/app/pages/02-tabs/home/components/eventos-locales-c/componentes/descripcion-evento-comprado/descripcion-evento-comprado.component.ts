import { Component, Input, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { RegalarTicketComponent } from '../regalar-ticket/regalar-ticket.component';
import { Plugins } from'@capacitor/core';
const { Geolocation } = Plugins;
  

@Component({
  selector: 'app-descripcion-evento-comprado',
  templateUrl: './descripcion-evento-comprado.component.html',
  styleUrls: ['./descripcion-evento-comprado.component.scss'],
})
export class DescripcionEventoCompradoComponent implements OnInit {
  @Input() ticket_comprado: any;
  @Input() tickets_comprados: any;
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
  megusta = false;
  geo = {
    lat: 39.2941091,
    lng: -3.8983071
  }

  constructor(
    private modal_controller: ModalController,
    private popover_controller: PopoverController
  ) { }

  ngOnInit() {
  }
  salir_sin_argumentos() {
    this.modal_controller.dismiss();
  }
  async regalar() {
    const modal = await this.modal_controller.create({
      component: RegalarTicketComponent,
      componentProps: {
        ticket: this.ticket_comprado,
        tickets_comprados: this.tickets_comprados
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
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
    let url: string = `https://www.google.es/maps/dir/${lat},${lng}/${this.ticket_comprado.ticketEVENTO.eventoLATITUD},${this.ticket_comprado.ticketEVENTO.eventoLONGITUD}`;
    window.open(url);
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
