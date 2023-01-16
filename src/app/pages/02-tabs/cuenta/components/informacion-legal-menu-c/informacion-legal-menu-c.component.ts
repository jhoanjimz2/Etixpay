import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-informacion-legal-menu-c',
  templateUrl: './informacion-legal-menu-c.component.html',
  styleUrls: ['./informacion-legal-menu-c.component.scss'],
})
export class InformacionLegalMenuCComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit() {}
  informacionLegal() {
    window.open(environment.TyC);
  }

}
