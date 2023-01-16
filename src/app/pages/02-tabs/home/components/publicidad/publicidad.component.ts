import { Component } from '@angular/core';
import { HomeService } from '../../../../../services/home.service';
declare const window: any;

@Component({
  selector: 'app-publicidad',
  templateUrl: './publicidad.component.html',
  styleUrls: ['./publicidad.component.scss'],
})
export class PublicidadComponent {
  publicidades = [];
  opciones_slide = {
    loop: true,
    spaceBetween: 0,
    initialSlide: 0,
    speed: 2000,
    autoplay: {
      delay: 1000,
      disableOnInteraction: false
    }
  };

  anchoImg = 0;

  constructor(
    private home_service: HomeService
  ) {
    this.anchoImg = window.outerWidth;
    this.publicidad();
  }
  publicidad() {
    this.home_service.publicidad().subscribe( (data: any) => {
      this.publicidades = data.data
    }, error => {})
  }
}
