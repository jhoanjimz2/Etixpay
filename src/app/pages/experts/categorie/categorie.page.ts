import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpertsService } from 'src/app/services/experts.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.page.html',
  styleUrls: ['./categorie.page.scss'],
})
export class CategoriePage {

  name: string = '';
  servicios: any = [];
  
  palabra: string = '';
  
  constructor(
    public route: ActivatedRoute,
    private expertsService: ExpertsService
    ) { 
    this.route.queryParams.subscribe( params => {
      this.name = params.name;
      this.getServiceByProfesion(params.id);
    })
  }

  buscar(event) {
    this.palabra = event;
  }
  getServiceByProfesion(id) {
    this.expertsService.getServiceByProfesion(id).subscribe((data: any) => {
      this.servicios = data.data;
    }, error => {
      console.log(error);
    })
  }

}
