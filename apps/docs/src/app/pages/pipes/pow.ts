import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PowPipe } from '@ngx-transforms';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';
import { PowPlayground } from '../../examples/pow-playground/pow-playground';

@Component({
  selector: 'app-pow-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PowPipe,
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    AuthorCredit,
    Breadcrumb,
    PowPlayground,
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        Pow Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        Raises a number to the specified power. Uses Math.pow internally.
        Defaults to squaring (exponent 2) when no exponent is provided.
      </p>

      <!-- Use Cases -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Common Use Cases</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold mt-0.5">1</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Area Calculations</h4>
                <p class="text-sm text-muted-foreground">Square a side length to compute area.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-bold mt-0.5">2</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Compound Interest</h4>
                <p class="text-sm text-muted-foreground">Raise growth rate to the power of periods for financial projections.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-bold mt-0.5">3</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Unit Conversion</h4>
                <p class="text-sm text-muted-foreground">Convert between metric prefixes using powers of 10.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-bold mt-0.5">4</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Volume Calculations</h4>
                <p class="text-sm text-muted-foreground">Cube a side length to compute volume.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Interactive Example</h2>
      <app-macos-window title="Pow Playground">
        <app-pow-playground />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>
      <app-code-preview [code]="code" [language]="'typescript'">
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4">Pow Examples</h3>
            <div class="rounded-md bg-muted p-6 border border-border space-y-4">
              <div>
                <div class="text-xs text-muted-foreground mb-2">Square (default exponent 2)</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ 5 | pow }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Cube (exponent 3)</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ 3 | pow:3 }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Power of 10</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ 10 | pow:6 }}</p>
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
              <td class="px-4 py-3 text-muted-foreground">number</td>
              <td class="px-4 py-3 font-mono text-xs">-</td>
              <td class="px-4 py-3 text-muted-foreground">The base number</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">exponent</td>
              <td class="px-4 py-3 text-muted-foreground">number</td>
              <td class="px-4 py-3 font-mono text-xs">2</td>
              <td class="px-4 py-3 text-muted-foreground">The power to raise the base to</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-bold my-8">Features</h2>
      <div class="rounded-md border border-border p-6 space-y-4">
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Default Squaring</h4>
            <p class="text-sm text-muted-foreground">Omit the exponent to square the value — the most common use case.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Any Exponent</h4>
            <p class="text-sm text-muted-foreground">Supports positive, negative, zero, and decimal exponents.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Handles Negatives</h4>
            <p class="text-sm text-muted-foreground">Negative bases with even/odd exponents work correctly.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Null Safe</h4>
            <p class="text-sm text-muted-foreground">Returns undefined for null, undefined, or NaN inputs.</p>
          </div>
        </div>
      </div>

      <div class="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
        <app-author-credit author="Mofiro Jean" url="https://github.com/mofirojean" />
        <div class="flex gap-4">
          <app-next-prev-navigation
            [previous]="{ label: 'Sqrt', link: '/docs/pipes/sqrt' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class PowPage {
  code = [
    "import { Component } from '@angular/core';",
    "import { PowPipe } from 'ngx-transforms';",
    '',
    '@Component({',
    "  selector: 'app-example',",
    '  standalone: true,',
    '  imports: [PowPipe],',
    '  template: `',
    '    <!-- Square (default) -->',
    '    <p>Area: {{ side | pow }}px2</p>',
    '',
    '    <!-- Cube -->',
    '    <p>Volume: {{ side | pow:3 }}px3</p>',
    '',
    '    <!-- Power of 10 -->',
    '    <p>{{ 10 | pow:6 }} bytes</p>',
    '  `',
    '})',
    'export class ExampleComponent {',
    '  side = 5;',
    '}',
  ].join('\n');
}