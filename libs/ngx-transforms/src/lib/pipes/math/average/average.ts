import { Pipe, PipeTransform } from '@angular/core';

/**
 * AveragePipe: Returns the arithmetic mean of all numeric values in an array.
 *
 * Supports primitive number arrays and object arrays by property key with dot notation.
 *
 * @param {unknown[]} value - The array to evaluate.
 * @param {string} [key] - Optional property path for object averaging (supports dot notation).
 *
 * @returns {number | undefined} - The average, or undefined if the array is empty/invalid.
 *
 * @example
 * {{ [10, 20, 30] | average }}                              // 20
 * {{ students | average:'grade' }}                           // average grade
 * {{ reviews | average:'meta.rating' }}                      // average rating
 */
@Pipe({
  name: 'average',
  standalone: true,
})
export class AveragePipe implements PipeTransform {

  transform(value: unknown[], key?: string): number | undefined {
    if (!Array.isArray(value) || value.length === 0) {
      return undefined;
    }

    if (!key) {
      const numbers = value.filter((item): item is number => typeof item === 'number' && !isNaN(item));
      return numbers.length === 0 ? undefined : numbers.reduce((acc, n) => acc + n, 0) / numbers.length;
    }

    const numbers = value
      .map(item => this.getNestedValue(item, key))
      .filter((val): val is number => typeof val === 'number' && !isNaN(val));

    return numbers.length === 0 ? undefined : numbers.reduce((acc, n) => acc + n, 0) / numbers.length;
  }

  private getNestedValue(obj: unknown, path: string): unknown {
    return path.split('.').reduce(
      (current, segment) => (current as Record<string, unknown>)?.[segment],
      obj
    );
  }

}
