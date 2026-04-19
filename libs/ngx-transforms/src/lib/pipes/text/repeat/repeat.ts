import { Pipe, PipeTransform } from '@angular/core';

/**
 * RepeatPipe: Repeats a string a given number of times.
 *
 * Wraps `String.prototype.repeat`. Optional separator is inserted between repetitions.
 *
 * @param {string} value - The string to repeat.
 * @param {number} count - Number of times to repeat (must be >= 0).
 * @param {string} [separator=''] - Optional separator placed between repetitions.
 *
 * @returns {string} - The repeated string, or an empty string if input is invalid.
 *
 * @example
 * {{ '-' | repeat:10 }}                                      // '----------'
 * {{ 'ha' | repeat:3 }}                                      // 'hahaha'
 * {{ 'item' | repeat:3:', ' }}                               // 'item, item, item'
 */
@Pipe({
  name: 'repeat',
  standalone: true,
})
export class RepeatPipe implements PipeTransform {

  transform(value: string, count: number, separator = ''): string {
    if (typeof value !== 'string') return '';

    if (typeof count !== 'number' || isNaN(count) || count < 0 || !isFinite(count)) {
      return '';
    }

    const repetitions = Math.floor(count);
    if (repetitions === 0) return '';

    if (!separator) return value.repeat(repetitions);

    return Array(repetitions).fill(value).join(separator);
  }

}