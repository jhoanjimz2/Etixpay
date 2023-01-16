import { Component, Input } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-page',
  templateUrl: './header-page.component.html',
  styleUrls: ['./header-page.component.scss'],
})
export class HeaderPageComponent {
  @Input() color: string = '#01abe1';

  constructor(
    private modalController: ModalController,
    private navCtrl: NavController,
    private router: Router
  ) { }
  async back() {
    if (this.modalController.getTop()) {
      const modal = await this.modalController.getTop();
      if (modal) this.modalController.dismiss();
      else this.navCtrl.back();
    }
    else this.navCtrl.back();
  }
  menu() {
    this.cerrarModals();
    this.navCtrl.navigateBack("/tabs/cuenta");
    this.router.navigate(["/tabs/cuenta"])
  }
  cerrarModals() {
    this.modalController.dismiss();
  }
  
}
