import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/marketplace/reponseProducts.model';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
})
export class CardItemComponent {


  @Input ('products') products: Product[];
  @Input ('search') search = '';
  @Input ('category') category = '';

 
  constructor(
    private router: Router
  ) { }
  showDetail(id: number) {
    this.router.navigate(["pages/marketplace/item-detail", id]);
  }

}
