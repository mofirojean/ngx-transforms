import { Pipe, PipeTransform } from '@angular/core';

/**
 * DecodeUriPipe: Decodes a URI previously encoded with `encodeURI`.
 *
 * Wraps the native `decodeURI`. Returns the input unchanged if the string
 * contains a malformed escape sequence.
 *
 * @param {string} value - The encoded URI to decode.
 *
 * @returns {string} - The decoded URI, or empty string if input is invalid.
 *
 * @example
 * {{ 'https://example.com/?q=hi%20world' | decodeURI }}      // 'https://example.com/?q=hi world'
 * {{ '/path%20with%20space.html' | decodeURI }}              // '/path with space.html'
 */
@Pipe({
  name: 'decodeURI',
  standalone: true,
})
export class DecodeUriPipe implements PipeTransform {

  transform(value: string): string {
    if (typeof value !== 'string') return '';

    try {
      return decodeURI(value);
    } catch {
      return value;
    }
  }

}