import { Pipe, PipeTransform } from '@angular/core';
import figlet from 'figlet';
/**
 * Supported figlet fonts for ASCII art.
 */
export type FigletFont = 'Standard' | 'Ghost' | 'Doom' | 'Big' | 'Banner';

/**
 * Supported figlet horizaontal layout options.
 */
export type FigletLayout = 'default' | 'fitted' | 'full';

/**
 * Options for configuring figlet ASCII art generation
 */
export interface FigletOptions {
  font?: FigletFont;
  horizontalLayout?: FigletLayout;
  width?: number;
  whitespaceBreak?: boolean
}

/**
 * AsciiArtPipe: Converts text into ASCII art using figlet.js.
 *
 * @param {string} value - The text to convert to ASCII art.
 * @param {FigletOptions} [options] - Configuration options for figlet (font, layout, width, whitespaceBreak).
 *
 * @returns {string} - The ASCII art wrapped in a <pre> tag with CSS classes.
 *
 * @remarks
 * This pipe returns plain HTML (e.g., `<pre class="ascii-art">...</pre>`). For production,
 * use Angular's `DomSanitizer` to sanitize the output and prevent XSS attacks. Example:
 * ```typescript
 * import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
 * constructor(private sanitizer: DomSanitizer) {}
 * transform(value: string, options: FigletOptions = {}): SafeHtml {
 *   const html = this.generateAsciiArt(value, options);
 *   return this.sanitizer.bypassSecurityTrustHtml(html);
 * }
 * ```
 *
 * @example
 * {{ 'HI' | asciiArt }} // Outputs ASCII art using default options (Standard font)
 * {{ 'HI' | asciiArt:{ font: 'Ghost', horizontalLayout: 'fitted', width: 60 } }} // Outputs ASCII art with custom options
 * <div [innerHTML]="userInput | asciiArt:{ font: 'Doom' }"></div>
 *
 * @author Mofiro Jean
 */
@Pipe({
  name: 'asciiArt',
  standalone: true
})
export class AsciiArtPipe implements PipeTransform {

  transform(value: string, options: FigletOptions = {}): string {
    if (!value || typeof value !== 'string') {
      return '';
    }

    const config: FigletOptions = {
      font: options.font ?? 'Standard',
      horizontalLayout: options.horizontalLayout ?? 'default',
      width: options.width ?? 80,
      whitespaceBreak: options.whitespaceBreak ?? true
    };

    try {
      const asciiArt = figlet.textSync(value, {
        font: config.font,
        horizontalLayout: config.horizontalLayout,
        verticalLayout: 'default', // Most fonts don't support vertical smushing
        width: config.width,
        whitespaceBreak: config.whitespaceBreak
      });
      return `<pre class="ascii-art">${asciiArt}</pre>`;
    } catch (error) {
      console.log(`AsciiArtPipe: Error generating ASCII art for "${value}" with font "${config.font}"`);
      return `<pre class="ascii-art-error">Error: Invalid font or input</pre>`;
    }
  }
}
