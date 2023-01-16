import { Component } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { Router } from '@angular/router';
import { RecompensasComponent } from 'src/app/pages/paginas-usuarios/cartera/components/toolbar-botones/recompensas/recompensas.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-info-community',
  templateUrl: './info-community.component.html',
  styleUrls: ['./info-community.component.scss'],
})
export class InfoCommunityComponent {
  muestra: boolean = false;
  info = {
    cashbak_pendiente: 0,
    community_percentage: 0,
    active_win: 0,
    nombre: '',
    img: '',
    wallets:[ 
      {
        walletSALDOATM: 0
      }
    ]
  };

  constructor(
    private modalController: ModalController,
    private homeService: HomeService,
    private router: Router
  ) {
    this.getCabeceraNueva();
  }

  getCabeceraNueva() {
    this.homeService.getCabeceraNueva().subscribe((data: any) => {
      this.info = data.data;
      if (data.data.empresa) {
        this.info.nombre = data.data.empresa.empresaNOMBREMAP;
        this.info.img = data.data.empresa.empresaFOTO;
      }
      if (data.data.persona) {
        this.info.nombre = data.data.persona.personaNOMBRES;
        this.info.img = data.data.persona.personaFOTO;
      }
    })
  }
  comunidad() {
    this.router.navigate(["/tabs/comunidad"])
  }
  etixwin() {
    this.router.navigate(["/pages/etix-win"])
  }
  async recompensas() {
    const modal = await this.modalController.create({
      component: RecompensasComponent,
      backdropDismiss: false
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    this.getCabeceraNueva();
  }


}
