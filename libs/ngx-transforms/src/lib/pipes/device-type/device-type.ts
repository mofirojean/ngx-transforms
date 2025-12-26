import { Pipe, PipeTransform } from '@angular/core';

/**
 * DeviceType: Defines the type of element to render the QR code.
 *
 * @typedef {'mobile' | 'tablet' | 'desktop' | 'unknown'} DeviceType
 *
 * @description
 * This type specifies the type of device in which the program is currently running on.
 * - 'mobile': Indicates that the device is mobile.
 * - 'tablet': Indicates that the device is a tablet.
 * - 'desktop': Indicates that the device is a desktop.
 * - 'unknown': Indicates an invalid or empty input.
 */
export type DeviceType = 'mobile' | 'tablet' | 'desktop' | 'unknown';

/**
 * DeviceTypePipe: Detects the device type based on the user agent string.
 *
 * @param {string} value - The user agent string (defaults to navigator.userAgent).
 *
 * @returns {'mobile' | 'tablet' | 'desktop' | 'unknown'} - The detected device type.
 *
 * @example
 * {{ '' | device }} // Outputs: 'mobile' (on a mobile device)
 * <div *ngIf="'' | device === 'desktop'">Desktop-only content</div>
 */
@Pipe({
  name: 'device',
  standalone: true
})
export class DeviceTypePipe implements PipeTransform {

  transform(value: string = typeof navigator !== 'undefined' ? navigator.userAgent : ''): DeviceType {
    if (!value) return 'unknown';

    const userAgent = value.toLowerCase();
    const isMobile = /mobile|android|iphone|ipod|blackberry|opera mini|iemobile|windows phone/i.test(userAgent);
    const isTablet = /ipad|tablet|kindle|playbook|silk|nexus 7|nexus 10|android(?!.*mobile)/i.test(userAgent);

    if (isMobile) return 'mobile';
    if (isTablet) return 'tablet';

    return 'desktop';
  }

}
