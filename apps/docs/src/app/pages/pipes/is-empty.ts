import { Component, ChangeDetectionStrategy } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { IsEmptyPipe } from '@ngx-transforms';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';
import { IsEmptyPlayground } from '../../examples/is-empty-playground/is-empty-playground';

@Component({
  selector: 'app-is-empty-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IsEmptyPipe,
    JsonPipe,
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    AuthorCredit,
    Breadcrumb,
    IsEmptyPlayground,
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        IsEmpty Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        Returns true when the value has nothing in it. Catches null, undefined,
        empty strings, arrays, plain objects, Maps, and Sets — but treats real
        values like 0 and false as non-empty.
      </p>

      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Common Use Cases</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold mt-0.5">1</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Empty States</h4>
                <p class="text-sm text-muted-foreground">Show a placeholder when a list, search result, or form field has no content.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-bold mt-0.5">2</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Submit Gating</h4>
                <p class="text-sm text-muted-foreground">Disable the submit button until at least one field has been filled in.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-bold mt-0.5">3</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Skip Empty Sections</h4>
                <p class="text-sm text-muted-foreground">Hide an entire card or accordion when its data payload has nothing to show.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-bold mt-0.5">4</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Generic Loading Guards</h4>
                <p class="text-sm text-muted-foreground">One pipe covers null inputs, empty arrays, and empty maps — no separate checks.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Interactive Example</h2>
      <app-macos-window title="IsEmpty Playground">
        <app-is-empty-playground />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>
      <app-code-preview [code]="code" [language]="'typescript'">
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4">IsEmpty Examples</h3>
            <div class="rounded-md bg-muted p-6 border border-border space-y-4">
              <div>
                <div class="text-xs text-muted-foreground mb-2">Empty list</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ items | isEmpty | json }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Empty form payload</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ form | isEmpty | json }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Zero is not empty</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ count | isEmpty | json }}</p>
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
            <tr>
              <td class="px-4 py-3 font-mono text-xs">value</td>
              <td class="px-4 py-3 text-muted-foreground">unknown</td>
              <td class="px-4 py-3 font-mono text-xs">-</td>
              <td class="px-4 py-3 text-muted-foreground">The value to test</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-bold my-8">Features</h2>
      <div class="rounded-md border border-border p-6 space-y-4">
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Container-Aware</h4>
            <p class="text-sm text-muted-foreground">Strings, arrays, plain objects, Maps, and Sets are all checked against their natural notion of empty.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Falsy-Safe</h4>
            <p class="text-sm text-muted-foreground">0, false, NaN, and Date are not "empty" — only structural emptiness counts.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold">!</span>
          <div>
            <h4 class="font-semibold">Whitespace Counts as Filled</h4>
            <p class="text-sm text-muted-foreground">"   " is not empty. Chain trim first if you want to treat whitespace strings as blank.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Pure & Cheap</h4>
            <p class="text-sm text-muted-foreground">O(1) for scalars and Maps/Sets; O(n) keys for plain objects. Safe in templates.</p>
          </div>
        </div>
      </div>

      <div class="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
        <app-author-credit author="Mofiro Jean" url="https://github.com/mofirojean" />
        <div class="flex gap-4">
          <app-next-prev-navigation
            [previous]="{ label: 'IsFunction', link: '/docs/pipes/is-function' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class IsEmptyPage {
  items: number[] = [];
  form = {};
  count = 0;

  code = [
    "import { Component } from '@angular/core';",
    "import { IsEmptyPipe } from 'ngx-transforms';",
    '',
    '@Component({',
    "  selector: 'app-example',",
    '  standalone: true,',
    '  imports: [IsEmptyPipe],',
    '  template: `',
    '    <!-- Show a placeholder when there is nothing to render -->',
    '    @if (items | isEmpty) {',
    '      <p class="muted">No results yet.</p>',
    '    } @else {',
    '      @for (item of items; track item.id) {',
    '        <li>{{ item.name }}</li>',
    '      }',
    '    }',
    '',
    '    <!-- Disable submit until at least one field is filled -->',
    '    <button [disabled]="form | isEmpty">Save</button>',
    '  `',
    '})',
    'export class ExampleComponent {',
    '  items: Item[] = [];',
    '  form: Partial<FormValue> = {};',
    '}',
  ].join('\n');
}
