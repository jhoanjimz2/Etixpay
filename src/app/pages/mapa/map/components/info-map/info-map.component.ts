import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "EtixPay-info-map",
  templateUrl: "./info-map.component.html",
  styleUrls: ["./info-map.component.scss"],
})
export class InfoMapComponent {
  advertencia: boolean = false;

  constructor(private modalController: ModalController) {}

  ngOnInit():void {
  }

  botonClick() {
    this.modalController.dismiss({ data: true });
  }
}
