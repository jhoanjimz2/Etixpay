import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  @Input() texto: string;
  @Input() boton: string;
  @Input() boton2: string;
  @Input() url: string;
  @Input() img: boolean = false;
  constructor(
    private alertController: PopoverController
    ) { }

  ngOnInit() {
  }
  salirSinSeleccion() {
    this.alertController.dismiss();
  }
}
