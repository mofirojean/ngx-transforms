import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import JsBarcode from 'jsbarcode';

/**
 * BarcodeElementType: Defines the type of element to render the barcode.
 *
 * @typedef {'svg' | 'img' | 'canvas'} BarcodeElementType
 */
export type BarcodeElementType = 'svg' | 'img' | 'canvas';

/**
 * BarcodeFormat: Defines supported barcode formats.
 *
 * @typedef {'CODE128' | 'EAN13' | 'CODE39'} BarcodeFormat
 */
export type BarcodeFormat = 'CODE128' | 'EAN13' | 'CODE39';

/**
 * BarcodeOptions: Configuration options for barcode generation.
 *
 * @interface BarcodeOptions
 * @property {BarcodeElementType} [elementType='svg'] - Output type (svg, img, canvas).
 * @property {BarcodeFormat} [format='CODE128'] - Barcode format.
 * @property {number} [width=2] - Bar width in pixels.
 * @property {number} [height=100] - Barcode height in pixels.
 * @property {string} [lineColor='#000000'] - Color of bars.
 * @property {boolean} [displayValue=true] - Show value below barcode.
 */
export interface BarcodeOptions {
  elementType?: BarcodeElementType;
  format?: BarcodeFormat;
  width?: number;
  height?: number;
  lineColor?: string;
  displayValue?: boolean;
}

/**
 * BarcodePipe: Generates a barcode from a string value.
 *
 * @param {string} value - The value to encode (e.g., '123456789').
 * @param {BarcodeOptions} [options={}] - Configuration options.
 *
 * @returns {Promise<SafeHtml | SafeResourceUrl>} - SVG markup or image data URL.
 *
 * @example
 * <div [innerHTML]="'123456789' | barcode:{elementType:'svg',format:'CODE128'} | async"></div>
 * <img [src]="'123456789' | barcode:{elementType:'img'} | async" />
 *
 * @author Mofiro Jean
 */
@Pipe({
  name: 'barcode',
  standalone: true,
})
export class BarcodePipe implements PipeTransform {
  private sanitizer = inject(DomSanitizer);

  async transform(value: string, options: BarcodeOptions = {}): Promise<SafeHtml | SafeResourceUrl | ''> {
    const {
      elementType = 'svg',
      format = 'CODE128',
      lineColor = '#000000',
      width = 2,
      height = 100,
      displayValue = true,
    } = options;

    if (!value) {
      return '';
    }

    try {
      const config = { format, lineColor, width, height, displayValue };
      if (elementType === 'svg') {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        JsBarcode(svg, value, config);
        return this.sanitizer.bypassSecurityTrustHtml(svg.outerHTML);
      } else {
        const canvas = document.createElement('canvas');
        JsBarcode(canvas, value, config);
        const dataUrl = canvas.toDataURL('image/png');
        return this.sanitizer.bypassSecurityTrustResourceUrl(dataUrl);
      }
    } catch (error) {
      console.error('Barcode generation failed:', error);
      return '';
    }
  }
}
