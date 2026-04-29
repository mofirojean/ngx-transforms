import { Pipe, PipeTransform } from '@angular/core';

/**
 * IsNullPipe: Returns `true` only when the value is exactly `null`.
 *
 * Strict check — `undefined` returns `false`. Use `isDefined` (with `!`) if
 * you want to catch both null and undefined together.
 *
 * @param {unknown} value - The value to test.
 *
 * @returns {boolean} - `true` if the value is null, `false` otherwise.
 *
 * @example
 * {{ null | isNull }}      // true
 * {{ undefined | isNull }} // false
 * {{ 0 | isNull }}         // false
 * {{ '' | isNull }}        // false
 */
@Pipe({
  name: 'isNull',
  standalone: true,
})
export class IsNullPipe implements PipeTransform {

  transform(value: unknown): boolean {
    return value === null;
  }

}
