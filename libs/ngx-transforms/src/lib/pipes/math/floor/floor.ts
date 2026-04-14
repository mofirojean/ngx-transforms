import { Pipe, PipeTransform } from '@angular/core';

/**
 * FloorPipe: Rounds a number down to the specified number of decimal places.
 *
 * Uses `Math.floor` — always rounds toward negative infinity.
 *
 * @param {number} value - The number to round down.
 * @param {number} [precision=0] - Number of decimal places to preserve (defaults to 0 = integer).
 *
 * @returns {number | undefined} - The rounded-down value, or undefined if the input is invalid.
 *
 * @example
 * {{ 4.9 | floor }}                                          // 4
 * {{ 4.567 | floor:2 }}                                      // 4.56
 * {{ 0.999 | floor:1 }}                                      // 0.9
 * {{ -4.1 | floor }}                                         // -5
 */
@Pipe({
  name: 'floor',
  standalone: true,
})
export class FloorPipe implements PipeTransform {

  transform(value: number, precision = 0): number | undefined {
    if (typeof value !== 'number' || isNaN(value)) {
      return undefined;
    }

    if (typeof precision !== 'number' || isNaN(precision) || precision < 0) {
      return undefined;
    }

    const factor = Math.pow(10, precision);
    return Math.floor(value * factor) / factor;
  }

}