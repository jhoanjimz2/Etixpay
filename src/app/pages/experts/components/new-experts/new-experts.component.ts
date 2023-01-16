import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ExpertsService } from '../../../../services/experts.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-new-experts',
  templateUrl: './new-experts.component.html',
  styleUrls: ['./new-experts.component.scss'],
})
export class NewExpertsComponent {

  profesionales: any [];

  constructor(
    private router: Router,
    private expertsService: ExpertsService,
    private navCtrl: NavController
  ) {
    this.cargarNewExperts();
  }

  cargarNewExperts() {
    this.expertsService.getNewExperts().subscribe((data: any) => {
      this.profesionales = data.data;
    })
  }
  profesionalProfile(uuid) {
    this.navCtrl.navigateBack("/pages/experts/profesional");
    this.router.navigate(["/pages/experts/profesional"], { queryParams: {  uuid }});
  }

}
