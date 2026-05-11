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
import { SlugBuilder } from '../../examples/slug-builder/slug-builder';

@Component({
  selector: 'app-recipe-smart-slug-builder',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ClipboardModule, NgIconComponent, MacosWindow, AuthorCredit, Breadcrumb, SlugBuilder],
  providers: [provideIcons({ lucideCopy, lucideCheck })],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <div class="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4">
        Recipe
      </div>

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        Smart Slug Builder
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        Turn any article title accented characters, emoji, run-on length
        into a clean URL slug. Three pipes in a left-to-right chain, no
        regex juggling in your component.
      </p>

      <div class="mb-10">
        <h2 class="text-2xl font-bold mb-3">The problem</h2>
        <p class="leading-7 text-muted-foreground">
          You let users (or yourself) write article titles freely, accents,
          emoji, mixed casing, occasional 200-character monsters. The router
          needs something URL-safe, predictable, and bounded. Pulling in a
          slug library or hand-writing a regex chain for every project is
          overkill.
        </p>
      </div>

      <div class="mb-10">
        <h2 class="text-2xl font-bold mb-3">The pipes you'll chain</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <a routerLink="/docs/pipes/truncate" class="rounded-md border border-border p-4 hover:border-foreground/50 transition-colors">
            <div class="font-mono text-sm font-semibold mb-1">truncate</div>
            <p class="text-xs text-muted-foreground">Cap the length first, at a word boundary, so the slug stays short.</p>
          </a>
          <a routerLink="/docs/pipes/latinize" class="rounded-md border border-border p-4 hover:border-foreground/50 transition-colors">
            <div class="font-mono text-sm font-semibold mb-1">latinize</div>
            <p class="text-xs text-muted-foreground">Strip diacritics so "Café" becomes "Cafe" before slugifying drops them.</p>
          </a>
          <a routerLink="/docs/pipes/slugify" class="rounded-md border border-border p-4 hover:border-foreground/50 transition-colors">
            <div class="font-mono text-sm font-semibold mb-1">slugify</div>
            <p class="text-xs text-muted-foreground">Lowercase, replace whitespace and punctuation with hyphens.</p>
          </a>
        </div>
      </div>

      <h2 class="text-2xl font-bold mb-4">Live example</h2>
      <app-macos-window title="Smart Slug Builder">
        <app-slug-builder />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">The pattern</h2>
      <p class="leading-7 text-muted-foreground mb-6">
        Chain the three pipes left to right in your template. Order matters:
        <code class="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">truncate</code>
        first to preserve a word boundary while it still has spaces,
        then <code class="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">latinize</code>
        to flatten accents to ASCII, then
        <code class="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">slugify</code>
        to produce the final URL-safe form.
      </p>

      <div class="relative rounded-lg border border-border bg-muted/30 overflow-hidden">
        <div class="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/50">
          <span class="text-xs font-mono text-muted-foreground">slug-input.ts</span>
          <button
            type="button"
            (click)="onCopy()"
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
        Every pipe in the chain is pure, so Angular re-evaluates the final
        slug only when the input title actually changes. No
        <code class="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">computed()</code>
        or RxJS plumbing required.
      </p>

      <h2 class="text-2xl font-bold my-8">Why this composes well</h2>
      <div class="rounded-md border border-border p-6 space-y-4">
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Order is the algorithm</h4>
            <p class="text-sm text-muted-foreground">Truncate → latinize → slugify reads top-down like a pipeline diagram. Reordering breaks the result — for example, truncating after slugify cuts mid-word.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Predictable for any input</h4>
            <p class="text-sm text-muted-foreground">Accents, emoji, punctuation, CJK — the chain produces a usable slug for every shape of input. Empty string in, empty string out.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold">!</span>
          <div>
            <h4 class="font-semibold">No global collision handling</h4>
            <p class="text-sm text-muted-foreground">Slugs are deterministic per-title — two articles with the same slug will collide. Append a short id or timestamp at the call site when uniqueness matters.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Tiny bundle hit</h4>
            <p class="text-sm text-muted-foreground">Three pipes is all that ships. Latinize carries the diacritic table; the other two are roughly 200 bytes each.</p>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Extensions</h2>
      <ul class="list-disc list-inside space-y-2 text-muted-foreground">
        <li>Add a uniqueness suffix at the call site: <code class="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">slug + '-' + shortId()</code>.</li>
        <li>Surface the slug in the URL via a route resolver or <a routerLink="/docs/pipes/wrap" class="text-primary underline">wrap</a> with <code class="text-xs font-mono">/blog/</code> at the start.</li>
        <li>Pre-validate against a route-collision check before navigating.</li>
        <li>Persist the user's manual slug edits by switching to a two-way bound input that bypasses the auto-generated chain.</li>
      </ul>

      <div class="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
        <app-author-credit author="Mofiro Jean" url="https://github.com/mofirojean" />
        <a routerLink="/docs/recipes" class="text-primary underline">← All recipes</a>
      </div>
    </div>
  `,
})
export class SmartSlugBuilderRecipe {
  readonly copied = signal(false);
  readonly highlightedCode = computed(() => {
    const grammar = Prism.languages['typescript'];
    return grammar ? Prism.highlight(this.code, grammar, 'typescript') : this.code;
  });

  onCopy() {
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }

  code = [
    "import { Component, signal } from '@angular/core';",
    "import { FormsModule } from '@angular/forms';",
    "import { LatinizePipe, SlugifyPipe, TruncatePipe } from 'ngx-transforms';",
    '',
    '@Component({',
    "  selector: 'app-slug-input',",
    '  standalone: true,',
    '  imports: [FormsModule, LatinizePipe, SlugifyPipe, TruncatePipe],',
    '  template: `',
    '    <input [ngModel]="title()" (ngModelChange)="title.set($event)" />',
    '    <small>',
    "      /blog/{{ title() | truncate: 60 : '' : true | latinize | slugify }}",
    '    </small>',
    '  `,',
    '})',
    'export class SlugInput {',
    "  title = signal('Café Tour de France — Étape 12');",
    '}',
  ].join('\n');
}
