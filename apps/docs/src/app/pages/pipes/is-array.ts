import { Component, ChangeDetectionStrategy } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { IsArrayPipe } from '@ngx-transforms';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';
import { IsArrayPlayground } from '../../examples/is-array-playground/is-array-playground';

@Component({
  selector: 'app-is-array-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IsArrayPipe,
    JsonPipe,
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    AuthorCredit,
    Breadcrumb,
    IsArrayPlayground,
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        IsArray Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        Returns true when the value is a real Array. Backed by Array.isArray —
        so array-likes (NodeList, HTMLCollection, Set, Map) all return false.
        Use it before chaining array-only pipes safely.
      </p>

      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Common Use Cases</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold mt-0.5">1</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Safe &#64;for Iteration</h4>
                <p class="text-sm text-muted-foreground">Guard a &#64;for block when an input may also be a single object.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-bold mt-0.5">2</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">JSON Tree Renderers</h4>
                <p class="text-sm text-muted-foreground">Branch between list and key-value views when walking unknown JSON.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-bold mt-0.5">3</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Single-or-Many Inputs</h4>
                <p class="text-sm text-muted-foreground">Normalize an "items" prop that can accept either one item or an array.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-bold mt-0.5">4</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">API Payload Validation</h4>
                <p class="text-sm text-muted-foreground">Confirm a response field is an array before passing it to chart components.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Interactive Example</h2>
      <app-macos-window title="IsArray Playground">
        <app-is-array-playground />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>
      <app-code-preview [code]="code" [language]="'typescript'">
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4">IsArray Examples</h3>
            <div class="rounded-md bg-muted p-6 border border-border space-y-4">
              <div>
                <div class="text-xs text-muted-foreground mb-2">Real array</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ items | isArray | json }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Object is not an array</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ user | isArray | json }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">String is not an array</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ name | isArray | json }}</p>
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
            <h4 class="font-semibold">Cross-Realm Safe</h4>
            <p class="text-sm text-muted-foreground">Array.isArray works across iframes and worker boundaries — instanceof Array does not.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold">!</span>
          <div>
            <h4 class="font-semibold">Strict — No Array-Likes</h4>
            <p class="text-sm text-muted-foreground">NodeList, HTMLCollection, typed arrays, Set, and Map all return false. Convert with Array.from first if needed.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Empty Arrays Count</h4>
            <p class="text-sm text-muted-foreground">[] is still an array — type, not length, is what's checked.</p>
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
            [previous]="{ label: 'IsNumber', link: '/docs/pipes/is-number' }"
            [next]="{ label: 'IsObject', link: '/docs/pipes/is-object' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class IsArrayPage {
  items = [1, 2, 3];
  user = { name: 'Alice' };
  name = 'Alice';

  code = [
    "import { Component } from '@angular/core';",
    "import { IsArrayPipe } from 'ngx-transforms';",
    '',
    '@Component({',
    "  selector: 'app-example',",
    '  standalone: true,',
    '  imports: [IsArrayPipe],',
    '  template: `',
    '    <!-- Single-or-many: render either one item or a list -->',
    '    @if (items | isArray) {',
    '      <ul>',
    '        @for (item of items; track item.id) {',
    '          <li>{{ item.name }}</li>',
    '        }',
    '      </ul>',
    '    } @else {',
    '      <div class="single">{{ items.name }}</div>',
    '    }',
    '  `',
    '})',
    'export class ExampleComponent {',
    '  items: Item | Item[] = [];',
    '}',
  ].join('\n');
}
