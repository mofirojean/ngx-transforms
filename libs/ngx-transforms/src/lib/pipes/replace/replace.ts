import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * ReplacePipe: A custom Angular pipe that either highlights or replaces text based on a pattern.
 *
 * - If `isReplace` is `false`, it highlights occurrences of the pattern (if `highlightClass` is provided).
 * - If `isReplace` is `true`, it replaces occurrences of the pattern with the replacement string, optionally highlighting the replacement.
 *
 * @param {string} value - The input string to transform.
 * @param {string | RegExp} pattern - The pattern to match (string or RegExp). If an empty string, the value is returned as-is.
 * @param {string} replacement - The string to replace matches with.
 * @param {string} [highlightClass] - Optional CSS class for highlighting matched or replaced text (e.g., 'highlight').
 * @param {boolean} [isReplace=true] - Whether to perform replacement (true) or only highlight matches (false).
 *
 * @returns {string | SafeHtml} - Returns the transformed string or SafeHtml with highlights.
 *
 * @example
 * {{ 'Hello World' | replace:'World':'Universe' }}
 * // Output: Hello Universe
 *
 * {{ 'test123' | replace:/\d+/g:'X':'highlight' }}
 * // Output: test<span class="highlight">X</span>
 *
 * {{ 'Angular is great' | replace:'great':'awesome':'highlight':true }}
 * // Output: Angular is <span class="highlight">awesome</span>
 *
 * {{ 'Angular is great' | replace:'great':'awesome':'highlight':false }}
 * // Output: Angular is <span class="highlight">great</span>
 *
 * <div [innerHTML]="'Angular is great' | replace:'great':'awesome':'highlight':false"></div>
 * // Renders: Angular is <span class="highlight">great</span>
 *
 * @author Mofiro Jean
 */

@Pipe({
  name: 'replace',
  standalone: true
})
export class ReplacePipe implements PipeTransform {
  private sanitizer = inject(DomSanitizer);

  transform(
    value: string,
    pattern: string | RegExp,
    replacement: string,
    highlightClass?: string,
    isReplace = true
  ): string | SafeHtml {

    if (!value) return '';

    // handles empty string pattern
    if (!pattern || (typeof pattern === 'string' && pattern.trim() === '')) {
      return value;
    }

    const finalPattern = typeof pattern === 'string' ? new RegExp(pattern, 'gi') : pattern;

    if (!highlightClass) {
      return isReplace ? value.replace(finalPattern, replacement) : value;
    }

    // Sanitize the replacement to prevent XSS
    const sanitizedReplacement = replacement.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    if (isReplace) {
      const highlightedReplacement = `<span class="${highlightClass}">${sanitizedReplacement}</span>`;
      const replaced = value.replace(finalPattern, highlightedReplacement);
      return this.sanitizer.bypassSecurityTrustHtml(replaced);
    }

    const highlightedMatch = `<span class="${highlightClass}">$&</span>`;
    const result = value.replace(finalPattern, highlightedMatch);
    return this.sanitizer.bypassSecurityTrustHtml(result);
  }
}
