import { Injectable } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { Console } from "console";

@Injectable({
  providedIn: "root",
})
export class CargandoService {
  loading: any;

  constructor(private loading_ctrl: LoadingController) {}

  iniciaCargando() {
    this.present_loading("loading...");
  }
  async terminaCargando() {
    setTimeout(() => {
      this.loading.dismiss();
    }, 1000);
  }
  async present_loading(message) {
    this.loading = await this.loading_ctrl.create({
      message,
      mode: "ios",
    });
    return this.loading.present();
  }
}
