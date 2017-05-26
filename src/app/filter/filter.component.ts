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
      return item.lastName.toLowerCase().includes(term.toLowerCase())
      })
  }

  // /**
  //  * Perform the filtering.
  //  *
  //  * @param {User} user The book to compare to the filter.
  //  * @param {User} term The filter to apply.
  //  * @return {boolean} True if user satisfies terms, false if not.
  //  */
  // applyFilter(user: any, term: any): boolean {
  //   for (let field in term) {
  //     if (term[field]) {
  //       if (typeof term[field] === 'string') {
  //         if (user[field].toLowerCase().indexOf(term[field].toLowerCase()) === -1) {
  //           return false;
  //         }
  //       } else if (typeof term[field] === 'number') {
  //         if (user[field] !== term[field]) {
  //           return false;
  //         }
  //       }
  //     }
  //   }
  //   return true;
  // }

}
