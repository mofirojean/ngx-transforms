import { Pipe, PipeTransform } from '@angular/core';
import { AsciiGenerator, CharsetPreset, AsciiConfig, TextToAsciiOptions } from 'ts-ascii-engine';

/**
 * Supported charset presets for ASCII art generation.
 */
export { CharsetPreset } from 'ts-ascii-engine';

/**
 * Configuration options for ASCII art generation
 */
export interface AsciiArtOptions extends Partial<AsciiConfig> {
  /**
   * Text rendering options (only used when converting text to ASCII)
   */
  textOptions?: TextToAsciiOptions;

  /**
   * Return format: 'html' returns formatted HTML, 'text' returns plain text
   * @default 'html'
   */
  format?: 'html' | 'text';
}

/**
 * AsciiArtPipe: Converts text into ASCII art using ts-ascii-engine.
 *
 * This pipe leverages the high-performance ts-ascii-engine library to convert
 * text into visually appealing ASCII art with various customization options.
 *
 * @param {string} value - The text to convert to ASCII art.
 * @param {AsciiArtOptions} [options] - Configuration options for ASCII generation.
 *
 * @returns {string} - The ASCII art as HTML or plain text based on format option.
 *
 * @security
 * The pipe returns HTML by default. When using with [innerHTML], Angular's
 * DomSanitizer automatically sanitizes the output. For additional safety,
 * you can explicitly sanitize:
 * ```typescript
 * import { DomSanitizer } from '@angular/platform-browser';
 * this.safeHtml = this.sanitizer.sanitize(SecurityContext.HTML, asciiOutput);
 * ```
 *
 * @performance
 * - The AsciiGenerator instance is reused across transformations for optimal performance
 * - Use smaller charset and width values for faster rendering
 * - Consider format: 'text' for simple use cases (faster than HTML formatting)
 * - The library is optimized with typed arrays and minimal garbage collection
 *
 * @example
 * // Basic usage with default options
 * {{ 'HELLO' | asciiArt }}
 *
 * @example
 * // Custom charset and width
 * {{ 'CODE' | asciiArt:{ charset: CharsetPreset.BLOCK, width: 60 } }}
 *
 * @example
 * // Plain text output
 * {{ 'ASCII' | asciiArt:{ format: 'text' } }}
 *
 * @example
 * // Advanced text rendering with custom font
 * {{ 'WELCOME' | asciiArt:{
 *   charset: CharsetPreset.STANDARD,
 *   width: 80,
 *   textOptions: {
 *     font: 'Arial',
 *     fontSize: 72,
 *     fontWeight: 'bold'
 *   }
 * }}}
 *
 * @example
 * // With inverted colors
 * {{ 'DARK' | asciiArt:{ inverted: true, charset: CharsetPreset.MINIMAL } }}
 *
 * @author Mofiro Jean
 */
@Pipe({
  name: 'asciiArt',
  standalone: true,
})
export class AsciiArtPipe implements PipeTransform {
  private generator: AsciiGenerator;

  constructor() {
    this.generator = new AsciiGenerator({
      charset: CharsetPreset.STANDARD,
      width: 80,
      optimized: true,
    });
  }

  transform(value: string, options: AsciiArtOptions = {}): string {
    if (!value || typeof value !== 'string') {
      return '';
    }

    const maxLength = 100;
    if (value.length > maxLength) {
      console.warn(`AsciiArtPipe: Input truncated to ${maxLength} characters for security`);
      value = value.substring(0, maxLength);
    }

    const format = options.format ?? 'html';
    const textOptions = options.textOptions;

    const { format: _format, textOptions: _textOptions, ...config } = options;

    try {
      if (Object.keys(config).length > 0) {
        this.generator.updateConfig(config);
      }

      const result = this.generator.convertText(value, textOptions);

      if (format === 'text') {
        return `<pre class="ascii-art">${this.escapeHtml(result.text)}</pre>`;
      }

      // Return HTML format (already safe from ts-ascii-engine)
      return result.html;
    } catch (error) {
      console.error('AsciiArtPipe: Error generating ASCII art', error);
      return `<pre class="ascii-art-error">Error: Unable to generate ASCII art</pre>`;
    }
  }

  /**
   * Escapes HTML special characters to prevent XSS
   * @private
   */
  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}
