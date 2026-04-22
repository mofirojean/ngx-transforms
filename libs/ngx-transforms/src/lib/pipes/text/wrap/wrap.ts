import { Pipe, PipeTransform } from '@angular/core';

/**
 * WrapPipe: Surrounds a string with a prefix and optional suffix.
 *
 * When no suffix is provided, the prefix is used on both sides.
 *
 * @param {string} value - The string to wrap.
 * @param {string} [prefix=''] - Text to place before the value.
 * @param {string} [suffix] - Text to place after the value (defaults to prefix).
 *
 * @returns {string} - The wrapped string, or empty string if input is invalid.
 *
 * @example
 * {{ 'value' | wrap:'[':']' }}                               // '[value]'
 * {{ 'bold' | wrap:'**' }}                                   // '**bold**'
 * {{ 'tag' | wrap:'<':'>' }}                                 // '<tag>'
 */
@Pipe({
  name: 'wrap',
  standalone: true,
})
export class WrapPipe implements PipeTransform {

  transform(value: string, prefix = '', suffix?: string): string {
    if (typeof value !== 'string') return '';

    const pfx = typeof prefix === 'string' ? prefix : '';
    const sfx = suffix === undefined
      ? pfx
      : (typeof suffix === 'string' ? suffix : '');

    return `${pfx}${value}${sfx}`;
  }

}