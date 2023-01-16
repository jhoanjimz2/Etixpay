import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-exito',
  templateUrl: './exito.component.html',
  styleUrls: ['./exito.component.scss'],
})
export class ExitoComponent {
  @Output() funcion: EventEmitter<any> = new EventEmitter();
  @Input() cantidad = 0;
  @Input() informacion: any = {};

  constructor(
    private navCtrl: NavController,
    private router: Router,
    ) { }
  home() {
    this.router.navigate(["/tabs/home"]);
    this.navCtrl.navigateBack("/tabs/home");
  }

}
