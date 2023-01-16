import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ver-img',
  templateUrl: './ver-img.component.html',
  styleUrls: ['./ver-img.component.scss'],
})
export class VerImgComponent {
  @Input() img: string = "";
}
