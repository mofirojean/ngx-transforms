import { Component, ChangeDetectionStrategy } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { TailPipe } from '@ngx-transforms';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';
import { TailPlayground } from '../../examples/tail-playground/tail-playground';

@Component({
  selector: 'app-tail-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TailPipe,
    JsonPipe,
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    AuthorCredit,
    Breadcrumb,
    TailPlayground,
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        Tail Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        Returns all elements except the first n. The mirror of the Initial pipe —
        skip the beginning, keep the rest.
      </p>

      <!-- Use Cases -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Common Use Cases</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold mt-0.5">1</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Skip Table Headers</h4>
                <p class="text-sm text-muted-foreground">Process CSV rows while skipping the header row.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-bold mt-0.5">2</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Notification History</h4>
                <p class="text-sm text-muted-foreground">Skip already-read notifications and show only the recent ones.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-bold mt-0.5">3</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Pagination Offset</h4>
                <p class="text-sm text-muted-foreground">Skip the first n pages when rendering paginated navigation.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-bold mt-0.5">4</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Chat Scroll</h4>
                <p class="text-sm text-muted-foreground">Skip older messages and render only the most recent conversation.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Interactive Example</h2>
      <app-macos-window title="Tail Playground">
        <app-tail-playground />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>
      <app-code-preview [code]="code" [language]="'typescript'">
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4">Tail Examples</h3>
            <div class="rounded-md bg-muted p-6 border border-border space-y-4">
              <div>
                <div class="text-xs text-muted-foreground mb-2">Default (skip first 1)</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ numbers | tail | json }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Skip first 2</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ numbers | tail:2 | json }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Skip CSV header</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ csvRows | tail | json }}</p>
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
              <td class="px-4 py-3 text-muted-foreground">unknown[]</td>
              <td class="px-4 py-3 font-mono text-xs">-</td>
              <td class="px-4 py-3 text-muted-foreground">The array to slice from the start</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">n</td>
              <td class="px-4 py-3 text-muted-foreground">number</td>
              <td class="px-4 py-3 font-mono text-xs">1</td>
              <td class="px-4 py-3 text-muted-foreground">Number of elements to skip from the beginning</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-bold my-8">Initial vs Tail</h2>
      <div class="rounded-md border border-border overflow-hidden">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border bg-muted/50">
              <th class="px-4 py-3 text-left font-semibold">Pipe</th>
              <th class="px-4 py-3 text-left font-semibold">Removes from</th>
              <th class="px-4 py-3 text-left font-semibold">Input</th>
              <th class="px-4 py-3 text-left font-semibold">Output (n=2)</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-border">
              <td class="px-4 py-3 font-mono text-xs">initial</td>
              <td class="px-4 py-3 text-muted-foreground">End</td>
              <td class="px-4 py-3 font-mono text-xs">[1, 2, 3, 4, 5]</td>
              <td class="px-4 py-3 font-mono text-xs">[1, 2, 3]</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">tail</td>
              <td class="px-4 py-3 text-muted-foreground">Start</td>
              <td class="px-4 py-3 font-mono text-xs">[1, 2, 3, 4, 5]</td>
              <td class="px-4 py-3 font-mono text-xs">[3, 4, 5]</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-bold my-8">Features</h2>
      <div class="rounded-md border border-border p-6 space-y-4">
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Configurable Skip Count</h4>
            <p class="text-sm text-muted-foreground">Skip 1 element (default) or any number from the start of the array.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Boundary Safe</h4>
            <p class="text-sm text-muted-foreground">Handles n=0 (keeps all), n >= length (returns empty), and negative values gracefully.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Immutable</h4>
            <p class="text-sm text-muted-foreground">Always returns a new array — the original data is never modified.</p>
          </div>
        </div>
      </div>

      <div class="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
        <app-author-credit author="Mofiro Jean" url="https://github.com/mofirojean" />
        <div class="flex gap-4">
          <app-next-prev-navigation
            [previous]="{ label: 'Shuffle', link: '/docs/pipes/shuffle' }"
            [next]="{ label: 'Truthify', link: '/docs/pipes/truthify' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class TailPage {
  numbers = [1, 2, 3, 4, 5];
  csvRows = ['Name,Email,Age', 'Alice,a@test.com,25', 'Bob,b@test.com,30', 'Carol,c@test.com,28'];

  code = [
    'import { Component } from \'@angular/core\';',
    'import { TailPipe } from \'ngx-transforms\';',
    '',
    '@Component({',
    '  selector: \'app-example\',',
    '  standalone: true,',
    '  imports: [TailPipe],',
    '  template: `',
    '    <!-- Skip first element (default) -->',
    '    <p>{{ items | tail }}</p>',
    '    <!-- [2, 3, 4, 5] -->',
    '',
    '    <!-- Skip first 3 -->',
    '    <p>{{ items | tail:3 }}</p>',
    '    <!-- [4, 5] -->',
    '',
    '    <!-- Skip CSV header row -->',
    '    @for (row of csvRows | tail; track $index) {',
    '      <tr>{{ row }}</tr>',
    '    }',
    '  `',
    '})',
    'export class ExampleComponent {',
    '  items = [1, 2, 3, 4, 5];',
    '  csvRows = [\'Name,Email\', \'Alice,a@test.com\', \'Bob,b@test.com\'];',
    '}',
  ].join('\n');
}