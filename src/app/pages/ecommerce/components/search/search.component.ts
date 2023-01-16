import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Input() lista: any = [];
  @Input() noEncontrado: boolean = false;
  @Input() cargando: boolean = false;
  @Output() search: EventEmitter<any> = new EventEmitter();

  constructor(
  ) { }

  
  irSitioWeb(web) {
    window.open(web);
  }
  buscar(event) {
    this.search.emit(event.detail.value);
  }

}
