import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-etixmall',
  templateUrl: './etixmall.component.html',
  styleUrls: ['./etixmall.component.scss'],
})
export class EtixmallComponent {
  options = {
    loop: true,
    spaceBetween: 0,
    initialSlide: 0,
    speed: 2000,
    slidesPerView: 4
  };

  get idioma() {
    return localStorage.getItem('lenguaje');
  }
  etixmall() {
    window.open(environment.urlEtixmall);
  }

}
