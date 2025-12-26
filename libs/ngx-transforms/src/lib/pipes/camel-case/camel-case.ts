import { Pipe, PipeTransform } from '@angular/core';

/**
 * CamelCasePipe: Converts text to camelCase (e.g., "hello world" → "helloWorld").
 *
 * @param {string} value - The input string to transform.
 * @returns {string} The string in camelCase, or an empty string if input is invalid.
 *
 * @example
 * ```html
 * {{ 'hello world' | camelCase }} <!-- Outputs: helloWorld -->
 * ```
 * 
 * @author Mofiro Jean
 */
@Pipe({
  name: 'camelCase',
  standalone: true
})
export class CamelCasePipe implements PipeTransform {

  transform(value: string): string {
    if (!value || typeof value !== 'string') return '';
    return value
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+/g, ' ')
      .trim()
      .split(' ')
      .filter(word => word.length > 0)
      .map((word, index) => 
        index === 0 
          ? word.toLowerCase() 
          : word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join('');
  }
}
