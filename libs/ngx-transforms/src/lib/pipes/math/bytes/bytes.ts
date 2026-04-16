import { Pipe, PipeTransform } from '@angular/core';

/**
 * BytesPipe: Formats a number of bytes into a human-readable string with appropriate units.
 *
 * Supports both binary (1024-based: KiB, MiB, GiB) and decimal (1000-based: KB, MB, GB) units.
 * Defaults to decimal (1000-based) units.
 *
 * @param {number} value - The number of bytes.
 * @param {number} [decimals=1] - Number of decimal places in the output.
 * @param {string} [base='decimal'] - Unit base: 'decimal' (1000, KB/MB/GB) or 'binary' (1024, KiB/MiB/GiB).
 *
 * @returns {string | undefined} - The formatted string, or undefined if the input is invalid.
 *
 * @example
 * {{ 1536 | bytes }}                                         // "1.5 KB"
 * {{ 1048576 | bytes:2 }}                                    // "1.05 MB"
 * {{ 1073741824 | bytes:1:'binary' }}                        // "1.0 GiB"
 */
@Pipe({
  name: 'bytes',
  standalone: true,
})
export class BytesPipe implements PipeTransform {

  private readonly decimalUnits = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'];
  private readonly binaryUnits = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB'];

  transform(value: number, decimals = 1, base: 'decimal' | 'binary' = 'decimal'): string | undefined {
    if (typeof value !== 'number' || isNaN(value)) {
      return undefined;
    }

    if (value < 0) {
      return undefined;
    }

    if (value === 0) {
      return '0 B';
    }

    const isBinary = base === 'binary';
    const divisor = isBinary ? 1024 : 1000;
    const units = isBinary ? this.binaryUnits : this.decimalUnits;

    let unitIndex = 0;
    let size = value;

    while (size >= divisor && unitIndex < units.length - 1) {
      size /= divisor;
      unitIndex++;
    }

    const precision = typeof decimals === 'number' && decimals >= 0 ? decimals : 1;

    return `${size.toFixed(precision)} ${units[unitIndex]}`;
  }

}