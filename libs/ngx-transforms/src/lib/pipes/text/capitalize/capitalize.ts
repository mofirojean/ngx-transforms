import { Pipe, PipeTransform } from '@angular/core';

/**
 * CapitalizePipe: Uppercases the first character and lowercases the rest.
 *
 * Useful for normalizing headings, labels, and proper nouns.
 * Differs from `upperFirst` which only uppercases the first character without
 * altering the remaining characters.
 *
 * @param {string} value - The string to capitalize.
 *
 * @returns {string} - The capitalized string, or an empty string if input is invalid.
 *
 * @example
 * {{ 'hello world' | capitalize }}                           // 'Hello world'
 * {{ 'HELLO WORLD' | capitalize }}                           // 'Hello world'
 * {{ 'hELLo' | capitalize }}                                 // 'Hello'
 */
@Pipe({
  name: 'capitalize',
  standalone: true,
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string): string {
    if (typeof value !== 'string' || value.length === 0) return '';
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }

}