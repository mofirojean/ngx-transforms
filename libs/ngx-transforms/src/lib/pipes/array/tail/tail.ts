import { Pipe, PipeTransform } from '@angular/core';


/**
 * TailPipe: Returns all elements except the first n.
 *
 * @param {unknown[]} value - The array to slice.
 * @param {number} [n=1] - Number of elements to exclude from the start.
 *
 * @returns {unknown[]} - A new array without the first n elements.
 *
 * @example
 * {{ [1, 2, 3, 4, 5] | tail }}       // [2, 3, 4, 5]
 * {{ [1, 2, 3, 4, 5] | tail:2 }}     // [3, 4, 5]
 * {{ ['a', 'b', 'c'] | tail }}        // ['b', 'c']
 */
@Pipe({
  name: 'tail',
})
export class TailPipe implements PipeTransform {

  transform(value: unknown[], n = 1): unknown[] {
    if (!Array.isArray(value)) {
      return [];
    }

    // n = 0 means keep everything
    if (n <= 0) return [...value];

    // n >= length means remove everything
    if (n >= value.length) return []

    return value.slice(n);
  }

}
