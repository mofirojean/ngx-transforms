import { Pipe, PipeTransform } from '@angular/core';

/**
 * IsFunctionPipe: Returns `true` when the value is callable.
 *
 * Backed by `typeof value === 'function'`, so arrow functions, regular
 * functions, async functions, generator functions, and class constructors
 * all return `true`. Methods and bound functions count too.
 *
 * @param {unknown} value - The value to test.
 *
 * @returns {boolean} - `true` if the value is a function, `false` otherwise.
 *
 * @example
 * {{ (() => 0) | isFunction }} // true
 * {{ Math.max | isFunction }}  // true
 * {{ class {} | isFunction }}  // true
 * {{ 'fn' | isFunction }}      // false
 */
@Pipe({
  name: 'isFunction',
  standalone: true,
})
export class IsFunctionPipe implements PipeTransform {

  transform(value: unknown): boolean {
    return typeof value === 'function';
  }

}
