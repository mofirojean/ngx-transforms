import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RoundPipe } from '@ngx-transforms';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';
import { RoundPlayground } from '../../examples/round-playground/round-playground';

@Component({
  selector: 'app-round-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RoundPipe,
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    AuthorCredit,
    Breadcrumb,
    RoundPlayground,
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        Round Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        Rounds a number to the nearest value at the specified number of decimal places.
        Uses Math.round internally rounds half-up.
      </p>

      <!-- Use Cases -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Common Use Cases</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold mt-0.5">1</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Display Prices</h4>
                <p class="text-sm text-muted-foreground">Round calculated totals to the nearest cent for clean display.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-bold mt-0.5">2</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Statistics</h4>
                <p class="text-sm text-muted-foreground">Round averages, means, and computed metrics for readable output.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-bold mt-0.5">3</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Chart Axis Labels</h4>
                <p class="text-sm text-muted-foreground">Format numbers on graph tick marks without visual noise.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-bold mt-0.5">4</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Sensor Data</h4>
                <p class="text-sm text-muted-foreground">Clean up noisy sensor readings to a meaningful precision.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Interactive Example</h2>
      <app-macos-window title="Round Playground">
        <app-round-playground />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>
      <app-code-preview [code]="code" [language]="'typescript'">
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4">Round Examples</h3>
            <div class="rounded-md bg-muted p-6 border border-border space-y-4">
              <div>
                <div class="text-xs text-muted-foreground mb-2">Round to integer (no precision)</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ 4.5 | round }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Round to 2 decimals</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ 4.567 | round:2 }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Round half-up at 2 decimals</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ 0.125 | round:2 }}</p>
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
              <td class="px-4 py-3 text-muted-foreground">The number to round</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">precision</td>
              <td class="px-4 py-3 text-muted-foreground">number</td>
              <td class="px-4 py-3 font-mono text-xs">0</td>
              <td class="px-4 py-3 text-muted-foreground">Number of decimal places to preserve</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-bold my-8">Features</h2>
      <div class="rounded-md border border-border p-6 space-y-4">
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Precision Control</h4>
            <p class="text-sm text-muted-foreground">Round to any number of decimal places — 0 (integer) through any value you need.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Half-up Rounding</h4>
            <p class="text-sm text-muted-foreground">Follows JavaScript's Math.round behavior — halves round up toward positive infinity.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Handles Negatives</h4>
            <p class="text-sm text-muted-foreground">Negative numbers round to the nearest value correctly.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Null Safe</h4>
            <p class="text-sm text-muted-foreground">Returns undefined for null, undefined, NaN, or invalid precision values.</p>
          </div>
        </div>
      </div>

      <div class="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
        <app-author-credit author="Mofiro Jean" url="https://github.com/mofirojean" />
        <div class="flex gap-4">
          <app-next-prev-navigation
            [previous]="{ label: 'Floor', link: '/docs/pipes/floor' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class RoundPage {
  code = [
    "import { Component } from '@angular/core';",
    "import { RoundPipe } from 'ngx-transforms';",
    '',
    '@Component({',
    "  selector: 'app-example',",
    '  standalone: true,',
    '  imports: [RoundPipe],',
    '  template: `',
    '    <!-- Round to integer -->',
    '    <p>Score: {{ rawScore | round }}</p>',
    '',
    '    <!-- Round price to 2 decimals -->',
    '    <p>Total: \${{ subtotal | round:2 }}</p>',
    '',
    '    <!-- Round rating to 1 decimal -->',
    '    <p>{{ averageRating | round:1 }} stars</p>',
    '  `',
    '})',
    'export class ExampleComponent {',
    '  rawScore = 87.6;',
    '  subtotal = 19.995;',
    '  averageRating = 4.267;',
    '}',
  ].join('\n');
}
