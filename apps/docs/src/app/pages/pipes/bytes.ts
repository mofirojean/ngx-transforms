import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BytesPipe } from '@ngx-transforms';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';
import { BytesPlayground } from '../../examples/bytes-playground/bytes-playground';

@Component({
  selector: 'app-bytes-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    BytesPipe,
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    AuthorCredit,
    Breadcrumb,
    BytesPlayground,
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        Bytes Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        Formats a number of bytes into a human-readable string with appropriate units.
        Supports both decimal (KB, MB, GB) and binary (KiB, MiB, GiB) unit systems.
      </p>

      <!-- Use Cases -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Common Use Cases</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold mt-0.5">1</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">File Sizes</h4>
                <p class="text-sm text-muted-foreground">Display upload or download file sizes in a readable format.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-bold mt-0.5">2</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Storage Quota</h4>
                <p class="text-sm text-muted-foreground">Show used and available disk or cloud storage space.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-bold mt-0.5">3</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Memory Usage</h4>
                <p class="text-sm text-muted-foreground">Display RAM or heap usage in dashboards and monitoring tools.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-bold mt-0.5">4</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Network Transfer</h4>
                <p class="text-sm text-muted-foreground">Show bandwidth usage or API response sizes.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Interactive Example</h2>
      <app-macos-window title="Bytes Playground">
        <app-bytes-playground />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>
      <app-code-preview [code]="code" [language]="'typescript'">
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4">Bytes Examples</h3>
            <div class="rounded-md bg-muted p-6 border border-border space-y-4">
              <div>
                <div class="text-xs text-muted-foreground mb-2">File size (decimal)</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ 1536000 | bytes }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">With 2 decimal places</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ 1048576 | bytes:2 }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Binary units (1024-based)</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ 1073741824 | bytes:1:'binary' }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </app-code-preview>

      <h2 class="text-2xl font-bold my-8">Configuration</h2>
      <div class="rounded-md border border-border overflow-hidden">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border bg-muted/50">
              <th class="px-4 py-3 text-left font-semibold">Parameter</th>
              <th class="px-4 py-3 text-left font-semibold">Type</th>
              <th class="px-4 py-3 text-left font-semibold">Default</th>
              <th class="px-4 py-3 text-left font-semibold">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-border">
              <td class="px-4 py-3 font-mono text-xs">value</td>
              <td class="px-4 py-3 text-muted-foreground">number</td>
              <td class="px-4 py-3 font-mono text-xs">-</td>
              <td class="px-4 py-3 text-muted-foreground">The number of bytes to format</td>
            </tr>
            <tr class="border-b border-border">
              <td class="px-4 py-3 font-mono text-xs">decimals</td>
              <td class="px-4 py-3 text-muted-foreground">number</td>
              <td class="px-4 py-3 font-mono text-xs">1</td>
              <td class="px-4 py-3 text-muted-foreground">Number of decimal places in the output</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">base</td>
              <td class="px-4 py-3 text-muted-foreground">'decimal' | 'binary'</td>
              <td class="px-4 py-3 font-mono text-xs">'decimal'</td>
              <td class="px-4 py-3 text-muted-foreground">Unit system: 'decimal' (1000, KB) or 'binary' (1024, KiB)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-bold my-8">Features</h2>
      <div class="rounded-md border border-border p-6 space-y-4">
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Dual Unit Systems</h4>
            <p class="text-sm text-muted-foreground">Decimal (KB, MB, GB) and binary (KiB, MiB, GiB) units supported.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Precision Control</h4>
            <p class="text-sm text-muted-foreground">Configure decimal places for the formatted output.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Full Scale</h4>
            <p class="text-sm text-muted-foreground">Handles B through EB/EiB — from tiny files to enterprise storage.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Null Safe</h4>
            <p class="text-sm text-muted-foreground">Returns undefined for null, undefined, NaN, or negative inputs.</p>
          </div>
        </div>
      </div>

      <div class="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
        <app-author-credit author="Mofiro Jean" url="https://github.com/mofirojean" />
        <div class="flex gap-4">
          <app-next-prev-navigation
            [previous]="{ label: 'Degrees', link: '/docs/pipes/degrees' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class BytesPage {
  code = [
    "import { Component } from '@angular/core';",
    "import { BytesPipe } from 'ngx-transforms';",
    '',
    '@Component({',
    "  selector: 'app-example',",
    '  standalone: true,',
    '  imports: [BytesPipe],',
    '  template: `',
    '    <!-- Default (decimal, 1 decimal) -->',
    '    <p>Size: {{ fileSize | bytes }}</p>',
    '',
    '    <!-- With precision -->',
    '    <p>{{ diskUsed | bytes:2 }}</p>',
    '',
    '    <!-- Binary units -->',
    "    <p>RAM: {{ memoryBytes | bytes:1:'binary' }}</p>",
    '  `',
    '})',
    'export class ExampleComponent {',
    '  fileSize = 1536000;        // "1.5 MB"',
    '  diskUsed = 50000000000;    // "50.00 GB"',
    '  memoryBytes = 8589934592;  // "8.0 GiB"',
    '}',
  ].join('\n');
}
