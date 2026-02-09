import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { DeviceTypePipe } from '@ngx-transforms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideSmartphone,
  lucideTablet,
  lucideMonitor,
  lucideHelpCircle,
  lucideRefreshCw,
} from '@ng-icons/lucide';

interface UserAgentPreset {
  label: string;
  userAgent: string;
  expectedDevice: string;
}

@Component({
  selector: 'app-device-detector',
  standalone: true,
  imports: [HlmInputImports, HlmLabelImports, HlmButtonImports, NgIcon],
  providers: [
    provideIcons({
      lucideSmartphone,
      lucideTablet,
      lucideMonitor,
      lucideHelpCircle,
      lucideRefreshCw,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-6 w-full p-4 md:p-6">
      <div class="text-center">
        <h3 class="text-xl font-semibold tracking-tight">Device Detector</h3>
        <p class="text-muted-foreground mt-1 text-sm">
          Detect device types from user agent strings for responsive design and analytics.
        </p>
      </div>

      <!-- Current Device -->
      <div class="rounded-lg border border-primary/30 bg-primary/5 p-4 text-center">
        <div class="text-xs text-muted-foreground mb-2">Your Current Device</div>
        <div class="flex items-center justify-center gap-2">
          <ng-icon [name]="getDeviceIcon(currentDevice)" class="h-6 w-6 text-primary" />
          <span class="text-lg font-bold capitalize text-primary">{{ currentDevice }}</span>
        </div>
      </div>

      <!-- UA Presets -->
      <div>
        <label hlmLabel class="text-xs text-muted-foreground mb-2 block">Test User Agents</label>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
          @for (preset of presets; track preset.label) {
            <button
              hlmBtn
              variant="outline"
              size="sm"
              (click)="loadPreset(preset)"
              class="text-xs gap-1.5"
            >
              <ng-icon [name]="getDeviceIcon(preset.expectedDevice)" class="h-3.5 w-3.5" />
              {{ preset.label }}
            </button>
          }
        </div>
      </div>

      <!-- Custom Input -->
      <div class="grid w-full gap-1.5">
        <div class="flex items-center justify-between">
          <label hlmLabel for="ua-input">Custom User Agent</label>
          <button
            hlmBtn
            variant="ghost"
            size="sm"
            (click)="resetToCurrentDevice()"
            class="text-xs gap-1 h-7"
          >
            <ng-icon name="lucideRefreshCw" class="h-3 w-3" />
            Reset
          </button>
        </div>
        <textarea
          hlmInput
          id="ua-input"
          rows="3"
          class="w-full resize-none font-mono text-xs"
          [value]="customUserAgent()"
          (input)="onInput($event)"
          placeholder="Paste a user agent string here..."
        ></textarea>
      </div>

      <!-- Detection Result -->
      <div class="rounded-lg border border-border overflow-hidden">
        <div class="bg-muted/50 px-4 py-2 border-b border-border">
          <span class="text-sm font-medium">Detection Result</span>
        </div>
        <div class="p-6 flex flex-col items-center gap-4">
          <div
            class="flex h-20 w-20 items-center justify-center rounded-2xl"
            [class.bg-blue-500/10]="detectedDevice() === 'mobile'"
            [class.bg-purple-500/10]="detectedDevice() === 'tablet'"
            [class.bg-green-500/10]="detectedDevice() === 'desktop'"
            [class.bg-muted]="detectedDevice() === 'unknown'"
          >
            <ng-icon
              [name]="getDeviceIcon(detectedDevice())"
              class="h-10 w-10"
              [class.text-blue-500]="detectedDevice() === 'mobile'"
              [class.text-purple-500]="detectedDevice() === 'tablet'"
              [class.text-green-500]="detectedDevice() === 'desktop'"
              [class.text-muted-foreground]="detectedDevice() === 'unknown'"
            />
          </div>
          <div class="text-center">
            <span
              class="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold capitalize"
              [class.bg-blue-500/10]="detectedDevice() === 'mobile'"
              [class.text-blue-600]="detectedDevice() === 'mobile'"
              [class.dark:text-blue-400]="detectedDevice() === 'mobile'"
              [class.bg-purple-500/10]="detectedDevice() === 'tablet'"
              [class.text-purple-600]="detectedDevice() === 'tablet'"
              [class.dark:text-purple-400]="detectedDevice() === 'tablet'"
              [class.bg-green-500/10]="detectedDevice() === 'desktop'"
              [class.text-green-600]="detectedDevice() === 'desktop'"
              [class.dark:text-green-400]="detectedDevice() === 'desktop'"
              [class.bg-muted]="detectedDevice() === 'unknown'"
              [class.text-muted-foreground]="detectedDevice() === 'unknown'"
            >
              {{ detectedDevice() }}
            </span>
          </div>
        </div>
      </div>

      <!-- All Device Types -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        @for (type of deviceTypes; track type.name) {
          <div
            class="rounded-lg border p-3 text-center transition-colors"
            [class.border-primary]="detectedDevice() === type.name"
            [class.bg-primary/5]="detectedDevice() === type.name"
            [class.border-border]="detectedDevice() !== type.name"
          >
            <ng-icon [name]="type.icon" class="h-5 w-5 mx-auto mb-1" [class.text-primary]="detectedDevice() === type.name" [class.text-muted-foreground]="detectedDevice() !== type.name" />
            <div class="text-xs font-medium capitalize" [class.text-primary]="detectedDevice() === type.name">{{ type.name }}</div>
          </div>
        }
      </div>
    </div>
  `,
})
export class DeviceDetector {
  private devicePipe = new DeviceTypePipe();

  currentDevice =
    typeof navigator !== 'undefined'
      ? this.devicePipe.transform(navigator.userAgent)
      : 'unknown';

  customUserAgent = signal(
    typeof navigator !== 'undefined' ? navigator.userAgent : ''
  );

  detectedDevice = computed(() =>
    this.devicePipe.transform(this.customUserAgent())
  );

  deviceTypes = [
    { name: 'mobile', icon: 'lucideSmartphone' },
    { name: 'tablet', icon: 'lucideTablet' },
    { name: 'desktop', icon: 'lucideMonitor' },
    { name: 'unknown', icon: 'lucideHelpCircle' },
  ];

  presets: UserAgentPreset[] = [
    {
      label: 'iPhone',
      userAgent:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
      expectedDevice: 'mobile',
    },
    {
      label: 'Android Phone',
      userAgent:
        'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
      expectedDevice: 'mobile',
    },
    {
      label: 'iPad',
      userAgent:
        'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
      expectedDevice: 'tablet',
    },
    {
      label: 'Desktop Chrome',
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      expectedDevice: 'desktop',
    },
    {
      label: 'Desktop Firefox',
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0',
      expectedDevice: 'desktop',
    },
    {
      label: 'Empty (Unknown)',
      userAgent: '',
      expectedDevice: 'unknown',
    },
  ];

  getDeviceIcon(device: string): string {
    switch (device) {
      case 'mobile':
        return 'lucideSmartphone';
      case 'tablet':
        return 'lucideTablet';
      case 'desktop':
        return 'lucideMonitor';
      default:
        return 'lucideHelpCircle';
    }
  }

  onInput(event: Event): void {
    this.customUserAgent.set((event.target as HTMLTextAreaElement).value);
  }

  loadPreset(preset: UserAgentPreset): void {
    this.customUserAgent.set(preset.userAgent);
  }

  resetToCurrentDevice(): void {
    this.customUserAgent.set(
      typeof navigator !== 'undefined' ? navigator.userAgent : ''
    );
  }
}
