import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-profesionals',
  templateUrl: './profesionals.page.html',
  styleUrls: ['./profesionals.page.scss'],
})
export class ProfesionalsPage {

  palabra: string = '';

  constructor( private navCtrl: NavController ) { 
  }
  back() {
    this.navCtrl.back();
  }

  buscar(event) {
    this.palabra = event;
  }

  

}