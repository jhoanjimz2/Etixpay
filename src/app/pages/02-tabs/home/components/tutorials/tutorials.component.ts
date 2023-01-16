import { Component } from '@angular/core';
import { HomeService } from '../../../../../services/home.service';

@Component({
  selector: 'app-tutorials',
  templateUrl: './tutorials.component.html',
  styleUrls: ['./tutorials.component.scss'],
})
export class TutorialsComponent {
  tutoriales = [];
  options = {
    loop: true,
    spaceBetween: 0,
    initialSlide: 0,
    speed: 2000,
    autoplay: {
      delay: 1000,
      disableOnInteraction: false
    }
  };
  constructor(
    private homeService: HomeService
    ) { 
      this.getTutoriales();
    }
  getTutoriales() {
    this.homeService.tutoriales().subscribe( (data: any) => {
      this.tutoriales = data.data;
    })
  }
  tutorials() {
    window.open('https://m.youtube.com/channel/UCtuomouk7Xt6pcySaedUWHQ');
  }

}
