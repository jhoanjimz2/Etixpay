import { Component } from '@angular/core';
import { EtixwinService } from '../../services/etixwin.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-etix-win',
  templateUrl: './etix-win.page.html',
  styleUrls: ['./etix-win.page.scss'],
})
export class EtixWinPage {

  segment = 0;
  sorteo: any = [];
  constructor(
    private etixwinService: EtixwinService,
    private navCtrl: NavController
  ) { 
    this.etixwin();
  }

  etixwin() {
    this.etixwinService.etixwin().subscribe((data: any) => {
      this.sorteo = data.data;
    }, error => {
      this.navCtrl.back();
    })
  }


}
