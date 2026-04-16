import { Pipe, PipeTransform } from '@angular/core';

/**
 * SqrtPipe: Returns the square root of a number.
 *
 * Uses `Math.sqrt`. Returns undefined for negative numbers.
 *
 * @param {number} value - The number to compute the square root of.
 *
 * @returns {number | undefined} - The square root, or undefined if the input is invalid or negative.
 *
 * @example
 * {{ 9 | sqrt }}                                             // 3
 * {{ 2 | sqrt }}                                             // 1.4142135623730951
 * {{ 144 | sqrt }}                                           // 12
 */
@Pipe({
  name: 'sqrt',
  standalone: true,
})
export class SqrtPipe implements PipeTransform {

  transform(value: number): number | undefined {
    if (typeof value !== 'number' || isNaN(value)) {
      return undefined;
    }

    if (value < 0) {
      return undefined;
    }

    return Math.sqrt(value);
  }

}