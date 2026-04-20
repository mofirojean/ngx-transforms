import { Pipe, PipeTransform } from '@angular/core';

/**
 * DecodeUriComponentPipe: Decodes a URI component encoded with `encodeURIComponent`.
 *
 * Wraps the native `decodeURIComponent`. Returns the input unchanged if the
 * string contains a malformed escape sequence.
 *
 * @param {string} value - The encoded URI component to decode.
 *
 * @returns {string} - The decoded component, or empty string if input is invalid.
 *
 * @example
 * {{ 'hi%20world%26you' | decodeURIComponent }}              // 'hi world&you'
 * {{ 'foo%2Fbar%3Fbaz%3D1' | decodeURIComponent }}           // 'foo/bar?baz=1'
 */
@Pipe({
  name: 'decodeURIComponent',
  standalone: true,
})
export class DecodeUriComponentPipe implements PipeTransform {

  transform(value: string): string {
    if (typeof value !== 'string') return '';

    try {
      return decodeURIComponent(value);
    } catch {
      return value;
    }
  }

}