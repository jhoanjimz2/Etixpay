import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EcommerceService } from '../../../../services/ecommerce.service';

@Component({
  selector: 'app-shopping-online-component',
  templateUrl: './shopping-online-component.component.html',
  styleUrls: ['./shopping-online-component.component.scss'],
})
export class ShoppingOnlineComponentComponent {

  shoppingOnline: any = [];
  slideNulo = {
    initialSlide: 0,
    slidesPerView:1,
    observer: true,
    observeParents: true
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private ecommerService: EcommerceService
  ) { 
    this.ecommerService.inEvidenza().subscribe((data: any) => {
      this.shoppingOnline = data.data;
    })
  }
  irEcommerce() {
    this.router.navigate(["/pages/ecommerce"]);
  }
  irSitioWeb(sitioWeb) {
    window.open(sitioWeb);
  }

}
