import { Component } from '@angular/core';
import { ExpertsService } from '../../../services/experts.service';

@Component({
  selector: 'app-all-profesionals',
  templateUrl: './all-profesionals.page.html',
  styleUrls: ['./all-profesionals.page.scss'],
})
export class AllProfesionalsPage {

  profesionalsAll: any = [];

  palabra: string = '';

  constructor(
    private expertsService: ExpertsService
  ) { 
    this.getProfesionalesAll();
  }

  buscar(event) {
    this.palabra = event;
  }

  getProfesionalesAll() {
    this.expertsService.getProfesionalesAll().subscribe((data: any) => {
      this.profesionalsAll = data.data;
    }, error => {
      console.log(error);
    })
  }

}
