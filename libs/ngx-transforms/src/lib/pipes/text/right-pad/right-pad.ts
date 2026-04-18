import { Pipe, PipeTransform } from '@angular/core';

/**
 * RightPadPipe: Pads a string on the right until it reaches the target length.
 *
 * Wraps JavaScript's native `padEnd`. If the input is already at or above
 * the target length, returns it unchanged. Defaults to padding with spaces.
 *
 * @param {string | number} value - The string or number to pad.
 * @param {number} length - The target length of the resulting string.
 * @param {string} [char=' '] - The character (or string) to pad with.
 *
 * @returns {string} - The padded string, or empty string if input is invalid.
 *
 * @example
 * {{ 'hi' | rightPad:5:'.' }}                                // 'hi...'
 * {{ 'name' | rightPad:10 }}                                 // 'name      '
 * {{ 42 | rightPad:5:'0' }}                                  // '42000'
 */
@Pipe({
  name: 'rightPad',
  standalone: true,
})
export class RightPadPipe implements PipeTransform {

  transform(value: string | number, length: number, char = ' '): string {
    if (value === null || value === undefined) return '';

    const str = typeof value === 'number' ? String(value) : value;
    if (typeof str !== 'string') return '';

    if (typeof length !== 'number' || isNaN(length) || length < 0) return str;

    const padChar = char === '' ? ' ' : char;
    return str.padEnd(length, padChar);
  }

}