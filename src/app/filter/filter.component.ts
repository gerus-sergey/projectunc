import {Pipe, PipeTransform } from '@angular/core';

import { User } from '../models/user.interface'


@Pipe({
  name: 'filter',
  pure: false
})
export class FilterComponent implements PipeTransform {

  transform(items: any, term: any): any {
    if (term === undefined)
      return items;
    return items.filter(function (item) {
      return (item.firstName + ' ' + item.lastName).toLowerCase().includes(term.toLowerCase())
      })
  }


}
