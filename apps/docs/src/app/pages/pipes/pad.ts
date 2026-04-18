import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PadPipe } from '@ngx-transforms';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';
import { PadPlayground } from '../../examples/pad-playground/pad-playground';

@Component({
  selector: 'app-pad-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PadPipe,
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    AuthorCredit,
    Breadcrumb,
    PadPlayground,
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        Pad Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        Pads a string on both sides, centering it within the target length.
        When the required padding is uneven, the extra character lands on the right.
      </p>

      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Common Use Cases</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold mt-0.5">1</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Section Dividers</h4>
                <p class="text-sm text-muted-foreground">Create "===== INTRO =====" style banners in logs or terminals.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-bold mt-0.5">2</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Decorative Titles</h4>
                <p class="text-sm text-muted-foreground">Frame titles with asterisks or dashes for emphasis.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-bold mt-0.5">3</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Centered Table Cells</h4>
                <p class="text-sm text-muted-foreground">Center content in fixed-width ASCII tables.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-bold mt-0.5">4</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Console Banners</h4>
                <p class="text-sm text-muted-foreground">Generate centered heading lines for console output or logs.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Interactive Example</h2>
      <app-macos-window title="Pad Playground">
        <app-pad-playground />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>
      <app-code-preview [code]="code" [language]="'typescript'">
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4">Pad Examples</h3>
            <div class="rounded-md bg-muted p-6 border border-border space-y-4">
              <div>
                <div class="text-xs text-muted-foreground mb-2">Centered with dashes</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">'{{ 'x' | pad:5:'-' }}'</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Section banner</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">'{{ 'INTRO' | pad:20:'=' }}'</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Uneven padding (extra on right)</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">'{{ 'hi' | pad:7:'*' }}'</p>
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
              <td class="px-4 py-3 text-muted-foreground">string | number</td>
              <td class="px-4 py-3 font-mono text-xs">-</td>
              <td class="px-4 py-3 text-muted-foreground">The string or number to pad</td>
            </tr>
            <tr class="border-b border-border">
              <td class="px-4 py-3 font-mono text-xs">length</td>
              <td class="px-4 py-3 text-muted-foreground">number</td>
              <td class="px-4 py-3 font-mono text-xs">-</td>
              <td class="px-4 py-3 text-muted-foreground">Target length of the resulting string</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">char</td>
              <td class="px-4 py-3 text-muted-foreground">string</td>
              <td class="px-4 py-3 font-mono text-xs">' '</td>
              <td class="px-4 py-3 text-muted-foreground">Character (or string) to pad with</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-bold my-8">Features</h2>
      <div class="rounded-md border border-border p-6 space-y-4">
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">True Centering</h4>
            <p class="text-sm text-muted-foreground">Distributes padding evenly on both sides.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Consistent Uneven Policy</h4>
            <p class="text-sm text-muted-foreground">When padding is odd, the extra character always goes on the right.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Strings or Numbers</h4>
            <p class="text-sm text-muted-foreground">Accepts both types — numbers are automatically stringified.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Null Safe</h4>
            <p class="text-sm text-muted-foreground">Returns empty string for null or undefined inputs.</p>
          </div>
        </div>
      </div>

      <div class="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
        <app-author-credit author="Mofiro Jean" url="https://github.com/mofirojean" />
        <div class="flex gap-4">
          <app-next-prev-navigation
            [previous]="{ label: 'RightPad', link: '/docs/pipes/right-pad' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class PadPage {
  code = [
    "import { Component } from '@angular/core';",
    "import { PadPipe } from 'ngx-transforms';",
    '',
    '@Component({',
    "  selector: 'app-example',",
    '  standalone: true,',
    '  imports: [PadPipe],',
    '  template: `',
    '    <!-- Section divider -->',
    "    <pre>{{ title | pad:30:'=' }}</pre>",
    '',
    '    <!-- Decorative marker -->',
    "    <span>{{ badge | pad:10:'*' }}</span>",
    '',
    '    <!-- Centered number -->',
    "    <pre>|{{ score | pad:5:' ' }}|</pre>",
    '  `',
    '})',
    'export class ExampleComponent {',
    "  title = ' INTRO ';",
    "  badge = 'NEW';",
    '  score = 42;',
    '}',
  ].join('\n');
}