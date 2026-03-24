import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ShufflePipe } from '@ngx-transforms';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';
import { ShufflePlayground } from '../../examples/shuffle-playground/shuffle-playground';

@Component({
  selector: 'app-shuffle-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ShufflePipe,
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    AuthorCredit,
    Breadcrumb,
    ShufflePlayground,
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        Shuffle Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        Randomly reorders elements in an array using the Fisher-Yates algorithm.
        Every permutation has equal probability, no bias.
      </p>

      <!-- Use Cases -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Common Use Cases</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold mt-0.5">1</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Quiz Apps</h4>
                <p class="text-sm text-muted-foreground">Randomize question order and answer choices so no two attempts are the same.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-bold mt-0.5">2</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Music Playlists</h4>
                <p class="text-sm text-muted-foreground">Shuffle tracks for a randomized listening experience.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-bold mt-0.5">3</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Team Assignment</h4>
                <p class="text-sm text-muted-foreground">Randomly assign team members to groups, tasks, or presentation order.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-bold mt-0.5">4</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Content Feeds</h4>
                <p class="text-sm text-muted-foreground">Randomize featured products, testimonials, or ad placements to avoid bias.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Interactive Example</h2>
      <app-macos-window title="Shuffle Playground">
        <app-shuffle-playground />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>
      <app-code-preview [code]="code" [language]="'typescript'">
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4">Shuffle Examples</h3>
            <div class="rounded-md bg-muted p-6 border border-border space-y-4">
              <div>
                <div class="text-xs text-muted-foreground mb-2">Shuffled numbers (click refresh to re-shuffle)</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ sampleNumbers | shuffle }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Shuffled names</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ sampleNames | shuffle }}</p>
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
              <td class="px-4 py-3 text-muted-foreground">unknown[]</td>
              <td class="px-4 py-3 font-mono text-xs">-</td>
              <td class="px-4 py-3 text-muted-foreground">The array to randomly reorder</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-bold my-8">Features</h2>
      <div class="rounded-md border border-border p-6 space-y-4">
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Fisher-Yates Algorithm</h4>
            <p class="text-sm text-muted-foreground">Uses the gold standard for unbiased shuffling — every permutation has equal probability.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Immutable</h4>
            <p class="text-sm text-muted-foreground">Always returns a new array — the original order is never modified.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold">!</span>
          <div>
            <h4 class="font-semibold">Impure Pipe</h4>
            <p class="text-sm text-muted-foreground">Runs on every change detection cycle. For best performance, bind the shuffled result to a signal and re-trigger manually.</p>
          </div>
        </div>
      </div>

      <div class="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
        <app-author-credit author="Mofiro Jean" url="https://github.com/mofirojean" />
        <div class="flex gap-4">
          <app-next-prev-navigation
            [previous]="{ label: 'Reverse', link: '/docs/pipes/reverse' }"
            [next]="{ label: 'Tail', link: '/docs/pipes/tail' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class ShufflePage {
  sampleNumbers = [1, 2, 3, 4, 5, 6, 7, 8];
  sampleNames = ['Alice', 'Bob', 'Carol', 'Dave', 'Emma'];

  code = [
    'import { Component } from \'@angular/core\';',
    'import { ShufflePipe } from \'ngx-transforms\';',
    '',
    '@Component({',
    '  selector: \'app-example\',',
    '  standalone: true,',
    '  imports: [ShufflePipe],',
    '  template: `',
    '    <!-- Shuffle quiz questions -->',
    '    @for (q of questions | shuffle; track q.id) {',
    '      <div>{{ q.text }}</div>',
    '    }',
    '',
    '    <!-- Randomize playlist -->',
    '    @for (track of playlist | shuffle; track track.id) {',
    '      <div>{{ track.title }}</div>',
    '    }',
    '  `',
    '})',
    'export class ExampleComponent {',
    '  questions = [',
    '    { id: 1, text: \'What is Angular?\' },',
    '    { id: 2, text: \'What is TypeScript?\' },',
    '    { id: 3, text: \'What is RxJS?\' },',
    '  ];',
    '  playlist = [',
    '    { id: 1, title: \'Track A\' },',
    '    { id: 2, title: \'Track B\' },',
    '  ];',
    '}',
  ].join('\n');
}
