import {inject, Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

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

  transform(value: string | object, spaces = 2, highlightProperty?: string | null): SafeHtml {
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

    const escapedJson = jsonString
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    let finalJson = this.highlightJson(escapedJson);
    if (highlightProperty) {
      const lines = finalJson.split('\n');
      const highlightedLines = lines.map(line => {
        const searchString = `<span class="json-key">"${highlightProperty}"</span>`;
        if (line.includes(searchString)) {
          return `<span class="highlight-line">${line}</span>`;
        }
        return line;
      });
      finalJson = highlightedLines.join('\n');
    }
    return this.sanitizer.bypassSecurityTrustHtml(`<pre class="json-pretty">${finalJson}</pre>`);
  }

  private highlightJson(json: string): string {
    let result = json.replace(/"([^"\\]*(?:\\.[^"\\]*)*)"/g, (match, p1, offset) => {
      const remainingString = json.substring(offset + match.length);
      const isKey = /^\s*:/.test(remainingString);

      return isKey
        ? `<span class="json-key">${match}</span>`
        : `<span class="json-string">${match}</span>`;
    });

    // Highlight numbers
    result = result.replace(/\b-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/g, '<span class="json-number">$&</span>');

    // Highlight booleans
    result = result.replace(/\b(true|false)\b/g, '<span class="json-boolean">$&</span>');

    // Highlight null
    result = result.replace(/\bnull\b/g, '<span class="json-null">$&</span>');

    // Highlight punctuation
    result = result.replace(/[{}[\]]/g, '<span class="json-punctuation">$&</span>');

    return result;
  }
}
