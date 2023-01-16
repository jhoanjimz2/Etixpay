import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoriesMarkeplace } from 'src/app/models/marketplace/responseCategories.model';
import { MarketplaceService } from 'src/app/services/marketplace.service';

@Component({
  selector: 'app-slide-clasificaction',
  templateUrl: './slide-clasificaction.component.html',
  styleUrls: ['./slide-clasificaction.component.scss'],
})
export class SlideClasificactionComponent {

  categories: CategoriesMarkeplace[];
  category = ''
  @Output('setCategory') setCategory: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private marketplaceService: MarketplaceService
  ) { 
    this.getCategories()
  }

  getCategories() {
    this.marketplaceService.getCategories().subscribe(response => {
        this.categories = response.data;
    });
  }

  valueCategory(value: string) {
    this.category = value;
    this.setCategory.emit(this.category);
  }


}
