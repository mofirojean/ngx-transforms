import { Component, ChangeDetectionStrategy } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { InitialPipe } from '@ngx-transforms';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';
import { InitialPlayground } from '../../examples/initial-playground/initial-playground';

@Component({
  selector: 'app-initial-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    InitialPipe,
    JsonPipe,
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    AuthorCredit,
    Breadcrumb,
    InitialPlayground,
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        Initial Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        Returns all elements of an array except the last n. Perfect for trimming trailing
        items like pagination controls, summary rows, or "complete" steps.
      </p>

      <!-- Use Cases -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Common Use Cases</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold mt-0.5">1</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Breadcrumbs</h4>
                <p class="text-sm text-muted-foreground">Show all breadcrumb segments except the current page (the last one).</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-bold mt-0.5">2</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Stepper Progress</h4>
                <p class="text-sm text-muted-foreground">Display completed steps without the final "Done" step in a multi-step form.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-bold mt-0.5">3</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Leaderboard Trimming</h4>
                <p class="text-sm text-muted-foreground">Show top performers and exclude bottom n entries from a ranked list.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-bold mt-0.5">4</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Log Trimming</h4>
                <p class="text-sm text-muted-foreground">Remove the most recent n entries from an activity log for "undo" previews.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Interactive Example</h2>
      <app-macos-window title="Initial Playground">
        <app-initial-playground />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>
      <app-code-preview [code]="code" [language]="'typescript'">
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4">Initial Examples</h3>
            <div class="rounded-md bg-muted p-6 border border-border space-y-4">
              <div>
                <div class="text-xs text-muted-foreground mb-2">Default (remove last 1)</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ numbers | initial | json }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Remove last 2</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ numbers | initial:2 | json }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Breadcrumbs without current page</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ breadcrumbs | initial | json }}</p>
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
              <td class="px-4 py-3 text-muted-foreground">The array to trim from the end</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">n</td>
              <td class="px-4 py-3 text-muted-foreground">number</td>
              <td class="px-4 py-3 font-mono text-xs">1</td>
              <td class="px-4 py-3 text-muted-foreground">Number of elements to exclude from the end</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-bold my-8">Features</h2>
      <div class="rounded-md border border-border p-6 space-y-4">
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Configurable Count</h4>
            <p class="text-sm text-muted-foreground">Remove 1 element (default) or any number from the end of the array.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Boundary Safe</h4>
            <p class="text-sm text-muted-foreground">Gracefully handles n=0 (keeps all), n >= length (returns empty), and negative values.</p>
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
            [previous]="{ label: 'Flatten', link: '/docs/pipes/flatten' }"
            [next]="{ label: 'Pluck', link: '/docs/pipes/pluck' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class InitialPage {
  numbers = [1, 2, 3, 4, 5];
  breadcrumbs = ['Home', 'Products', 'Electronics', 'iPhone 15'];

  code = [
    'import { Component } from \'@angular/core\';',
    'import { InitialPipe } from \'ngx-transforms\';',
    '',
    '@Component({',
    '  selector: \'app-example\',',
    '  standalone: true,',
    '  imports: [InitialPipe],',
    '  template: `',
    '    <!-- Remove last element (default) -->',
    '    <p>{{ items | initial }}</p>',
    '    <!-- [1, 2, 3, 4] -->',
    '',
    '    <!-- Remove last 2 elements -->',
    '    <p>{{ items | initial:2 }}</p>',
    '    <!-- [1, 2, 3] -->',
    '',
    '    <!-- Breadcrumbs without current page -->',
    '    @for (crumb of breadcrumbs | initial; track $index) {',
    '      <a>{{ crumb }}</a> <span>/</span>',
    '    }',
    '    <span>{{ breadcrumbs[breadcrumbs.length - 1] }}</span>',
    '  `',
    '})',
    'export class ExampleComponent {',
    '  items = [1, 2, 3, 4, 5];',
    '  breadcrumbs = [\'Home\', \'Products\', \'Electronics\', \'iPhone 15\'];',
    '}',
  ].join('\n');
}