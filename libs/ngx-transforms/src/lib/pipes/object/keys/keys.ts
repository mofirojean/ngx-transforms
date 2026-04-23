import { Pipe, PipeTransform } from '@angular/core';

/**
 * KeysPipe: Returns the own enumerable property names of an object as an array.
 *
 * Wraps `Object.keys`. Works on plain objects and arrays. Returns an empty array
 * for null, undefined, or primitive inputs.
 *
 * @param {unknown} value - The object whose keys to extract.
 *
 * @returns {string[]} - Array of property names, or an empty array if invalid input.
 *
 * @example
 * {{ { a: 1, b: 2, c: 3 } | keys }}                          // ['a', 'b', 'c']
 * {{ user | keys }}                                          // ['name', 'age', 'email']
 * @for (key of obj | keys; track key) { ... }
 */
@Pipe({
  name: 'keys',
  standalone: true,
})
export class KeysPipe implements PipeTransform {

  transform(value: unknown): string[] {
    if (value === null || value === undefined) return [];
    if (typeof value !== 'object') return [];

    return Object.keys(value as Record<string, unknown>);
  }

}