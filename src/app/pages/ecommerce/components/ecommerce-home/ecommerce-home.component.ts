import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EcommerceService } from 'src/app/services/ecommerce.service';

@Component({
  selector: 'app-ecommerce-home',
  templateUrl: './ecommerce-home.component.html',
  styleUrls: ['./ecommerce-home.component.scss'],
})
export class EcommerceHomeComponent {

  ecommerce: any = [];

  constructor(
    private router: Router,
    private ecommerService: EcommerceService
  ) { 
    this.ecommerService.inEvidenza().subscribe((data: any) => {
      this.ecommerce = data.data;
    })
  }
  irEcommerce() {
    this.router.navigate(["/pages/ecommerce"]);
  }
  irSitioWeb(sitioWeb) {
    window.open(sitioWeb);
  }

}
