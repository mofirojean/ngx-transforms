import { Pipe, PipeTransform } from '@angular/core';

/**
 * ColorTargetType: Defines the type of the target color.
 *
 * @typedef {'hex' | 'rgb'} ColorTargetType
 *
 * @description
 * This type specifies the format in which the color will be generated into.
 * - 'hex': Renders the color in hexadecimal color scheme.
 * - 'rgb': enders the color in RGB (Red, Green, Blue) color scheme.
 */
export type ColorTargetType = 'hex' | 'rgb';

/**
 * ColorConvertPipe: Converts colors between HEX and RGB formats.
 *
 * @param {string} value - The color (e.g., #FF0000 or rgb(255,0,0)).
 * @param {ColorTargetType} target - The target format.
 *
 * @returns {string} - The converted color.
 *
 * @example
 * {{ '#FF0000' | colorConvert:'rgb' }} // Outputs: rgb(255, 0, 0)
 * {{ 'rgb(0, 255, 0)' | colorConvert:'hex' }} // Outputs: #00FF00
 *
 * @author Mofiro Jean
 */
@Pipe({
  name: 'colorConvert',
  standalone: true
})
export class ColorConvertPipe implements PipeTransform {

  transform(value: string, target: ColorTargetType): string {
    if (!value) return '';

    if (target === 'rgb' && /^#[0-9A-Fa-f]{6}$/.test(value)) {
      const r = parseInt(value.slice(1, 3), 16);
      const g = parseInt(value.slice(3, 5), 16);
      const b = parseInt(value.slice(5, 7), 16);
      return `rgb(${r}, ${g}, ${b})`;
    }

    if (target === 'hex' && /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/.test(value)) {
      const match = value.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
      if (match) {
        console.log(match);
        const r = parseInt(match[1]).toString(16).padStart(2, '0');
        const g = parseInt(match[2]).toString(16).padStart(2, '0');
        const b = parseInt(match[3]).toString(16).padStart(2, '0');
        return `#${r}${g}${b}`.toUpperCase();
      }
    }
    return value;
  }
}
