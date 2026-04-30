import { Pipe, PipeTransform } from '@angular/core';

/**
 * IsStringPipe: Returns `true` when the value is a primitive string.
 *
 * Uses `typeof value === 'string'` — boxed `String` objects (rare) are not
 * matched. Useful for polymorphic templates that render values from JSON,
 * dynamic forms, or `unknown`-typed data.
 *
 * @param {unknown} value - The value to test.
 *
 * @returns {boolean} - `true` if the value is a string primitive, `false` otherwise.
 *
 * @example
 * {{ 'hello' | isString }}  // true
 * {{ '' | isString }}       // true
 * {{ 42 | isString }}       // false
 * {{ null | isString }}     // false
 */
@Pipe({
  name: 'isString',
  standalone: true,
})
export class IsStringPipe implements PipeTransform {

  transform(value: unknown): boolean {
    return typeof value === 'string';
  }

}
