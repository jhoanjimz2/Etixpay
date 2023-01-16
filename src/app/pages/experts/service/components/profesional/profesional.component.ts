import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profesional',
  templateUrl: './profesional.component.html',
  styleUrls: ['./profesional.component.scss'],
})
export class ProfesionalComponent {

  @Input() profesional: any = {};

  constructor( private router: Router ) { }

  
  profesionalProfile() {
    this.router.navigate(["/pages/experts/profesional"], { queryParams: {  uuid: this.profesional.uuid }});
  }

}
