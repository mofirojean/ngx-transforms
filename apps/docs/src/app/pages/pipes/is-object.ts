import { Component, ChangeDetectionStrategy } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { IsObjectPipe } from '@ngx-transforms';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';
import { IsObjectPlayground } from '../../examples/is-object-playground/is-object-playground';

@Component({
  selector: 'app-is-object-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IsObjectPipe,
    JsonPipe,
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    AuthorCredit,
    Breadcrumb,
    IsObjectPlayground,
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        IsObject Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        Returns true when the value is a non-null object that is not an array.
        Class instances, Date, Map, Set, and RegExp all count — pair with
        isArray when you need to discriminate between the two structural shapes.
      </p>

      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Common Use Cases</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold mt-0.5">1</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">JSON Tree Renderers</h4>
                <p class="text-sm text-muted-foreground">Render objects as expandable key-value lists, primitives as inline text.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-bold mt-0.5">2</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Polymorphic Inputs</h4>
                <p class="text-sm text-muted-foreground">Accept either a string id or a full record, then route accordingly.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-bold mt-0.5">3</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Recursive Walkers</h4>
                <p class="text-sm text-muted-foreground">Recurse into structural values, stop at scalars — ideal for diff and clone helpers.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-bold mt-0.5">4</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Error Object Detection</h4>
                <p class="text-sm text-muted-foreground">Distinguish a structured error response from a plain string message.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Interactive Example</h2>
      <app-macos-window title="IsObject Playground">
        <app-is-object-playground />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>
      <app-code-preview [code]="code" [language]="'typescript'">
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4">IsObject Examples</h3>
            <div class="rounded-md bg-muted p-6 border border-border space-y-4">
              <div>
                <div class="text-xs text-muted-foreground mb-2">Plain object</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ user | isObject | json }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Array is not an object (in this pipe)</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ items | isObject | json }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Null is not an object</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ missing | isObject | json }}</p>
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
            <h4 class="font-semibold">Null & Array Excluded</h4>
            <p class="text-sm text-muted-foreground">Two common gotchas — null and arrays — both return false, even though typeof says 'object'.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold">!</span>
          <div>
            <h4 class="font-semibold">Lenient — Not Plain-Only</h4>
            <p class="text-sm text-muted-foreground">Class instances, Date, Map, Set, and RegExp all return true. Use isPlainObject if you need stricter discrimination.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Pairs With isArray</h4>
            <p class="text-sm text-muted-foreground">Combine the two when you need to branch a JSON walker between list and record views.</p>
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
            [previous]="{ label: 'IsArray', link: '/docs/pipes/is-array' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class IsObjectPage {
  user = { name: 'Alice', age: 30 };
  items = [1, 2, 3];
  missing = null;

  code = [
    "import { Component } from '@angular/core';",
    "import { IsObjectPipe, IsArrayPipe } from 'ngx-transforms';",
    '',
    '@Component({',
    "  selector: 'app-example',",
    '  standalone: true,',
    '  imports: [IsObjectPipe, IsArrayPipe],',
    '  template: `',
    '    <!-- JSON walker: branch on shape -->',
    '    @if (node | isArray) {',
    '      <ul>',
    '        @for (item of node; track $index) {',
    '          <app-tree-node [node]="item" />',
    '        }',
    '      </ul>',
    '    } @else if (node | isObject) {',
    '      <dl>',
    '        @for (entry of node | pairs; track entry[0]) {',
    '          <dt>{{ entry[0] }}</dt>',
    '          <dd><app-tree-node [node]="entry[1]" /></dd>',
    '        }',
    '      </dl>',
    '    } @else {',
    '      <span>{{ node }}</span>',
    '    }',
    '  `',
    '})',
    'export class ExampleComponent {',
    '  node: unknown = { user: { name: "Alice" } };',
    '}',
  ].join('\n');
}
