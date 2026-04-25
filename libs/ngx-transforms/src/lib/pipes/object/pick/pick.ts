import { Pipe, PipeTransform } from '@angular/core';

/**
 * PickPipe: Returns a new object containing only the specified keys.
 *
 * Non-existent keys are skipped silently. Returns an empty object for null,
 * undefined, or primitive inputs. Does not mutate the input.
 *
 * @param {unknown} value - The source object.
 * @param {string[] | string} keys - Key (or array of keys) to keep.
 *
 * @returns {Record<string, unknown>} - A new object with only the picked keys.
 *
 * @example
 * {{ user | pick:['name', 'email'] }}                        // { name: 'Alice', email: 'a@b.com' }
 * {{ obj | pick:'id' }}                                      // { id: 42 }
 */
@Pipe({
  name: 'pick',
  standalone: true,
})
export class PickPipe implements PipeTransform {

  transform(value: unknown, keys: string[] | string): Record<string, unknown> {
    if (value === null || value === undefined) return {};
    if (typeof value !== 'object') return {};

    const list = Array.isArray(keys) ? keys : (typeof keys === 'string' ? [keys] : []);
    if (list.length === 0) return {};

    const source = value as Record<string, unknown>;
    const result: Record<string, unknown> = {};

    for (const key of list) {
      if (typeof key !== 'string') continue;
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        result[key] = source[key];
      }
    }

    return result;
  }

}
