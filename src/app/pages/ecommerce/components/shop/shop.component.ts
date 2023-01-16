import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent{

  @Input() shop: any = [];

  constructor(
  ) { }

  
  irSitioWeb() {
    window.open(this.shop.empresaPAGINAWEB);
  }

}
