import { Pipe, PipeTransform } from '@angular/core';

/**
 * IpAddressMaskPipe: Masks the last two octets of an IPv4 address.
 *
 * @param {string} value - The IPv4 address (e.g., 192.168.1.1).
 * @param {boolean} shouldMask - (Optional) Determines if masking should be applied. Defaults to true..
 *
 * @returns {string} - The masked IP address (e.g., 192.168.*.*).
 *
 * @example
 * {{ '192.168.1.1' | ipAddressMask }} // Outputs: 192.168.*.*
 * {{ '10.0.0.255' | ipAddressMask }} // Outputs: 10.0.*.*
 *
 * @author Mofiro Jean
 */
@Pipe({
  name: 'ipAddressMask',
  standalone: true
})
export class IpAddressMaskPipe implements PipeTransform {

  transform(value: string, shouldMask: boolean = true): string {
    if (!value || !/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(value)) {
      return value;
    }
    if (shouldMask) {
      const parts = value.split('.');
      return `${parts[0]}.${parts[1]}.*.*`;
    }
    return value;
  }
}
