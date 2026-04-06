import { Pipe, PipeTransform } from '@angular/core';

/**
 * SomePipe: Checks if at least one element in an array satisfies a condition.
 *
 * Supports primitives (equality check) and objects by property key with dot notation.
 *
 * @param {unknown[]} value - The array to check.
 * @param {unknown} match - The value to match against.
 * @param {string} [key] - Optional property path to check (supports dot notation).
 *
 * @returns {boolean} - True if at least one element matches, false otherwise.
 *
 * @example
 * {{ [false, false, true] | some:true }}                    // true
 * {{ users | some:'admin':'role' }}                          // any admins?
 * {{ orders | some:'failed':'meta.status' }}                 // any failures?
 */
@Pipe({
  name: 'some',
  standalone: true,
})
export class SomePipe implements PipeTransform {

  transform(value: unknown[], match: unknown, key?: string): boolean {
    if (!Array.isArray(value) || value.length === 0) {
      return false;
    }

    if (!key) {
      return value.some(item => item === match);
    }

    return value.some(item => this.getNestedValue(item, key) === match);
  }

  private getNestedValue(obj: unknown, path: string): unknown {
    return path.split('.').reduce(
      (current, segment) => (current as Record<string, unknown>)?.[segment],
      obj
    );
  }

}
