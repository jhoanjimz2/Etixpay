import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-select-type-pay",
  templateUrl: "./select-type-pay.component.html",
  styleUrls: ["./select-type-pay.component.scss"],
})
export class SelectTypePayComponent {
  @Input() informacion: any = {};

  constructor(
    private router: Router,
    private modalController: ModalController
  ) {}

  ticket() {
    this.modalController.dismiss();
    this.router.navigate(["/pages/pagos/ticket"], {
      queryParams: {
        order: JSON.stringify({ ...this.informacion, payment: "tix" }),
      },
    });
  }
  cash() {
    this.modalController.dismiss();
    this.router.navigate(["/pages/pagos/ticket"], {
      queryParams: {
        order: JSON.stringify({ ...this.informacion, payment: "cash" }),
      },
    });
  }
}
