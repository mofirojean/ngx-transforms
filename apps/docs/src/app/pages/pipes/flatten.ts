import { Component, ChangeDetectionStrategy } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { Flatten } from '@ngx-transforms';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';
import { FlattenPlayground } from '../../examples/flatten-playground/flatten-playground';

@Component({
  selector: 'app-flatten-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Flatten,
    JsonPipe,
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    AuthorCredit,
    Breadcrumb,
    FlattenPlayground,
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        Flatten Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        Flattens nested arrays to a specified depth. Perfect for normalizing API responses,
        merging grouped data, and simplifying nested structures for display.
      </p>

      <!-- Use Cases -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Common Use Cases</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold mt-0.5">1</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">API Response Normalization</h4>
                <p class="text-sm text-muted-foreground">Flatten paginated or grouped API results into a single list for rendering.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-bold mt-0.5">2</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Multi-Select Aggregation</h4>
                <p class="text-sm text-muted-foreground">Merge selections from multiple form groups into one flat permissions list.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-bold mt-0.5">3</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Tag Collection</h4>
                <p class="text-sm text-muted-foreground">Gather tags from multiple posts or products into a single filterable list.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-bold mt-0.5">4</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">File Tree Display</h4>
                <p class="text-sm text-muted-foreground">Flatten a nested directory structure into a flat list for search or table views.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Interactive Example</h2>
      <app-macos-window title="Flatten Playground">
        <app-flatten-playground />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>
      <app-code-preview [code]="code" [language]="'typescript'">
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4">Flatten Examples</h3>
            <div class="rounded-md bg-muted p-6 border border-border space-y-4">
              <div>
                <div class="text-xs text-muted-foreground mb-2">Full flatten (default)</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ nested | flatten | json }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Depth 1</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ nested | flatten:1 | json }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Depth 0 (no change)</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ simple | flatten:0 | json }}</p>
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
              <td class="px-4 py-3 text-muted-foreground">The nested array to flatten</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">depth</td>
              <td class="px-4 py-3 text-muted-foreground">number</td>
              <td class="px-4 py-3 font-mono text-xs">Infinity</td>
              <td class="px-4 py-3 text-muted-foreground">How many levels of nesting to remove</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-bold my-8">Features</h2>
      <div class="rounded-md border border-border p-6 space-y-4">
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Configurable Depth</h4>
            <p class="text-sm text-muted-foreground">Control exactly how many nesting levels to flatten, from 0 (none) to Infinity (all).</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Zero Dependencies</h4>
            <p class="text-sm text-muted-foreground">Uses the native Array.flat() API — no external libraries, no bundle overhead.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Immutable</h4>
            <p class="text-sm text-muted-foreground">Always returns a new array — the original nested structure is never modified.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Null Safe</h4>
            <p class="text-sm text-muted-foreground">Gracefully returns an empty array for null, undefined, or non-array inputs.</p>
          </div>
        </div>
      </div>

      <div class="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
        <app-author-credit author="Mofiro Jean" url="https://github.com/mofirojean" />
        <div class="flex gap-4">
          <app-next-prev-navigation
            [previous]="{ label: 'Email Mask', link: '/docs/pipes/email-mask' }"
            [next]="{ label: 'Gravatar', link: '/docs/pipes/gravatar' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class FlattenPage {
  nested = [1, [2, [3, [4]]]];
  simple = [[1, 2], [3, 4]];

  code = `
import { Component } from '@angular/core';
import { Flatten } from 'ngx-transforms';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [Flatten],
  template: \`
    <!-- Full flatten (default) -->
    <p>{{ nested | flatten }}</p>
    <!-- [1, 2, 3, 4] -->

    <!-- Flatten 1 level -->
    <p>{{ nested | flatten:1 }}</p>
    <!-- [1, 2, [3, [4]]] -->

    <!-- Flatten 2 levels -->
    <p>{{ data | flatten:2 }}</p>
  \`
})
export class ExampleComponent {
  nested = [1, [2, [3, [4]]]];
  data = [['a', 'b'], ['c', ['d', 'e']]];
}
  `;
}