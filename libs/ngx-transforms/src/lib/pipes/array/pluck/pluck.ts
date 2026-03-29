import { Pipe, PipeTransform } from '@angular/core';

/**
 * PluckPipe: Extracts a property value from every object in an array.
 *
 * @param {unknown[]} value - The array of objects.
 * @param {string} key - Property path to extract (supports dot notation).
 *
 * @returns {unknown[]} - An array of the extracted values.
 *
 * @example
 * {{ users | pluck:'name' }}                // ['Alice', 'Bob', 'Carol']
 * {{ orders | pluck:'customer.email' }}     // ['a@test.com', 'b@test.com']
 */
@Pipe({
  name: 'pluck',
  standalone: true,
})
export class PluckPipe implements PipeTransform {

  transform(value: unknown[], key: string): unknown[] {
    if (!Array.isArray(value) || !key) {
      return [];
    }

    return value.map(item => this.getNestedValue(item, key));
  }

  private getNestedValue(obj: unknown, path: string): unknown {
    return path.split('.').reduce(
      (current, segment) => (current as Record<string, unknown>)?.[segment],
      obj
    );
  }

}
