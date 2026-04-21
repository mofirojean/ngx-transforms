import { Pipe, PipeTransform } from '@angular/core';

/**
 * NewlinesPipe: Replaces line breaks in a string with a custom replacement.
 *
 * Handles all common line-break variants (`\n`, `\r\n`, `\r`). Defaults to
 * `<br>` for HTML display via `[innerHTML]`. Pass any string to customize.
 *
 * @param {string} value - The string containing line breaks.
 * @param {string} [replacement='<br>'] - String inserted in place of each line break.
 *
 * @returns {string} - The transformed string, or empty string if input is invalid.
 *
 * @example
 * {{ text | newlines }}                                      // 'a<br>b<br>c' (use [innerHTML])
 * {{ text | newlines:' | ' }}                                // 'a | b | c'
 * {{ text | newlines:' ' }}                                  // 'a b c' (flatten to single line)
 */
@Pipe({
  name: 'newlines',
  standalone: true,
})
export class NewlinesPipe implements PipeTransform {

  transform(value: string, replacement = '<br>'): string {
    if (typeof value !== 'string') return '';

    return value.replace(/\r\n|\r|\n/g, replacement);
  }

}
