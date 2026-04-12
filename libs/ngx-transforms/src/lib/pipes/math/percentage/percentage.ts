import { Pipe, PipeTransform } from '@angular/core';

/**
 * PercentagePipe: Calculates what percentage a value represents of a total.
 *
 * Returns `(value / total) * 100`, optionally rounded to a given number of decimal places.
 *
 * @param {number} value - The partial value.
 * @param {number} total - The total/whole value.
 * @param {number} [decimals] - Optional number of decimal places to round to.
 *
 * @returns {number | undefined} - The percentage, or undefined if inputs are invalid.
 *
 * @example
 * {{ 25 | percentage:200 }}                                 // 12.5
 * {{ 1 | percentage:3:2 }}                                  // 33.33
 * {{ 750 | percentage:1000 }}                               // 75
 */
@Pipe({
  name: 'percentage',
  standalone: true,
})
export class PercentagePipe implements PipeTransform {

  transform(value: number, total: number, decimals?: number): number | undefined {
    if (typeof value !== 'number' || isNaN(value)) {
      return undefined;
    }

    if (typeof total !== 'number' || isNaN(total) || total === 0) {
      return undefined;
    }

    const result = (value / total) * 100;

    if (typeof decimals === 'number' && decimals >= 0) {
      const factor = Math.pow(10, decimals);
      return Math.round(result * factor) / factor;
    }

    return result;
  }

}