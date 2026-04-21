import { Pipe, PipeTransform } from '@angular/core';

/**
 * TestPipe: Returns true when a string matches a regex pattern.
 *
 * Wraps `RegExp.prototype.test`. Returns false for invalid input or regex.
 *
 * @param {string} value - The string to test.
 * @param {string | RegExp} pattern - Pattern string (or RegExp) to test against.
 * @param {string} [flags=''] - Regex flags used when `pattern` is a string.
 *
 * @returns {boolean} - `true` if the pattern matches anywhere in the string.
 *
 * @example
 * {{ 'abc@x.com' | test:'@' }}                               // true
 * {{ 'ABC' | test:'[a-z]':'i' }}                             // true
 * {{ '123' | test:'^[0-9]+$' }}                              // true
 */
@Pipe({
  name: 'test',
  standalone: true,
})
export class TestPipe implements PipeTransform {

  transform(value: string, pattern: string | RegExp, flags = ''): boolean {
    if (typeof value !== 'string' || !pattern) return false;

    try {
      const regex = typeof pattern === 'string'
        ? new RegExp(pattern, flags)
        : pattern;

      return regex.test(value);
    } catch {
      return false;
    }
  }

}
