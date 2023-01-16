import { Component } from '@angular/core';

@Component({
  selector: 'app-registro-diario-c',
  templateUrl: './registro-diario-c.component.html',
  styleUrls: ['./registro-diario-c.component.scss'],
})
export class RegistroDiarioCComponent  {
  checkindia = [
    {check: true},
    {check: true},
    {check: true},
    {check: false},
    {check: false},
    {check: false}
  ]
}
