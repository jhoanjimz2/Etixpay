import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-in-evidenza',
  templateUrl: './in-evidenza.component.html',
  styleUrls: ['./in-evidenza.component.scss'],
})
export class InEvidenzaComponent {


  @Input()shoppingEvidenza: any = [];
  slideNulo = {
    initialSlide: 0,
    slidesPerView:1,
    observer: true,
    observeParents: true
  };

  constructor(
  ) { }


  irSitioWeb(sitioWeb) {
    window.open(sitioWeb);
  }

}
