import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-categories-stores',
  templateUrl: './categories-stores.component.html',
  styleUrls: ['./categories-stores.component.scss'],
})
export class CategoriesStoresComponent {
  @Input() categoriesStores: any = [];
  @Input() categorySelect = 1;
  @Output() selectCategory: EventEmitter<any> = new EventEmitter();

  constructor() { }
  
  selectCategoryClick(id) {
    this.selectCategory.emit(id);
  }

}
