import { Pipe, PipeTransform } from '@angular/core';

/**
 * ReversePipe: Reverses the characters in a string.
 *
 * @param {string} value - The string to reverse.
 *
 * @returns {string} - The reversed string (e.g., 'hello' → 'olleh').
 *
 * @example
 * {{ 'hello' | reverse }} // Outputs: 'olleh'
 * {{ '12345' | reverse }} // Outputs: '54321'
 * <p>{{ userInput | reverse }}</p>
 *
 * @author Mofiro Jean
 */
@Pipe({
  name: 'reverse',
  standalone: true
})
export class ReversePipe implements PipeTransform {

  transform(value: string): string {
    if (!value || typeof value !== 'string') {
      return '';
    }

    return value.split('').reverse().join('');
  }

}
