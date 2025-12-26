import { Pipe, PipeTransform } from '@angular/core';

/**
 * TitleCasePipe: Capitalizes the first letter of each word in a string.
 *
 * @param {string} value - The input string to transform.
 * @returns {string} The string with each word capitalized, or an empty string if input is invalid.
 *
 * @example
 * ```html
 * {{ 'hello world' | titleCase }} <!-- Outputs: Hello World -->
 * ```
 */
@Pipe({
  name: 'titleCase',
  standalone: true
})
export class TitleCasePipe implements PipeTransform {

  transform(value: string): string {
    if (!value || typeof value !== 'string') return '';
    return value
      .split(' ')
      .filter(word => word.length > 0)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}
