import { Component, ChangeDetectionStrategy } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { SamplePipe } from '@ngx-transforms';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';
import { SamplePlayground } from '../../examples/sample-playground/sample-playground';

@Component({
  selector: 'app-sample-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SamplePipe,
    JsonPipe,
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    AuthorCredit,
    Breadcrumb,
    SamplePlayground,
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        Sample Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        Randomly picks n items from an array without duplicates.
        Uses Fisher-Yates partial shuffle for unbiased selection.
      </p>

      <!-- Use Cases -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Common Use Cases</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold mt-0.5">1</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Featured Products</h4>
                <p class="text-sm text-muted-foreground">Randomly showcase products on a homepage from a larger catalog.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-bold mt-0.5">2</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Quiz Questions</h4>
                <p class="text-sm text-muted-foreground">Pick a random subset of questions from a question bank for each attempt.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-bold mt-0.5">3</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Raffle / Giveaway</h4>
                <p class="text-sm text-muted-foreground">Randomly select winners from a list of participants.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-bold mt-0.5">4</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Testimonials</h4>
                <p class="text-sm text-muted-foreground">Show a random rotation of reviews or testimonials on each page load.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Interactive Example</h2>
      <app-macos-window title="Sample Playground">
        <app-sample-playground />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>
      <app-code-preview [code]="code" [language]="'typescript'">
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4">Sample Examples</h3>
            <div class="rounded-md bg-muted p-6 border border-border space-y-4">
              <div>
                <div class="text-xs text-muted-foreground mb-2">Single random item</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ names | sample }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">3 random items</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ names | sample:3 | json }}</p>
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
              <td class="px-4 py-3 text-muted-foreground">The array to sample from</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">n</td>
              <td class="px-4 py-3 text-muted-foreground">number</td>
              <td class="px-4 py-3 font-mono text-xs">1</td>
              <td class="px-4 py-3 text-muted-foreground">Number of items to randomly select</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-bold my-8">Features</h2>
      <div class="rounded-md border border-border p-6 space-y-4">
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">No Duplicates</h4>
            <p class="text-sm text-muted-foreground">Uses Fisher-Yates partial shuffle — every selected item is unique.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Smart Return Type</h4>
            <p class="text-sm text-muted-foreground">Returns a single value for n=1, an array for n>1. Clamps n to the array length.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Immutable</h4>
            <p class="text-sm text-muted-foreground">Always returns new data — the original array is never modified.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold">!</span>
          <div>
            <h4 class="font-semibold">Impure Pipe</h4>
            <p class="text-sm text-muted-foreground">Runs on every change detection cycle. Bind the result to a signal to control re-sampling.</p>
          </div>
        </div>
      </div>

      <div class="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
        <app-author-credit author="Mofiro Jean" url="https://github.com/mofirojean" />
        <div class="flex gap-4">
          <app-next-prev-navigation
            [previous]="{ label: 'Reverse', link: '/docs/pipes/reverse' }"
            [next]="{ label: 'Shuffle', link: '/docs/pipes/shuffle' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class SamplePage {
  names = ['Alice', 'Bob', 'Carol', 'Dave', 'Emma', 'Frank'];

  code = [
    'import { Component } from \'@angular/core\';',
    'import { SamplePipe } from \'ngx-transforms\';',
    '',
    '@Component({',
    '  selector: \'app-example\',',
    '  standalone: true,',
    '  imports: [SamplePipe],',
    '  template: `',
    '    <!-- Random single item -->',
    '    <p>{{ users | sample }}</p>',
    '',
    '    <!-- Random 3 items -->',
    '    @for (user of users | sample:3; track $index) {',
    '      <div>{{ user.name }}</div>',
    '    }',
    '',
    '    <!-- Random featured products -->',
    '    @for (product of catalog | sample:4; track $index) {',
    '      <app-product-card [product]="product" />',
    '    }',
    '  `',
    '})',
    'export class ExampleComponent {',
    '  users = [...];',
    '  catalog = [...];',
    '}',
  ].join('\n');
}
