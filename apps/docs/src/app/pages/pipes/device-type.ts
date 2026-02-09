import { Component } from '@angular/core';
import { DeviceTypePipe } from '@ngx-transforms';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { DeviceDetector } from '../../examples/device-detector/device-detector';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';

@Component({
  selector: 'app-device-type-page',
  standalone: true,
  imports: [
    DeviceTypePipe,
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    DeviceDetector,
    AuthorCredit,
    Breadcrumb,
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        Device Type Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        Detects the device type from a user agent string, returning 'mobile', 'tablet', 'desktop',
        or 'unknown'. Useful for responsive design decisions, analytics, and conditional content rendering.
      </p>

      <!-- Use Cases -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Common Use Cases</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold mt-0.5">1</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Responsive Content</h4>
                <p class="text-sm text-muted-foreground">Show different UI components or layouts based on the detected device type.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-bold mt-0.5">2</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Analytics Dashboards</h4>
                <p class="text-sm text-muted-foreground">Categorize visitor sessions by device type for traffic analysis.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-bold mt-0.5">3</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Feature Gating</h4>
                <p class="text-sm text-muted-foreground">Enable or disable features based on device capabilities (e.g., touch, hover).</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-bold mt-0.5">4</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Device-Specific Layouts</h4>
                <p class="text-sm text-muted-foreground">Serve optimized navigation patterns — bottom nav for mobile, sidebar for desktop.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Interactive Example</h2>
      <app-macos-window title="Device Detector">
        <app-device-detector />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>
      <app-code-preview [code]="code" [language]="'typescript'">
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4">Detection Examples</h3>
            <div class="rounded-md bg-muted p-6 border border-border space-y-4">
              <div>
                <div class="text-xs text-muted-foreground mb-2">Auto-detect current device</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm">
                    Current device:
                    <span class="font-mono font-bold text-primary capitalize">{{ '' | device }}</span>
                  </p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Custom user agent</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm">
                    iPhone UA:
                    <span class="font-mono font-bold text-primary">{{ iphoneUA | device }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </app-code-preview>

      <h2 class="text-2xl font-bold my-8">Return Values</h2>
      <div class="rounded-md border border-border overflow-hidden">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border bg-muted/50">
              <th class="px-4 py-3 text-left font-semibold">Value</th>
              <th class="px-4 py-3 text-left font-semibold">Description</th>
              <th class="px-4 py-3 text-left font-semibold">Matches</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-border">
              <td class="px-4 py-3 font-mono text-blue-600 dark:text-blue-400">'mobile'</td>
              <td class="px-4 py-3 text-muted-foreground">Smartphones and small mobile devices</td>
              <td class="px-4 py-3 text-xs text-muted-foreground">iPhone, Android mobile, BlackBerry, Windows Phone</td>
            </tr>
            <tr class="border-b border-border">
              <td class="px-4 py-3 font-mono text-purple-600 dark:text-purple-400">'tablet'</td>
              <td class="px-4 py-3 text-muted-foreground">Tablet devices</td>
              <td class="px-4 py-3 text-xs text-muted-foreground">iPad, Android tablet, Kindle, Nexus 7/10</td>
            </tr>
            <tr class="border-b border-border">
              <td class="px-4 py-3 font-mono text-green-600 dark:text-green-400">'desktop'</td>
              <td class="px-4 py-3 text-muted-foreground">Desktop and laptop computers</td>
              <td class="px-4 py-3 text-xs text-muted-foreground">Windows, macOS, Linux (non-mobile/tablet)</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-muted-foreground">'unknown'</td>
              <td class="px-4 py-3 text-muted-foreground">Empty or unrecognizable input</td>
              <td class="px-4 py-3 text-xs text-muted-foreground">Empty string, null input</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-bold my-8">Features</h2>
      <div class="rounded-md border border-border p-6 space-y-4">
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Auto-Detection</h4>
            <p class="text-sm text-muted-foreground">Defaults to the current browser's user agent when no value is provided.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Custom UA Support</h4>
            <p class="text-sm text-muted-foreground">Pass any user agent string to detect device type for analytics or testing.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">SSR Safe</h4>
            <p class="text-sm text-muted-foreground">Checks for navigator availability, safe for server-side rendering environments.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Type-Safe Return</h4>
            <p class="text-sm text-muted-foreground">Returns a typed DeviceType union ('mobile' | 'tablet' | 'desktop' | 'unknown').</p>
          </div>
        </div>
      </div>

      <div class="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
        <app-author-credit author="Mofiro Jean" url="https://github.com/mofirojean" />
        <div class="flex gap-4">
          <app-next-prev-navigation
            [previous]="{ label: 'Text to Speech', link: '/docs/pipes/text-to-speech' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class DeviceTypePage {
  iphoneUA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';

  code = `
import { Component } from '@angular/core';
import { DeviceTypePipe } from '@ngx-transforms';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [DeviceTypePipe],
  template: \`
    <!-- Auto-detect current device -->
    <p>Device: {{ '' | device }}</p>

    <!-- Conditional rendering -->
    @if ('' | device; as deviceType) {
      @if (deviceType === 'mobile') {
        <app-mobile-nav />
      } @else {
        <app-desktop-nav />
      }
    }

    <!-- With custom user agent (e.g., from analytics) -->
    <p>{{ userAgentString | device }}</p>
  \`
})
export class ExampleComponent {
  userAgentString = navigator.userAgent;
}
  `;
}
