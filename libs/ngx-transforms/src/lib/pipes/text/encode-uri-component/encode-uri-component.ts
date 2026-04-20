import { Pipe, PipeTransform } from '@angular/core';

/**
 * EncodeUriComponentPipe: Encodes a single URI component, escaping reserved characters.
 *
 * Wraps the native `encodeURIComponent`. Encodes everything except
 * `A-Z a-z 0-9 - _ . ! ~ * ' ( )`. Use this for query parameter values,
 * path segments, or anywhere a value must not collide with URL syntax.
 *
 * @param {string} value - The URI component to encode.
 *
 * @returns {string} - The encoded component, or empty string if input is invalid.
 *
 * @example
 * {{ 'hi world&you' | encodeURIComponent }}                  // 'hi%20world%26you'
 * {{ 'foo/bar?baz=1' | encodeURIComponent }}                 // 'foo%2Fbar%3Fbaz%3D1'
 */
@Pipe({
  name: 'encodeURIComponent',
  standalone: true,
})
export class EncodeUriComponentPipe implements PipeTransform {

  transform(value: string): string {
    if (typeof value !== 'string') return '';

    try {
      return encodeURIComponent(value);
    } catch {
      return value;
    }
  }

}