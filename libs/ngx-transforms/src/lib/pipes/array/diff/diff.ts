import { Pipe, PipeTransform } from '@angular/core';

/**
 * DiffPipe: Returns elements present in the first array but not in the second.
 *
 * Supports primitives and objects by property key with dot notation.
 *
 * @param {unknown[]} value - The source array.
 * @param {unknown[]} compared - The array to compare against.
 * @param {string} [key] - Optional property path for object comparison (supports dot notation).
 *
 * @returns {unknown[]} - Elements in value that are not in compared.
 *
 * @example
 * {{ [1, 2, 3, 4, 5] | diff:[3, 4, 5, 6] }}              // [1, 2]
 * {{ allUsers | diff:activeUsers:'id' }}                    // inactive users
 * {{ orders | diff:shipped:'meta.trackingId' }}             // unshipped orders
 */
@Pipe({
  name: 'diff',
  standalone: true,
})
export class DiffPipe implements PipeTransform {

  transform(value: unknown[], compared: unknown[], key?: string): unknown[] {
    if (!Array.isArray(value)) {
      return [];
    }

    if (!Array.isArray(compared) || compared.length === 0) {
      return [...value];
    }

    if (!key) {
      const comparedSet = new Set(compared);
      return value.filter(item => !comparedSet.has(item));
    }

    const comparedSet = new Set(compared.map(item => this.getNestedValue(item, key)));
    return value.filter(item => {
      const val = this.getNestedValue(item, key);
      return !comparedSet.has(val);
    });
  }

  private getNestedValue(obj: unknown, path: string): unknown {
    return path.split('.').reduce(
      (current, segment) => (current as Record<string, unknown>)?.[segment],
      obj
    );
  }

}
