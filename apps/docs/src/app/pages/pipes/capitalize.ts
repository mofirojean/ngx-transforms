import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CapitalizePipe } from '@ngx-transforms';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';
import { CapitalizePlayground } from '../../examples/capitalize-playground/capitalize-playground';

@Component({
  selector: 'app-capitalize-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CapitalizePipe,
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    AuthorCredit,
    Breadcrumb,
    CapitalizePlayground,
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        Capitalize Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        Uppercases the first character of a string and lowercases the rest.
        Useful for normalizing headings, labels, and display text.
      </p>

      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Common Use Cases</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold mt-0.5">1</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Section Headings</h4>
                <p class="text-sm text-muted-foreground">Normalize headings regardless of source data casing.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-bold mt-0.5">2</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Status Labels</h4>
                <p class="text-sm text-muted-foreground">Display tags like "ACTIVE", "pending", "CLOSED" uniformly.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-bold mt-0.5">3</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">User-Generated Content</h4>
                <p class="text-sm text-muted-foreground">Clean up post titles or comments with inconsistent casing.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-bold mt-0.5">4</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Greeting Text</h4>
                <p class="text-sm text-muted-foreground">Format welcome messages from lowercased keys.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Interactive Example</h2>
      <app-macos-window title="Capitalize Playground">
        <app-capitalize-playground />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>
      <app-code-preview [code]="code" [language]="'typescript'">
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4">Capitalize Examples</h3>
            <div class="rounded-md bg-muted p-6 border border-border space-y-4">
              <div>
                <div class="text-xs text-muted-foreground mb-2">Lowercase input</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ 'hello world' | capitalize }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Uppercase input</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ 'HELLO WORLD' | capitalize }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Mixed case</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ 'hELLo WoRlD' | capitalize }}</p>
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
              <td class="px-4 py-3 text-muted-foreground">The string to capitalize</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-bold my-8">Features</h2>
      <div class="rounded-md border border-border p-6 space-y-4">
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Normalizes Casing</h4>
            <p class="text-sm text-muted-foreground">First character upper, rest lower — consistent output every time.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Simple API</h4>
            <p class="text-sm text-muted-foreground">No arguments required — just pipe any string.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Pair with upperFirst</h4>
            <p class="text-sm text-muted-foreground">Use upperFirst instead if you want to preserve existing rest-of-string casing.</p>
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
            [previous]="{ label: 'Trim', link: '/docs/pipes/trim' }"
            [next]="{ label: 'UpperFirst', link: '/docs/pipes/upper-first' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class CapitalizePage {
  code = [
    "import { Component } from '@angular/core';",
    "import { CapitalizePipe } from 'ngx-transforms';",
    '',
    '@Component({',
    "  selector: 'app-example',",
    '  standalone: true,',
    '  imports: [CapitalizePipe],',
    '  template: `',
    '    <!-- Status badge -->',
    '    <span>{{ order.status | capitalize }}</span>',
    '',
    '    <!-- Heading from data -->',
    '    <h2>{{ section.title | capitalize }}</h2>',
    '',
    '    <!-- Normalize user input -->',
    '    <p>Welcome, {{ username | capitalize }}</p>',
    '  `',
    '})',
    'export class ExampleComponent {',
    "  order = { status: 'PENDING' };",
    "  section = { title: 'getting STARTED' };",
    "  username = 'aLICE';",
    '}',
  ].join('\n');
}