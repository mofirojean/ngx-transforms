import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LeftPadPipe } from '@ngx-transforms';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';
import { LeftPadPlayground } from '../../examples/left-pad-playground/left-pad-playground';

@Component({
  selector: 'app-left-pad-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LeftPadPipe,
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    AuthorCredit,
    Breadcrumb,
    LeftPadPlayground,
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        LeftPad Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        Pads a string on the left until it reaches the target length. Defaults
        to spaces. Accepts strings or numbers.
      </p>

      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Common Use Cases</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold mt-0.5">1</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Zero-Padded IDs</h4>
                <p class="text-sm text-muted-foreground">Format invoice or order numbers like "000042" for fixed-width display.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-bold mt-0.5">2</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Timers & Clocks</h4>
                <p class="text-sm text-muted-foreground">Display minutes/seconds as "07" instead of "7".</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-bold mt-0.5">3</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Right-Aligned Columns</h4>
                <p class="text-sm text-muted-foreground">Align text in a monospaced column layout.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-bold mt-0.5">4</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Formatted Codes</h4>
                <p class="text-sm text-muted-foreground">Pad tracking numbers, SKUs, or verification codes to fixed length.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Interactive Example</h2>
      <app-macos-window title="LeftPad Playground">
        <app-left-pad-playground />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>
      <app-code-preview [code]="code" [language]="'typescript'">
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4">LeftPad Examples</h3>
            <div class="rounded-md bg-muted p-6 border border-border space-y-4">
              <div>
                <div class="text-xs text-muted-foreground mb-2">Zero-padded</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">'{{ 5 | leftPad:3:'0' }}'</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Default (space)</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">'{{ 42 | leftPad:5 }}'</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Custom char</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">'{{ 'hi' | leftPad:6:'-' }}'</p>
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
            <h4 class="font-semibold">Strings or Numbers</h4>
            <p class="text-sm text-muted-foreground">Accepts both types — numbers are automatically stringified.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Safe When Too Long</h4>
            <p class="text-sm text-muted-foreground">Returns the input unchanged when it is already at or above the target length.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Multi-Char Pad</h4>
            <p class="text-sm text-muted-foreground">Pass multi-character pad strings — they repeat and truncate naturally.</p>
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
            [previous]="{ label: 'UpperFirst', link: '/docs/pipes/upper-first' }"
            [next]="{ label: 'RightPad', link: '/docs/pipes/right-pad' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class LeftPadPage {
  code = [
    "import { Component } from '@angular/core';",
    "import { LeftPadPipe } from 'ngx-transforms';",
    '',
    '@Component({',
    "  selector: 'app-example',",
    '  standalone: true,',
    '  imports: [LeftPadPipe],',
    '  template: `',
    '    <!-- Invoice number -->',
    "    <p>Invoice: #{{ invoiceId | leftPad:6:'0' }}</p>",
    '',
    '    <!-- Timer -->',
    "    <p>{{ minutes | leftPad:2:'0' }}:{{ seconds | leftPad:2:'0' }}</p>",
    '',
    '    <!-- Right-aligned label -->',
    "    <pre>{{ label | leftPad:10:' ' }}: {{ value }}</pre>",
    '  `',
    '})',
    'export class ExampleComponent {',
    '  invoiceId = 42;',
    '  minutes = 3;',
    '  seconds = 7;',
    "  label = 'Total';",
    '  value = 99;',
    '}',
  ].join('\n');
}
