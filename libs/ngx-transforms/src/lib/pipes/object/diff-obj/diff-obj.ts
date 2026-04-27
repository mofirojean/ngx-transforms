import { Pipe, PipeTransform } from '@angular/core';

/**
 * DiffObjPipe: Returns the slice of `value` whose properties differ from `compareTo`.
 *
 * For each key in `value`, the entry is included in the result when:
 * - The key is missing from `compareTo`, or
 * - `value[key]` is not strictly equal (`!==`) to `compareTo[key]`.
 *
 * Comparison is shallow — nested objects/arrays are compared by reference.
 *
 * @param {unknown} value - The source object.
 * @param {unknown} compareTo - The object to compare against.
 *
 * @returns {Record<string, unknown>} - A new object containing the differing entries.
 *
 * @example
 * {{ { a: 1, b: 2 } | diffObj:{ a: 1, b: 99 } }}              // { b: 2 }
 * {{ { a: 1, b: 2, c: 3 } | diffObj:{ a: 1 } }}               // { b: 2, c: 3 }
 * {{ { a: 1 } | diffObj:{ a: 1 } }}                           // {} (no differences)
 */
@Pipe({
  name: 'diffObj',
  standalone: true,
})
export class DiffObjPipe implements PipeTransform {

  transform(value: unknown, compareTo: unknown): Record<string, unknown> {
    if (value === null || value === undefined) return {};
    if (typeof value !== 'object') return {};

    const source = value as Record<string, unknown>;

    if (compareTo === null || compareTo === undefined || typeof compareTo !== 'object') {
      return { ...source };
    }

    const target = compareTo as Record<string, unknown>;
    const result: Record<string, unknown> = {};

    for (const key of Object.keys(source)) {
      if (!Object.prototype.hasOwnProperty.call(target, key) || source[key] !== target[key]) {
        result[key] = source[key];
      }
    }

    return result;
  }

}