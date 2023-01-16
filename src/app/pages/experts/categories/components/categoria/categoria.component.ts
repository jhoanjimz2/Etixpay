import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss'],
})
export class CategoriaComponent {
  @Input() categoria: any = {};

  constructor( private router: Router ) { }

  
  categorie() {
    this.router.navigate(["/pages/experts/categorie"], { queryParams: { id: this.categoria.id, name: this.categoria.profession_name }});
  }

}
