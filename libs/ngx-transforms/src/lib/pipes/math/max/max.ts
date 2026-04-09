import { Pipe, PipeTransform } from '@angular/core';

/**
 * MaxPipe: Returns the maximum value from an array of numbers or objects.
 *
 * Supports primitive number arrays and object arrays by property key with dot notation.
 *
 * @param {unknown[]} value - The array to evaluate.
 * @param {string} [key] - Optional property path for object comparison (supports dot notation).
 *
 * @returns {number | undefined} - The maximum value, or undefined if the array is empty/invalid.
 *
 * @example
 * {{ [5, 3, 8, 1, 9] | max }}                              // 9
 * {{ products | max:'price' }}                               // highest price
 * {{ orders | max:'meta.total' }}                            // largest order total
 */
@Pipe({
  name: 'max',
  standalone: true,
})
export class MaxPipe implements PipeTransform {

  transform(value: unknown[], key?: string): number | undefined {
    if (!Array.isArray(value) || value.length === 0) {
      return undefined;
    }

    if (!key) {
      const numbers = value.filter((item): item is number => typeof item === 'number' && !isNaN(item));
      return numbers.length === 0 ? undefined : Math.max(...numbers);
    }

    const numbers = value
      .map(item => this.getNestedValue(item, key))
      .filter((val): val is number => typeof val === 'number' && !isNaN(val));

    return numbers.length === 0 ? undefined : Math.max(...numbers);
  }

  private getNestedValue(obj: unknown, path: string): unknown {
    return path.split('.').reduce(
      (current, segment) => (current as Record<string, unknown>)?.[segment],
      obj
    );
  }

}
