import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import * as QrCode from 'qrcode';

// This Pipe is inspired by the angular qrcode component library described in
// angularx-qrcode - Angular QR Code Generator: https://github.com/cordobo/angularx-qrcode

/**
 * QRCodeElementType: Defines the type of element to render the QR code.
 *
 * @typedef {'canvas' | 'svg' | 'img'} QRCodeElementType
 *
 * @description
 * This type specifies the format in which the QR code will be generated.
 * - 'canvas': Renders the QR code as a canvas element, returning a data URL.
 * - 'svg': Renders the QR code as an SVG string.
 * - 'img': Renders the QR code as an image element, returning a data URL.
 */
export type QRCodeElementType = 'canvas' | 'svg' | 'img';

/**
 * QRCodeErrorCorrectionLevel: Defines the error correction level for the QR code.
 *
 * @typedef {'L' | 'M' | 'Q' | 'H'} QRCodeErrorCorrectionLevel
 *
 * @description
 * This type specifies the level of error correction used in the QR code. Higher levels allow for more damaged QR codes to be read.
 * - 'L': Low error correction (7% recovery).
 * - 'M': Medium error correction (15% recovery).
 * - 'Q': Quartile error correction (25% recovery).
 * - 'H': High error correction (30% recovery).
 */
export type QRCodeErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

/**
 * QRCodeOptions: Defines the configuration options for generating a QR code.
 *
 * @interface QRCodeOptions
 * @property {QRCodeElementType} [elementType='svg'] - The type of element to render the QR code as. Defaults to 'svg'.
 * @property {number} [width=200] - The width of the generated QR code in pixels. Defaults to 200.
 * @property {QRCodeErrorCorrectionLevel} [errorCorrectionLevel='M'] - The error correction level. Defaults to 'M'.
 * @property {number} [margin=4] - The margin around the QR code in modules. Defaults to 4.
 * @property {string} [colorDark='#000000ff'] - The color of the dark modules. Defaults to '#000000ff' (black).
 * @property {string} [colorLight='#ffffffff'] - The color of the light modules. Defaults to '#ffffffff' (white).
 * @property {number} [scale=4] - The scale factor of the QR code. Defaults to 4.
 */
export interface QRCodeOptions {
  elementType?: QRCodeElementType;
  width?: number;
  errorCorrectionLevel?: QRCodeErrorCorrectionLevel;
  margin?: number;
  colorDark?: string;
  colorLight?: string;
  scale?: number;
}

/**
 * QRCodePipe: Generates a QR code from a string value.
 *
 * This Angular pipe transforms a string input into a QR code, returning it as either a SafeHtml (for SVG) or SafeResourceUrl (for canvas and img).
 * It utilizes the 'qrcode' library to generate QR codes and the Angular 'DomSanitizer' to bypass security and render the generated QR code.
 *
 * @param {string} value - The string value to be encoded into a QR code.
 * @param {QRCodeOptions} [options={}] - Optional configuration for the QR code generation.
 * @param {QRCodeElementType} [options.elementType='svg'] - The type of element to generate the QR code as ('canvas', 'svg', 'img'). Defaults to 'svg'.
 * @param {number} [options.width=200] - The width of the generated QR code in pixels. Defaults to 200.
 * @param {QRCodeErrorCorrectionLevel} [options.errorCorrectionLevel='M'] - The error correction level ('L', 'M', 'Q', 'H'). Defaults to 'M'.
 * @param {number} [options.margin=4] - The margin around the QR code in modules. Defaults to 4.
 * @param {string} [options.colorDark='#000000ff'] - The color of the dark modules. Defaults to '#000000ff' (black).
 * @param {string} [options.colorLight='#ffffffff'] - The color of the light modules. Defaults to '#ffffffff' (white).
 * @param {number} [options.scale=4] - The scale factor of the QR code. Defaults to 4.
 *
 * @returns {Promise<SafeHtml | SafeResourceUrl>} - A Promise that resolves to the generated QR code as SafeHtml or SafeResourceUrl, or an empty string if generation fails or the input is falsy.
 *
 * @author Mofiro Jean
 */
@Pipe({
  name: 'qrCode',
  standalone: true
})
export class QRCodePipe implements PipeTransform {
  private sanitizer = inject(DomSanitizer);

  async transform(value: string, options: QRCodeOptions = {}): Promise<SafeHtml | SafeResourceUrl | ''> {
    const {
      elementType = 'svg',
      width = 200,
      errorCorrectionLevel = 'M',
      margin = 4,
      colorDark = '#000000ff',
      colorLight = '#ffffffff',
      scale = 4
    } = options;

    if (!value) {
      return '';
    }

    const config = {
      width,
      errorCorrectionLevel,
      margin,
      scale,
      color: { dark: colorDark, light: colorLight }
    };

    try {
      switch(elementType) {
        case 'svg': {
          const svg = await QrCode.toString(value, { ...config, type: 'svg'});
          return this.sanitizer.bypassSecurityTrustHtml(svg);
        }
        case 'canvas':
        case 'img': {
          const dataUrl = await QrCode.toDataURL(value, config);
          return this.sanitizer.bypassSecurityTrustResourceUrl(dataUrl);
        }
        default:
          throw new Error(`Unsupported elementType: ${elementType}`);
      }

    } catch (error) {
      console.error('QRCode generation failed:', error);
      return '';
    }
  }
}
