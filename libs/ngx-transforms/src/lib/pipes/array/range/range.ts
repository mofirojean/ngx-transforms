import { Pipe, PipeTransform } from '@angular/core';

/**
 * RangePipe: Generates a numeric sequence array.
 *
 * @param {number} value - The number of items to generate (or the end value when start is provided).
 * @param {number} [start=0] - The starting number.
 * @param {number} [step=1] - The increment between each number.
 *
 * @returns {number[]} - An array of sequential numbers.
 *
 * @example
 * {{ 5 | range }}            // [0, 1, 2, 3, 4]
 * {{ 5 | range:1 }}          // [1, 2, 3, 4, 5]
 * {{ 10 | range:0:2 }}       // [0, 2, 4, 6, 8]
 */
@Pipe({
  name: 'range',
  standalone: true,
})
export class RangePipe implements PipeTransform {

  transform(value: number, start = 0, step = 1): number[] {
    if (typeof value !== 'number' || isNaN(value) || value <= 0) {
      return [];
    }

    if (step === 0) {
      return [];
    }

    const result: number[] = [];
    for (let i = 0; i < value; i++) {
      result.push(start + i * step);
    }
    return result;
  }

}
