import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RadiansPipe } from '@ngx-transforms';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';
import { RadiansPlayground } from '../../examples/radians-playground/radians-playground';

@Component({
  selector: 'app-radians-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RadiansPipe,
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    AuthorCredit,
    Breadcrumb,
    RadiansPlayground,
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        Radians Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        Converts a value in degrees to radians. Uses the formula
        radians = degrees * (PI / 180).
      </p>

      <!-- Use Cases -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Common Use Cases</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold mt-0.5">1</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Canvas Drawing</h4>
                <p class="text-sm text-muted-foreground">Convert user-friendly degree values to radians for Canvas arc() and rotate().</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-bold mt-0.5">2</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Trigonometry</h4>
                <p class="text-sm text-muted-foreground">Feed degree inputs into Math.sin(), Math.cos(), and Math.tan().</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-bold mt-0.5">3</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">SVG Transforms</h4>
                <p class="text-sm text-muted-foreground">Convert degree rotations for SVG path calculations that require radians.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-bold mt-0.5">4</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Physics Simulations</h4>
                <p class="text-sm text-muted-foreground">Convert angular values for physics engines that operate in radians.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Interactive Example</h2>
      <app-macos-window title="Radians Playground">
        <app-radians-playground />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>
      <app-code-preview [code]="code" [language]="'typescript'">
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4">Radians Examples</h3>
            <div class="rounded-md bg-muted p-6 border border-border space-y-4">
              <div>
                <div class="text-xs text-muted-foreground mb-2">180 degrees to radians</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ 180 | radians }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">90 degrees to radians</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ 90 | radians }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">45 degrees to radians</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ 45 | radians }}</p>
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
              <td class="px-4 py-3 text-muted-foreground">number</td>
              <td class="px-4 py-3 font-mono text-xs">-</td>
              <td class="px-4 py-3 text-muted-foreground">The angle in degrees to convert</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-bold my-8">Features</h2>
      <div class="rounded-md border border-border p-6 space-y-4">
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Simple API</h4>
            <p class="text-sm text-muted-foreground">No arguments needed — just pipe any degree value.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Handles Negatives</h4>
            <p class="text-sm text-muted-foreground">Negative degrees convert to negative radians correctly.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Counterpart to Degrees</h4>
            <p class="text-sm text-muted-foreground">Use with the degrees pipe for bidirectional conversion.</p>
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
            [previous]="{ label: 'Bytes', link: '/docs/pipes/bytes' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class RadiansPage {
  code = [
    "import { Component } from '@angular/core';",
    "import { RadiansPipe } from 'ngx-transforms';",
    '',
    '@Component({',
    "  selector: 'app-example',",
    '  standalone: true,',
    '  imports: [RadiansPipe],',
    '  template: `',
    '    <!-- Degrees to radians -->',
    '    <p>{{ angleDeg | radians }}</p>',
    '',
    '    <!-- For Canvas arc -->',
    '    <p>Start: {{ startAngle | radians }}</p>',
    '',
    '    <!-- Chained with round -->',
    '    <p>{{ rotation | radians | round:4 }}</p>',
    '  `',
    '})',
    'export class ExampleComponent {',
    '  angleDeg = 45;     // 0.7854 rad',
    '  startAngle = 90;   // 1.5708 rad',
    '  rotation = 270;    // 4.7124 rad',
    '}',
  ].join('\n');
}
