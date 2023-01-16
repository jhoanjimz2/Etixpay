import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productsMarkeplace'
})
export class ProductsMarketplace implements PipeTransform {
  transform(value: any, arg: any): any {
    const result = [];
    if (value) {
      for (const products of value) {
        if (products.productNAME.toUpperCase().indexOf(arg.toUpperCase()) > -1 || 
            products.productDESCRIPTION.toUpperCase().indexOf(arg.toUpperCase()) > -1 ||
            products.category_data.categoryNAME.toUpperCase().indexOf(arg.toUpperCase()) > -1) {
          result.push(products);
        }
      }
    }
    return result;
  }
}

