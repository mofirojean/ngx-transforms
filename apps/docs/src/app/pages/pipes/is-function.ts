import { Component, ChangeDetectionStrategy } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { IsFunctionPipe } from '@ngx-transforms';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';
import { IsFunctionPlayground } from '../../examples/is-function-playground/is-function-playground';

@Component({
  selector: 'app-is-function-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IsFunctionPipe,
    JsonPipe,
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    AuthorCredit,
    Breadcrumb,
    IsFunctionPlayground,
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        IsFunction Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        Returns true when the value is callable. Arrow functions, regular
        functions, async functions, methods, and class constructors all count
        — anything where typeof returns "function".
      </p>

      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Common Use Cases</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold mt-0.5">1</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Optional Callbacks</h4>
                <p class="text-sm text-muted-foreground">Render a button only when an action handler was actually wired up.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-bold mt-0.5">2</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Polymorphic Inputs</h4>
                <p class="text-sm text-muted-foreground">Accept either a static value or a getter — branch the template accordingly.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-bold mt-0.5">3</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Plugin Slots</h4>
                <p class="text-sm text-muted-foreground">Detect a custom-renderer prop before falling back to the default one.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-bold mt-0.5">4</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Storybook / Demo Tables</h4>
                <p class="text-sm text-muted-foreground">Show "[function]" when an arg is callable instead of trying to print it.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Interactive Example</h2>
      <app-macos-window title="IsFunction Playground">
        <app-is-function-playground />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>
      <app-code-preview [code]="code" [language]="'typescript'">
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4">IsFunction Examples</h3>
            <div class="rounded-md bg-muted p-6 border border-border space-y-4">
              <div>
                <div class="text-xs text-muted-foreground mb-2">Arrow function</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ doubler | isFunction | json }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Built-in</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ max | isFunction | json }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Plain object is not callable</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ holder | isFunction | json }}</p>
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
            <h4 class="font-semibold">All Function Flavors</h4>
            <p class="text-sm text-muted-foreground">Arrow, async, generator, class constructor, bound, method — all return true.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold">!</span>
          <div>
            <h4 class="font-semibold">Won't Invoke</h4>
            <p class="text-sm text-muted-foreground">The pipe checks the type — it does not call the function. Side effects stay yours to control.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Cross-Realm Safe</h4>
            <p class="text-sm text-muted-foreground">typeof works across iframes and worker boundaries — instanceof Function does not.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Pure & Cheap</h4>
            <p class="text-sm text-muted-foreground">Trivial constant-time check — safe to use anywhere in templates.</p>
          </div>
        </div>
      </div>

      <div class="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
        <app-author-credit author="Mofiro Jean" url="https://github.com/mofirojean" />
        <div class="flex gap-4">
          <app-next-prev-navigation
            [previous]="{ label: 'IsObject', link: '/docs/pipes/is-object' }"
            [next]="{ label: 'IsEmpty', link: '/docs/pipes/is-empty' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class IsFunctionPage {
  doubler = (n: number) => n * 2;
  max = Math.max;
  holder = { call: () => 0 };

  code = [
    "import { Component } from '@angular/core';",
    "import { IsFunctionPipe } from 'ngx-transforms';",
    '',
    '@Component({',
    "  selector: 'app-example',",
    '  standalone: true,',
    '  imports: [IsFunctionPipe],',
    '  template: `',
    '    <!-- Only render the action button when a handler was wired -->',
    '    @if (onSave | isFunction) {',
    '      <button (click)="onSave()">Save</button>',
    '    }',
    '',
    '    <!-- Storybook arg row: print "[function]" instead of "[object Object]" -->',
    "    <td>{{ (arg | isFunction) ? '[function]' : arg }}</td>",
    '  `',
    '})',
    'export class ExampleComponent {',
    '  onSave: (() => void) | null = null;',
    '  arg: unknown = () => 0;',
    '}',
  ].join('\n');
}
