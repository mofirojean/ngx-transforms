import { Pipe, PipeTransform } from '@angular/core';

/**
 * ColorTargetType: Defines the target color format for conversion.
 *
 * @typedef {'hex' | 'rgb' | 'rgba'} ColorTargetType
 *
 * @description
 * Specifies the output format for color conversion:
 * - 'hex': Hexadecimal format (#RRGGBB or #RRGGBBAA)
 * - 'rgb': RGB format rgb(r, g, b)
 * - 'rgba': RGBA format rgba(r, g, b, a)
 */
export type ColorTargetType = 'hex' | 'rgb' | 'rgba';

// Pre-compiled regex patterns for performance
const HEX_6_PATTERN = /^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/;
const HEX_8_PATTERN = /^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/;
const HEX_3_PATTERN = /^#([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/;
const HEX_4_PATTERN = /^#([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/;
const RGB_PATTERN = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i;
const RGBA_PATTERN = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([\d.]+)\s*\)$/i;

/**
 * Clamps a value between 0 and 255 for valid RGB channel values.
 */
function clampChannel(value: number): number {
  return Math.max(0, Math.min(255, Math.round(value)));
}

/**
 * Clamps alpha value between 0 and 1.
 */
function clampAlpha(value: number): number {
  return Math.max(0, Math.min(1, value));
}

/**
 * Converts a single hex character to its full two-character representation.
 */
function expandHexChar(char: string): string {
  return char + char;
}

/**
 * Converts a number to a two-character hex string.
 */
function toHex(value: number): string {
  return clampChannel(value).toString(16).padStart(2, '0').toUpperCase();
}

/**
 * Converts alpha (0-1) to hex (00-FF).
 */
function alphaToHex(alpha: number): string {
  return Math.round(clampAlpha(alpha) * 255).toString(16).padStart(2, '0').toUpperCase();
}

/**
 * Converts hex alpha (00-FF) to decimal (0-1).
 */
function hexToAlpha(hex: string): number {
  return Math.round((parseInt(hex, 16) / 255) * 100) / 100;
}

interface ParsedColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

/**
 * Parses any supported color format into RGBA components.
 */
function parseColor(value: string): ParsedColor | null {
  // Try 6-digit hex (#RRGGBB)
  let match = value.match(HEX_6_PATTERN);
  if (match) {
    return {
      r: parseInt(match[1], 16),
      g: parseInt(match[2], 16),
      b: parseInt(match[3], 16),
      a: 1,
    };
  }

  // Try 8-digit hex (#RRGGBBAA)
  match = value.match(HEX_8_PATTERN);
  if (match) {
    return {
      r: parseInt(match[1], 16),
      g: parseInt(match[2], 16),
      b: parseInt(match[3], 16),
      a: hexToAlpha(match[4]),
    };
  }

  // Try 3-digit hex (#RGB)
  match = value.match(HEX_3_PATTERN);
  if (match) {
    return {
      r: parseInt(expandHexChar(match[1]), 16),
      g: parseInt(expandHexChar(match[2]), 16),
      b: parseInt(expandHexChar(match[3]), 16),
      a: 1,
    };
  }

  // Try 4-digit hex (#RGBA)
  match = value.match(HEX_4_PATTERN);
  if (match) {
    return {
      r: parseInt(expandHexChar(match[1]), 16),
      g: parseInt(expandHexChar(match[2]), 16),
      b: parseInt(expandHexChar(match[3]), 16),
      a: hexToAlpha(expandHexChar(match[4])),
    };
  }

  // Try RGB format
  match = value.match(RGB_PATTERN);
  if (match) {
    const r = parseInt(match[1], 10);
    const g = parseInt(match[2], 10);
    const b = parseInt(match[3], 10);
    // Validate range
    if (r > 255 || g > 255 || b > 255) {
      return null;
    }
    return { r, g, b, a: 1 };
  }

  // Try RGBA format
  match = value.match(RGBA_PATTERN);
  if (match) {
    const r = parseInt(match[1], 10);
    const g = parseInt(match[2], 10);
    const b = parseInt(match[3], 10);
    const a = parseFloat(match[4]);
    // Validate range
    if (r > 255 || g > 255 || b > 255 || a < 0 || a > 1) {
      return null;
    }
    return { r, g, b, a };
  }

  return null;
}

/**
 * ColorConvertPipe: Converts colors between HEX, RGB, and RGBA formats.
 *
 * @description
 * A versatile color conversion pipe that supports multiple input formats
 * and can convert to hex, rgb, or rgba output formats.
 *
 * **Supported Input Formats:**
 * - 3-digit HEX: #RGB (e.g., #F00)
 * - 4-digit HEX with alpha: #RGBA (e.g., #F00F)
 * - 6-digit HEX: #RRGGBB (e.g., #FF0000)
 * - 8-digit HEX with alpha: #RRGGBBAA (e.g., #FF0000FF)
 * - RGB: rgb(r, g, b) with flexible whitespace
 * - RGBA: rgba(r, g, b, a) with flexible whitespace
 *
 * **Output Formats:**
 * - 'hex': Returns #RRGGBB or #RRGGBBAA (if alpha < 1)
 * - 'rgb': Returns rgb(r, g, b) - alpha is discarded
 * - 'rgba': Returns rgba(r, g, b, a)
 *
 * @param {string} value - The input color string
 * @param {ColorTargetType} target - The desired output format
 * @returns {string} The converted color string, or original value if invalid
 *
 * @example
 * // Basic conversions
 * {{ '#FF0000' | colorConvert:'rgb' }}      // rgb(255, 0, 0)
 * {{ 'rgb(0, 255, 0)' | colorConvert:'hex' }} // #00FF00
 *
 * @example
 * // Short hex support
 * {{ '#F00' | colorConvert:'rgb' }}         // rgb(255, 0, 0)
 *
 * @example
 * // Alpha channel support
 * {{ '#FF000080' | colorConvert:'rgba' }}   // rgba(255, 0, 0, 0.5)
 * {{ 'rgba(255, 0, 0, 0.5)' | colorConvert:'hex' }} // #FF000080
 *
 * @author Mofiro Jean
 */
@Pipe({
  name: 'colorConvert',
  standalone: true,
})
export class ColorConvertPipe implements PipeTransform {
  transform(value: string, target: ColorTargetType): string {
    if (!value || typeof value !== 'string') {
      return '';
    }

    const trimmedValue = value.trim();
    const parsed = parseColor(trimmedValue);

    if (!parsed) {
      return value;
    }

    const { r, g, b, a } = parsed;

    switch (target) {
      case 'hex':
        if (a < 1) {
          return `#${toHex(r)}${toHex(g)}${toHex(b)}${alphaToHex(a)}`;
        }
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;

      case 'rgb':
        return `rgb(${clampChannel(r)}, ${clampChannel(g)}, ${clampChannel(b)})`;

      case 'rgba':
        return `rgba(${clampChannel(r)}, ${clampChannel(g)}, ${clampChannel(b)}, ${clampAlpha(a)})`;

      default:
        return value;
    }
  }
}
