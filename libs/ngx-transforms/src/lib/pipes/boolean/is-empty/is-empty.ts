import { Pipe, PipeTransform } from '@angular/core';

/**
 * IsEmptyPipe: Returns `true` when the value has nothing in it.
 *
 * - `null` / `undefined` → `true`
 * - `''` (empty string) → `true`
 * - `[]` (empty array) → `true`
 * - `{}` (no own enumerable keys) → `true`
 * - empty `Map` / `Set` → `true`
 * - everything else (numbers, booleans, dates, functions, non-empty containers) → `false`
 *
 * Whitespace strings count as non-empty — chain `trim` first if you want a
 * "blank" check.
 *
 * @param {unknown} value - The value to test.
 *
 * @returns {boolean} - `true` if the value is considered empty.
 *
 * @example
 * {{ '' | isEmpty }}       // true
 * {{ [] | isEmpty }}       // true
 * {{ {} | isEmpty }}       // true
 * {{ null | isEmpty }}     // true
 * {{ ' ' | isEmpty }}      // false (use trim first)
 * {{ 0 | isEmpty }}        // false
 */
@Pipe({
  name: 'isEmpty',
  standalone: true,
})
export class IsEmptyPipe implements PipeTransform {

  transform(value: unknown): boolean {
    if (value === null || value === undefined) return true;
    if (typeof value === 'string' || Array.isArray(value)) return value.length === 0;
    if (value instanceof Map || value instanceof Set) return value.size === 0;
    if (typeof value === 'object') {
      // Only plain objects are "empty when no keys".
      // Built-in types (Date, RegExp) and class instances carry meaning.
      const proto = Object.getPrototypeOf(value);
      if (proto === Object.prototype || proto === null) {
        return Object.keys(value as object).length === 0;
      }
      return false;
    }
    return false;
  }

}
