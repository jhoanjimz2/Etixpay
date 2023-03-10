import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string): any {
    if (!img) {
      return'assets/img/no-image.jpg';
    }

    if (img.indexOf('https') >= 0) {
      return img;
    }
    
    return img;
  }

}
