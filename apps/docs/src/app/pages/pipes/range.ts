import { Component, ChangeDetectionStrategy } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { RangePipe } from '@ngx-transforms';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';
import { RangePlayground } from '../../examples/range-playground/range-playground';

@Component({
  selector: 'app-range-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RangePipe,
    JsonPipe,
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    AuthorCredit,
    Breadcrumb,
    RangePlayground,
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        Range Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        Generates a numeric sequence array from a number. No more
        Array.from() or spread hacks in your components.
      </p>

      <!-- Use Cases -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Common Use Cases</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold mt-0.5">1</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Pagination</h4>
                <p class="text-sm text-muted-foreground">Generate page number buttons from a total page count.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-bold mt-0.5">2</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Star Ratings</h4>
                <p class="text-sm text-muted-foreground">Render 1-5 stars for rating components without hardcoded arrays.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-bold mt-0.5">3</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Skeleton Loaders</h4>
                <p class="text-sm text-muted-foreground">Repeat placeholder cards while data is loading.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-bold mt-0.5">4</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Grid Placeholders</h4>
                <p class="text-sm text-muted-foreground">Fill empty grid slots or generate row/column numbers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Interactive Example</h2>
      <app-macos-window title="Range Playground">
        <app-range-playground />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>
      <app-code-preview [code]="code" [language]="'typescript'">
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4">Range Examples</h3>
            <div class="rounded-md bg-muted p-6 border border-border space-y-4">
              <div>
                <div class="text-xs text-muted-foreground mb-2">Default (0 to 4)</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ 5 | range | json }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Start from 1</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ 5 | range:1 | json }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Even numbers</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ 5 | range:0:2 | json }}</p>
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
              <td class="px-4 py-3 text-muted-foreground">How many numbers to generate</td>
            </tr>
            <tr class="border-b border-border">
              <td class="px-4 py-3 font-mono text-xs">start</td>
              <td class="px-4 py-3 text-muted-foreground">number</td>
              <td class="px-4 py-3 font-mono text-xs">0</td>
              <td class="px-4 py-3 text-muted-foreground">The first number in the sequence</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">step</td>
              <td class="px-4 py-3 text-muted-foreground">number</td>
              <td class="px-4 py-3 font-mono text-xs">1</td>
              <td class="px-4 py-3 text-muted-foreground">The increment between numbers</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-bold my-8">Features</h2>
      <div class="rounded-md border border-border p-6 space-y-4">
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Flexible Sequences</h4>
            <p class="text-sm text-muted-foreground">Control start, step, and count to generate any numeric pattern.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Template-Only</h4>
            <p class="text-sm text-muted-foreground">No component arrays needed — generate sequences directly in your template.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Pure Pipe</h4>
            <p class="text-sm text-muted-foreground">Same input always produces the same output — Angular caches the result.</p>
          </div>
        </div>
      </div>

      <div class="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
        <app-author-credit author="Mofiro Jean" url="https://github.com/mofirojean" />
        <div class="flex gap-4">
          <app-next-prev-navigation
            [previous]="{ label: 'Initial', link: '/docs/pipes/initial' }"
            [next]="{ label: 'Reverse', link: '/docs/pipes/reverse' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class RangePage {
  code = [
    'import { Component } from \'@angular/core\';',
    'import { RangePipe } from \'ngx-transforms\';',
    '',
    '@Component({',
    '  selector: \'app-example\',',
    '  standalone: true,',
    '  imports: [RangePipe],',
    '  template: `',
    '    <!-- Star rating -->',
    '    @for (star of 5 | range:1; track star) {',
    '      <span [class.filled]="star <= rating">★</span>',
    '    }',
    '',
    '    <!-- Skeleton loaders -->',
    '    @for (i of 6 | range; track i) {',
    '      <div class="skeleton-card"></div>',
    '    }',
    '',
    '    <!-- Pagination -->',
    '    @for (page of totalPages | range:1; track page) {',
    '      <button [class.active]="page === currentPage">',
    '        {{ page }}',
    '      </button>',
    '    }',
    '  `',
    '})',
    'export class ExampleComponent {',
    '  rating = 3;',
    '  totalPages = 8;',
    '  currentPage = 1;',
    '}',
  ].join('\n');
}
