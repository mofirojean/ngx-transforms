import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TrimPipe } from '@ngx-transforms';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';
import { TrimPlayground } from '../../examples/trim-playground/trim-playground';

@Component({
  selector: 'app-trim-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TrimPipe,
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    AuthorCredit,
    Breadcrumb,
    TrimPlayground,
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        Trim Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        Removes whitespace (or specified characters) from both ends of a string.
        Defaults to trimming whitespace when no character set is provided.
      </p>

      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Common Use Cases</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold mt-0.5">1</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Form Input Cleanup</h4>
                <p class="text-sm text-muted-foreground">Strip accidental leading/trailing whitespace from user input.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-bold mt-0.5">2</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Clean CSV Fields</h4>
                <p class="text-sm text-muted-foreground">Remove quotes or delimiters surrounding imported data values.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-bold mt-0.5">3</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Slug Normalization</h4>
                <p class="text-sm text-muted-foreground">Strip leading/trailing dashes or dots from URL slugs.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-bold mt-0.5">4</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Display Labels</h4>
                <p class="text-sm text-muted-foreground">Remove decorative markers like asterisks or equals from titles.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Interactive Example</h2>
      <app-macos-window title="Trim Playground">
        <app-trim-playground />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>
      <app-code-preview [code]="code" [language]="'typescript'">
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4">Trim Examples</h3>
            <div class="rounded-md bg-muted p-6 border border-border space-y-4">
              <div>
                <div class="text-xs text-muted-foreground mb-2">Whitespace (default)</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">'[{{ padded | trim }}]'</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Specific characters</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">'[{{ dashed | trim:'-' }}]'</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Multiple character set</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">'[{{ mixed | trim:'-*' }}]'</p>
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
              <td class="px-4 py-3 text-muted-foreground">The string to trim</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">chars</td>
              <td class="px-4 py-3 text-muted-foreground">string</td>
              <td class="px-4 py-3 font-mono text-xs">-</td>
              <td class="px-4 py-3 text-muted-foreground">Optional set of characters to trim (defaults to whitespace)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-bold my-8">Features</h2>
      <div class="rounded-md border border-border p-6 space-y-4">
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Smart Defaults</h4>
            <p class="text-sm text-muted-foreground">Trims whitespace out-of-the-box with no arguments.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Custom Characters</h4>
            <p class="text-sm text-muted-foreground">Pass any character set to strip specific markers from both ends.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Regex Safe</h4>
            <p class="text-sm text-muted-foreground">Escapes special characters — pass '.' or '()' without worry.</p>
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
            [previous]="{ label: 'Radians', link: '/docs/pipes/radians' }"
            [next]="{ label: 'Capitalize', link: '/docs/pipes/capitalize' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class TrimPage {
  padded = '   hello world   ';
  dashed = '--hello--';
  mixed = '-*-heading-*-';

  code = [
    "import { Component } from '@angular/core';",
    "import { TrimPipe } from 'ngx-transforms';",
    '',
    '@Component({',
    "  selector: 'app-example',",
    '  standalone: true,',
    '  imports: [TrimPipe],',
    '  template: `',
    '    <!-- Default (whitespace) -->',
    '    <p>{{ rawName | trim }}</p>',
    '',
    '    <!-- Trim specific chars -->',
    "    <p>{{ tagged | trim:'#' }}</p>",
    '',
    '    <!-- Trim multiple chars -->',
    "    <p>{{ decorated | trim:'-*' }}</p>",
    '  `',
    '})',
    'export class ExampleComponent {',
    "  rawName = '  John Smith  ';",
    "  tagged = '###trending###';",
    "  decorated = '-*-headline-*-';",
    '}',
  ].join('\n');
}
