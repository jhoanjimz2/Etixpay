import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-categories-shopping',
  templateUrl: './categories-shopping.component.html',
  styleUrls: ['./categories-shopping.component.scss'],
})
export class CategoriesShoppingComponent {

  @Input() categoriesShopping: any = [];
  @Input() categorySelect = 1;
  @Output() selectCategory: EventEmitter<any> = new EventEmitter();

  constructor() { }


  selectCategoryClick(id) {
    this.selectCategory.emit(id);
  }

}
