import { Pipe, PipeTransform } from '@angular/core';
import { md5 } from 'js-md5';

/**
 * GravatarPipe: Generates Gravatar URLs from email addresses.
 *
 * @param {string} value - The email address.
 * @param {number} [size=80] - The avatar size in pixels.
 *
 * @returns {string} - The Gravatar URL.
 *
 * @example
 * <img [src]="'user@example.com' | gravatar:100" />
 *
 * @author Mofiro Jean
 */
@Pipe({
  name: 'gravatar',
  standalone: true
})
export class GravatarPipe implements PipeTransform {
  transform(value: string, size = 80): string {
    if (!value) return `https://www.gravatar.com/avatar/?s=${size}`;
    const hash = md5(value.trim().toLowerCase());
    return `https://www.gravatar.com/avatar/${hash}?s=${size}`;
  }
}
