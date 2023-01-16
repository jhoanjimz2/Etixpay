import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-nos-califica-menu-c',
  templateUrl: './nos-califica-menu-c.component.html',
  styleUrls: ['./nos-califica-menu-c.component.scss'],
})
export class NosCalificaMenuCComponent implements OnInit {

  constructor(
    private platform: Platform
    ) { }

  ngOnInit() {}
  abrirCalificacionApp() {
    if( this.platform.is('ios') ) {
      window.location.href="https://apps.apple.com/es/app/etixpay/id1554089827";
    } else {
      window.location.href="https://play.google.com/store/apps/details?id=com.etixpay.app&hl=es_CO&gl=US";
    }
  }

}
