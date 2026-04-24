import { Pipe, PipeTransform } from '@angular/core';

/**
 * PairsPipe: Returns the own enumerable properties of an object as an array of
 * [key, value] tuples.
 *
 * Wraps `Object.entries`. Works on plain objects and arrays. Returns an empty
 * array for null, undefined, or primitive inputs.
 *
 * @param {unknown} value - The object to convert into key/value pairs.
 *
 * @returns {[string, unknown][]} - Array of [key, value] tuples, or empty array.
 *
 * @example
 * {{ { a: 1, b: 2 } | pairs }}                               // [['a', 1], ['b', 2]]
 * @for (entry of user | pairs; track entry[0]) {
 *   <li>{{ entry[0] }}: {{ entry[1] }}</li>
 * }
 */
@Pipe({
  name: 'pairs',
  standalone: true,
})
export class PairsPipe implements PipeTransform {

  transform(value: unknown): [string, unknown][] {
    if (value === null || value === undefined) return [];
    if (typeof value !== 'object') return [];

    return Object.entries(value as Record<string, unknown>);
  }

}