import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'count',
  standalone: true,
})
export class CountPipe implements PipeTransform {
  transform(value: any[] | string): number {
    return value.length;
  }
}
