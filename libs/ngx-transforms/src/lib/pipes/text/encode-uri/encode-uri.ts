import { Pipe, PipeTransform } from '@angular/core';

/**
 * EncodeUriPipe: Encodes a full URI by escaping characters that would be invalid.
 *
 * Wraps the native `encodeURI`. Preserves URI structural characters
 * (`: / ? # [ ] @ ! $ & ' ( ) * + , ; =`) so this is suitable for entire URLs,
 * not for individual query string values (use `encodeURIComponent` for those).
 *
 * @param {string} value - The URI to encode.
 *
 * @returns {string} - The encoded URI, or empty string if input is invalid.
 *
 * @example
 * {{ 'https://example.com/?q=hi world' | encodeURI }}        // 'https://example.com/?q=hi%20world'
 * {{ '/path with space.html' | encodeURI }}                  // '/path%20with%20space.html'
 */
@Pipe({
  name: 'encodeURI',
  standalone: true,
})
export class EncodeUriPipe implements PipeTransform {

  transform(value: string): string {
    if (typeof value !== 'string') return '';

    try {
      return encodeURI(value);
    } catch {
      return value;
    }
  }

}