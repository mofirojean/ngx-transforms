import { Pipe, PipeTransform } from '@angular/core';

/**
 * EmailMaskPipe: Masks the local part of an email address, revealing only the first and last characters.
 *
 * This Angular pipe transforms an email address string by replacing the characters between the first and last characters of the local part (before the '@') with "***".
 * If the local part is 2 characters or less, it masks all characters except the first.
 *
 * @param {string} value - The email address string to be masked.
 * @returns {string} - The masked email address, or the original value if it's not a valid email or falsy.
 *
 * @example
 * {{ 'test@example.com' | emailMask }} // Returns 't***t@example.com'
 * {{ 'te@example.com' | emailMask }} // Returns 't***@example.com'
 * {{ 't@example.com' | emailMask }} // Returns 't***@example.com'
 * {{ 'example.com' | emailMask }} // Returns 'example.com'
 * {{ null | emailMask }} // Returns ''
 * {{ undefined | emailMask }} // Returns ''
 *
 * @author Mofiro Jean
 */
@Pipe({
  name: 'emailMask',
  standalone: true
})
export class EmailMaskPipe implements PipeTransform {

  transform(value: string): string {
    if (!value || !value.includes('@')) {
      return value || '';
    }

    const [local, domain] = value.split('@');
    if (local.length <= 2) {
      return `${local[0]}***@${domain}`;
    }
    const firstChar = local[0];
    const lastChar = local[local.length - 1];
    return `${firstChar}***${lastChar}@${domain}`;
  }
}
