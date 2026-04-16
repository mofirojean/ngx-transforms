import { Pipe, PipeTransform } from '@angular/core';

/**
 * RadiansPipe: Converts a value in degrees to radians.
 *
 * Formula: `radians = degrees * (Math.PI / 180)`
 *
 * @param {number} value - The angle in degrees.
 *
 * @returns {number | undefined} - The angle in radians, or undefined if the input is invalid.
 *
 * @example
 * {{ 180 | radians }}                                        // ~3.14159
 * {{ 90 | radians }}                                         // ~1.5708
 * {{ 0 | radians }}                                          // 0
 */
@Pipe({
  name: 'radians',
  standalone: true,
})
export class RadiansPipe implements PipeTransform {

  transform(value: number): number | undefined {
    if (typeof value !== 'number' || isNaN(value)) {
      return undefined;
    }

    return value * (Math.PI / 180);
  }

}