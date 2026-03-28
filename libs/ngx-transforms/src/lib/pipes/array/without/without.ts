import { Pipe, PipeTransform } from '@angular/core';

/**
 * WithoutPipe: Excludes specified elements from an array.
 *
 * Supports primitives and objects by property key with dot notation.
 *
 * @param {unknown[]} value - The array to filter.
 * @param {unknown[]} excludes - Values to exclude.
 * @param {string} [key] - Optional property path for object comparison (supports dot notation).
 *
 * @returns {unknown[]} - A new array without the excluded elements.
 *
 * @example
 * {{ [1, 2, 3, 4, 5] | without:[2, 4] }}                   // [1, 3, 5]
 * {{ users | without:['banned']:'status' }}                  // active users
 * {{ orders | without:['cancelled']:'meta.status' }}         // non-cancelled orders
 */
@Pipe({
  name: 'without',
  standalone: true,
})
export class WithoutPipe implements PipeTransform {

  transform(value: unknown[], excludes: unknown[], key?: string): unknown[] {
    if (!Array.isArray(value)) {
      return [];
    }

    if (!Array.isArray(excludes) || excludes.length === 0) {
      return [...value];
    }

    const excludeSet = new Set(excludes);

    if (!key) {
      return value.filter(item => !excludeSet.has(item));
    }

    return value.filter(item => {
      const val = this.getNestedValue(item, key);
      return !excludeSet.has(val);
    });
  }

  private getNestedValue(obj: unknown, path: string): unknown {
    return path.split('.').reduce(
      (current, segment) => (current as Record<string, unknown>)?.[segment],
      obj
    );
  }

}
