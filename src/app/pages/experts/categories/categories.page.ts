import { Component } from '@angular/core';
import { ExpertsService } from 'src/app/services/experts.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage {

  categorias: any = [];

  palabra: string = '';

  constructor( 
    private expertsService: ExpertsService
    ) { 
    this.getProfesions();
  }

  buscar(event) {
    this.palabra = event;
  }
  getProfesions() {
    this.expertsService.getProfesions().subscribe((data: any) => {
      this.categorias = data.data
    }, error => {
      console.log(error);
    })
  }

}
