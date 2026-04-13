import { Pipe, PipeTransform } from '@angular/core';

/**
 * CeilPipe: Rounds a number up to the specified number of decimal places.
 *
 * Uses `Math.ceil` — always rounds toward positive infinity.
 *
 * @param {number} value - The number to round up.
 * @param {number} [precision=0] - Number of decimal places to preserve (defaults to 0 = integer).
 *
 * @returns {number | undefined} - The rounded-up value, or undefined if the input is invalid.
 *
 * @example
 * {{ 4.1 | ceil }}                                           // 5
 * {{ 4.123 | ceil:2 }}                                       // 4.13
 * {{ 0.001 | ceil:2 }}                                       // 0.01
 * {{ -4.9 | ceil }}                                          // -4
 */
@Pipe({
  name: 'ceil',
  standalone: true,
})
export class CeilPipe implements PipeTransform {

  transform(value: number, precision = 0): number | undefined {
    if (typeof value !== 'number' || isNaN(value)) {
      return undefined;
    }

    if (typeof precision !== 'number' || isNaN(precision) || precision < 0) {
      return undefined;
    }

    const factor = Math.pow(10, precision);
    return Math.ceil(value * factor) / factor;
  }

}