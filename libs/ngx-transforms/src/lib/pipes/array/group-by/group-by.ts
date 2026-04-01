import { Pipe, PipeTransform } from '@angular/core';

/**
 * GroupByPipe: Groups array elements by a property value.
 *
 * @param {unknown[]} value - The array to group.
 * @param {string} key - Property path to group by (supports dot notation).
 *
 * @returns {Record<string, unknown[]>} - An object where keys are group names and values are arrays.
 *
 * @example
 * {{ users | groupBy:'role' }}              // { admin: [...], editor: [...] }
 * {{ orders | groupBy:'customer.city' }}    // { 'New York': [...], 'London': [...] }
 */
@Pipe({
  name: 'groupBy',
  standalone: true,
})
export class GroupByPipe implements PipeTransform {

  transform(value: unknown[], key: string): Record<string, unknown[]> {
    if (!Array.isArray(value) || !key) {
      return {};
    }

    return value.reduce((groups: Record<string, unknown[]>, item) => {
      const groupKey = String(this.getNestedValue(item, key) ?? 'undefined');
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(item);
      return groups;
    }, {});
  }

  private getNestedValue(obj: unknown, path: string): unknown {
    return path.split('.').reduce(
      (current, segment) => (current as Record<string, unknown>)?.[segment],
      obj
    );
  }

}
