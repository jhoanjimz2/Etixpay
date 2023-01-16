import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profesional-voucher',
  templateUrl: './profesional-voucher.component.html',
  styleUrls: ['./profesional-voucher.component.scss'],
})
export class ProfesionalVoucherComponent {
  option = {
    initialSlide: 0,
    slidesPerView:1,
    observer: true,
    observeParents: true,
    spaceBetween: 5,
    speed: 1500
  };

}
