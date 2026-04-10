import { Pipe, PipeTransform } from '@angular/core';

/**
 * SumPipe: Returns the sum of all numeric values in an array.
 *
 * Supports primitive number arrays and object arrays by property key with dot notation.
 *
 * @param {unknown[]} value - The array to evaluate.
 * @param {string} [key] - Optional property path for object summation (supports dot notation).
 *
 * @returns {number | undefined} - The total, or undefined if the array is empty/invalid.
 *
 * @example
 * {{ [10, 20, 30] | sum }}                                  // 60
 * {{ items | sum:'price' }}                                  // total price
 * {{ orders | sum:'meta.total' }}                            // grand total
 */
@Pipe({
  name: 'sum',
  standalone: true,
})
export class SumPipe implements PipeTransform {

  transform(value: unknown[], key?: string): number | undefined {
    if (!Array.isArray(value) || value.length === 0) {
      return undefined;
    }

    if (!key) {
      const numbers = value.filter((item): item is number => typeof item === 'number' && !isNaN(item));
      return numbers.length === 0 ? undefined : numbers.reduce((acc, n) => acc + n, 0);
    }

    const numbers = value
      .map(item => this.getNestedValue(item, key))
      .filter((val): val is number => typeof val === 'number' && !isNaN(val));

    return numbers.length === 0 ? undefined : numbers.reduce((acc, n) => acc + n, 0);
  }

  private getNestedValue(obj: unknown, path: string): unknown {
    return path.split('.').reduce(
      (current, segment) => (current as Record<string, unknown>)?.[segment],
      obj
    );
  }

}
