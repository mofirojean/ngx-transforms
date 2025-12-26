import { Pipe, PipeTransform } from '@angular/core';

/**
 * CreditCardMaskPipe: Masks all but the last four digits of a string, optionally controlled by a boolean flag.
 * By default, masking is applied.
 *
 * @param {string} value - The input string to mask (e.g., credit card number).
 * @param {boolean} shouldMask - (Optional) Determines if masking should be applied. Defaults to true.
 * @returns {string} - The masked string or the original value if `shouldMask` is false or the value is too short.
 *
 * @example
 * {{ '1234567890123456' | creditCardMask }} // Outputs: **** **** **** 3456
 * {{ '1234-5678-9012-3456' | creditCardMask }} // Outputs: **** **** **** 3456
 * {{ '1234567890123456' | creditCardMask: true }} // Outputs: **** **** **** 3456
 * {{ '1234567890123456' | creditCardMask: false }} // Outputs: 1234567890123456
 *
 * @author Mofiro Jean
 */
@Pipe({
  name: 'creditCardMask',
  standalone: true,
})
export class CreditCardMaskPipe implements PipeTransform {
  transform(value: string | null | undefined, shouldMask: boolean = true): string | null | undefined {
    if (!value) {
      return value;
    }

    if (shouldMask) {
      const cleanedValue = value.replace(/[\s-]/g, '');
      const cleanedLength = cleanedValue.length;

      if (cleanedLength < 4) {
        return value;
      }

      const visibleDigits = cleanedValue.slice(-4);
      const maskedSection = '*'.repeat(cleanedLength - 4);
      const groupedMask = maskedSection.match(/.{1,4}/g)?.join(' ') ?? '';

      return `${groupedMask} ${visibleDigits}`.trim();
    }

    return value;
  }
}
