import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SomePipe } from '@ngx-transforms';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';
import { SomePlayground } from '../../examples/some-playground/some-playground';

@Component({
  selector: 'app-some-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SomePipe,
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    AuthorCredit,
    Breadcrumb,
    SomePlayground,
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        Some Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        Checks if at least one element in an array satisfies a condition. The counterpart
        to Every — returns true the moment a single match is found.
      </p>

      <!-- Use Cases -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Common Use Cases</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold mt-0.5">1</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Error Detection</h4>
                <p class="text-sm text-muted-foreground">Show a warning banner if any item in a list has errors.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-bold mt-0.5">2</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Server Monitoring</h4>
                <p class="text-sm text-muted-foreground">Trigger an alert if any server in a cluster is down.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-bold mt-0.5">3</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Selection Actions</h4>
                <p class="text-sm text-muted-foreground">Enable bulk action buttons when at least one item is selected.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-bold mt-0.5">4</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Online Presence</h4>
                <p class="text-sm text-muted-foreground">Show a green dot if any team member is currently online.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Interactive Example</h2>
      <app-macos-window title="Some Playground">
        <app-some-playground />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>
      <app-code-preview [code]="code" [language]="'typescript'">
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4">Some Examples</h3>
            <div class="rounded-md bg-muted p-6 border border-border space-y-4">
              <div>
                <div class="text-xs text-muted-foreground mb-2">Any true?</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ hasSomeTrue | some:true }} vs {{ allFalse | some:true }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Any admin in the list?</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ users | some:'admin':'role' }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Any server down?</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ servers | some:'down':'status' }}</p>
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
              <td class="px-4 py-3 text-muted-foreground">The value at least one element must equal</td>
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
            <h4 class="font-semibold">Short-Circuit Evaluation</h4>
            <p class="text-sm text-muted-foreground">Stops checking as soon as the first match is found — optimal for large arrays.</p>
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
            [previous]="{ label: 'Every', link: '/docs/pipes/every' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class SomePage {
  hasSomeTrue = [false, false, true];
  allFalse = [false, false, false];
  users = [
    { id: 1, role: 'viewer' },
    { id: 2, role: 'admin' },
    { id: 3, role: 'editor' },
  ];
  servers = [
    { id: 1, status: 'healthy' },
    { id: 2, status: 'down' },
    { id: 3, status: 'healthy' },
  ];

  code = [
    "import { Component } from '@angular/core';",
    "import { SomePipe } from 'ngx-transforms';",
    '',
    '@Component({',
    "  selector: 'app-example',",
    '  standalone: true,',
    '  imports: [SomePipe],',
    '  template: `',
    '    <!-- Show alert if any server is down -->',
    "    @if (servers | some:'down':'status') {",
    '      <div class="alert">A server is down!</div>',
    '    }',
    '',
    '    <!-- Enable button if any item selected -->',
    "    <button [disabled]=\"!(items | some:true)\">",
    '      Delete Selected',
    '    </button>',
    '  `',
    '})',
    'export class ExampleComponent {',
    '  servers = [',
    "    { id: 1, status: 'healthy' },",
    "    { id: 2, status: 'down' },",
    '  ];',
    '  items = [false, true, false];',
    '}',
  ].join('\n');
}
