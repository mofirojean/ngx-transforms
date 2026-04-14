import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FloorPipe } from '@ngx-transforms';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';
import { FloorPlayground } from '../../examples/floor-playground/floor-playground';

@Component({
  selector: 'app-floor-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FloorPipe,
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    AuthorCredit,
    Breadcrumb,
    FloorPlayground,
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        Floor Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        Rounds a number down to the specified number of decimal places. Uses Math.floor
        internally — always rounds toward negative infinity.
      </p>

      <!-- Use Cases -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Common Use Cases</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold mt-0.5">1</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Reward Points</h4>
                <p class="text-sm text-muted-foreground">Truncate fractional points so users only see earned whole values.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-bold mt-0.5">2</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Rating Display</h4>
                <p class="text-sm text-muted-foreground">Show star ratings rounded down to avoid overpromising quality.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-bold mt-0.5">3</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Currency Truncation</h4>
                <p class="text-sm text-muted-foreground">Floor prices to 2 decimals so you never overcharge customers.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-bold mt-0.5">4</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Time Display</h4>
                <p class="text-sm text-muted-foreground">Floor elapsed minutes/hours so partial units are not counted.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Interactive Example</h2>
      <app-macos-window title="Floor Playground">
        <app-floor-playground />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>
      <app-code-preview [code]="code" [language]="'typescript'">
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4">Floor Examples</h3>
            <div class="rounded-md bg-muted p-6 border border-border space-y-4">
              <div>
                <div class="text-xs text-muted-foreground mb-2">Floor to integer (no precision)</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ 4.9 | floor }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Floor to 2 decimals</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ 4.567 | floor:2 }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Floor 0.999 to 1 decimal</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ 0.999 | floor:1 }}</p>
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
              <td class="px-4 py-3 text-muted-foreground">The number to round down</td>
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
            <p class="text-sm text-muted-foreground">Round down to any number of decimal places — 0 (integer) through any value you need.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Handles Negatives</h4>
            <p class="text-sm text-muted-foreground">Negative numbers round toward negative infinity (away from zero).</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Preserves Integers</h4>
            <p class="text-sm text-muted-foreground">Whole numbers and exact decimal values are returned unchanged.</p>
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
            [previous]="{ label: 'Ceil', link: '/docs/pipes/ceil' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class FloorPage {
  code = [
    "import { Component } from '@angular/core';",
    "import { FloorPipe } from 'ngx-transforms';",
    '',
    '@Component({',
    "  selector: 'app-example',",
    '  standalone: true,',
    '  imports: [FloorPipe],',
    '  template: `',
    '    <!-- Floor to integer -->',
    '    <p>Points: {{ rawPoints | floor }}</p>',
    '',
    '    <!-- Floor price to 2 decimals -->',
    '    <p>Price: \${{ rawPrice | floor:2 }}</p>',
    '',
    '    <!-- Floor rating to 1 decimal -->',
    '    <p>{{ rating | floor:1 }} stars</p>',
    '  `',
    '})',
    'export class ExampleComponent {',
    '  rawPoints = 99.7;',
    '  rawPrice = 19.999;',
    '  rating = 4.87;',
    '}',
  ].join('\n');
}