import { Component, ChangeDetectionStrategy } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { TruthifyPipe } from '@ngx-transforms';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';
import { TruthifyPlayground } from '../../examples/truthify-playground/truthify-playground';

@Component({
  selector: 'app-truthify-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TruthifyPipe,
    JsonPipe,
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    AuthorCredit,
    Breadcrumb,
    TruthifyPlayground,
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        Truthify Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        Removes all falsy values from an array — null, undefined, 0, false, NaN, and empty strings.
        One pipe to clean up your data before rendering.
      </p>

      <!-- Use Cases -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Common Use Cases</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold mt-0.5">1</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">API Response Cleanup</h4>
                <p class="text-sm text-muted-foreground">Remove null entries from API arrays before rendering lists or tables.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-bold mt-0.5">2</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Form Submission</h4>
                <p class="text-sm text-muted-foreground">Strip empty fields from form arrays before sending to the backend.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-bold mt-0.5">3</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">CSV / Spreadsheet Imports</h4>
                <p class="text-sm text-muted-foreground">Clean out blank rows and empty cells from imported data.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-bold mt-0.5">4</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Tag & Label Lists</h4>
                <p class="text-sm text-muted-foreground">Remove empty strings from split operations like splitting comma-separated values.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Interactive Example</h2>
      <app-macos-window title="Truthify Playground">
        <app-truthify-playground />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>
      <app-code-preview [code]="code" [language]="'typescript'">
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4">Truthify Examples</h3>
            <div class="rounded-md bg-muted p-6 border border-border space-y-4">
              <div>
                <div class="text-xs text-muted-foreground mb-2">Mixed falsy values</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ mixed | truthify | json }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Empty strings from split</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ splitResult | truthify | json }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Nulls from API</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ apiData | truthify | json }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </app-code-preview>

      <h2 class="text-2xl font-bold my-8">What Gets Removed</h2>
      <div class="rounded-md border border-border overflow-hidden">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border bg-muted/50">
              <th class="px-4 py-3 text-left font-semibold">Value</th>
              <th class="px-4 py-3 text-left font-semibold">Type</th>
              <th class="px-4 py-3 text-left font-semibold">Removed?</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-border">
              <td class="px-4 py-3 font-mono text-xs">false</td>
              <td class="px-4 py-3 text-muted-foreground">boolean</td>
              <td class="px-4 py-3 text-red-500">Yes</td>
            </tr>
            <tr class="border-b border-border">
              <td class="px-4 py-3 font-mono text-xs">0</td>
              <td class="px-4 py-3 text-muted-foreground">number</td>
              <td class="px-4 py-3 text-red-500">Yes</td>
            </tr>
            <tr class="border-b border-border">
              <td class="px-4 py-3 font-mono text-xs">""</td>
              <td class="px-4 py-3 text-muted-foreground">string</td>
              <td class="px-4 py-3 text-red-500">Yes</td>
            </tr>
            <tr class="border-b border-border">
              <td class="px-4 py-3 font-mono text-xs">null</td>
              <td class="px-4 py-3 text-muted-foreground">object</td>
              <td class="px-4 py-3 text-red-500">Yes</td>
            </tr>
            <tr class="border-b border-border">
              <td class="px-4 py-3 font-mono text-xs">undefined</td>
              <td class="px-4 py-3 text-muted-foreground">undefined</td>
              <td class="px-4 py-3 text-red-500">Yes</td>
            </tr>
            <tr class="border-b border-border">
              <td class="px-4 py-3 font-mono text-xs">NaN</td>
              <td class="px-4 py-3 text-muted-foreground">number</td>
              <td class="px-4 py-3 text-red-500">Yes</td>
            </tr>
            <tr class="border-b border-border">
              <td class="px-4 py-3 font-mono text-xs">" " (space)</td>
              <td class="px-4 py-3 text-muted-foreground">string</td>
              <td class="px-4 py-3 text-green-500">No (truthy)</td>
            </tr>
            <tr class="border-b border-border">
              <td class="px-4 py-3 font-mono text-xs">[]</td>
              <td class="px-4 py-3 text-muted-foreground">array</td>
              <td class="px-4 py-3 text-green-500">No (truthy)</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">{{ '{' }}{{ '}' }}</td>
              <td class="px-4 py-3 text-muted-foreground">object</td>
              <td class="px-4 py-3 text-green-500">No (truthy)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-bold my-8">Features</h2>
      <div class="rounded-md border border-border p-6 space-y-4">
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">One Pipe, All Falsy Values</h4>
            <p class="text-sm text-muted-foreground">Removes false, 0, "", null, undefined, and NaN in a single pass.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Zero Config</h4>
            <p class="text-sm text-muted-foreground">No parameters needed — just pipe and go.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Immutable</h4>
            <p class="text-sm text-muted-foreground">Always returns a new array — original data stays untouched.</p>
          </div>
        </div>
      </div>

      <div class="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
        <app-author-credit author="Mofiro Jean" url="https://github.com/mofirojean" />
        <div class="flex gap-4">
          <app-next-prev-navigation
            [previous]="{ label: 'Shuffle', link: '/docs/pipes/shuffle' }"
            [next]="{ label: 'Unique', link: '/docs/pipes/unique' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class TruthifyPage {
  mixed = [0, 1, '', 'hello', null, undefined, false, true];
  splitResult = 'angular,,react,,vue'.split(',');
  apiData = ['item1', null, 'item2', undefined, 'item3', null];

  code = [
    'import { Component } from \'@angular/core\';',
    'import { TruthifyPipe } from \'ngx-transforms\';',
    '',
    '@Component({',
    '  selector: \'app-example\',',
    '  standalone: true,',
    '  imports: [TruthifyPipe],',
    '  template: `',
    '    <!-- Remove all falsy values -->',
    '    <p>{{ [0, 1, \'\', \'hello\', null, true] | truthify }}</p>',
    '    <!-- [1, \'hello\', true] -->',
    '',
    '    <!-- Clean CSV split result -->',
    '    <p>{{ csvRow.split(\',\') | truthify }}</p>',
    '',
    '    <!-- Filter null API entries -->',
    '    @for (item of apiResults | truthify; track $index) {',
    '      <div>{{ item }}</div>',
    '    }',
    '  `',
    '})',
    'export class ExampleComponent {',
    '  csvRow = \'Alice,,Bob,,Carol\';',
    '  apiResults = [\'data1\', null, \'data2\', undefined, \'data3\'];',
    '}',
  ].join('\n');
}