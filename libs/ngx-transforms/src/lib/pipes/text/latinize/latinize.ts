import { Pipe, PipeTransform } from '@angular/core';

/**
 * LatinizePipe: Strips diacritics (accents) from a string while preserving
 * casing, spaces, and punctuation.
 *
 * Uses Unicode NFD normalization to split combining marks from base letters,
 * then removes the combining mark range (U+0300–U+036F). Unlike `slugify`,
 * this pipe leaves the string structure intact — it only removes accents.
 *
 * @param {string} value - The string to latinize.
 *
 * @returns {string} - The latinized string, or empty string if input is invalid.
 *
 * @example
 * {{ 'Café' | latinize }}                                    // 'Cafe'
 * {{ 'naïve résumé' | latinize }}                            // 'naive resume'
 * {{ 'Crème Brûlée' | latinize }}                            // 'Creme Brulee'
 */
@Pipe({
  name: 'latinize',
  standalone: true,
})
export class LatinizePipe implements PipeTransform {

  transform(value: string): string {
    if (typeof value !== 'string') return '';

    return value.normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

}