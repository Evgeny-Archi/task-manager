import { Pipe, PipeTransform } from '@angular/core';

function compare(a: any, b: any): number {
  if (a.createDate > b.createDate) {
    return -1;
  }
  if (a.createDate < b.createDate) {
    return 1;
  }
  return 0;
}

@Pipe({
  name: 'sortBy',
})
export class CustomSortPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    const sorted = [...value];
    if (args === 'new') {
      sorted.sort(compare);
    } else {
      sorted.reverse();
    }
    return sorted;
  }
}
