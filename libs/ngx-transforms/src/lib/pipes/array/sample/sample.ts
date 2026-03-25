import { Pipe, PipeTransform } from '@angular/core';

/**
 * SamplePipe: Randomly selects n items from an array.
 *
 * Uses Fisher-Yates partial shuffle for unbiased selection.
 * Returns a single item when n=1 (default), or an array when n>1.
 *
 * @param {unknown[]} value - The array to sample from.
 * @param {number} [n=1] - Number of items to select.
 *
 * @returns {unknown | unknown[]} - A single random item (n=1) or array of random items (n>1).
 *
 * @example
 * {{ [1, 2, 3, 4, 5] | sample }}       // 3 (random single)
 * {{ [1, 2, 3, 4, 5] | sample:3 }}     // [5, 1, 3] (random 3)
 * {{ users | sample:5 }}               // 5 random users
 *
 * @note Impure pipe — returns different results on each change detection cycle.
 * Bind the result to a signal to control when it re-samples.
 */
@Pipe({
  name: 'sample',
  standalone: true,
  pure: false,
})
export class SamplePipe implements PipeTransform {

  transform(value: unknown[], n = 1): unknown | unknown[] {
    if (!Array.isArray(value) || value.length === 0) {
      return n === 1 ? undefined : [];
    }

    if (n <= 0) {
      return [];
    }

    // Clamp n to array length
    const count = Math.min(n, value.length);

    // Fisher-Yates partial shuffle — only shuffle `count` positions
    const arr = [...value];
    for (let i = arr.length - 1; i > arr.length - 1 - count; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    const result = arr.slice(arr.length - count);

    // Return single item for n=1, array otherwise
    return n === 1 ? result[0] : result;
  }

}