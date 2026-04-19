import { Pipe, PipeTransform } from '@angular/core';

/**
 * StripTagsPipe: Removes HTML tags from a string.
 *
 * By default strips every tag. Pass an array of allowed tag names to keep
 * those specific tags while stripping the rest. HTML comments and DOCTYPEs
 * are always removed.
 *
 * Note: this pipe returns a plain string — the caller is responsible for
 * binding the output safely (e.g. via `[textContent]`). For sanitization
 * that also neutralizes dangerous attributes/scripts, use HtmlSanitizePipe.
 *
 * @param {string} value - The HTML string to strip.
 * @param {string[]} [allowedTags] - Optional list of tag names to preserve.
 *
 * @returns {string} - The stripped string, or empty string if input is invalid.
 *
 * @example
 * {{ '<p>Hi <b>there</b></p>' | stripTags }}                  // 'Hi there'
 * {{ '<p>Hi <b>bold</b></p>' | stripTags:['b'] }}             // 'Hi <b>bold</b>'
 * {{ '<script>alert(1)</script>Safe' | stripTags }}           // 'Safe'
 */
@Pipe({
  name: 'stripTags',
  standalone: true,
})
export class StripTagsPipe implements PipeTransform {

  transform(value: string, allowedTags?: string[]): string {
    if (typeof value !== 'string') return '';

    let result = value
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<!DOCTYPE[^>]*>/gi, '')
      .replace(/<script\b[\s\S]*?<\/script>/gi, '')
      .replace(/<style\b[\s\S]*?<\/style>/gi, '');

    if (!Array.isArray(allowedTags) || allowedTags.length === 0) {
      return result.replace(/<\/?[a-zA-Z][^>]*>/g, '');
    }

    const allowed = allowedTags
      .filter(t => typeof t === 'string' && t.length > 0)
      .map(t => t.toLowerCase().replace(/[^a-z0-9]/g, ''));

    if (allowed.length === 0) {
      return result.replace(/<\/?[a-zA-Z][^>]*>/g, '');
    }

    const pattern = new RegExp(`</?(?!(?:${allowed.join('|')})\\b)[a-zA-Z][^>]*>`, 'gi');
    result = result.replace(pattern, '');

    return result;
  }

}