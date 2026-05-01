import { Pipe, PipeTransform } from '@angular/core';

/**
 * IsArrayPipe: Returns `true` when the value is an Array.
 *
 * Backed by `Array.isArray`, so array-likes (NodeList, HTMLCollection,
 * arguments, typed arrays) all return `false`. Use it to discriminate between
 * structural and scalar inputs in polymorphic templates.
 *
 * @param {unknown} value - The value to test.
 *
 * @returns {boolean} - `true` if the value is an array, `false` otherwise.
 *
 * @example
 * {{ [1, 2, 3] | isArray }}     // true
 * {{ [] | isArray }}            // true
 * {{ 'abc' | isArray }}         // false
 * {{ { length: 0 } | isArray }} // false
 */
@Pipe({
  name: 'isArray',
  standalone: true,
})
export class IsArrayPipe implements PipeTransform {

  transform(value: unknown): boolean {
    return Array.isArray(value);
  }

}
