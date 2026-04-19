import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RepeatPipe } from '@ngx-transforms';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';
import { RepeatPlayground } from '../../examples/repeat-playground/repeat-playground';

@Component({
  selector: 'app-repeat-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RepeatPipe,
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    AuthorCredit,
    Breadcrumb,
    RepeatPlayground,
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        Repeat Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        Repeats a string a given number of times. Optional separator is inserted
        between repetitions.
      </p>

      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Common Use Cases</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold mt-0.5">1</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">ASCII Dividers</h4>
                <p class="text-sm text-muted-foreground">Generate separator lines like "==========" in terminals or logs.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-bold mt-0.5">2</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Progress Indicators</h4>
                <p class="text-sm text-muted-foreground">Build simple text-based progress bars with repeated characters.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-bold mt-0.5">3</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">CSV-Style Lists</h4>
                <p class="text-sm text-muted-foreground">Build joined lists with a separator for copy-paste friendly output.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-bold mt-0.5">4</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Tree Indentation</h4>
                <p class="text-sm text-muted-foreground">Repeat spaces or dots to indent nested tree-view rendering.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Interactive Example</h2>
      <app-macos-window title="Repeat Playground">
        <app-repeat-playground />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>
      <app-code-preview [code]="code" [language]="'typescript'">
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4">Repeat Examples</h3>
            <div class="rounded-md bg-muted p-6 border border-border space-y-4">
              <div>
                <div class="text-xs text-muted-foreground mb-2">Divider line</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">'{{ '-' | repeat:10 }}'</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Repeat word</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">'{{ 'ha' | repeat:3 }}'</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">With separator</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">'{{ 'item' | repeat:3:', ' }}'</p>
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
              <td class="px-4 py-3 text-muted-foreground">The string to repeat</td>
            </tr>
            <tr class="border-b border-border">
              <td class="px-4 py-3 font-mono text-xs">count</td>
              <td class="px-4 py-3 text-muted-foreground">number</td>
              <td class="px-4 py-3 font-mono text-xs">-</td>
              <td class="px-4 py-3 text-muted-foreground">Number of times to repeat (non-negative)</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">separator</td>
              <td class="px-4 py-3 text-muted-foreground">string</td>
              <td class="px-4 py-3 font-mono text-xs">''</td>
              <td class="px-4 py-3 text-muted-foreground">Optional separator between repetitions</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-bold my-8">Features</h2>
      <div class="rounded-md border border-border p-6 space-y-4">
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Optional Separator</h4>
            <p class="text-sm text-muted-foreground">Insert any delimiter between repetitions for list-like output.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Safe Zero Count</h4>
            <p class="text-sm text-muted-foreground">Returns empty string cleanly for count of 0 — no errors.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Multi-Char Source</h4>
            <p class="text-sm text-muted-foreground">Works with any string length, not just single characters.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Null Safe</h4>
            <p class="text-sm text-muted-foreground">Returns empty string for null, undefined, or non-string inputs.</p>
          </div>
        </div>
      </div>

      <div class="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
        <app-author-credit author="Mofiro Jean" url="https://github.com/mofirojean" />
        <div class="flex gap-4">
          <app-next-prev-navigation
            [previous]="{ label: 'Pad', link: '/docs/pipes/pad' }"
            [next]="{ label: 'Slugify', link: '/docs/pipes/slugify' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class RepeatPage {
  code = [
    "import { Component } from '@angular/core';",
    "import { RepeatPipe } from 'ngx-transforms';",
    '',
    '@Component({',
    "  selector: 'app-example',",
    '  standalone: true,',
    '  imports: [RepeatPipe],',
    '  template: `',
    '    <!-- Horizontal rule -->',
    "    <pre>{{ '=' | repeat:30 }}</pre>",
    '',
    '    <!-- Progress bar -->',
    "    <pre>[{{ '#' | repeat:filledBlocks }}{{ '-' | repeat:emptyBlocks }}]</pre>",
    '',
    '    <!-- Joined tags -->',
    "    <p>{{ 'Angular' | repeat:3:' | ' }}</p>",
    '  `',
    '})',
    'export class ExampleComponent {',
    '  filledBlocks = 7;',
    '  emptyBlocks = 3;',
    '}',
  ].join('\n');
}
