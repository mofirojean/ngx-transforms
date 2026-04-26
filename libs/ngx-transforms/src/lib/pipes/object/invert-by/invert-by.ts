import { Pipe, PipeTransform } from '@angular/core';

/**
 * InvertByPipe: Returns a new object with values as keys, grouping the original
 * keys for each value into an array.
 *
 * Unlike `invert`, no data is lost when multiple source keys share a value —
 * they're collected into an array under the shared key.
 *
 * @param {unknown} value - The source object.
 *
 * @returns {Record<string, string[]>} - A new object with values-as-keys
 *   pointing at arrays of the original keys.
 *
 * @example
 * {{ { a: 1, b: 2, c: 1 } | invertBy }}                      // { '1': ['a', 'c'], '2': ['b'] }
 * {{ { alice: 'admin', bob: 'user', carol: 'admin' } | invertBy }}
 *   // { admin: ['alice', 'carol'], user: ['bob'] }
 */
@Pipe({
  name: 'invertBy',
  standalone: true,
})
export class InvertByPipe implements PipeTransform {

  transform(value: unknown): Record<string, string[]> {
    if (value === null || value === undefined) return {};
    if (typeof value !== 'object') return {};

    const source = value as Record<string, unknown>;
    const result: Record<string, string[]> = {};

    for (const key of Object.keys(source)) {
      const v = source[key];
      if (v === undefined) continue;
      const stringKey = String(v);
      if (!result[stringKey]) result[stringKey] = [];
      result[stringKey].push(key);
    }

    return result;
  }

}
