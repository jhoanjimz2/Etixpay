import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() titulo;
  @Output() funcion: EventEmitter<any> = new EventEmitter();
  @Input() step: number;

  constructor(
    private navCtrl: NavController
    ) { }
  back() {
    if (this.step === 1) {
      this.navCtrl.back();
    } else {
      let step = this.step - 1;
      this.funcion.emit({opcion: step});
    }
  }
  

}
