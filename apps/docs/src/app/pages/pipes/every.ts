import { Component, ChangeDetectionStrategy } from '@angular/core';
import { EveryPipe } from '@ngx-transforms';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';
import { EveryPlayground } from '../../examples/every-playground/every-playground';

@Component({
  selector: 'app-every-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    EveryPipe,
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    AuthorCredit,
    Breadcrumb,
    EveryPlayground,
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        Every Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        Checks if all elements in an array satisfy a condition. Returns a boolean
        you can use directly in template expressions, conditionals, and class bindings.
      </p>

      <!-- Use Cases -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Common Use Cases</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold mt-0.5">1</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Form Validation</h4>
                <p class="text-sm text-muted-foreground">Check if all fields are valid before enabling a submit button.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-bold mt-0.5">2</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Sprint Status</h4>
                <p class="text-sm text-muted-foreground">Show a completion badge when all tasks in a sprint are done.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-bold mt-0.5">3</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Permission Gates</h4>
                <p class="text-sm text-muted-foreground">Verify all required permissions are granted before showing a feature.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-bold mt-0.5">4</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Batch Processing</h4>
                <p class="text-sm text-muted-foreground">Check if all items in a batch have been processed or shipped.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Interactive Example</h2>
      <app-macos-window title="Every Playground">
        <app-every-playground />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>
      <app-code-preview [code]="code" [language]="'typescript'">
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4">Every Examples</h3>
            <div class="rounded-md bg-muted p-6 border border-border space-y-4">
              <div>
                <div class="text-xs text-muted-foreground mb-2">All true?</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ allTrue | every:true }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">All same number?</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ sameNumbers | every:5 }} vs {{ mixedNumbers | every:5 }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">All users active?</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ users | every:'active':'status' }}</p>
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
              <td class="px-4 py-3 text-muted-foreground">The array to check</td>
            </tr>
            <tr class="border-b border-border">
              <td class="px-4 py-3 font-mono text-xs">match</td>
              <td class="px-4 py-3 text-muted-foreground">unknown</td>
              <td class="px-4 py-3 font-mono text-xs">-</td>
              <td class="px-4 py-3 text-muted-foreground">The value all elements must equal</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">key</td>
              <td class="px-4 py-3 text-muted-foreground">string</td>
              <td class="px-4 py-3 font-mono text-xs">-</td>
              <td class="px-4 py-3 text-muted-foreground">Optional property path for object comparison (supports dot notation)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-bold my-8">Features</h2>
      <div class="rounded-md border border-border p-6 space-y-4">
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Template-Friendly Boolean</h4>
            <p class="text-sm text-muted-foreground">Returns a boolean you can use directly in *ngIf, &#64;if, [class], [disabled], and other bindings.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Object Support</h4>
            <p class="text-sm text-muted-foreground">Check object arrays by any property, including nested paths with dot notation.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Strict Equality</h4>
            <p class="text-sm text-muted-foreground">Uses === for comparison — no type coercion surprises.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Null Safe</h4>
            <p class="text-sm text-muted-foreground">Returns false for null, undefined, or empty arrays.</p>
          </div>
        </div>
      </div>

      <div class="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
        <app-author-credit author="Mofiro Jean" url="https://github.com/mofirojean" />
        <div class="flex gap-4">
          <app-next-prev-navigation
            [previous]="{ label: 'Union', link: '/docs/pipes/union' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class EveryPage {
  allTrue = [true, true, true];
  sameNumbers = [5, 5, 5];
  mixedNumbers = [5, 3, 5];
  users = [
    { id: 1, status: 'active' },
    { id: 2, status: 'active' },
    { id: 3, status: 'inactive' },
  ];

  code = [
    "import { Component } from '@angular/core';",
    "import { EveryPipe } from 'ngx-transforms';",
    '',
    '@Component({',
    "  selector: 'app-example',",
    '  standalone: true,',
    '  imports: [EveryPipe],',
    '  template: `',
    '    <!-- Check all booleans -->',
    "    @if (flags | every:true) {",
    '      <p>All flags are on!</p>',
    '    }',
    '',
    '    <!-- Check all tasks done -->',
    "    <button [disabled]=\"!(tasks | every:'done':'status')\">",
    '      Deploy',
    '    </button>',
    '  `',
    '})',
    'export class ExampleComponent {',
    '  flags = [true, true, true];',
    '  tasks = [',
    "    { id: 1, title: 'Tests', status: 'done' },",
    "    { id: 2, title: 'Review', status: 'done' },",
    '  ];',
    '}',
  ].join('\n');
}
