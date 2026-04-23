import { Pipe, PipeTransform } from '@angular/core';

/**
 * ValuesPipe: Returns the own enumerable property values of an object as an array.
 *
 * Wraps `Object.values`. Works on plain objects and arrays. Returns an empty array
 * for null, undefined, or primitive inputs.
 *
 * @param {unknown} value - The object whose values to extract.
 *
 * @returns {unknown[]} - Array of property values, or an empty array if invalid input.
 *
 * @example
 * {{ { a: 1, b: 2, c: 3 } | values }}                        // [1, 2, 3]
 * {{ user | values }}                                        // ['Alice', 30, 'a@b.com']
 * @for (val of obj | values; track $index) { ... }
 */
@Pipe({
  name: 'values',
  standalone: true,
})
export class ValuesPipe implements PipeTransform {

  transform(value: unknown): unknown[] {
    if (value === null || value === undefined) return [];
    if (typeof value !== 'object') return [];

    return Object.values(value as Record<string, unknown>);
  }

}