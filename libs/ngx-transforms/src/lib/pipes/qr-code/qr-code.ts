import { Pipe, PipeTransform } from '@angular/core';
import * as QRCode from 'qrcode';

/**
 * QrCodePipe: Generates a QR code from a string.
 *
 * @param {string} value - The string to encode.
 * @param {QRCode.QRCodeToDataURLOptions} [options] - The QR code options.
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
  transform(value: string, options?: QRCode.QRCodeToDataURLOptions): Promise<string> {
    if (!value) {
      return Promise.resolve('');
    }

    return QRCode.toDataURL(value, options);
  }
}