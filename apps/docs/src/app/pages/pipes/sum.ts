import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SumPipe } from '@ngx-transforms';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';
import { SumPlayground } from '../../examples/sum-playground/sum-playground';

@Component({
  selector: 'app-sum-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SumPipe,
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    AuthorCredit,
    Breadcrumb,
    SumPlayground,
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        Sum Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        Returns the sum of all numeric values in an array. Supports object arrays
        with property keys and dot notation for nested values.
      </p>

      <!-- Use Cases -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Common Use Cases</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold mt-0.5">1</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Shopping Cart Total</h4>
                <p class="text-sm text-muted-foreground">Calculate the total price of all items in a cart.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-bold mt-0.5">2</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Score Totals</h4>
                <p class="text-sm text-muted-foreground">Add up points, grades, or scores across multiple entries.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-bold mt-0.5">3</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Invoice Line Items</h4>
                <p class="text-sm text-muted-foreground">Sum up line item amounts to display an invoice total.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-bold mt-0.5">4</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Resource Aggregation</h4>
                <p class="text-sm text-muted-foreground">Total up hours, bandwidth, or any cumulative metric.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Interactive Example</h2>
      <app-macos-window title="Sum Playground">
        <app-sum-playground />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>
      <app-code-preview [code]="code" [language]="'typescript'">
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4">Sum Examples</h3>
            <div class="rounded-md bg-muted p-6 border border-border space-y-4">
              <div>
                <div class="text-xs text-muted-foreground mb-2">Sum of numbers</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ numbers | sum }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Total price (by key)</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ products | sum:'price' }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Nested property total</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ orders | sum:'meta.total' }}</p>
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
              <td class="px-4 py-3 text-muted-foreground">The array to evaluate</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">key</td>
              <td class="px-4 py-3 text-muted-foreground">string</td>
              <td class="px-4 py-3 font-mono text-xs">-</td>
              <td class="px-4 py-3 text-muted-foreground">Optional property path for object arrays (supports dot notation)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-bold my-8">Features</h2>
      <div class="rounded-md border border-border p-6 space-y-4">
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Object Support</h4>
            <p class="text-sm text-muted-foreground">Sum values by any property, including nested paths with dot notation.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Type Safe</h4>
            <p class="text-sm text-muted-foreground">Filters out non-number and NaN values automatically — no runtime errors.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Handles Edge Cases</h4>
            <p class="text-sm text-muted-foreground">Negative numbers, decimals, zero, and mixed-type arrays all work correctly.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Null Safe</h4>
            <p class="text-sm text-muted-foreground">Returns undefined for null, undefined, or empty arrays.</p>
          </div>
        </div>
      </div>

      <div class="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
        <app-author-credit author="Mofiro Jean" url="https://github.com/mofirojean" />
        <div class="flex gap-4">
          <app-next-prev-navigation
            [previous]="{ label: 'Max', link: '/docs/pipes/max' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class SumPage {
  numbers = [10, 20, 30, 40, 50];
  products = [
    { name: 'Laptop', price: 999 },
    { name: 'Mouse', price: 29 },
    { name: 'Monitor', price: 450 },
  ];
  orders = [
    { id: 1, meta: { total: 150 } },
    { id: 2, meta: { total: 45 } },
    { id: 3, meta: { total: 200 } },
  ];

  code = [
    "import { Component } from '@angular/core';",
    "import { SumPipe } from 'ngx-transforms';",
    '',
    '@Component({',
    "  selector: 'app-example',",
    '  standalone: true,',
    '  imports: [SumPipe],',
    '  template: `',
    '    <!-- Sum of numbers -->',
    '    <p>Total: {{ scores | sum }}</p>',
    '',
    '    <!-- Total price -->',
    "    <p>Cart: {{ items | sum:'price' }}</p>",
    '',
    '    <!-- Nested property -->',
    "    <p>Grand total: {{ orders | sum:'meta.total' }}</p>",
    '  `',
    '})',
    'export class ExampleComponent {',
    '  scores = [85, 92, 67, 94, 71];',
    '  items = [',
    "    { name: 'Laptop', price: 999 },",
    "    { name: 'Mouse', price: 29 },",
    '  ];',
    '  orders = [',
    '    { id: 1, meta: { total: 150 } },',
    '    { id: 2, meta: { total: 45 } },',
    '  ];',
    '}',
  ].join('\n');
}