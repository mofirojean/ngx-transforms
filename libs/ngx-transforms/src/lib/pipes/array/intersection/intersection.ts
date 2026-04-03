import { Pipe, PipeTransform } from '@angular/core';

/**
 * IntersectionPipe: Returns elements common to both arrays.
 *
 * Supports primitives and objects by property key with dot notation.
 *
 * @param {unknown[]} value - The first array.
 * @param {unknown[]} compared - The second array.
 * @param {string} [key] - Optional property path for object comparison (supports dot notation).
 *
 * @returns {unknown[]} - Elements present in both arrays.
 *
 * @example
 * {{ [1, 2, 3, 4] | intersection:[3, 4, 5, 6] }}              // [3, 4]
 * {{ teamA | intersection:teamB:'id' }}                         // shared members
 * {{ required | intersection:granted:'meta.scope' }}            // matched permissions
 */
@Pipe({
  name: 'intersection',
  standalone: true,
})
export class IntersectionPipe implements PipeTransform {

  transform(value: unknown[], compared: unknown[], key?: string): unknown[] {
    if (!Array.isArray(value)) {
      return [];
    }

    if (!Array.isArray(compared) || compared.length === 0) {
      return [];
    }

    if (!key) {
      const comparedSet = new Set(compared);
      return value.filter(item => comparedSet.has(item));
    }

    const comparedSet = new Set(compared.map(item => this.getNestedValue(item, key)));
    return value.filter(item => {
      const val = this.getNestedValue(item, key);
      return comparedSet.has(val);
    });
  }

  private getNestedValue(obj: unknown, path: string): unknown {
    return path.split('.').reduce(
      (current, segment) => (current as Record<string, unknown>)?.[segment],
      obj
    );
  }

}
