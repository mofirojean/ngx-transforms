import { Pipe, PipeTransform } from '@angular/core';

/**
* TimeAgo: Converts a date into a localized time string.
 *
 * Use the in-built Intl.RelativeTimeFormat to convert a date into a localized time string.
 * It was chosen over moment.js because it's more lightweight and supports more locales.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat
 *
 * @param {Date | number | string} value - The date to convert.
 * @param {string} [local='en'] - BCP 47 local code (e.g., 'en', 'fr', 'es').
 *
 * @returns {string} - The localized time string.
 *
 * @example
 * {{ date | timeAgo }}       // '5 minutes ago'
 * {{ date | timeAgo:'fr' }}   // 'il y a 5 minutes'
 *
 * @note Pure pipe - output won't automatically update as time passes.
 * Use signals or periodic change detection to re-trigger.
* */
@Pipe({
  name: 'timeAgo',
  standalone: true
})
export class TimeAgoPipePipe implements PipeTransform {

  private static readonly THRESHOLDS: [number, number, Intl.RelativeTimeFormatUnit][] = [
    [60, 1, 'second'],
    [3600, 60, 'minute'],
    [86400, 3600, 'hour'],
    [604800, 86400, 'day'],
    [2592000, 604800, 'week'],
    [31536000, 2592000, 'month'],
    [Infinity, 31536000, 'year'],
  ];

  private cacheLocal = '';
  private rtf!: Intl.RelativeTimeFormat;

  transform(value: Date | number | string, local = 'en'): string {
    if (value === null || value === undefined || value === "") {
      return "";
    }

    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return "";
    }

    if (local !== this.cacheLocal) {
      this.rtf = new Intl.RelativeTimeFormat(local, { numeric: "auto" });
      this.cacheLocal = local;
    }

    const seconds = Math.floor((date.getTime() - Date.now()) / 1000);


    for (const [max, divisor, unit] of TimeAgoPipePipe.THRESHOLDS) {
      if (Math.abs(seconds) < max) {
        return this.rtf.format(Math.round(seconds / divisor), unit);
      }
    }

    return "";
  }

}
