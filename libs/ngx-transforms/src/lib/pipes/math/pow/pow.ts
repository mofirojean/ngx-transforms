import { Pipe, PipeTransform } from '@angular/core';

/**
 * PowPipe: Raises a number to the specified power.
 *
 * Uses `Math.pow`. The exponent defaults to 2 (squaring).
 *
 * @param {number} value - The base number.
 * @param {number} [exponent=2] - The power to raise the base to (defaults to 2).
 *
 * @returns {number | undefined} - The result, or undefined if the inputs are invalid.
 *
 * @example
 * {{ 3 | pow }}                                              // 9  (3^2)
 * {{ 2 | pow:3 }}                                            // 8  (2^3)
 * {{ 5 | pow:0 }}                                            // 1  (anything^0)
 */
@Pipe({
  name: 'pow',
  standalone: true,
})
export class PowPipe implements PipeTransform {

  transform(value: number, exponent = 2): number | undefined {
    if (typeof value !== 'number' || isNaN(value)) {
      return undefined;
    }

    if (typeof exponent !== 'number' || isNaN(exponent)) {
      return undefined;
    }

    return Math.pow(value, exponent);
  }

}