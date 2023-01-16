import { Component, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {

  @Output() search:EventEmitter<any> = new EventEmitter();
  debounce: Subject<string> = new Subject();
  inputSearch = '';

  constructor() {
    this.cargarDebounce();
  }

  cargarDebounce() {
    this.debounce.pipe(debounceTime(1000)).subscribe(valor => {
      this.buscar();
    })
  }
  debounceSearch() {
    this.debounce.next(this.inputSearch);
  }
  buscar() {
    this.search.emit(this.inputSearch);
  }

}
