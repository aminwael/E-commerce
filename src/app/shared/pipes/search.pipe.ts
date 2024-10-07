import { Pipe, PipeTransform } from '@angular/core';
import { product } from '../interfaces/product';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {
  //han3ml filteration ll prodcuts
  transform(productList:product[],userWord:string): product[] {
    return productList.filter(function(item){
      return item.title.toLowerCase().includes(userWord.toLowerCase());
    });
  }

}
