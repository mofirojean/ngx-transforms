import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideCopy } from '@ng-icons/lucide';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';
import { JsonTreeViewer } from '../../examples/json-tree-viewer/json-tree-viewer';

@Component({
  selector: 'app-recipe-json-tree-viewer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ClipboardModule, NgIconComponent, MacosWindow, AuthorCredit, Breadcrumb, JsonTreeViewer],
  providers: [provideIcons({ lucideCopy, lucideCheck })],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <div class="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4">
        Recipe
      </div>

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        JSON Tree Viewer
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        Render any unknown JSON value as a tree of arrays, objects, or scalars as an
        interactive expandable tree, using nothing but pipes and Angular's
        control-flow blocks.
      </p>

      <div class="mb-10">
        <h2 class="text-2xl font-bold mb-3">The problem</h2>
        <p class="leading-7 text-muted-foreground">
          You receive a JSON payload of unknown shape, an API response, a log
          entry, a feature-flag config and want to render it as a readable
          tree without pulling in a heavyweight component library. Each node
          might be an array, an object, or a primitive, and the depth is
          arbitrary.
        </p>
      </div>

      <div class="mb-10">
        <h2 class="text-2xl font-bold mb-3">The pipes you'll combine</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <a routerLink="/docs/pipes/is-array" class="rounded-md border border-border p-4 hover:border-foreground/50 transition-colors">
            <div class="font-mono text-sm font-semibold mb-1">isArray</div>
            <p class="text-xs text-muted-foreground">Branch into list-rendering when the node is an Array.</p>
          </a>
          <a routerLink="/docs/pipes/is-object" class="rounded-md border border-border p-4 hover:border-foreground/50 transition-colors">
            <div class="font-mono text-sm font-semibold mb-1">isObject</div>
            <p class="text-xs text-muted-foreground">Branch into record-rendering for plain objects (rejects arrays and null).</p>
          </a>
          <a routerLink="/docs/pipes/pairs" class="rounded-md border border-border p-4 hover:border-foreground/50 transition-colors">
            <div class="font-mono text-sm font-semibold mb-1">pairs</div>
            <p class="text-xs text-muted-foreground">Turn an object into [key, value] tuples you can iterate with &#64;for.</p>
          </a>
        </div>
      </div>

      <h2 class="text-2xl font-bold mb-4">Live example</h2>
      <app-macos-window title="JSON Tree Viewer">
        <app-json-tree-viewer />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">The pattern</h2>
      <p class="leading-7 text-muted-foreground mb-6">
        Build a recursive Angular component that imports itself. For each
        node, branch with <code class="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">&#64;if</code>
        on the boolean pipes: render an array as a list of nodes, an object
        as a list of key/value rows, and anything else as a leaf scalar.
      </p>

      <div class="relative rounded-lg border border-border bg-muted/30 overflow-hidden">
        <div class="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/50">
          <span class="text-xs font-mono text-muted-foreground">tree-node.ts</span>
          <button
            type="button"
            (click)="copyCode()"
            class="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors"
            [cdkCopyToClipboard]="code"
          >
            @if (copied()) {
              <ng-icon name="lucideCheck" class="h-3.5 w-3.5 text-green-500"></ng-icon>
              <span>Copied</span>
            } @else {
              <ng-icon name="lucideCopy" class="h-3.5 w-3.5"></ng-icon>
              <span>Copy</span>
            }
          </button>
        </div>
        <pre class="overflow-x-auto p-4 text-sm leading-relaxed"><code class="font-mono" [innerHTML]="highlightedCode()"></code></pre>
      </div>

      <p class="leading-7 text-sm text-muted-foreground mt-3">
        The recursive trick is the component importing itself in its own
        <code class="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">imports</code>
        array. Standalone components support self-referential imports, which keeps the entire tree walker in a single file.
      </p>

      <h2 class="text-2xl font-bold my-8">Why this composes well</h2>
      <div class="rounded-md border border-border p-6 space-y-4">
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">No type-narrowing helpers needed</h4>
            <p class="text-sm text-muted-foreground">The boolean pipes do the discrimination in the template — your component class stays free of <code class="text-xs font-mono">typeof</code> checks.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Pure pipes, free memoization</h4>
            <p class="text-sm text-muted-foreground">Every pipe in this recipe is pure, so Angular caches each branch's evaluation across change detection cycles automatically.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold">!</span>
          <div>
            <h4 class="font-semibold">isObject excludes arrays</h4>
            <p class="text-sm text-muted-foreground">Order the branches so isArray runs first — otherwise arrays would be caught by isObject (typeof array === 'object').</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Tree-shaken</h4>
            <p class="text-sm text-muted-foreground">Three pipes is all that ships to your bundle. Roughly 600 bytes of pipe code, no recursion library.</p>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Extensions</h2>
      <ul class="list-disc list-inside space-y-2 text-muted-foreground">
        <li>Add a depth limit by reading <code class="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">[depth]</code> and rendering <code class="text-xs font-mono">…</code> past a threshold.</li>
        <li>Highlight changed fields by combining with <a routerLink="/docs/pipes/diff-obj" class="text-primary underline">diffObj</a> before walking.</li>
        <li>Mask sensitive paths (passwords, tokens) by intercepting nodes and rendering through <a routerLink="/docs/pipes/credit-card-mask" class="text-primary underline">credit-card-mask</a> or a custom mask.</li>
        <li>Persist the expanded/collapsed set per-node by keying off the path in the tree.</li>
      </ul>

      <div class="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
        <app-author-credit author="Mofiro Jean" url="https://github.com/mofirojean" />
        <a routerLink="/docs/recipes" class="text-primary underline">← All recipes</a>
      </div>
    </div>
  `,
})
export class JsonTreeViewerRecipe {
  readonly copied = signal(false);
  readonly highlightedCode = computed(() => {
    const grammar = Prism.languages['typescript'];
    return grammar ? Prism.highlight(this.code, grammar, 'typescript') : this.code;
  });

  copyCode() {
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }

  code = [
    "import { Component, input } from '@angular/core';",
    "import { JsonPipe } from '@angular/common';",
    "import { IsArrayPipe, IsObjectPipe, PairsPipe } from 'ngx-transforms';",
    '',
    '@Component({',
    "  selector: 'app-tree-node',",
    '  standalone: true,',
    '  imports: [JsonPipe, IsArrayPipe, IsObjectPipe, PairsPipe, TreeNode],',
    '  template: `',
    '    @if (value() | isArray) {',
    '      <ul>',
    '        @for (item of asArray(); track $index) {',
    '          <li><app-tree-node [value]="item" /></li>',
    '        }',
    '      </ul>',
    '    } @else if (value() | isObject) {',
    '      <dl>',
    '        @for (entry of value() | pairs; track entry[0]) {',
    '          <dt>{{ entry[0] }}</dt>',
    '          <dd><app-tree-node [value]="entry[1]" /></dd>',
    '        }',
    '      </dl>',
    '    } @else {',
    '      <span>{{ value() | json }}</span>',
    '    }',
    '  `,',
    '})',
    'export class TreeNode {',
    '  value = input<unknown>(null);',
    '  asArray = () => this.value() as unknown[];',
    '}',
  ].join('\n');
}
