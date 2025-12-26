import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'count',
  standalone: true
})
export class CountPipe implements PipeTransform {

  transform(value: any): number {
    if (value === null || value === undefined) {
      return 0;
    }
    if (Array.isArray(value) || typeof value === 'string') {
      return value.length;
    }
    if (typeof value === 'object') {
      return Object.keys(value).length;
    }
    return 0;
  }
}