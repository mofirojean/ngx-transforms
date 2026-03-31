import { Component, ChangeDetectionStrategy } from '@angular/core';
import { OrderByPipe } from '@ngx-transforms';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';
import { OrderByPlayground } from '../../examples/order-by-playground/order-by-playground';

@Component({
  selector: 'app-order-by-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    OrderByPipe,
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    AuthorCredit,
    Breadcrumb,
    OrderByPlayground,
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        OrderBy Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        Sorts an array by a property value with configurable direction.
        Handles strings, numbers, nulls, and nested keys automatically.
      </p>

      <!-- Use Cases -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Common Use Cases</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold mt-0.5">1</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Sortable Tables</h4>
                <p class="text-sm text-muted-foreground">Click column headers to sort data tables by any field.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-bold mt-0.5">2</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Leaderboards</h4>
                <p class="text-sm text-muted-foreground">Rank users by score, points, or performance metrics.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-bold mt-0.5">3</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Price Sorting</h4>
                <p class="text-sm text-muted-foreground">Sort products by price low-to-high or high-to-low.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-bold mt-0.5">4</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Alphabetical Lists</h4>
                <p class="text-sm text-muted-foreground">Sort contacts, categories, or any named items A-Z or Z-A.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Interactive Example</h2>
      <app-macos-window title="Sortable Employee Table">
        <app-order-by-playground />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>
      <app-code-preview [code]="code" [language]="'typescript'">
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4">OrderBy Examples</h3>
            <div class="rounded-md bg-muted p-6 border border-border space-y-4">
              <div>
                <div class="text-xs text-muted-foreground mb-2">Sort by name A-Z (default)</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ sampleUsers | orderBy:'name' }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Sort by age descending</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ sampleUsers | orderBy:'age':'desc' }}</p>
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
              <td class="px-4 py-3 text-muted-foreground">The array to sort</td>
            </tr>
            <tr class="border-b border-border">
              <td class="px-4 py-3 font-mono text-xs">key</td>
              <td class="px-4 py-3 text-muted-foreground">string</td>
              <td class="px-4 py-3 font-mono text-xs">-</td>
              <td class="px-4 py-3 text-muted-foreground">Property path to sort by (supports dot notation)</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">direction</td>
              <td class="px-4 py-3 text-muted-foreground">'asc' | 'desc'</td>
              <td class="px-4 py-3 font-mono text-xs">'asc'</td>
              <td class="px-4 py-3 text-muted-foreground">Sort direction — ascending or descending</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-bold my-8">Features</h2>
      <div class="rounded-md border border-border p-6 space-y-4">
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Smart Type Handling</h4>
            <p class="text-sm text-muted-foreground">Uses localeCompare for strings and numeric comparison for numbers automatically.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Null-Safe Sorting</h4>
            <p class="text-sm text-muted-foreground">Null and undefined values are pushed to the end of the list regardless of direction.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Dot Notation</h4>
            <p class="text-sm text-muted-foreground">Sort by nested properties like 'customer.name' or 'address.city'.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Immutable</h4>
            <p class="text-sm text-muted-foreground">Always returns a new sorted array — the original is never modified.</p>
          </div>
        </div>
      </div>

      <div class="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
        <app-author-credit author="Mofiro Jean" url="https://github.com/mofirojean" />
        <div class="flex gap-4">
          <app-next-prev-navigation
            [previous]="{ label: 'Initial', link: '/docs/pipes/initial' }"
            [next]="{ label: 'Pluck', link: '/docs/pipes/pluck' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class OrderByPage {
  sampleUsers = [
    { name: 'Carol', age: 28 },
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 },
  ];

  code = [
    'import { Component } from \'@angular/core\';',
    'import { OrderByPipe } from \'ngx-transforms\';',
    '',
    '@Component({',
    '  selector: \'app-example\',',
    '  standalone: true,',
    '  imports: [OrderByPipe],',
    '  template: `',
    '    <!-- Sort by name (A-Z default) -->',
    '    @for (user of users | orderBy:\'name\'; track user.id) {',
    '      <div>{{ user.name }}</div>',
    '    }',
    '',
    '    <!-- Sort by price descending -->',
    '    @for (product of products | orderBy:\'price\':\'desc\'; track product.id) {',
    '      <div>{{ product.name }} - {{ product.price }}</div>',
    '    }',
    '',
    '    <!-- Sortable table column -->',
    '    @for (row of data | orderBy:sortKey:sortDir; track row.id) {',
    '      <tr>{{ row.name }}</tr>',
    '    }',
    '  `',
    '})',
    'export class ExampleComponent {',
    '  sortKey = \'name\';',
    '  sortDir: \'asc\' | \'desc\' = \'asc\';',
    '  users = [...];',
    '  products = [...];',
    '  data = [...];',
    '}',
  ].join('\n');
}