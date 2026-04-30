import { Pipe, PipeTransform } from '@angular/core';

/**
 * IsNumberPipe: Returns `true` when the value is a primitive number.
 *
 * Uses `typeof value === 'number'`. By design `NaN` returns `true` because
 * its type is `number` — if you need a finite-only check, follow up with
 * `Number.isFinite`. Numeric strings (e.g. `'42'`) return `false`.
 *
 * @param {unknown} value - The value to test.
 *
 * @returns {boolean} - `true` if the value is a number primitive, `false` otherwise.
 *
 * @example
 * {{ 42 | isNumber }}      // true
 * {{ 0 | isNumber }}       // true
 * {{ NaN | isNumber }}     // true
 * {{ '42' | isNumber }}    // false
 * {{ null | isNumber }}    // false
 */
@Pipe({
  name: 'isNumber',
  standalone: true,
})
export class IsNumberPipe implements PipeTransform {

  transform(value: unknown): boolean {
    return typeof value === 'number';
  }

}
