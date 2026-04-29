import { Pipe, PipeTransform } from '@angular/core';

/**
 * IsDefinedPipe: Returns `true` when the value is neither `null` nor `undefined`.
 *
 * Useful for guarding optional bindings in templates without resorting to
 * verbose `value !== null && value !== undefined` checks. Empty strings,
 * `0`, and `false` are all considered defined.
 *
 * @param {unknown} value - The value to test.
 *
 * @returns {boolean} - `true` if defined, `false` if null/undefined.
 *
 * @example
 * {{ user | isDefined }}      // true when user is set
 * {{ 0 | isDefined }}         // true
 * {{ '' | isDefined }}        // true
 * {{ null | isDefined }}      // false
 * {{ undefined | isDefined }} // false
 */
@Pipe({
  name: 'isDefined',
  standalone: true,
})
export class IsDefinedPipe implements PipeTransform {

  transform(value: unknown): boolean {
    return value !== null && value !== undefined;
  }

}
