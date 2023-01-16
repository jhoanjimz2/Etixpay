import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { CargandoService } from "src/app/services/cargando.service";
import { MetodosPagoService } from "src/app/services/metodos-pago.service";

@Component({
  selector: "EtixPay-cash",
  templateUrl: "./cash.component.html",
  styleUrls: ["./cash.component.scss"],
})
export class CashComponent implements OnInit {
  @Output() funcion: EventEmitter<any> = new EventEmitter();
  @Input() cantidad = 0;
  @Input() informacion: any = {};
  wallet: string = localStorage.getItem("wallet");
  code: string;
  pay = false;
  pay_efectivoPUNTOSDERECOMPENSA = 0;

  constructor(
    private metodosPagoService: MetodosPagoService,
    private cargandoService: CargandoService,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  payCash() {
    if (!this.code) return;
    const user = JSON.parse(localStorage.getItem("user"));
    const infoPay = {
      pay_efectivoTOTAL: this.cantidad,
      code: this.code,
      emailCompany: this.informacion.email,
      emailUser: user.username,
    };
    this.cargandoService.iniciaCargando();
    this.metodosPagoService.payCash(infoPay).subscribe(
      (response: any) => {
        this.pay_efectivoPUNTOSDERECOMPENSA =
          response.data.pay_efectivoPUNTOSDERECOMPENSA;
        this.pay = true;
        this.cargandoService.terminaCargando();
      },
      (error) => {
        this.cargandoService.terminaCargando();
        this.errorPay(error.error.message);
      }
    );
  }

  async errorPay(message: any) {
    const alert = await this.alertController.create({
      cssClass: "modal-info",
      mode: "ios",
      header: "Error",
      message: message,
      buttons: ["OK"],
    });
    await alert.present();
    await alert.onDidDismiss();
  }
}
