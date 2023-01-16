import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ExpertsService } from 'src/app/services/experts.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {

  @Input() palabra: string = '';
  categorias: any = [];

  constructor( 
    private router: Router,
    private expertsService: ExpertsService
    ) { 
    this.getProfesionsTop();
  }

  categories() {
    this.router.navigate(["/pages/experts/categories"]);
  }
  categorie(id, name) {
    this.router.navigate(["/pages/experts/categorie"], { queryParams: { id, name }});
  }
  getProfesionsTop() {
    this.expertsService.getProfesionsTop().subscribe((data: any) => {
      this.categorias = data.data
    }, error => {
      console.log(error);
    })
  }

}
