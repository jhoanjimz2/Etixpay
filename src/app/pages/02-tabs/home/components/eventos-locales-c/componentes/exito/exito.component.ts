import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-exito',
  templateUrl: './exito.component.html',
  styleUrls: ['./exito.component.scss'],
})
export class ExitoComponent implements OnInit {
  @Input() tipo;

  constructor(
    private nav: NavController,
    private router: Router,
    private modal_controller: ModalController
  ) { }

  ngOnInit() {
  }
  salirSinArgumentos() {
    this.modal_controller.dismiss({data: true});
    this.router.navigate(["/tabs/home"]);
    this.nav.navigateBack("/tabs/home");
  }


}
