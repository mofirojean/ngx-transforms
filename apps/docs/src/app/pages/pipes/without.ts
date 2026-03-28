import { Component, ChangeDetectionStrategy } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { WithoutPipe } from '@ngx-transforms';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';
import { WithoutPlayground } from '../../examples/without-playground/without-playground';

@Component({
  selector: 'app-without-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    WithoutPipe,
    JsonPipe,
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    AuthorCredit,
    Breadcrumb,
    WithoutPlayground,
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        Without Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        Excludes specified elements from an array. Supports primitives and
        objects by property key with dot notation for nested paths.
      </p>

      <!-- Use Cases -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Common Use Cases</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold mt-0.5">1</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">User Moderation</h4>
                <p class="text-sm text-muted-foreground">Filter out banned or suspended users from a list by status.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-bold mt-0.5">2</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Dismissed Notifications</h4>
                <p class="text-sm text-muted-foreground">Remove dismissed notification IDs from the display list.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-bold mt-0.5">3</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Product Filtering</h4>
                <p class="text-sm text-muted-foreground">Exclude out-of-stock or discontinued products from catalog views.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-bold mt-0.5">4</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Blacklist Filtering</h4>
                <p class="text-sm text-muted-foreground">Remove specific values from tag lists, categories, or search results.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Interactive Example</h2>
      <app-macos-window title="Without Playground">
        <app-without-playground />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>
      <app-code-preview [code]="code" [language]="'typescript'">
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4">Without Examples</h3>
            <div class="rounded-md bg-muted p-6 border border-border space-y-4">
              <div>
                <div class="text-xs text-muted-foreground mb-2">Exclude numbers</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ numbers | without:excludeNums | json }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Exclude strings</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ fruits | without:excludeFruits | json }}</p>
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
              <td class="px-4 py-3 font-mono text-xs">excludes</td>
              <td class="px-4 py-3 text-muted-foreground">unknown[]</td>
              <td class="px-4 py-3 font-mono text-xs">-</td>
              <td class="px-4 py-3 text-muted-foreground">Values to exclude from the array</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">key</td>
              <td class="px-4 py-3 text-muted-foreground">string</td>
              <td class="px-4 py-3 font-mono text-xs">undefined</td>
              <td class="px-4 py-3 text-muted-foreground">Property path for object comparison (supports dot notation)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-bold my-8">Features</h2>
      <div class="rounded-md border border-border p-6 space-y-4">
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Primitive & Object Support</h4>
            <p class="text-sm text-muted-foreground">Exclude numbers, strings, or objects by any property — shallow or deeply nested.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">O(1) Lookups</h4>
            <p class="text-sm text-muted-foreground">Uses a Set internally for constant-time exclusion checks, even with large exclude lists.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Dot Notation</h4>
            <p class="text-sm text-muted-foreground">Access deeply nested properties like 'meta.status' or 'user.address.city'.</p>
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
            [previous]="{ label: 'Unique', link: '/docs/pipes/unique' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class WithoutPage {
  numbers = [1, 2, 3, 4, 5, 6, 7, 8];
  excludeNums = [2, 4, 6];
  fruits = ['apple', 'banana', 'cherry', 'date', 'elderberry'];
  excludeFruits = ['banana', 'date'];

  code = [
    'import { Component } from \'@angular/core\';',
    'import { WithoutPipe } from \'ngx-transforms\';',
    '',
    '@Component({',
    '  selector: \'app-example\',',
    '  standalone: true,',
    '  imports: [WithoutPipe],',
    '  template: `',
    '    <!-- Exclude specific numbers -->',
    '    <p>{{ [1,2,3,4,5] | without:[2,4] }}</p>',
    '    <!-- [1, 3, 5] -->',
    '',
    '    <!-- Exclude banned users by status -->',
    '    @for (user of users | without:[\'banned\']:\'status\'; track user.id) {',
    '      <div>{{ user.name }}</div>',
    '    }',
    '',
    '    <!-- Exclude by nested property -->',
    '    @for (order of orders | without:[\'cancelled\']:\'meta.status\'; track order.id) {',
    '      <div>{{ order.id }}</div>',
    '    }',
    '  `',
    '})',
    'export class ExampleComponent {',
    '  users = [',
    '    { id: 1, name: \'Alice\', status: \'active\' },',
    '    { id: 2, name: \'Bob\', status: \'banned\' },',
    '  ];',
    '  orders = [',
    '    { id: 1, meta: { status: \'shipped\' } },',
    '    { id: 2, meta: { status: \'cancelled\' } },',
    '  ];',
    '}',
  ].join('\n');
}
