import { Pipe, PipeTransform } from '@angular/core';

/**
 * UniquePipe: Removes duplicate values from an array.
 *
 * Supports primitives, objects by property key, and deep nested keys via dot notation.
 *
 * @param {unknown[]} value - The array to deduplicate.
 * @param {string} [key] - Optional property path to compare objects by (e.g., 'id', 'user.email').
 *
 * @returns {unknown[]} - A new array with duplicates removed, preserving first occurrence.
 *
 * @example
 * {{ [1, 2, 2, 3] | unique }}                  // [1, 2, 3]
 * {{ users | unique:'email' }}                  // unique by email
 * {{ orders | unique:'customer.email' }}        // unique by nested property
 */
@Pipe({
  name: 'unique',
  standalone: true
})
export class UniquePipe implements PipeTransform {

  transform(value: unknown[], key?: string): unknown[] {
    if (!Array.isArray(value)) {
      return [];
    }

    if (!key) {
      return [...new Set(value)];
    }

    const seen = new Set();
    return value.filter(item => {
      const val = this.getNestedValue(item, key);
      if (seen.has(val)) return false;
      seen.add(val);
      return true;
    });
  }

  private getNestedValue(obj: unknown, path: string): unknown {
    return path.split('.').reduce(
      (current, segment) => (current as Record<string, unknown>)?.[segment],
      obj
    );
  }

}
