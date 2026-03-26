import { Pipe, PipeTransform } from '@angular/core';

/**
 * ChunkPipe: Splits an array into smaller arrays of a specified size.
 *
 * @param {unknown[]} value - The array to split.
 * @param {number} [size=1] - The size of each chunk.
 *
 * @returns {unknown[][]} - An array of chunks.
 *
 * @example
 * {{ [1, 2, 3, 4, 5] | chunk:2 }}     // [[1, 2], [3, 4], [5]]
 * {{ [1, 2, 3, 4, 5, 6] | chunk:3 }}  // [[1, 2, 3], [4, 5, 6]]
 */
@Pipe({
  name: 'chunk',
  standalone: true
})
export class ChunkPipe implements PipeTransform {

  transform(value: unknown[], size = 1): unknown[][] {
    if (!Array.isArray(value) || value.length === 0) {
      return [];
    }

    if (size <= 0) {
      return [];
    }

    const result: unknown[][] = [];
    for (let i = 0; i < value.length; i += size) {
      result.push(value.slice(i, i + size));
    }
    return result;
  }

}
