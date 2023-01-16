import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CuentaService } from '../../../../../services/cuenta.service';
import { EventosLocalesComponent } from '../../../home/components/eventos-locales-c/componentes/eventos-locales/eventos-locales.component';

@Component({
  selector: 'app-mis-eventos-c',
  templateUrl: './mis-eventos-c.component.html',
  styleUrls: ['./mis-eventos-c.component.scss'],
})
export class MisEventosCComponent implements OnInit {


  constructor(
    private modalController: ModalController
    ) { }

  ngOnInit() {
  }
  async eventos() {
    const modal = await this.modalController.create({
      component: EventosLocalesComponent,
      componentProps: {
        mios: true
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
  }

}
