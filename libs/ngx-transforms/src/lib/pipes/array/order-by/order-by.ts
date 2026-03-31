import { Pipe, PipeTransform } from '@angular/core';

/**
 * OrderByPipe: Sorts an array by a property value.
 *
 * @param {unknown[]} value - The array to sort.
 * @param {string} key - Property path to sort by (supports dot notation).
 * @param {string} [direction='asc'] - Sort direction: 'asc' or 'desc'.
 *
 * @returns {unknown[]} - A new sorted array.
 *
 * @example
 * {{ users | orderBy:'name' }}            // sorted A-Z
 * {{ users | orderBy:'name':'desc' }}     // sorted Z-A
 * {{ users | orderBy:'age':'asc' }}       // sorted by age
 */
@Pipe({
  name: 'orderBy',
  standalone: true,
})
export class OrderByPipe implements PipeTransform {

  transform(value: unknown[], key: string, direction: 'asc' | 'desc' = 'asc'): unknown[] {
    if (!Array.isArray(value) || value.length <= 1 || !key) {
      return Array.isArray(value) ? [...value] : [];
    }

    const dir = direction === 'desc' ? -1 : 1;

    return [...value].sort((a, b) => {
      const valA = this.getNestedValue(a, key);
      const valB = this.getNestedValue(b, key);

      if (valA === valB) return 0;
      if (valA === null || valA === undefined) return 1;
      if (valB === null || valB === undefined) return -1;

      if (typeof valA === 'string' && typeof valB === 'string') {
        return valA.localeCompare(valB) * dir;
      }

      if (typeof valA === 'number' && typeof valB === 'number') {
        return (valA - valB) * dir;
      }

      return String(valA).localeCompare(String(valB)) * dir;
    });
  }

  private getNestedValue(obj: unknown, path: string): unknown {
    return path.split('.').reduce(
      (current, segment) => (current as Record<string, unknown>)?.[segment],
      obj
    );
  }

}
