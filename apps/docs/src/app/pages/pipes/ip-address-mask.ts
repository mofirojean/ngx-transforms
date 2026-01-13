import { Component } from '@angular/core';
import { IpAddressMaskPipe } from '@ngx-transforms';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { IpPrivacyManager } from '../../examples/ip-privacy-manager/ip-privacy-manager';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';

@Component({
  selector: 'app-ip-address-mask-page',
  standalone: true,
  imports: [
    IpAddressMaskPipe,
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    IpPrivacyManager,
    AuthorCredit,
    Breadcrumb,
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        IP Address Mask Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        A privacy-focused pipe that masks the last two octets of IPv4 addresses to protect user identity while
        maintaining network context. Essential for GDPR compliance and user privacy.
      </p>

      <!-- Use Cases -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Why Mask IP Addresses?</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold mt-0.5">1</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">GDPR Compliance</h4>
                <p class="text-sm text-muted-foreground">IP addresses are personal data under GDPR. Masking helps comply with privacy regulations.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-bold mt-0.5">2</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Public Logs</h4>
                <p class="text-sm text-muted-foreground">Display logs and analytics without exposing full IP addresses to staff or customers.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-bold mt-0.5">3</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Network Analysis</h4>
                <p class="text-sm text-muted-foreground">Maintain subnet information for network diagnostics while protecting individual devices.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-sm font-bold mt-0.5">4</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">User Dashboards</h4>
                <p class="text-sm text-muted-foreground">Show users their connection info without revealing precise device identification.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Interactive Example</h2>
      <app-macos-window title="IP Privacy Manager">
        <app-ip-privacy-manager />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>

      <app-code-preview [code]="code" [language]="'typescript'">
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4">Masking Examples</h3>
            <div class="rounded-md bg-muted p-6 border border-border space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <div class="text-xs text-muted-foreground mb-1">Original</div>
                  <code class="text-sm font-mono">192.168.1.100</code>
                </div>
                <div class="h-px flex-1 mx-4 bg-border"></div>
                <div>
                  <div class="text-xs text-muted-foreground mb-1">Masked</div>
                  <code class="font-mono text-primary font-bold">{{ '192.168.1.100' | ipAddressMask }}</code>
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <div class="text-xs text-muted-foreground mb-1">Original</div>
                  <code class="text-sm font-mono">10.0.5.42</code>
                </div>
                <div class="h-px flex-1 mx-4 bg-border"></div>
                <div>
                  <div class="text-xs text-muted-foreground mb-1">Masked</div>
                  <code class="font-mono text-primary font-bold">{{ '10.0.5.42' | ipAddressMask }}</code>
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <div class="text-xs text-muted-foreground mb-1">Unmasked (false)</div>
                  <code class="text-sm font-mono">8.8.8.8</code>
                </div>
                <div class="h-px flex-1 mx-4 bg-border"></div>
                <div>
                  <div class="text-xs text-muted-foreground mb-1">Result</div>
                  <code class="font-mono text-primary font-bold">{{ '8.8.8.8' | ipAddressMask: false }}</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </app-code-preview>

      <h2 class="text-2xl font-bold my-8">Real-World Scenarios</h2>
      <div class="space-y-4">
        <div class="rounded-lg border border-border p-6">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <span class="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 text-xs">1</span>
            Server Access Logs
          </h3>
          <app-code-preview [code]="logsExample" [language]="'typescript'">
            <div></div>
          </app-code-preview>
        </div>

        <div class="rounded-lg border border-border p-6">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <span class="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 text-xs">2</span>
            User Session Display
          </h3>
          <app-code-preview [code]="sessionExample" [language]="'typescript'">
            <div></div>
          </app-code-preview>
        </div>

        <div class="rounded-lg border border-border p-6">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <span class="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/10 text-green-600 text-xs">3</span>
            Conditional Masking (Admin View)
          </h3>
          <app-code-preview [code]="conditionalExample" [language]="'typescript'">
            <div></div>
          </app-code-preview>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Features</h2>
      <div class="rounded-md border border-border p-6 space-y-4">
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">IPv4 Validation</h4>
            <p class="text-sm text-muted-foreground">Validates input against IPv4 format before masking. Invalid IPs are returned unchanged.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Optional Masking</h4>
            <p class="text-sm text-muted-foreground">Pass a boolean flag to conditionally enable/disable masking based on user permissions or context.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Subnet Preservation</h4>
            <p class="text-sm text-muted-foreground">Keeps the first two octets visible, maintaining network context for troubleshooting.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Privacy by Design</h4>
            <p class="text-sm text-muted-foreground">Masking is enabled by default (true), following privacy-first principles.</p>
          </div>
        </div>
      </div>

      <div class="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
        <app-author-credit author="Mofiro Jean" url="https://github.com/mofirojean" />
        <div class="flex gap-4">
          <app-next-prev-navigation
            [previous]="{ label: 'Highlight', link: '/docs/pipes/highlight' }"
            [next]="{ label: 'Credit Card Mask', link: '/docs/pipes/credit-card-mask' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class IpAddressMask {
  code = `
import { Component } from '@angular/core';
import { IpAddressMaskPipe } from '@ngx-transforms';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [IpAddressMaskPipe],
  template: \`
    <!-- Basic masking (default) -->
    <p>{{ '192.168.1.100' | ipAddressMask }}</p>
    <!-- Output: 192.168.*.* -->

    <!-- Explicit masking -->
    <p>{{ '10.0.5.42' | ipAddressMask:true }}</p>
    <!-- Output: 10.0.*.* -->

    <!-- Disable masking -->
    <p>{{ '8.8.8.8' | ipAddressMask:false }}</p>
    <!-- Output: 8.8.8.8 -->
  \`
})
export class ExampleComponent {}
  `;

  logsExample = `
@Component({
  template: \`
    <div class="log-viewer">
      @for (log of accessLogs; track log.id) {
        <div class="log-entry">
          <span class="timestamp">{{ log.timestamp | date:'short' }}</span>
          <span class="ip">{{ log.ip | ipAddressMask }}</span>
          <span class="method">{{ log.method }}</span>
          <span class="path">{{ log.path }}</span>
          <span class="status">{{ log.status }}</span>
        </div>
      }
    </div>
  \`
})
export class ServerLogsComponent {
  accessLogs = [
    { id: 1, timestamp: new Date(), ip: '192.168.1.45', method: 'GET', path: '/api/users', status: 200 },
    { id: 2, timestamp: new Date(), ip: '10.0.2.128', method: 'POST', path: '/api/login', status: 201 }
  ];
}
  `;

  sessionExample = `
@Component({
  template: \`
    <div class="session-card">
      <h3>Active Session</h3>
      <div class="session-details">
        <div class="detail">
          <label>Location</label>
          <span>{{ session.location }}</span>
        </div>
        <div class="detail">
          <label>IP Address</label>
          <span class="font-mono">{{ session.ip | ipAddressMask }}</span>
        </div>
        <div class="detail">
          <label>Device</label>
          <span>{{ session.device }}</span>
        </div>
      </div>
    </div>
  \`
})
export class UserSessionComponent {
  session = {
    location: 'New York, USA',
    ip: '192.168.1.100',
    device: 'Chrome on Windows'
  };
}
  `;

  conditionalExample = `
@Component({
  template: \`
    <!-- Admin sees full IPs, users see masked IPs -->
    <table>
      @for (connection of connections; track connection.id) {
        <tr>
          <td>{{ connection.user }}</td>
          <td class="font-mono">
            {{ connection.ip | ipAddressMask:!isAdmin }}
          </td>
          <td>{{ connection.lastSeen | date }}</td>
        </tr>
      }
    </table>
  \`
})
export class NetworkMonitorComponent {
  isAdmin = false; // Set based on user role

  connections = [
    { id: 1, user: 'Alice', ip: '192.168.1.10', lastSeen: new Date() },
    { id: 2, user: 'Bob', ip: '192.168.1.25', lastSeen: new Date() }
  ];
}
  `;
}
