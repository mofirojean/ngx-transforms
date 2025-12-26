import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * Sanitizes HTML input to remove unsafe elements while allowing safe HTML to be rendered.
 * Uses Angular's DomSanitizer to mark the output as trusted for use in [innerHTML].
 *
 * @param {string} value - The input string containing HTML to sanitize.
 * @returns {SafeHtml} The sanitized HTML marked as safe, or an empty string if input is invalid.
 *
 * @remarks
 * WARNING: Use with caution. Only apply to trusted input to avoid XSS risks.
 * Ensure input is pre-validated or sourced from a secure origin (e.g., a controlled rich-text editor).
 *
 * @example
 * ```html
 * <div [innerHTML]="'<p>Hello</p><script>alert(1)</script>' | htmlSanitize"></div>
 * <!-- Renders: <p>Hello</p> (script tag removed) -->
 * ```
 */
@Pipe({
  name: 'htmlSanitize',
  standalone: true
})
export class HtmlSanitizePipe implements PipeTransform {
  private sanitizer = inject(DomSanitizer);

  transform(value: string): SafeHtml {
    if (!value || typeof value !== 'string') return this.sanitizer.bypassSecurityTrustHtml('');
    return this.sanitizer.sanitize(0, value) || this.sanitizer.bypassSecurityTrustHtml('');
  }
}
