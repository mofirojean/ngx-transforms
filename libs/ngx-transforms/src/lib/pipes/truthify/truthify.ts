import { Pipe, PipeTransform } from '@angular/core';

/**
 * TruthifyPipe: Removes all falsy values from an array.
 *
 * Falsy values: false, 0, -0, '', null, undefined, NaN
 *
 * @param {unknown[]} value - The array to filter.
 *
 * @returns {unknown[]} - A new array with only truthy values.
 *
 * @example
 * {{ [0, 1, '', 'hello', null, true] | truthify }}   // [1, 'hello', true]
 * {{ ['', 'a', '', 'b'] | truthify }}                 // ['a', 'b']
 */
@Pipe({
  name: 'truthify',
  standalone: true,
})
export class TruthifyPipe implements PipeTransform {

  transform(value: unknown[]): unknown[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value.filter(Boolean);
  }

}