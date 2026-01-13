import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideEye,
  lucideEyeOff,
  lucideShield,
  lucideServer,
  lucideNetwork,
  lucideLock,
  lucideArrowRight,
  lucideInfo,
  lucideHome,
  lucideGlobe,
  lucideWifi,
  lucideCloud,
} from '@ng-icons/lucide';
import { IpAddressMaskPipe } from '@ngx-transforms';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmSeparatorImports } from '@spartan-ng/helm/separator';
import {HlmIcon} from '@spartan-ng/helm/icon';

interface IpExample {
  label: string;
  ip: string;
  icon: string;
}

interface IpValidation {
  valid: boolean;
  message: string;
}

@Component({
  selector: 'app-ip-privacy-manager',
  standalone: true,
  imports: [
    FormsModule,
    HlmInputImports,
    HlmLabelImports,
    HlmButtonImports,
    HlmSeparatorImports,
    NgIcon,
    IpAddressMaskPipe,
    HlmIcon
  ],
  providers: [
    provideIcons({
      lucideEye,
      lucideEyeOff,
      lucideShield,
      lucideServer,
      lucideNetwork,
      lucideLock,
      lucideArrowRight,
      lucideInfo,
      lucideHome,
      lucideGlobe,
      lucideWifi,
      lucideCloud,
    }),
  ],
  templateUrl: './ip-privacy-manager.html',
})
export class IpPrivacyManager {
  ipAddress = signal('192.168.1.100');
  maskingEnabled = signal(true);

  ipValidation = computed<IpValidation | null>(() => {
    const ip = this.ipAddress();
    if (!ip) {
      return null;
    }

    const ipv4Regex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
    const match = ip.match(ipv4Regex);

    if (!match) {
      return {
        valid: false,
        message: 'Invalid IPv4 format. Use format: xxx.xxx.xxx.xxx',
      };
    }

    const octets = [match[1], match[2], match[3], match[4]].map(Number);
    const invalidOctet = octets.find((octet) => octet < 0 || octet > 255);

    if (invalidOctet !== undefined) {
      return {
        valid: false,
        message: 'Each octet must be between 0 and 255',
      };
    }

    return {
      valid: true,
      message: '✓ Valid IPv4 address',
    };
  });

  ipExamples: IpExample[] = [
    {
      label: 'Private Network',
      ip: '192.168.1.1',
      icon: 'lucideHome',
    },
    {
      label: 'Local Gateway',
      ip: '10.0.0.1',
      icon: 'lucideWifi',
    },
    {
      label: 'Public DNS',
      ip: '8.8.8.8',
      icon: 'lucideGlobe',
    },
    {
      label: 'Cloudflare DNS',
      ip: '1.1.1.1',
      icon: 'lucideCloud',
    },
  ];

  toggleMasking(): void {
    this.maskingEnabled.update((current) => !current);
  }

  loadExample(ip: string): void {
    this.ipAddress.set(ip);
  }
}
