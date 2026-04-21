import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SplitPipe } from '@ngx-transforms';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';
import { SplitPlayground } from '../../examples/split-playground/split-playground';

@Component({
  selector: 'app-split-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SplitPipe,
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    AuthorCredit,
    Breadcrumb,
    SplitPlayground,
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        Split Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        Splits a string into an array using a separator. Accepts string or regex
        separators, with an optional item limit.
      </p>

      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Common Use Cases</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold mt-0.5">1</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">CSV Rows</h4>
                <p class="text-sm text-muted-foreground">Parse comma-separated values into iterable arrays in templates.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-bold mt-0.5">2</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Tag Badges</h4>
                <p class="text-sm text-muted-foreground">Turn a stored tag string into individual chip components.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-bold mt-0.5">3</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Path Segments</h4>
                <p class="text-sm text-muted-foreground">Break a URL path into breadcrumbs by slash.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-bold mt-0.5">4</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Multiple Delimiters</h4>
                <p class="text-sm text-muted-foreground">Split on any of several characters using a regex.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Interactive Example</h2>
      <app-macos-window title="Split Playground">
        <app-split-playground />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>
      <app-code-preview [code]="code" [language]="'typescript'">
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4">Split Examples</h3>
            <div class="rounded-md bg-muted p-6 border border-border space-y-4">
              <div>
                <div class="text-xs text-muted-foreground mb-2">CSV into array</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ csv | split:',' }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Words by space</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ sentence | split:' ' }}</p>
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
              <td class="px-4 py-3 text-muted-foreground">string</td>
              <td class="px-4 py-3 font-mono text-xs">-</td>
              <td class="px-4 py-3 text-muted-foreground">The string to split</td>
            </tr>
            <tr class="border-b border-border">
              <td class="px-4 py-3 font-mono text-xs">separator</td>
              <td class="px-4 py-3 text-muted-foreground">string | RegExp</td>
              <td class="px-4 py-3 font-mono text-xs">''</td>
              <td class="px-4 py-3 text-muted-foreground">Delimiter to split on (empty splits into chars)</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">limit</td>
              <td class="px-4 py-3 text-muted-foreground">number</td>
              <td class="px-4 py-3 font-mono text-xs">-</td>
              <td class="px-4 py-3 text-muted-foreground">Optional maximum number of items to return</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-bold my-8">Features</h2>
      <div class="rounded-md border border-border p-6 space-y-4">
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">String or Regex Separator</h4>
            <p class="text-sm text-muted-foreground">Split on simple characters or complex regex patterns with multiple delimiters.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Pair With &#64;for</h4>
            <p class="text-sm text-muted-foreground">Use the resulting array directly in Angular control flow blocks.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Optional Limit</h4>
            <p class="text-sm text-muted-foreground">Cap the number of elements returned to avoid iterating the whole array.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Null Safe</h4>
            <p class="text-sm text-muted-foreground">Returns an empty array for null, undefined, or non-string inputs.</p>
          </div>
        </div>
      </div>

      <div class="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
        <app-author-credit author="Mofiro Jean" url="https://github.com/mofirojean" />
        <div class="flex gap-4">
          <app-next-prev-navigation
            [previous]="{ label: 'DecodeURIComponent', link: '/docs/pipes/decode-uri-component' }"
            [next]="{ label: 'Match', link: '/docs/pipes/match' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class SplitPage {
  csv = 'angular,rxjs,nx,vitest';
  sentence = 'quick brown fox jumps';

  code = [
    "import { Component } from '@angular/core';",
    "import { SplitPipe } from 'ngx-transforms';",
    '',
    '@Component({',
    "  selector: 'app-example',",
    '  standalone: true,',
    '  imports: [SplitPipe],',
    '  template: `',
    '    <!-- Tag badges -->',
    "    @for (tag of tags | split:','; track tag) {",
    '      <span class="badge">{{ tag }}</span>',
    '    }',
    '',
    '    <!-- Breadcrumbs -->',
    "    @for (seg of path | split:'/'; track $index) {",
    '      <span>/ {{ seg }}</span>',
    '    }',
    '  `',
    '})',
    'export class ExampleComponent {',
    "  tags = 'angular,rxjs,nx,vitest';",
    "  path = '/users/alice/projects';",
    '}',
  ].join('\n');
}