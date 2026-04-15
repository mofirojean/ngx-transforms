import { Pipe, PipeTransform } from '@angular/core';

/**
 * RoundPipe: Rounds a number to the nearest value at the specified number of decimal places.
 *
 * Uses `Math.round` — rounds half-up (e.g. 2.5 → 3, -2.5 → -2).
 *
 * @param {number} value - The number to round.
 * @param {number} [precision=0] - Number of decimal places to preserve (defaults to 0 = integer).
 *
 * @returns {number | undefined} - The rounded value, or undefined if the input is invalid.
 *
 * @example
 * {{ 4.4 | round }}                                          // 4
 * {{ 4.5 | round }}                                          // 5
 * {{ 4.567 | round:2 }}                                      // 4.57
 * {{ 0.125 | round:2 }}                                      // 0.13
 */
@Pipe({
  name: 'round',
  standalone: true,
})
export class RoundPipe implements PipeTransform {

  transform(value: number, precision = 0): number | undefined {
    if (typeof value !== 'number' || isNaN(value)) {
      return undefined;
    }

    if (typeof precision !== 'number' || isNaN(precision) || precision < 0) {
      return undefined;
    }

    const factor = Math.pow(10, precision);
    return Math.round(value * factor) / factor;
  }

}