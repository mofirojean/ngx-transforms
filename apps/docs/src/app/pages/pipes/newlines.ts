import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NewlinesPipe } from '@ngx-transforms';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';
import { NewlinesPlayground } from '../../examples/newlines-playground/newlines-playground';

@Component({
  selector: 'app-newlines-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NewlinesPipe,
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    AuthorCredit,
    Breadcrumb,
    NewlinesPlayground,
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        Newlines Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        Replaces line breaks in a string with a custom replacement. Handles all
        common line-break variants and defaults to &lt;br&gt; for HTML display.
      </p>

      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Common Use Cases</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold mt-0.5">1</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Preserve User Formatting</h4>
                <p class="text-sm text-muted-foreground">Display textarea input with line breaks intact via [innerHTML].</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-bold mt-0.5">2</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Flatten for Preview</h4>
                <p class="text-sm text-muted-foreground">Join multi-line text into a single line for compact previews.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-bold mt-0.5">3</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Cross-Platform Text</h4>
                <p class="text-sm text-muted-foreground">Normalize Windows CRLF, Mac CR, and Unix LF line endings.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-bold mt-0.5">4</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Custom Delimiter</h4>
                <p class="text-sm text-muted-foreground">Swap line breaks for any separator — pipes, commas, bullets.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Interactive Example</h2>
      <app-macos-window title="Newlines Playground">
        <app-newlines-playground />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>
      <app-code-preview [code]="code" [language]="'typescript'">
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4">Newlines Examples</h3>
            <div class="rounded-md bg-muted p-6 border border-border space-y-4">
              <div>
                <div class="text-xs text-muted-foreground mb-2">Rendered with [innerHTML]</div>
                <div class="rounded-md bg-background p-4 text-sm" [innerHTML]="sample | newlines"></div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Flatten with space</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">'{{ sample | newlines:' ' }}'</p>
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
              <td class="px-4 py-3 text-muted-foreground">The string containing line breaks</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">replacement</td>
              <td class="px-4 py-3 text-muted-foreground">string</td>
              <td class="px-4 py-3 font-mono text-xs">'&lt;br&gt;'</td>
              <td class="px-4 py-3 text-muted-foreground">Replacement inserted for each line break</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-bold my-8">Features</h2>
      <div class="rounded-md border border-border p-6 space-y-4">
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Cross-Platform Line Breaks</h4>
            <p class="text-sm text-muted-foreground">Handles \\n, \\r\\n, and \\r variants in a single pass.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Flexible Replacement</h4>
            <p class="text-sm text-muted-foreground">Pass any string — tags, delimiters, or empty to remove.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold">!</span>
          <div>
            <h4 class="font-semibold">Use [innerHTML] for &lt;br&gt;</h4>
            <p class="text-sm text-muted-foreground">When the replacement contains HTML, bind with [innerHTML]. Sanitize user input first if it may contain untrusted HTML.</p>
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
            [previous]="{ label: 'Test', link: '/docs/pipes/test' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class NewlinesPage {
  sample = 'Line one\nLine two\nLine three';

  code = [
    "import { Component } from '@angular/core';",
    "import { NewlinesPipe } from 'ngx-transforms';",
    '',
    '@Component({',
    "  selector: 'app-example',",
    '  standalone: true,',
    '  imports: [NewlinesPipe],',
    '  template: `',
    '    <!-- Preserve user input line breaks -->',
    '    <div [innerHTML]="comment | newlines"></div>',
    '',
    '    <!-- Flatten to a single line -->',
    "    <p>{{ address | newlines:', ' }}</p>",
    '  `',
    '})',
    'export class ExampleComponent {',
    "  comment = 'Hi!\\nThanks for the post.';",
    "  address = '123 Main St\\nSpringfield\\nIL';",
    '}',
  ].join('\n');
}