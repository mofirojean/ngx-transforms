import { Component, ChangeDetectionStrategy } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { UniquePipe } from '@ngx-transforms';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';
import { UniquePlayground } from '../../examples/unique-playground/unique-playground';

@Component({
  selector: 'app-unique-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    UniquePipe,
    JsonPipe,
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    AuthorCredit,
    Breadcrumb,
    UniquePlayground,
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        Unique Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        Removes duplicate values from arrays. Supports primitives, objects by property key,
        and deep nested properties via dot notation.
      </p>

      <!-- Use Cases -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Common Use Cases</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold mt-0.5">1</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">CRM Data Deduplication</h4>
                <p class="text-sm text-muted-foreground">Merge contacts from Salesforce, HubSpot, and Mailchimp — remove duplicates by email.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-bold mt-0.5">2</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Dropdown Options</h4>
                <p class="text-sm text-muted-foreground">Generate unique filter options from raw API data without manual deduplication.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-bold mt-0.5">3</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Tag Aggregation</h4>
                <p class="text-sm text-muted-foreground">Collect tags from multiple posts or products into a single unique list.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-bold mt-0.5">4</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Search Result Merging</h4>
                <p class="text-sm text-muted-foreground">Combine results from multiple API endpoints and remove duplicate entries by ID.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Interactive Example</h2>
      <app-macos-window title="Contact Deduplicator">
        <app-unique-playground />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>
      <app-code-preview [code]="code" [language]="'typescript'">
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4">Unique Examples</h3>
            <div class="rounded-md bg-muted p-6 border border-border space-y-4">
              <div>
                <div class="text-xs text-muted-foreground mb-2">Primitive numbers</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ numbers | unique | json }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Primitive strings</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ tags | unique | json }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Objects by 'id'</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ users | unique:'id' | json }}</p>
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
              <td class="px-4 py-3 text-muted-foreground">The array to deduplicate</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">key</td>
              <td class="px-4 py-3 text-muted-foreground">string</td>
              <td class="px-4 py-3 font-mono text-xs">undefined</td>
              <td class="px-4 py-3 text-muted-foreground">Property path for object comparison (supports dot notation, e.g. 'user.email')</td>
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
            <p class="text-sm text-muted-foreground">Works with numbers, strings, and objects — use Set for primitives, property key for objects.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Deep Nested Keys</h4>
            <p class="text-sm text-muted-foreground">Use dot notation to deduplicate by deeply nested properties like 'customer.address.city'.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">First Occurrence Wins</h4>
            <p class="text-sm text-muted-foreground">Always keeps the first occurrence of a duplicate — predictable, stable ordering.</p>
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
            [previous]="{ label: 'Truncate', link: '/docs/pipes/truncate' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class UniquePage {
  numbers = [1, 2, 2, 3, 3, 3, 4];
  tags = ['angular', 'typescript', 'angular', 'rxjs', 'typescript'];
  users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 1, name: 'Alice (dup)' },
  ];

  code = `
import { Component } from '@angular/core';
import { UniquePipe } from 'ngx-transforms';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [UniquePipe],
  template: \`
    <!-- Primitives -->
    <p>{{ [1, 2, 2, 3, 3] | unique }}</p>
    <!-- [1, 2, 3] -->

    <!-- Objects by property -->
    <p>{{ users | unique:'email' }}</p>

    <!-- Deep nested key -->
    <p>{{ orders | unique:'customer.email' }}</p>
  \`
})
export class ExampleComponent {
  users = [
    { email: 'alice@test.com', name: 'Alice' },
    { email: 'bob@test.com', name: 'Bob' },
    { email: 'alice@test.com', name: 'Alice (dup)' },
  ];

  orders = [
    { id: 1, customer: { email: 'alice@test.com' } },
    { id: 2, customer: { email: 'bob@test.com' } },
    { id: 3, customer: { email: 'alice@test.com' } },
  ];
}
  `;
}
