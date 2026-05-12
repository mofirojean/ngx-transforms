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
import { DashboardStats } from '../../examples/dashboard-stats/dashboard-stats';

@Component({
  selector: 'app-recipe-dashboard-stats-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ClipboardModule, NgIconComponent, MacosWindow, AuthorCredit, Breadcrumb, DashboardStats],
  providers: [provideIcons({ lucideCopy, lucideCheck })],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <div class="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4">
        Recipe
      </div>

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        Dashboard Stats Card
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        Build a live KPI dashboard from a single source array by fanning it
        out into parallel aggregations of revenue, average, max, storage,
        completion rate, each its own pipe chain in a pure template.
      </p>

      <div class="mb-10">
        <h2 class="text-2xl font-bold mb-3">The problem</h2>
        <p class="leading-7 text-muted-foreground">
          You have one array of records that is orders, sessions, requests and a
          UI that needs to summarize it six different ways. The naive answer
          is to compute each metric in the component class. That works, but
          you've now coupled your component to the layout, and any new card
          means a new getter or signal. Pipes do this better: parallel
          aggregations live in the template alongside the cards that consume
          them, and Angular caches each chain independently.
        </p>
      </div>

      <div class="mb-10">
        <h2 class="text-2xl font-bold mb-3">The pipes you'll combine</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <a routerLink="/docs/pipes/sum" class="rounded-md border border-border p-4 hover:border-foreground/50 transition-colors">
            <div class="font-mono text-sm font-semibold mb-1">sum</div>
            <p class="text-xs text-muted-foreground">Totals across rows accepts a key so you can sum any numeric field directly.</p>
          </a>
          <a routerLink="/docs/pipes/average" class="rounded-md border border-border p-4 hover:border-foreground/50 transition-colors">
            <div class="font-mono text-sm font-semibold mb-1">average</div>
            <p class="text-xs text-muted-foreground">Arithmetic mean same key-aware API as sum.</p>
          </a>
          <a routerLink="/docs/pipes/max" class="rounded-md border border-border p-4 hover:border-foreground/50 transition-colors">
            <div class="font-mono text-sm font-semibold mb-1">max</div>
            <p class="text-xs text-muted-foreground">Peak value across rows drives the "Largest Order" tile.</p>
          </a>
          <a routerLink="/docs/pipes/bytes" class="rounded-md border border-border p-4 hover:border-foreground/50 transition-colors">
            <div class="font-mono text-sm font-semibold mb-1">bytes</div>
            <p class="text-xs text-muted-foreground">Formats a raw byte count into KB/MB/GB so storage stays readable.</p>
          </a>
          <a routerLink="/docs/pipes/percentage" class="rounded-md border border-border p-4 hover:border-foreground/50 transition-colors">
            <div class="font-mono text-sm font-semibold mb-1">percentage</div>
            <p class="text-xs text-muted-foreground">A value as a percent of a total drives completion-rate, conversion, etc.</p>
          </a>
          <a routerLink="/docs/pipes/pluck" class="rounded-md border border-border p-4 hover:border-foreground/50 transition-colors">
            <div class="font-mono text-sm font-semibold mb-1">pluck + unique + count</div>
            <p class="text-xs text-muted-foreground">Cardinality metric count distinct values of any property.</p>
          </a>
        </div>
      </div>

      <h2 class="text-2xl font-bold mb-4">Live example</h2>
      <p class="text-sm text-muted-foreground mb-3">
        Add/remove orders, filter by region, or hit <strong>10x boost</strong> to
        watch every card recompute in lockstep. Toggle <strong>Show chains</strong>
        to reveal each card's pipe expression in place.
      </p>
      <app-macos-window title="Live Order Dashboard">
        <app-dashboard-stats />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">The pattern</h2>
      <p class="leading-7 text-muted-foreground mb-6">
        Pass the same source array into multiple independent pipe chains.
        Each card calls a different aggregation pipe, and Angular handles the
        coordination for free — pure pipes memoize per input, so cards whose
        chain doesn't depend on the changed data won't recompute.
      </p>

      <div class="relative rounded-lg border border-border bg-muted/30 overflow-hidden">
        <div class="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/50">
          <span class="text-xs font-mono text-muted-foreground">order-dashboard.ts</span>
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
        Notice that the component class has <strong>zero aggregation logic</strong>
        the entire dashboard is layout. Adding a seventh metric is one
        more template block; the component stays the same.
      </p>

      <h2 class="text-2xl font-bold my-8">Why parallel composition matters</h2>
      <div class="rounded-md border border-border p-6 space-y-4">
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Independent memoization per chain</h4>
            <p class="text-sm text-muted-foreground">Pure pipes cache by reference. When the array reference doesn't change, none of the cards recompute even with six of them.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Layout and metric are co-located</h4>
            <p class="text-sm text-muted-foreground">Each card declares its metric inline. A designer can rearrange cards without touching the component, and the diff stays in one file.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Filters compose for free</h4>
            <p class="text-sm text-muted-foreground">Feed the dashboard a derived array (filtered, sorted, paginated) and every metric recalculates against the new slice no per-card refactor.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold">!</span>
          <div>
            <h4 class="font-semibold">Empty arrays return undefined</h4>
            <p class="text-sm text-muted-foreground">sum / average / max on an empty array return undefined. Use <code class="text-xs font-mono">?? 0</code> or guard with <code class="text-xs font-mono">&#64;if</code> when no rows feel possible.</p>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Extensions</h2>
      <ul class="list-disc list-inside space-y-2 text-muted-foreground">
        <li>Add a <strong>trend delta</strong> by keeping a snapshot signal and diffing against it (pair with <a routerLink="/docs/pipes/diff-obj" class="text-primary underline">diffObj</a>).</li>
        <li>Add <strong>quartile or median</strong> tiles by introducing a small extra helper alongside the existing <a routerLink="/docs/pipes/order-by" class="text-primary underline">orderBy</a> and <a routerLink="/docs/pipes/pluck" class="text-primary underline">pluck</a> chain.</li>
        <li>Combine with <a routerLink="/docs/pipes/group-by" class="text-primary underline">groupBy</a> to render one stats card <em>per group</em> same template, repeated.</li>
        <li>Persist a custom range filter and pipe through the source array — every card adapts automatically.</li>
      </ul>

      <div class="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
        <app-author-credit author="Mofiro Jean" url="https://github.com/mofirojean" />
        <a routerLink="/docs/recipes" class="text-primary underline">← All recipes</a>
      </div>
    </div>
  `,
})
export class DashboardStatsCardRecipe {
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
    "import { Component, input } from '@angular/core';",
    "import { CurrencyPipe } from '@angular/common';",
    "import {",
    "  AveragePipe, BytesPipe, CountPipe, MaxPipe,",
    "  PercentagePipe, PluckPipe, SumPipe, UniquePipe,",
    "} from 'ngx-transforms';",
    '',
    'interface Order {',
    '  total: number;',
    '  fileSizeBytes: number;',
    "  customer: string;",
    "  status: 'completed' | 'pending' | 'failed';",
    '}',
    '',
    '@Component({',
    "  selector: 'app-order-dashboard',",
    '  standalone: true,',
    '  imports: [',
    '    CurrencyPipe, AveragePipe, BytesPipe, CountPipe,',
    '    MaxPipe, PercentagePipe, PluckPipe, SumPipe, UniquePipe,',
    '  ],',
    '  template: `',
    '    <div class="grid grid-cols-3 gap-3">',
    '      <div class="card">',
    '        <span>Total Revenue</span>',
    "        <strong>{{ (orders() | sum:'total') ?? 0 | currency }}</strong>",
    '      </div>',
    '      <div class="card">',
    '        <span>Avg Order Value</span>',
    "        <strong>{{ (orders() | average:'total') ?? 0 | currency }}</strong>",
    '      </div>',
    '      <div class="card">',
    '        <span>Largest Order</span>',
    "        <strong>{{ (orders() | max:'total') ?? 0 | currency }}</strong>",
    '      </div>',
    '      <div class="card">',
    '        <span>Storage Used</span>',
    "        <strong>{{ (orders() | sum:'fileSizeBytes') ?? 0 | bytes }}</strong>",
    '      </div>',
    '      <div class="card">',
    '        <span>Unique Customers</span>',
    "        <strong>{{ orders() | pluck:'customer' | unique | count }}</strong>",
    '      </div>',
    '      <div class="card">',
    '        <span>Completion Rate</span>',
    '        <strong>{{ completedCount() | percentage: orders().length : 1 }}%</strong>',
    '      </div>',
    '    </div>',
    '  `,',
    '})',
    'export class OrderDashboard {',
    '  orders = input.required<Order[]>();',
    "  completedCount = () => this.orders().filter(o => o.status === 'completed').length;",
    '}',
  ].join('\n');
}
