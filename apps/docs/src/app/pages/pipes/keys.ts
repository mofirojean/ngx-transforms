import { Component, ChangeDetectionStrategy } from '@angular/core';
import { KeysPipe } from '@ngx-transforms';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';
import { KeysPlayground } from '../../examples/keys-playground/keys-playground';

@Component({
  selector: 'app-keys-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    KeysPipe,
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    AuthorCredit,
    Breadcrumb,
    KeysPlayground,
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        Keys Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        Returns the own enumerable property names of an object as an array.
        Drop the result straight into &#64;for to render objects without
        component-side helpers.
      </p>

      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Common Use Cases</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold mt-0.5">1</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Render Form Fields</h4>
                <p class="text-sm text-muted-foreground">Iterate object keys to dynamically build form rows or tables.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-bold mt-0.5">2</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Object Inspection</h4>
                <p class="text-sm text-muted-foreground">Display the schema of an API response in debug or admin views.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-bold mt-0.5">3</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Tag Lists</h4>
                <p class="text-sm text-muted-foreground">Render a chip per property name when the values aren't shown.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-bold mt-0.5">4</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Pair With Values</h4>
                <p class="text-sm text-muted-foreground">Combine keys + values pipes when iterating won't fit your layout.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Interactive Example</h2>
      <app-macos-window title="Keys Playground">
        <app-keys-playground />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>
      <app-code-preview [code]="code" [language]="'typescript'">
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4">Keys Examples</h3>
            <div class="rounded-md bg-muted p-6 border border-border space-y-4">
              <div>
                <div class="text-xs text-muted-foreground mb-2">Plain object</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ user | keys }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Empty object</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ empty | keys }}</p>
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
              <td class="px-4 py-3 text-muted-foreground">The object whose keys to extract</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-bold my-8">Features</h2>
      <div class="rounded-md border border-border p-6 space-y-4">
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Iterable Output</h4>
            <p class="text-sm text-muted-foreground">Returns a plain array — works with &#64;for, *ngFor, or any iterator.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Own Enumerables Only</h4>
            <p class="text-sm text-muted-foreground">Skips inherited prototype properties — predictable output.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Pair With Values</h4>
            <p class="text-sm text-muted-foreground">Combine with the values pipe when both name and content are needed.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Null Safe</h4>
            <p class="text-sm text-muted-foreground">Returns an empty array for null, undefined, or primitive inputs.</p>
          </div>
        </div>
      </div>

      <div class="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
        <app-author-credit author="Mofiro Jean" url="https://github.com/mofirojean" />
        <div class="flex gap-4">
          <app-next-prev-navigation
            [previous]="{ label: 'Wrap', link: '/docs/pipes/wrap' }"
            [next]="{ label: 'Values', link: '/docs/pipes/values' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class KeysPage {
  user = { name: 'Alice', age: 30, email: 'a@b.com' };
  empty = {};

  code = [
    "import { Component } from '@angular/core';",
    "import { KeysPipe } from 'ngx-transforms';",
    '',
    '@Component({',
    "  selector: 'app-example',",
    '  standalone: true,',
    '  imports: [KeysPipe],',
    '  template: `',
    '    <!-- Render an object as labeled chips -->',
    '    @for (key of user | keys; track key) {',
    '      <span class="badge">{{ key }}</span>',
    '    }',
    '  `',
    '})',
    'export class ExampleComponent {',
    "  user = { name: 'Alice', age: 30, email: 'a@b.com' };",
    '}',
  ].join('\n');
}