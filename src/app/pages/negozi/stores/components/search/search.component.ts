import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

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
    private router: Router
  ) { }

  
  irNegoziPage(uuid) {
    this.router.navigate(["/pages/negozi/store-page/"+ uuid]);
  }

  buscar(event) {
    this.search.emit(event.detail.value);
  }

}
