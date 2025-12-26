import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * JsonPrettyPipe: Formats JSON data with indentation and syntax highlighting.
 *
 * @param {string | object} value - The JSON string or object to format.
 * @param {number} [spaces=2] - Number of spaces for indentation.
 *
 * @returns {SafeHtml} - Formatted HTML with color-coded JSON.
 *
 * @example
 * {{ '{"name": "John", "age": 30}' | jsonPretty }} // Outputs: Colorful, indented JSON
 * <pre [innerHTML]="data | jsonPretty:4"></pre> // 4-space indentation
 *
 * @author Mofiro Jean
 */
@Pipe({
  name: 'jsonPretty',
  standalone: true
})
export class JsonPrettyPipe implements PipeTransform {
  private sanitizer = inject(DomSanitizer);

  transform(value: string | object, spaces: number = 2): SafeHtml {
    let jsonString: string;
    
    try {
      if (typeof value === 'object') {
        jsonString = JSON.stringify(value, null, spaces);
      } else if (value && typeof value === 'string') {
        jsonString = JSON.stringify(JSON.parse(value), null, spaces);
      } else {
        throw new Error('Invalid or empty input');
      }
    } catch (e) {
      return this.sanitizer.bypassSecurityTrustHtml(
        '<span class="json-error">Invalid JSON: ' + (e instanceof Error ? e.message : 'Unknown error') + '</span>'
      );
    }

    // Escape HTML to prevent injection
    const escapedJson = jsonString
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    const highlightedJson = this.highlightJson(escapedJson);
    return this.sanitizer.bypassSecurityTrustHtml(`<pre class="json-pretty">${highlightedJson}</pre>`);
  }

  private highlightJson(json: string): string {
    let result = json;

    result = result.replace(/"([^"\\]*(?:\\.[^"\\]*)*)"/g, (match, p1) => {
      const isKey = json[json.indexOf(match) + match.length] === ':';
      return isKey
        ? `<span class="json-key">"${p1}"</span>` 
        : `<span class="json-string">"${p1}"</span>`;
    });

    // Highlight numbers
    result = result.replace(/\b-?\d*\.?\d+\b/g, '<span class="json-number">$&</span>');

    // Highlight booleans
    result = result.replace(/\b(true|false)\b/g, '<span class="json-boolean">$&</span>');

    // Highlight null
    result = result.replace(/\bnull\b/g, '<span class="json-null">$&</span>');

    // Highlight punctuation
    result = result.replace(/[{}[\]\/]/g, '<span class="json-punctuation">$&</span>');

    return result;
  }
}
