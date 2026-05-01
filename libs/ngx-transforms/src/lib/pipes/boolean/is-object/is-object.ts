import { Pipe, PipeTransform } from '@angular/core';

/**
 * IsObjectPipe: Returns `true` when the value is a non-null object that is
 * not an array.
 *
 * Lenient — class instances, Date, Map, Set, and RegExp all return `true`
 * because their JS type is "object". Only `null` and arrays are excluded.
 * Pair with `isArray` to discriminate between the two structural shapes.
 *
 * @param {unknown} value - The value to test.
 *
 * @returns {boolean} - `true` if the value is a non-null, non-array object.
 *
 * @example
 * {{ { a: 1 } | isObject }} // true
 * {{ {} | isObject }}       // true
 * {{ [1, 2] | isObject }}   // false
 * {{ null | isObject }}     // false
 * {{ 'abc' | isObject }}    // false
 */
@Pipe({
  name: 'isObject',
  standalone: true,
})
export class IsObjectPipe implements PipeTransform {

  transform(value: unknown): boolean {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }

}
