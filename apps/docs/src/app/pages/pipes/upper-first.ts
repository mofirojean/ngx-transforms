import { Component, ChangeDetectionStrategy } from '@angular/core';
import { UpperFirstPipe } from '@ngx-transforms';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';
import { UpperFirstPlayground } from '../../examples/upper-first-playground/upper-first-playground';

@Component({
  selector: 'app-upper-first-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    UpperFirstPipe,
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    AuthorCredit,
    Breadcrumb,
    UpperFirstPlayground,
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        UpperFirst Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        Uppercases the first character of a string without altering the rest.
        Preserves acronyms, camelCase, and existing casing unlike capitalize.
      </p>

      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Common Use Cases</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold mt-0.5">1</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Preserve Acronyms</h4>
                <p class="text-sm text-muted-foreground">Display "jSON" as "JSON" — keeps API-style names readable.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-bold mt-0.5">2</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Class Name Display</h4>
                <p class="text-sm text-muted-foreground">Convert camelCase variable names to display form.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-bold mt-0.5">3</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Sentence Starts</h4>
                <p class="text-sm text-muted-foreground">Capitalize the first letter of sentences without touching rest.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-bold mt-0.5">4</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Code Display</h4>
                <p class="text-sm text-muted-foreground">Preserve code-like strings while normalizing first letter.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Interactive Example</h2>
      <app-macos-window title="UpperFirst Playground">
        <app-upper-first-playground />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>
      <app-code-preview [code]="code" [language]="'typescript'">
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4">UpperFirst Examples</h3>
            <div class="rounded-md bg-muted p-6 border border-border space-y-4">
              <div>
                <div class="text-xs text-muted-foreground mb-2">camelCase input</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ 'javaScript' | upperFirst }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Preserves uppercase rest</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ 'hello WORLD' | upperFirst }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Acronym</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ 'jSON response' | upperFirst }}</p>
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
              <td class="px-4 py-3 text-muted-foreground">string</td>
              <td class="px-4 py-3 font-mono text-xs">-</td>
              <td class="px-4 py-3 text-muted-foreground">The string to transform</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-bold my-8">Features</h2>
      <div class="rounded-md border border-border p-6 space-y-4">
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Preserves Rest</h4>
            <p class="text-sm text-muted-foreground">Only the first character is modified — rest of the string is untouched.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Acronym Safe</h4>
            <p class="text-sm text-muted-foreground">Perfect for strings containing acronyms like JSON, API, URL.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Pair with capitalize</h4>
            <p class="text-sm text-muted-foreground">Use capitalize instead if you want to lowercase the rest of the string.</p>
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
            [previous]="{ label: 'Capitalize', link: '/docs/pipes/capitalize' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class UpperFirstPage {
  code = [
    "import { Component } from '@angular/core';",
    "import { UpperFirstPipe } from 'ngx-transforms';",
    '',
    '@Component({',
    "  selector: 'app-example',",
    '  standalone: true,',
    '  imports: [UpperFirstPipe],',
    '  template: `',
    '    <!-- Preserve acronym casing -->',
    '    <span>{{ apiName | upperFirst }}</span>',
    '',
    '    <!-- Sentence start -->',
    '    <p>{{ message | upperFirst }}</p>',
    '',
    '    <!-- Class name from variable -->',
    '    <code>{{ variable | upperFirst }}</code>',
    '  `',
    '})',
    'export class ExampleComponent {',
    "  apiName = 'jSON parser';",
    "  message = 'this is an error.';",
    "  variable = 'userId';",
    '}',
  ].join('\n');
}