import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ExpertsService } from 'src/app/services/experts.service';

@Component({
  selector: 'app-top-experts',
  templateUrl: './top-experts.component.html',
  styleUrls: ['./top-experts.component.scss'],
})
export class TopExpertsComponent {


  @Input() palabra: string = '';
  profesionalsTop: any = [];

  constructor( 
    private router: Router,
    private expertsService: ExpertsService
  ) { 
    this.getProfesionalesTop();
  }

  profesionalProfile(uuid) {
    this.router.navigate(["/pages/experts/profesional"], { queryParams: {  uuid }});
  }
  profesionals() {
    this.router.navigate(["/pages/experts/all-profesionals"]);
  }
  getProfesionalesTop() {
    this.expertsService.getProfesionalesTop().subscribe((data: any) => {
      this.profesionalsTop = data.data;
    }, error => {
      console.log(error);
    })
  }

}
