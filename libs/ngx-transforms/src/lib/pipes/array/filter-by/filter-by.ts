import { Pipe, PipeTransform } from '@angular/core';

/**
 * FilterByPipe: Filters an array by matching a search term against object
 properties.
 *
 * @param {unknown[]} value - The array to filter.
 * @param {string} search - The search term.
 * @param {string} [key] - Property to search in. If omitted, searches all string
 properties.
 *
 * @returns {unknown[]} - Filtered array with matching items.
 *
 * @example
 * {{ users | filterBy:'alice':'name' }}     // users with 'alice' in name
 * {{ users | filterBy:'admin':'role' }}     // users with role 'admin'
 * {{ users | filterBy:'bob' }}              // search all properties for 'bob'
 */
@Pipe({
  name: 'filterBy',
  standalone: true,
})
export class FilterByPipe implements PipeTransform {

  transform(value: unknown[], search: string, key?: string): unknown[] {
    if (!Array.isArray(value) || !search) {
      return Array.isArray(value) ? [...value] : [];
    }

    const term = String(search).toLowerCase();

    if (key) {
      return value.filter(item => {
        const val = this.getNestedValue(item, key);
        return val !== undefined && val !== null
          && String(val).toLowerCase().includes(term);
      });
    }

    return value.filter(item => {
      if (typeof item === 'object' && item !== null) {
        return this.searchObject(item as Record<string, unknown>, term);
      }
      return String(item).toLowerCase().includes(term);
    });
  }

  private searchObject(obj: Record<string, unknown>, term: string): boolean {
    return Object.values(obj).some(val => {
      if (typeof val === 'string') {
        return val.toLowerCase().includes(term);
      }
      if (typeof val === 'number' || typeof val === 'boolean') {
        return String(val).toLowerCase().includes(term);
      }
      if (typeof val === 'object' && val !== null) {
        return this.searchObject(val as Record<string, unknown>, term);
      }
      return false;
    });
  }

  private getNestedValue(obj: unknown, path: string): unknown {
    return path.split('.').reduce(
      (current, segment) => (current as Record<string, unknown>)?.[segment],
      obj
    )
  }

}
