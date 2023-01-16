import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ExpertsService } from '../../../../../../../services/experts.service';

@Component({
  selector: 'app-select-create-account',
  templateUrl: './select-create-account.page.html',
  styleUrls: ['./select-create-account.page.scss'],
})
export class SelectCreateAccountPage {

  uuid = '';

  constructor(
    private router: Router,
    private expertsService: ExpertsService,
    private navCtrl: NavController
  ) { 
    this.expertsService.validar().subscribe((data: any) => {
      this.uuid = data.data.data.uuid;
    });
  }
  salir_sin_argumentos() {
    this.navCtrl.back();
  }
  crear_cuenta_empresarial() {
    this.router.navigate(["pages/register-company"]);
  }
  crear_cuenta_profesional() {
    if (this.uuid) {
      this.navCtrl.navigateBack("/pages/experts/profesional");
      this.router.navigate(["/pages/experts/profesional"], { queryParams: {  uuid: this.uuid, editar: true }});
    }
    else this.router.navigate(["pages/experts/register-profesional"]);
  }

}
