import { Pipe, PipeTransform } from '@angular/core';

/**
 * UnionPipe: Combines two arrays, keeping only unique elements.
 *
 * Supports primitives and objects by property key with dot notation.
 *
 * @param {unknown[]} value - The first array.
 * @param {unknown[]} other - The second array.
 * @param {string} [key] - Optional property path for uniqueness check (supports dot notation).
 *
 * @returns {unknown[]} - A merged array with duplicates removed.
 *
 * @example
 * {{ [1, 2, 3] | union:[3, 4, 5] }}                        // [1, 2, 3, 4, 5]
 * {{ admins | union:editors:'id' }}                          // all unique users
 * {{ local | union:remote:'meta.uuid' }}                     // merged records
 */
@Pipe({
  name: 'union',
  standalone: true,
})
export class UnionPipe implements PipeTransform {

  transform(value: unknown[], other: unknown[], key?: string): unknown[] {
    if (!Array.isArray(value) && !Array.isArray(other)) {
      return [];
    }

    const first = Array.isArray(value) ? value : [];
    const second = Array.isArray(other) ? other : [];

    if (!key) {
      const seen = new Set();
      const result: unknown[] = [];
      for (const item of [...first, ...second]) {
        if (!seen.has(item)) {
          seen.add(item);
          result.push(item);
        }
      }
      return result;
    }

    const seen = new Set();
    const result: unknown[] = [];
    for (const item of [...first, ...second]) {
      const val = this.getNestedValue(item, key);
      if (!seen.has(val)) {
        seen.add(val);
        result.push(item);
      }
    }
    return result;
  }

  private getNestedValue(obj: unknown, path: string): unknown {
    return path.split('.').reduce(
      (current, segment) => (current as Record<string, unknown>)?.[segment],
      obj
    );
  }

}
