import { Pipe, PipeTransform } from '@angular/core';

/**
 * ShufflePipe: Randomly reorders elements in an array using the Fisher-Yates
 algorithm.
 *
 * Uses the Fisher-Yates (Knuth) shuffle for unbiased randomization,
 * guaranteeing every permutation has equal probability.
 *
 * @param {unknown[]} value - The array to shuffle.
 *
 * @returns {unknown[]} - A new array with elements in random order.
 *
 * @example
 * {{ [1, 2, 3, 4, 5] | shuffle }}         // [3, 1, 5, 2, 4]
 * {{ ['a', 'b', 'c'] | shuffle }}          // ['c', 'a', 'b']
 *
 * @note Impure pipe — runs on every change detection cycle.
 * Avoid using in performance-critical templates or bind the result
 * to a signal/variable to control when it re-shuffles.
 */
@Pipe({
  name: 'shuffle',
  pure: false,
  standalone: true
})
export class ShufflePipe implements PipeTransform {

  transform(value: unknown[]): unknown[] {
    if (!Array.isArray(value)) {
      return [];
    }

    const arr = [...value];
    for (let i = arr.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

}
