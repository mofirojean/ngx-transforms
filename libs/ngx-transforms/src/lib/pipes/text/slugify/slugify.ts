import { Pipe, PipeTransform } from '@angular/core';

/**
 * SlugifyPipe: Converts a string into a URL-friendly slug.
 *
 * Removes diacritics, lowercases, replaces non-alphanumerics with the separator,
 * collapses consecutive separators, and trims them from the ends.
 *
 * @param {string} value - The string to slugify.
 * @param {string} [separator='-'] - Character used to join words.
 *
 * @returns {string} - The slugified string, or an empty string if input is invalid.
 *
 * @example
 * {{ 'Hello World!' | slugify }}                             // 'hello-world'
 * {{ 'Café & Tea' | slugify }}                               // 'cafe-tea'
 * {{ 'My Blog Post' | slugify:'_' }}                         // 'my_blog_post'
 */
@Pipe({
  name: 'slugify',
  standalone: true,
})
export class SlugifyPipe implements PipeTransform {

  transform(value: string, separator = '-'): string {
    if (typeof value !== 'string') return '';

    const sep = separator || '-';
    const escaped = sep.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, sep)
      .replace(new RegExp(`${escaped}+`, 'g'), sep)
      .replace(new RegExp(`^${escaped}|${escaped}$`, 'g'), '');
  }

}
