import { Pipe, PipeTransform } from '@angular/core';

/**
 * OmitPipe: Returns a new object with the specified keys removed.
 *
 * Keys that don't exist on the source are ignored. Returns an empty object
 * for null, undefined, or primitive inputs. Does not mutate the input.
 *
 * @param {unknown} value - The source object.
 * @param {string[] | string} keys - Key (or array of keys) to remove.
 *
 * @returns {Record<string, unknown>} - A new object without the omitted keys.
 *
 * @example
 * {{ user | omit:['password'] }}                             // user without password
 * {{ obj | omit:['internal', '_id'] }}                       // public-safe view
 */
@Pipe({
  name: 'omit',
  standalone: true,
})
export class OmitPipe implements PipeTransform {

  transform(value: unknown, keys: string[] | string): Record<string, unknown> {
    if (value === null || value === undefined) return {};
    if (typeof value !== 'object') return {};

    const list = Array.isArray(keys) ? keys : (typeof keys === 'string' ? [keys] : []);
    const exclude = new Set(list.filter((k): k is string => typeof k === 'string'));

    const source = value as Record<string, unknown>;
    const result: Record<string, unknown> = {};

    for (const key of Object.keys(source)) {
      if (!exclude.has(key)) {
        result[key] = source[key];
      }
    }

    return result;
  }

}
