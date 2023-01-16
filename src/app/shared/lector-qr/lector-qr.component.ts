import { Component, ViewChild, OnInit } from "@angular/core";
import { NgxScannerQrcodeComponent } from "ngx-scanner-qrcode";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "EtixPay-lector-qr",
  templateUrl: "./lector-qr.component.html",
  styleUrls: ["./lector-qr.component.scss"],
})
export class LectorQrComponent implements OnInit {
  @ViewChild("action", { static: true }) action: NgxScannerQrcodeComponent;
  activar: boolean = false;
  cargando: boolean = false;
  output = null;

  constructor(private modalController: ModalController) {}

  ngOnInit() {}
  ngAfterViewInit() {
    this.action.start();
  }

  ngOnDestroy() {
    this.action.stop();
  }
  scanner(data) {
    this.modalController.dismiss({ data });
  }
}
