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
            <div class="p-6 bg-muted/30 rounded-lg">
              <h4 class="font-medium text-sm mb-4">Preview:</h4>
              <div class="space-y-2 font-mono text-xs">
                @for (log of sampleLogs; track log.id) {
                  <div class="flex items-center gap-3 p-2 rounded bg-background border border-border">
                    <span class="text-muted-foreground">{{ log.timestamp }}</span>
                    <span class="text-primary font-medium">{{ log.ip | ipAddressMask }}</span>
                    <span class="text-green-600">{{ log.method }}</span>
                    <span class="flex-1 text-muted-foreground">{{ log.path }}</span>
                    <span class="px-2 py-0.5 rounded" [class.bg-green-500/10]="log.status === 200" [class.text-green-600]="log.status === 200" [class.bg-blue-500/10]="log.status === 201" [class.text-blue-600]="log.status === 201">{{ log.status }}</span>
                  </div>
                }
              </div>
            </div>
          </app-code-preview>
        </div>

        <div class="rounded-lg border border-border p-6">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <span class="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 text-xs">2</span>
            User Session Display
          </h3>
          <app-code-preview [code]="sessionExample" [language]="'typescript'">
            <div class="p-6 bg-muted/30 rounded-lg">
              <h4 class="font-medium text-sm mb-4">Preview:</h4>
              <div class="max-w-md mx-auto rounded-lg border border-border bg-background p-6 space-y-4">
                <div class="flex items-center gap-3 pb-4 border-b border-border">
                  <div class="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white font-bold">
                    JD
                  </div>
                  <div>
                    <h5 class="font-semibold">{{ sessionData.user }}</h5>
                    <p class="text-xs text-muted-foreground">Active Session</p>
                  </div>
                </div>
                <div class="space-y-3">
                  <div class="flex items-start justify-between">
                    <span class="text-sm text-muted-foreground">Location:</span>
                    <span class="text-sm font-medium">{{ sessionData.location }}</span>
                  </div>
                  <div class="flex items-start justify-between">
                    <span class="text-sm text-muted-foreground">IP Address:</span>
                    <span class="text-sm font-mono font-medium">{{ sessionData.ip | ipAddressMask }}</span>
                  </div>
                  <div class="flex items-start justify-between">
                    <span class="text-sm text-muted-foreground">Device:</span>
                    <span class="text-sm font-medium">{{ sessionData.device }}</span>
                  </div>
                  <div class="flex items-start justify-between">
                    <span class="text-sm text-muted-foreground">Last Active:</span>
                    <span class="text-sm font-medium">{{ sessionData.lastActive }}</span>
                  </div>
                </div>
              </div>
            </div>
          </app-code-preview>
        </div>

        <div class="rounded-lg border border-border p-6">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <span class="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/10 text-green-600 text-xs">3</span>
            Conditional Masking (Admin View)
          </h3>
          <app-code-preview [code]="conditionalExample" [language]="'typescript'">
            <div class="space-y-4 p-6 bg-muted/30 rounded-lg">
              <h4 class="font-medium text-sm mb-4">Preview:</h4>
              <div class="space-y-3">
                @for (connection of sampleConnections; track connection.id) {
                  <div class="p-4 rounded-lg border border-border bg-background">
                    <div class="flex items-center justify-between mb-3">
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                          {{ connection.user.substring(0, 2).toUpperCase() }}
                        </div>
                        <div>
                          <div class="font-medium">{{ connection.user }}</div>
                          <div class="text-xs text-muted-foreground">{{ connection.lastSeen }}</div>
                        </div>
                      </div>
                      <span class="text-xs px-2 py-1 rounded-full" [class.bg-green-500/10]="connection.isAdmin" [class.text-green-600]="connection.isAdmin" [class.bg-orange-500/10]="!connection.isAdmin" [class.text-orange-600]="!connection.isAdmin">
                        {{ connection.isAdmin ? 'Admin View' : 'Regular View' }}
                      </span>
                    </div>
                    <div class="flex items-center gap-2 font-mono text-sm">
                      <span class="text-muted-foreground">IP:</span>
                      <span class="font-medium">{{ connection.ip | ipAddressMask:!connection.isAdmin }}</span>
                    </div>
                  </div>
                }
              </div>
            </div>
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

  // Sample data for Server Access Logs preview
  sampleLogs = [
    { id: 1, timestamp: '2024-01-15 14:23:45', ip: '192.168.1.45', method: 'GET', path: '/api/users', status: 200 },
    { id: 2, timestamp: '2024-01-15 14:24:12', ip: '10.0.2.128', method: 'POST', path: '/api/auth/login', status: 201 },
    { id: 3, timestamp: '2024-01-15 14:25:03', ip: '172.16.0.53', method: 'GET', path: '/api/products', status: 200 },
  ];

  // Sample data for User Session Display preview
  sessionData = {
    user: 'John Doe',
    location: 'New York, USA',
    ip: '192.168.1.100',
    device: 'Chrome on Windows',
    lastActive: '2 minutes ago'
  };

  // Sample data for Conditional Masking preview
  sampleConnections = [
    { id: 1, user: 'Alice Johnson', ip: '192.168.1.10', lastSeen: '2 minutes ago', isAdmin: true },
    { id: 2, user: 'Bob Smith', ip: '10.0.5.42', lastSeen: '5 minutes ago', isAdmin: false },
    { id: 3, user: 'Carol Williams', ip: '172.16.0.89', lastSeen: '10 minutes ago', isAdmin: false }
  ];
}
