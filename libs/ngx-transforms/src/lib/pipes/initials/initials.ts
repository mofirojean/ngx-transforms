import { Pipe, PipeTransform } from '@angular/core';

/**
 * InitialsPipe: Extracts initials from a name.
 *
 * @param {string} value - The full name.
 *
 * @returns {string} - The initials (e.g., 'John Doe' → 'JD').
 *
 * @example
 * {{ 'John Doe' | initials }} // Outputs: JD
 * {{ 'Mary Jane Watson' | initials }} // Outputs: MJW
 *
 * @author Mofiro Jean
 */
@Pipe({
  name: 'initials',
  standalone: true
})
export class InitialsPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';
    return value
      .trim()
      .split(/\s+/)
      .map(word => word.charAt(0).toUpperCase())
      .join('');
  }
}
