import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ExpertsService } from '../../../../../services/experts.service';

@Component({
  selector: 'app-services-popular',
  templateUrl: './services-popular.component.html',
  styleUrls: ['./services-popular.component.scss'],
})
export class ServicesPopularComponent {

  @Input() palabra: string = '';
  servicios: any = [];

  constructor( 
    private router: Router,
    private expertsService: ExpertsService
  ) { 
    this.getServicesPopulares();
  }

  serviceUno(id, name) {
    this.router.navigate(["/pages/experts/service"], { queryParams: { id,  name }});
  }

  getServicesPopulares() {
    this.expertsService.getServicePopulares().subscribe((data: any) => {
      this.servicios = data.data;
    }, error => {
      console.log(error);
    })
  }



}
