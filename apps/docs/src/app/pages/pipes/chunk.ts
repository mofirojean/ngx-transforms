import { Component, ChangeDetectionStrategy } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { ChunkPipe } from '@ngx-transforms';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';
import { ChunkPlayground } from '../../examples/chunk-playground/chunk-playground';

@Component({
  selector: 'app-chunk-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ChunkPipe,
    JsonPipe,
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    AuthorCredit,
    Breadcrumb,
    ChunkPlayground,
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        Chunk Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        Splits an array into smaller groups of a specified size.
        The last chunk may contain fewer items if the array doesn't divide evenly.
      </p>

      <!-- Use Cases -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Common Use Cases</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold mt-0.5">1</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Grid Layouts</h4>
                <p class="text-sm text-muted-foreground">Split products into rows of 3 or 4 for responsive card grids.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-bold mt-0.5">2</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Batch Processing</h4>
                <p class="text-sm text-muted-foreground">Divide items into batches for API calls with rate limits.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-bold mt-0.5">3</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Carousel Slides</h4>
                <p class="text-sm text-muted-foreground">Group items into slides showing n items each for a carousel component.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-bold mt-0.5">4</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Pagination</h4>
                <p class="text-sm text-muted-foreground">Split data into page-sized chunks for client-side pagination.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Interactive Example</h2>
      <app-macos-window title="Chunk Playground">
        <app-chunk-playground />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>
      <app-code-preview [code]="code" [language]="'typescript'">
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4">Chunk Examples</h3>
            <div class="rounded-md bg-muted p-6 border border-border space-y-4">
              <div>
                <div class="text-xs text-muted-foreground mb-2">Chunks of 2</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ numbers | chunk:2 | json }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Chunks of 3</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ numbers | chunk:3 | json }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Chunks of 4</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ letters | chunk:4 | json }}</p>
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
              <td class="px-4 py-3 text-muted-foreground">unknown[]</td>
              <td class="px-4 py-3 font-mono text-xs">-</td>
              <td class="px-4 py-3 text-muted-foreground">The array to split into chunks</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">size</td>
              <td class="px-4 py-3 text-muted-foreground">number</td>
              <td class="px-4 py-3 font-mono text-xs">1</td>
              <td class="px-4 py-3 text-muted-foreground">Maximum number of items per chunk</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-bold my-8">Features</h2>
      <div class="rounded-md border border-border p-6 space-y-4">
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Even & Uneven Splits</h4>
            <p class="text-sm text-muted-foreground">Handles arrays that don't divide evenly — the last chunk contains the remainder.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Boundary Safe</h4>
            <p class="text-sm text-muted-foreground">Size 0 or negative returns empty. Size larger than array returns one chunk with all items.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Immutable</h4>
            <p class="text-sm text-muted-foreground">Always returns new arrays — the original data is never modified.</p>
          </div>
        </div>
      </div>

      <div class="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
        <app-author-credit author="Mofiro Jean" url="https://github.com/mofirojean" />
        <div class="flex gap-4">
          <app-next-prev-navigation
            [previous]="{ label: 'Flatten', link: '/docs/pipes/flatten' }"
            [next]="{ label: 'Initial', link: '/docs/pipes/initial' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class ChunkPage {
  numbers = [1, 2, 3, 4, 5, 6, 7];
  letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  code = [
    'import { Component } from \'@angular/core\';',
    'import { ChunkPipe } from \'ngx-transforms\';',
    '',
    '@Component({',
    '  selector: \'app-example\',',
    '  standalone: true,',
    '  imports: [ChunkPipe],',
    '  template: `',
    '    <!-- Grid rows of 3 products -->',
    '    @for (row of products | chunk:3; track $index) {',
    '      <div class="grid grid-cols-3 gap-4">',
    '        @for (product of row; track product.id) {',
    '          <app-product-card [product]="product" />',
    '        }',
    '      </div>',
    '    }',
    '',
    '    <!-- Carousel slides of 4 -->',
    '    @for (slide of images | chunk:4; track $index) {',
    '      <div class="slide">',
    '        @for (img of slide; track $index) {',
    '          <img [src]="img" />',
    '        }',
    '      </div>',
    '    }',
    '  `',
    '})',
    'export class ExampleComponent {',
    '  products = [...];',
    '  images = [...];',
    '}',
  ].join('\n');
}
