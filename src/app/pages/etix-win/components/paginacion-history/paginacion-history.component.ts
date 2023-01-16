import { Component, Input, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-paginacion-history',
  templateUrl: './paginacion-history.component.html',
  styleUrls: ['./paginacion-history.component.scss'],
})
export class PaginacionHistoryComponent {
  @ViewChild('slide', { static: true }) slide: IonSlides;

  @Input() paginas = [0,0,0,0,0];
  options = {
    initialSlide: 0,
    observer: true,
    observeParents: true,
    speed: 500,
    slidesPerView: 3
  };

  paginaActual = 1;

  constructor() {
   }
  
  cambiar() {
  }

  next() {
    this.slide.slideNext();
    this.slidePosition();
  }
  prev() {
    this.slide.slidePrev();
    this.slidePosition();
  }
  slidePosition() {
    this.slide.getActiveIndex().then( number => {
      this.paginaActual = (number + 1)
    })
  }
  get indexSlide() {
    let numero
    this.slide.length().then( number => { numero = (number + 1); });
    return numero;
  }

}
