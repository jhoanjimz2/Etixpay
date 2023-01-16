import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-fallo',
  templateUrl: './fallo.component.html',
  styleUrls: ['./fallo.component.scss'],
})
export class FalloComponent {
  @Output() funcion: EventEmitter<any> = new EventEmitter();

  constructor(
    private navCtrl: NavController
    ) { }
  back() {
    this.navCtrl.back();
  }
  reinicia() {
    this.funcion.emit({cantidad: 0, opcion: 1});
  }

}
