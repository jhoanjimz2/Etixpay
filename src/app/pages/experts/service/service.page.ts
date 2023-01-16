import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpertsService } from 'src/app/services/experts.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.page.html',
  styleUrls: ['./service.page.scss'],
})
export class ServicePage {
  name: string = '';

  profesionales: any = [];

  palabra: string = '';

  constructor(
    public route: ActivatedRoute,
    private expertsService: ExpertsService
    ) { 
    this.route.queryParams.subscribe( params => {
      this.name = params.name;
      this.getProfesionalByService(params.id);
    })
  }

  buscar(event) {
    this.palabra = event;
  }
  getProfesionalByService(id) {
    this.expertsService.getProfesionalByService(id).subscribe((data: any) => {
      this.profesionales = data.data.data;
    }, error => {
      console.log(error);
    })
  }

}
