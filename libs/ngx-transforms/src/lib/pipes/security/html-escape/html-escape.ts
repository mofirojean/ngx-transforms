import { Pipe, PipeTransform } from '@angular/core';

/**
 * Converts special HTML characters in a string to their corresponding HTML entities.
 * This prevents the browser from interpreting the input as HTML, rendering it as plain text.
 *
 * @param {string} value - The input string containing HTML to escape.
 * @returns {string} The string with special HTML characters escaped, or an empty string if input is invalid.
 *
 * @example
 * ```html
 * {{ '<p>Hello</p>' | htmlEscape }} <!-- Outputs: &lt;p&gt;Hello&lt;/p&gt; -->
 * ```
 */
@Pipe({
  name: 'htmlEscape',
  standalone: true
})
export class HtmlEscapePipe implements PipeTransform {
  transform(value: string): string {
    if (!value || typeof value !== 'string') return '';

    const escapeMap: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&apos;'
    };

    return value.replace(/[&<>"']/g, char => escapeMap[char]);
  }
}
