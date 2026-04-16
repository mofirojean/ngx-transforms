import { Pipe, PipeTransform } from '@angular/core';

/**
 * DegreesPipe: Converts a value in radians to degrees.
 *
 * Formula: `degrees = radians * (180 / Math.PI)`
 *
 * @param {number} value - The angle in radians.
 *
 * @returns {number | undefined} - The angle in degrees, or undefined if the input is invalid.
 *
 * @example
 * {{ 3.14159 | degrees }}                                    // ~180
 * {{ 1.5708 | degrees }}                                     // ~90
 * {{ 0 | degrees }}                                          // 0
 */
@Pipe({
  name: 'degrees',
  standalone: true,
})
export class DegreesPipe implements PipeTransform {

  transform(value: number): number | undefined {
    if (typeof value !== 'number' || isNaN(value)) {
      return undefined;
    }

    return value * (180 / Math.PI);
  }

}