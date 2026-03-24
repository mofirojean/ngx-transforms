import { Pipe, PipeTransform } from '@angular/core';

/**
 * InitialPipe: Returns all elements except the last n.
 *
 * @param {unknown[]} value - The array to slice.
 * @param {number} [n=1] - Number of elements to exclude from the end.
 *
 * @returns {unknown[]} - A new array without the last n elements.
 *
 * @example
 * {{ [1, 2, 3, 4, 5] | initial }}       // [1, 2, 3, 4]
 * {{ [1, 2, 3, 4, 5] | initial:2 }}     // [1, 2, 3]
 * {{ ['a', 'b', 'c'] | initial }}        // ['a', 'b']
 */
@Pipe({
  name: 'initial',
  standalone: true
})
export class InitialPipe implements PipeTransform {

  transform(value: unknown, n = 1): unknown[] {
    if (!Array.isArray(value)) {
      return [];
    }

    if (n <= 0) {
      return [...value];
    }

    if (n >= value.length) {
      return [];
    }
    return value.slice(0, -n);
  }

}
