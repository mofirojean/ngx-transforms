import {Component, computed, inject, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Clipboard} from '@angular/cdk/clipboard';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {lucideCheck, lucideCopy, lucideDroplet, lucidePipette} from '@ng-icons/lucide';
import {ColorConvertPipe} from '@ngx-transforms';
import {HlmInputImports} from '@spartan-ng/helm/input';
import {HlmLabelImports} from '@spartan-ng/helm/label';
import {HlmIcon} from '@spartan-ng/helm/icon';

interface ColorFormat {
  label: string;
  value: string;
  type: 'hex' | 'rgb' | 'rgba';
}

@Component({
  selector: 'app-color-studio',
  standalone: true,
  imports: [
    FormsModule,
    HlmInputImports,
    HlmLabelImports,
    NgIcon,
    HlmIcon,
  ],
  providers: [
    provideIcons({lucideCopy, lucideCheck, lucidePipette, lucideDroplet}),
    ColorConvertPipe,
  ],
  templateUrl: './color-studio.html',
})
export class ColorStudio {
  hexColor = signal('#6366F1');
  copiedFormat = signal<string | null>(null);

  formats = computed<ColorFormat[]>(() => [
    {label: 'HEX', value: this.hexColor().toUpperCase(), type: 'hex'},
    {label: 'RGB', value: this.rgbColor(), type: 'rgb'},
    {label: 'RGBA', value: this.rgbaColor(), type: 'rgba'},
  ]);

  tints = computed(() => {
    const base = this.hexColor();
    return [0.2, 0.4, 0.6, 0.8].map((factor) => this.lighten(base, factor));
  });

  shades = computed(() => {
    const base = this.hexColor();
    return [0.2, 0.4, 0.6, 0.8].map((factor) => this.darken(base, factor));
  });

  private colorPipe = inject(ColorConvertPipe);
  private clipboard = inject(Clipboard);

  rgbColor = computed(() => this.colorPipe.transform(this.hexColor(), 'rgb'));
  rgbaColor = computed(() => this.colorPipe.transform(this.hexColor(), 'rgba'));

  onColorInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.hexColor.set(input.value);
  }

  onHexInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.trim();

    if (value && !value.startsWith('#')) {
      value = '#' + value;
    }

    if (/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(value)) {
      if (value.length === 4) {
        value = '#' + value[1] + value[1] + value[2] + value[2] + value[3] + value[3];
      }
      this.hexColor.set(value);
    }
  }

  copyToClipboard(value: string, format: string): void {
    this.clipboard.copy(value);
    this.copiedFormat.set(format);
    setTimeout(() => this.copiedFormat.set(null), 2000);
  }

  getContrastColor(hex: string): string {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return '#000000';
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  }

  private lighten(hex: string, factor: number): string {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return hex;

    const r = Math.round(rgb.r + (255 - rgb.r) * factor);
    const g = Math.round(rgb.g + (255 - rgb.g) * factor);
    const b = Math.round(rgb.b + (255 - rgb.b) * factor);

    return this.rgbToHex(r, g, b);
  }

  private darken(hex: string, factor: number): string {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return hex;

    const r = Math.round(rgb.r * (1 - factor));
    const g = Math.round(rgb.g * (1 - factor));
    const b = Math.round(rgb.b * (1 - factor));

    return this.rgbToHex(r, g, b);
  }

  private hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const match = hex.match(/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);
    if (!match) return null;
    return {
      r: parseInt(match[1], 16),
      g: parseInt(match[2], 16),
      b: parseInt(match[3], 16),
    };
  }

  private rgbToHex(r: number, g: number, b: number): string {
    return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();
  }
}
