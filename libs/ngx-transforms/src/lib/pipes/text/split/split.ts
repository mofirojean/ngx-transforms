import { Pipe, PipeTransform } from '@angular/core';

/**
 * SplitPipe: Splits a string into an array using the given separator.
 *
 * Wraps `String.prototype.split`. Returns an empty array for invalid inputs.
 *
 * @param {string} value - The string to split.
 * @param {string | RegExp} [separator=''] - Character, string, or regex to split on.
 *   An empty separator splits the string into individual characters.
 * @param {number} [limit] - Optional maximum number of elements to return.
 *
 * @returns {string[]} - The resulting array, or an empty array for invalid input.
 *
 * @example
 * {{ 'a,b,c' | split:',' }}                                  // ['a', 'b', 'c']
 * {{ 'abc' | split }}                                        // ['a', 'b', 'c']
 * {{ 'one two three' | split:' ':2 }}                        // ['one', 'two']
 */
@Pipe({
  name: 'split',
  standalone: true,
})
export class SplitPipe implements PipeTransform {

  transform(value: string, separator: string | RegExp = '', limit?: number): string[] {
    if (typeof value !== 'string') return [];

    if (typeof limit === 'number' && limit >= 0) {
      return value.split(separator, limit);
    }

    return value.split(separator);
  }

}