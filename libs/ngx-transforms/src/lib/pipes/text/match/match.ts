import { Pipe, PipeTransform } from '@angular/core';

/**
 * MatchPipe: Returns all regex matches found in a string.
 *
 * Wraps `String.prototype.match` with a global default. Returns an empty array
 * when nothing matches or the regex is invalid.
 *
 * @param {string} value - The string to search.
 * @param {string | RegExp} pattern - Pattern string (or RegExp) to match.
 * @param {string} [flags='g'] - Regex flags used when `pattern` is a string.
 *
 * @returns {string[]} - Array of matches, or empty array if none / invalid input.
 *
 * @example
 * {{ 'abc123def456' | match:'[0-9]+' }}                      // ['123', '456']
 * {{ 'hello world' | match:'[a-z]+' }}                       // ['hello', 'world']
 * {{ 'HELLO' | match:'[a-z]+':'gi' }}                        // ['HELLO']
 */
@Pipe({
  name: 'match',
  standalone: true,
})
export class MatchPipe implements PipeTransform {

  transform(value: string, pattern: string | RegExp, flags = 'g'): string[] {
    if (typeof value !== 'string' || !pattern) return [];

    try {
      const regex = typeof pattern === 'string'
        ? new RegExp(pattern, flags.includes('g') ? flags : flags + 'g')
        : (pattern.flags.includes('g') ? pattern : new RegExp(pattern.source, pattern.flags + 'g'));

      const matches = value.match(regex);
      return matches ?? [];
    } catch {
      return [];
    }
  }

}