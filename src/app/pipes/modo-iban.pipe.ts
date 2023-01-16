import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'modoIban'
})
export class ModoIbanPipe implements PipeTransform {

  transform(text, validacion): any {
    if (validacion) return text.replace(/(.{4})/g, '$1 ');
    else return text;
  }

}
