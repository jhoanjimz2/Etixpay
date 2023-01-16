import { Pipe, PipeTransform } from '@angular/core';
import { formatCurrency, getCurrencySymbol } from '@angular/common';

@Pipe({
  name: 'formattNumber2'
})
export class FormattNumber2Pipe implements PipeTransform {

  transform(
    value: number,
    currencyCode: string = 'EUR',
    display:
      | 'code'
      | 'symbol'
      | 'symbol-narrow'
      | string
      | boolean = 'symbol',
    digitsInfo: string = '.2-2',
    locale: string = 'it',
  ): string | null {
    return formatCurrency(
      value,
      locale,
      '',
      currencyCode,
      digitsInfo,
    );
  }
}