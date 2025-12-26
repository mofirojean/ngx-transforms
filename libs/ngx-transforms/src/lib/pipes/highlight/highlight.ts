import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * HighlightPipe: Highlights occurrences of a search term within a string.
 *
 * This Angular pipe transforms a string input by wrapping all occurrences of a specified
 * search term with a `<span>` element that has the class "highlight".
 * It uses the Angular `DomSanitizer` to bypass security and render the highlighted HTML.
 *
 * @param {string} value - The input string in which to highlight the search term.
 * @param {string} searchTerm - The string to search for and highlight.
 * @returns {SafeHtml} - The input string with the search term highlighted, or an empty string if input or searchTerm are falsy.
 *
 * @example
 * {{ 'This is a test string' | highlight: 'test' }} // Returns 'This is a <span class="highlight">test</span> string'
 * {{ 'This is a test TEST string' | highlight: 'test' }} // Returns 'This is a <span class="highlight">test</span> <span class="highlight">TEST</span> string'
 * {{ 'This is a test string' | highlight: '' }} // Returns 'This is a test string'
 * {{ null | highlight: 'test' }} // Returns ''
 * {{ undefined | highlight: 'test' }} // Returns ''
 *
 * @author Mofiro Jean
 */
@Pipe({
  name: 'highlight',
  standalone: true
})
export class HighlightPipe implements PipeTransform {
  private sanitizer = inject(DomSanitizer);

  transform(value: string, searchTerm: string): SafeHtml {
    if (!value || !searchTerm) {
      return this.sanitizer.bypassSecurityTrustHtml(value || '');
    }

    const escapedSearch = searchTerm.replace(/[.*+?${}()|[\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedSearch})`, 'gi');
    const highlighed = value.replace(regex, '<span class="highlight">$1</span>');
    return this.sanitizer.bypassSecurityTrustHtml(highlighed);
  }
}
