import { Pipe, PipeTransform } from '@angular/core';

/**
 * FlattenPipe: Flattens nested arrays to a specified depth.
 *
 * @param {unknown[]} value - The nested array to flatten.
 * @param {number} [depth=Infinity] - How many levels of nesting to flatten.
 *
 * @returns {unknown[]} - A new flattened array.
 *
 * @example
 * {{ [[1, 2], [3, 4]] | flatten }}         // [1, 2, 3, 4]
 * {{ [[1, [2, [3]]]] | flatten:1 }}        // [1, 2, [3]]
 * {{ [['a', 'b'], ['c']] | flatten }}      // ['a', 'b', 'c']
 */
@Pipe({
  name: 'flatten',
  standalone: true
})
export class Flatten implements PipeTransform {

  transform(value: unknown[], depth = Infinity): unknown[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return (value as any[]).flat(depth);
  }

}
