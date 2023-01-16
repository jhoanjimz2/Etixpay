import { Component } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent {
  R: number = 0;
  G: number = 0;
  B: number = 0;

  constructor() { }

  ColorToHex(color) {
    var hexadecimal = color.toString(16);
    return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
  }
  
  get ConvertRGBtoHex() {
    return "#" + this.ColorToHex(this.R) + this.ColorToHex(this.G) + this.ColorToHex(this.B);
  }

}
