import { Pipe, PipeTransform } from '@angular/core';

/**
 * InvertPipe: Returns a new object with keys and values swapped.
 *
 * Values are coerced to strings to become valid keys. When two source keys
 * share a value, the **last one wins** (use `invertBy` if you need to keep
 * every collision as an array). Returns an empty object for null, undefined,
 * or primitive inputs. Does not mutate the input.
 *
 * @param {unknown} value - The source object.
 *
 * @returns {Record<string, string>} - A new object with keys/values swapped.
 *
 * @example
 * {{ { a: 1, b: 2 } | invert }}                              // { '1': 'a', '2': 'b' }
 * {{ { en: 'hello', fr: 'bonjour' } | invert }}              // { hello: 'en', bonjour: 'fr' }
 * {{ { a: 1, b: 1 } | invert }}                              // { '1': 'b' } (last wins)
 */
@Pipe({
  name: 'invert',
  standalone: true,
})
export class InvertPipe implements PipeTransform {

  transform(value: unknown): Record<string, string> {
    if (value === null || value === undefined) return {};
    if (typeof value !== 'object') return {};

    const source = value as Record<string, unknown>;
    const result: Record<string, string> = {};

    for (const key of Object.keys(source)) {
      const v = source[key];
      if (v === undefined) continue;
      result[String(v)] = key;
    }

    return result;
  }

}
