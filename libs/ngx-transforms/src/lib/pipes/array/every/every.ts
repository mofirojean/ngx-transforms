import { Pipe, PipeTransform } from '@angular/core';

/**
 * EveryPipe: Checks if all elements in an array satisfy a condition.
 *
 * Supports primitives (equality check) and objects by property key with dot notation.
 *
 * @param {unknown[]} value - The array to check.
 * @param {unknown} match - The value to match against.
 * @param {string} [key] - Optional property path to check (supports dot notation).
 *
 * @returns {boolean} - True if all elements match, false otherwise.
 *
 * @example
 * {{ [true, true, true] | every:true }}                     // true
 * {{ users | every:'active':'status' }}                     // are all users active?
 * {{ orders | every:'shipped':'meta.state' }}               // are all orders shipped?
 */
@Pipe({
  name: 'every',
  standalone: true,
})
export class EveryPipe implements PipeTransform {

  transform(value: unknown[], match: unknown, key?: string): boolean {
    if (!Array.isArray(value) || value.length === 0) {
      return false;
    }

    if (!key) {
      return value.every(item => item === match);
    }

    return value.every(item => this.getNestedValue(item, key) === match);
  }

  private getNestedValue(obj: unknown, path: string): unknown {
    return path.split('.').reduce(
      (current, segment) => (current as Record<string, unknown>)?.[segment],
      obj
    );
  }

}
