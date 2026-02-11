import { Pipe, PipeTransform } from '@angular/core';
import * as QRCode from 'qrcode';

export interface QrCodeOptions {
  version?: number;
  errorCorrectionLevel?: 'low' | 'medium' | 'quartile' | 'high' | 'L' | 'M' | 'Q' | 'H';
  maskPattern?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  margin?: number;
  scale?: number;
  width?: number;
  color?: {
    dark?: string;
    light?: string;
  };
  type?: 'image/png' | 'image/jpeg' | 'image/webp';
  rendererOpts?: {
    quality?: number;
  };
}

/**
 * QrCodePipe: Generates a QR code from a string.
 *
 * @param {string} value - The string to encode.
 * @param {QrCodeOptions} [options] - The QR code options.
 *
 * @returns {Promise<string>} - A promise that resolves with the QR code data URL.
 *
 * @example
 * <img [src]="'Hello, World!' | qrCode | async" />
 *
 * @author Mofiro Jean
 */
@Pipe({
  name: 'qrCode',
  standalone: true
})
export class QrCodePipe implements PipeTransform {
  transform(value: string, options?: QrCodeOptions): Promise<string> {
    if (!value) {
      return Promise.resolve('');
    }

    return QRCode.toDataURL(value, options as QRCode.QRCodeToDataURLOptions);
  }
}
