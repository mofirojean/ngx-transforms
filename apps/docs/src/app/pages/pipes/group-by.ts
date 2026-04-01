import { Component, ChangeDetectionStrategy } from '@angular/core';
import { KeyValuePipe } from '@angular/common';
import { GroupByPipe } from '@ngx-transforms';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';
import { GroupByPlayground } from '../../examples/group-by-playground/group-by-playground';

@Component({
  selector: 'app-group-by-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    GroupByPipe,
    KeyValuePipe,
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    AuthorCredit,
    Breadcrumb,
    GroupByPlayground,
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        GroupBy Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        Groups array elements by a property value into an object of arrays.
        Perfect for dashboards, categorized lists, and grouped table views.
      </p>

      <!-- Use Cases -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Common Use Cases</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold mt-0.5">1</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Dashboard Sections</h4>
                <p class="text-sm text-muted-foreground">Group tickets by status, orders by fulfillment state, or tasks by priority.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-bold mt-0.5">2</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Categorized Lists</h4>
                <p class="text-sm text-muted-foreground">Display products by category, contacts by company, or files by type.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-bold mt-0.5">3</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Org Charts</h4>
                <p class="text-sm text-muted-foreground">Group employees by department, team, or location for directory views.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-bold mt-0.5">4</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Report Aggregation</h4>
                <p class="text-sm text-muted-foreground">Group sales by region, logs by severity, or events by date for reporting.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Interactive Example</h2>
      <app-macos-window title="GroupBy Playground">
        <app-group-by-playground />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>
      <app-code-preview [code]="code" [language]="'typescript'">
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4">GroupBy Examples</h3>
            <div class="rounded-md bg-muted p-6 border border-border space-y-4">
              <div>
                <div class="text-xs text-muted-foreground mb-2">Group by role</div>
                <div class="rounded-md bg-background p-4">
                  @for (group of sampleUsers | groupBy:'role' | keyvalue; track group.key) {
                    <div class="mb-2">
                      <span class="font-bold text-sm text-primary">{{ group.key }}</span>
                      <span class="text-xs text-muted-foreground ml-2">({{ $any(group.value).length }})</span>
                    </div>
                  }
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
              <td class="px-4 py-3 text-muted-foreground">The array to group</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">key</td>
              <td class="px-4 py-3 text-muted-foreground">string</td>
              <td class="px-4 py-3 font-mono text-xs">-</td>
              <td class="px-4 py-3 text-muted-foreground">Property path to group by (supports dot notation)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-bold my-8">Features</h2>
      <div class="rounded-md border border-border p-6 space-y-4">
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Object Output</h4>
            <p class="text-sm text-muted-foreground">Returns a keyed object — iterate with Angular's keyvalue pipe for template rendering.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Dot Notation</h4>
            <p class="text-sm text-muted-foreground">Group by nested properties like 'customer.city' or 'meta.category'.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Preserves Order</h4>
            <p class="text-sm text-muted-foreground">Items within each group maintain their original array order.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Missing Key Safe</h4>
            <p class="text-sm text-muted-foreground">Objects without the key property are grouped under "undefined".</p>
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
export class GroupByPage {
  sampleUsers = [
    { name: 'Alice', role: 'admin' },
    { name: 'Bob', role: 'editor' },
    { name: 'Carol', role: 'admin' },
    { name: 'Dave', role: 'viewer' },
  ];

  code = [
    'import { Component } from \'@angular/core\';',
    'import { KeyValuePipe } from \'@angular/common\';',
    'import { GroupByPipe } from \'ngx-transforms\';',
    '',
    '@Component({',
    '  selector: \'app-example\',',
    '  standalone: true,',
    '  imports: [GroupByPipe, KeyValuePipe],',
    '  template: `',
    '    <!-- Group employees by department -->',
    '    @for (group of employees | groupBy:\'department\' | keyvalue; track group.key) {',
    '      <h3>{{ group.key }} ({{ group.value.length }})</h3>',
    '      @for (emp of group.value; track $index) {',
    '        <div>{{ emp.name }}</div>',
    '      }',
    '    }',
    '',
    '    <!-- Group tickets by priority -->',
    '    @for (group of tickets | groupBy:\'priority\' | keyvalue; track group.key) {',
    '      <div class="column">',
    '        <h4>{{ group.key }}</h4>',
    '        @for (ticket of group.value; track ticket.id) {',
    '          <app-ticket-card [ticket]="ticket" />',
    '        }',
    '      </div>',
    '    }',
    '  `',
    '})',
    'export class ExampleComponent {',
    '  employees = [...];',
    '  tickets = [...];',
    '}',
  ].join('\n');
}
