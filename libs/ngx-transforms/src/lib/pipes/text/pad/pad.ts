import { Pipe, PipeTransform } from '@angular/core';

/**
 * PadPipe: Pads a string on both sides to reach the target length (centers it).
 *
 * When the padding is uneven, the extra character goes to the right.
 * Defaults to padding with spaces.
 *
 * @param {string | number} value - The string or number to pad.
 * @param {number} length - The target length of the resulting string.
 * @param {string} [char=' '] - The character (or string) to pad with.
 *
 * @returns {string} - The padded string, or empty string if input is invalid.
 *
 * @example
 * {{ 'x' | pad:5:'-' }}                                      // '--x--'
 * {{ 'hi' | pad:6:'*' }}                                     // '**hi**'
 * {{ 'hi' | pad:7:'*' }}                                     // '**hi***' (extra right)
 */
@Pipe({
  name: 'pad',
  standalone: true,
})
export class PadPipe implements PipeTransform {

  transform(value: string | number, length: number, char = ' '): string {
    if (value === null || value === undefined) return '';

    const str = typeof value === 'number' ? String(value) : value;
    if (typeof str !== 'string') return '';

    if (typeof length !== 'number' || isNaN(length) || length < 0) return str;

    if (str.length >= length) return str;

    const padChar = char === '' ? ' ' : char;
    const diff = length - str.length;
    const leftCount = Math.floor(diff / 2);
    const leftTarget = str.length + leftCount;

    return str.padStart(leftTarget, padChar).padEnd(length, padChar);
  }

}
