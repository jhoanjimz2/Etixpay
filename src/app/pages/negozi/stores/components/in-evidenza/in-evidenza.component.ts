import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-in-evidenza',
  templateUrl: './in-evidenza.component.html',
  styleUrls: ['./in-evidenza.component.scss'],
})
export class InEvidenzaComponent {
  
  @Input()storesDestacadas: any = [];
  @Input()cargarDestacadas;
  @Input()paginaActualD: number = 0;
  @Input()paginasTotalesD: number = 0;
  @Output() next: EventEmitter<any> = new EventEmitter();
  slideNulo = {
    initialSlide: 0,
    slidesPerView:1,
    observer: true,
    observeParents: true
  };

  constructor(
    private router: Router
  ) { }


  irNegoziPage(uuid) {
    this.router.navigate(["/pages/negozi/store-page/"+ uuid]);
  }
  siguiente() {
    this.next.emit();
  }

}
