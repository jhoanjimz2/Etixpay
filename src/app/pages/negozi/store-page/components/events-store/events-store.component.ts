import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CrearUnEventoComponent } from 'src/app/pages/02-tabs/home/components/eventos-locales-c/componentes/crear-un-evento/crear-un-evento.component';
import { EventosLocalesComponent } from 'src/app/pages/02-tabs/home/components/eventos-locales-c/componentes/eventos-locales/eventos-locales.component';

@Component({
  selector: 'app-events-store',
  templateUrl: './events-store.component.html',
  styleUrls: ['./events-store.component.scss'],
})
export class EventsStoreComponent {
  @Input() editar;
  @Input() events: any = [];
  @Output() actualizarEvents: EventEmitter<any> = new EventEmitter();
  option = {
    initialSlide: 0,
    slidesPerView:1,
    observer: true,
    observeParents: true,
    speed: 1500
  };

  constructor(
    private modalController: ModalController
  ) { }

  async crearEvento() {
    const modal = await this.modalController.create({
      component: CrearUnEventoComponent,
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data.data) this.actualizarEvents.emit();
  }
  
  async eventos() {
    const modal = await this.modalController.create({
      component: EventosLocalesComponent
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
  }


}
