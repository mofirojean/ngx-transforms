import { Pipe, PipeTransform } from '@angular/core';

/**
 * UpperFirstPipe: Uppercases the first character of a string without altering the rest.
 *
 * Differs from `capitalize` which also lowercases the remaining characters.
 * Useful when you want to preserve acronyms, camelCase, or existing casing.
 *
 * @param {string} value - The string to transform.
 *
 * @returns {string} - The transformed string, or an empty string if input is invalid.
 *
 * @example
 * {{ 'hello WORLD' | upperFirst }}                           // 'Hello WORLD'
 * {{ 'javaScript' | upperFirst }}                            // 'JavaScript'
 * {{ 'apiKey' | upperFirst }}                                // 'ApiKey'
 */
@Pipe({
  name: 'upperFirst',
  standalone: true,
})
export class UpperFirstPipe implements PipeTransform {

  transform(value: string): string {
    if (typeof value !== 'string' || value.length === 0) return '';
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

}