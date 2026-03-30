import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FilterByPipe } from '@ngx-transforms';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';
import { FilterByPlayground } from '../../examples/filter-by-playground/filter-by-playground';

@Component({
  selector: 'app-filter-by-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FilterByPipe,
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    AuthorCredit,
    Breadcrumb,
    FilterByPlayground,
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        FilterBy Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        Filters arrays by matching a search term against object properties.
        Case-insensitive, partial matching, with support for nested keys and full-object search.
      </p>

      <!-- Use Cases -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Common Use Cases</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold mt-0.5">1</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Search Tables</h4>
                <p class="text-sm text-muted-foreground">Filter data table rows as the user types in a search box.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-bold mt-0.5">2</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Autocomplete</h4>
                <p class="text-sm text-muted-foreground">Filter dropdown options as the user types for typeahead suggestions.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-bold mt-0.5">3</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">List Filtering</h4>
                <p class="text-sm text-muted-foreground">Filter contact lists, product catalogs, or any collection by keyword.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-bold mt-0.5">4</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Category Filtering</h4>
                <p class="text-sm text-muted-foreground">Filter items by a specific property like role, status, or department.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Interactive Example</h2>
      <app-macos-window title="Employee Directory">
        <app-filter-by-playground />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>
      <app-code-preview [code]="code" [language]="'typescript'">
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4">FilterBy Examples</h3>
            <div class="rounded-md bg-muted p-6 border border-border space-y-4">
              <div>
                <div class="text-xs text-muted-foreground mb-2">Filter by name</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ sampleUsers | filterBy:'alice':'name' }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Search all fields</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ sampleUsers | filterBy:'admin' }}</p>
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
              <td class="px-4 py-3 text-muted-foreground">The array to filter</td>
            </tr>
            <tr class="border-b border-border">
              <td class="px-4 py-3 font-mono text-xs">search</td>
              <td class="px-4 py-3 text-muted-foreground">string</td>
              <td class="px-4 py-3 font-mono text-xs">-</td>
              <td class="px-4 py-3 text-muted-foreground">The search term to match against</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">key</td>
              <td class="px-4 py-3 text-muted-foreground">string</td>
              <td class="px-4 py-3 font-mono text-xs">undefined</td>
              <td class="px-4 py-3 text-muted-foreground">Property to search. Omit to search all string properties.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-bold my-8">Features</h2>
      <div class="rounded-md border border-border p-6 space-y-4">
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Case-Insensitive Partial Matching</h4>
            <p class="text-sm text-muted-foreground">Searching "ali" matches "Alice" — natural search behavior out of the box.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Full-Object Search</h4>
            <p class="text-sm text-muted-foreground">Omit the key to search across all string, number, and boolean properties recursively.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Dot Notation</h4>
            <p class="text-sm text-muted-foreground">Filter by nested properties like 'address.city' or 'meta.status'.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Empty Search = No Filter</h4>
            <p class="text-sm text-muted-foreground">An empty search term returns the full array — safe to bind directly to an input.</p>
          </div>
        </div>
      </div>

      <div class="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
        <app-author-credit author="Mofiro Jean" url="https://github.com/mofirojean" />
        <div class="flex gap-4">
          <app-next-prev-navigation
            [previous]="{ label: 'Chunk', link: '/docs/pipes/chunk' }"
            [next]="{ label: 'Flatten', link: '/docs/pipes/flatten' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class FilterByPage {
  sampleUsers = [
    { name: 'Alice', role: 'admin' },
    { name: 'Bob', role: 'editor' },
    { name: 'Carol', role: 'admin' },
  ];

  code = [
    'import { Component } from \'@angular/core\';',
    'import { FilterByPipe } from \'ngx-transforms\';',
    '',
    '@Component({',
    '  selector: \'app-example\',',
    '  standalone: true,',
    '  imports: [FilterByPipe],',
    '  template: `',
    '    <input [(ngModel)]="search" placeholder="Search..." />',
    '',
    '    <!-- Filter by specific property -->',
    '    @for (user of users | filterBy:search:\'name\'; track user.id) {',
    '      <div>{{ user.name }} - {{ user.role }}</div>',
    '    }',
    '',
    '    <!-- Search all properties -->',
    '    @for (item of items | filterBy:search; track $index) {',
    '      <div>{{ item.name }}</div>',
    '    }',
    '',
    '    <!-- Nested property -->',
    '    @for (order of orders | filterBy:\'shipped\':\'meta.status\'; track order.id) {',
    '      <div>{{ order.id }}</div>',
    '    }',
    '  `',
    '})',
    'export class ExampleComponent {',
    '  search = \'\';',
    '  users = [...];',
    '  items = [...];',
    '  orders = [...];',
    '}',
  ].join('\n');
}
