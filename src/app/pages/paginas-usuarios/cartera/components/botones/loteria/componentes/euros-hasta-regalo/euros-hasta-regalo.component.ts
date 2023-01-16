import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-euros-hasta-regalo',
  templateUrl: './euros-hasta-regalo.component.html',
  styleUrls: ['./euros-hasta-regalo.component.scss'],
})
export class EurosHastaRegaloComponent implements OnInit {
  @Input() porcentaje;

  constructor() { }

  ngOnInit() {}

}
