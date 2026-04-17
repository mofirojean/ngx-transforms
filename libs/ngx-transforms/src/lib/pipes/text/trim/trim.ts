import { Pipe, PipeTransform } from '@angular/core';

/**
 * TrimPipe: Removes whitespace (or specified characters) from both ends of a string.
 *
 * By default, trims whitespace. Pass a string of characters to trim those instead.
 *
 * @param {string} value - The string to trim.
 * @param {string} [chars] - Optional set of characters to trim from both ends.
 *
 * @returns {string} - The trimmed string, or an empty string if input is invalid.
 *
 * @example
 * {{ '  hello  ' | trim }}                                   // 'hello'
 * {{ '--hello--' | trim:'-' }}                               // 'hello'
 * {{ '***title***' | trim:'*' }}                             // 'title'
 */
@Pipe({
  name: 'trim',
  standalone: true,
})
export class TrimPipe implements PipeTransform {

  transform(value: string, chars?: string): string {
    if (typeof value !== 'string') return '';

    if (!chars) return value.trim();

    const escaped = chars
      .split('')
      .map(c => c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      .join('');
    const regex = new RegExp(`^[${escaped}]+|[${escaped}]+$`, 'g');
    return value.replace(regex, '');
  }

}