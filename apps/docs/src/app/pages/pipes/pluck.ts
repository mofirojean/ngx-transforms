import { Component, ChangeDetectionStrategy } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { PluckPipe } from '@ngx-transforms';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';
import { PluckPlayground } from '../../examples/pluck-playground/pluck-playground';

@Component({
  selector: 'app-pluck-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PluckPipe,
    JsonPipe,
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    AuthorCredit,
    Breadcrumb,
    PluckPlayground,
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        Pluck Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        Extracts a single property from every object in an array.
        Like .map(item => item.key) but directly in your template.
      </p>

      <!-- Use Cases -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Common Use Cases</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold mt-0.5">1</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Email Lists</h4>
                <p class="text-sm text-muted-foreground">Extract all emails from a contacts list for bulk operations.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-bold mt-0.5">2</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Batch API Calls</h4>
                <p class="text-sm text-muted-foreground">Pull all IDs from a selection for batch delete, update, or fetch.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-bold mt-0.5">3</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Filter Dropdowns</h4>
                <p class="text-sm text-muted-foreground">Extract all categories or tags for a filter select component.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-bold mt-0.5">4</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Calculations</h4>
                <p class="text-sm text-muted-foreground">Extract all prices or scores for sum, average, or chart data.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Interactive Example</h2>
      <app-macos-window title="Pluck Playground">
        <app-pluck-playground />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>
      <app-code-preview [code]="code" [language]="'typescript'">
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4">Pluck Examples</h3>
            <div class="rounded-md bg-muted p-6 border border-border space-y-4">
              <div>
                <div class="text-xs text-muted-foreground mb-2">Extract names</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ users | pluck:'name' | json }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Extract prices</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ products | pluck:'price' | json }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Nested property</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ orders | pluck:'customer.name' | json }}</p>
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
              <td class="px-4 py-3 text-muted-foreground">Array of objects to extract from</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">key</td>
              <td class="px-4 py-3 text-muted-foreground">string</td>
              <td class="px-4 py-3 font-mono text-xs">-</td>
              <td class="px-4 py-3 text-muted-foreground">Property path to extract (supports dot notation)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-bold my-8">Features</h2>
      <div class="rounded-md border border-border p-6 space-y-4">
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Dot Notation</h4>
            <p class="text-sm text-muted-foreground">Access nested properties like 'customer.address.city' with ease.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Missing Key Safe</h4>
            <p class="text-sm text-muted-foreground">Returns undefined for objects that don't have the property, preserving array length.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Chainable</h4>
            <p class="text-sm text-muted-foreground">Chain with unique, without, or other array pipes for powerful data extraction.</p>
          </div>
        </div>
      </div>

      <div class="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
        <app-author-credit author="Mofiro Jean" url="https://github.com/mofirojean" />
        <div class="flex gap-4">
          <app-next-prev-navigation
            [previous]="{ label: 'Initial', link: '/docs/pipes/initial' }"
            [next]="{ label: 'Range', link: '/docs/pipes/range' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class PluckPage {
  users = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 },
    { name: 'Carol', age: 28 },
  ];
  products = [
    { name: 'Laptop', price: 999 },
    { name: 'Phone', price: 699 },
    { name: 'Tablet', price: 499 },
  ];
  orders = [
    { id: 1, customer: { name: 'Alice' } },
    { id: 2, customer: { name: 'Bob' } },
    { id: 3, customer: { name: 'Carol' } },
  ];

  code = [
    'import { Component } from \'@angular/core\';',
    'import { PluckPipe } from \'ngx-transforms\';',
    '',
    '@Component({',
    '  selector: \'app-example\',',
    '  standalone: true,',
    '  imports: [PluckPipe],',
    '  template: `',
    '    <!-- Extract all emails -->',
    '    <p>{{ contacts | pluck:\'email\' }}</p>',
    '    <!-- [\'alice@test.com\', \'bob@test.com\'] -->',
    '',
    '    <!-- Extract IDs for batch operations -->',
    '    <p>{{ selectedItems | pluck:\'id\' }}</p>',
    '',
    '    <!-- Nested property extraction -->',
    '    <p>{{ orders | pluck:\'customer.name\' }}</p>',
    '',
    '    <!-- Chain with unique for filter options -->',
    '    @for (cat of products | pluck:\'category\' | unique; track cat) {',
    '      <option>{{ cat }}</option>',
    '    }',
    '  `',
    '})',
    'export class ExampleComponent {',
    '  contacts = [...];',
    '  selectedItems = [...];',
    '  orders = [...];',
    '  products = [...];',
    '}',
  ].join('\n');
}
