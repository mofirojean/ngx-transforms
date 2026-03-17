import { Component, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { TimeAgoPipePipe } from '@ngx-transforms';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';

@Component({
  selector: 'app-time-ago-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TimeAgoPipePipe,
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    AuthorCredit,
    Breadcrumb,
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        Time Ago Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        Converts dates into localized relative time strings like "5 minutes ago" or "yesterday"
        using the native Intl.RelativeTimeFormat API. Zero dependencies, 100+ locales supported.
      </p>

      <!-- Use Cases -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Common Use Cases</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold mt-0.5">1</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Activity Feeds</h4>
                <p class="text-sm text-muted-foreground">Show when actions happened in social feeds, dashboards, and timelines.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-bold mt-0.5">2</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Notifications</h4>
                <p class="text-sm text-muted-foreground">Display human-friendly timestamps on push notifications and alerts.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-bold mt-0.5">3</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Comments & Chat</h4>
                <p class="text-sm text-muted-foreground">Show relative timestamps on messages, comments, and forum posts.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-bold mt-0.5">4</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Audit Logs</h4>
                <p class="text-sm text-muted-foreground">Display when events occurred in admin panels and audit trails.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Interactive Example</h2>
      <app-macos-window title="Time Ago Demo">
        <div class="p-6 space-y-6">
          <div class="space-y-3">
            <div class="flex items-center gap-3">
              <label for="locale-select" class="text-sm font-medium w-20">Locale</label>
              <select
                id="locale-select"
                class="rounded-md border border-border bg-background px-3 py-2 text-sm"
                (change)="onLocaleChange($event)">
                <option value="en">English (en)</option>
                <option value="es">Spanish (es)</option>
                <option value="fr">French (fr)</option>
                <option value="de">German (de)</option>
                <option value="ja">Japanese (ja)</option>
                <option value="ar">Arabic (ar)</option>
                <option value="zh">Chinese (zh)</option>
                <option value="pt">Portuguese (pt)</option>
              </select>
            </div>
          </div>
          <div class="rounded-md border border-border divide-y divide-border">
            <div class="flex items-center justify-between px-4 py-3">
              <span class="text-sm text-muted-foreground">30 seconds ago</span>
              <span class="text-sm font-mono">{{ thirtySecondsAgo() | timeAgo:locale() }}</span>
            </div>
            <div class="flex items-center justify-between px-4 py-3">
              <span class="text-sm text-muted-foreground">5 minutes ago</span>
              <span class="text-sm font-mono">{{ fiveMinutesAgo() | timeAgo:locale() }}</span>
            </div>
            <div class="flex items-center justify-between px-4 py-3">
              <span class="text-sm text-muted-foreground">3 hours ago</span>
              <span class="text-sm font-mono">{{ threeHoursAgo() | timeAgo:locale() }}</span>
            </div>
            <div class="flex items-center justify-between px-4 py-3">
              <span class="text-sm text-muted-foreground">1 day ago</span>
              <span class="text-sm font-mono">{{ oneDayAgo() | timeAgo:locale() }}</span>
            </div>
            <div class="flex items-center justify-between px-4 py-3">
              <span class="text-sm text-muted-foreground">2 weeks ago</span>
              <span class="text-sm font-mono">{{ twoWeeksAgo() | timeAgo:locale() }}</span>
            </div>
            <div class="flex items-center justify-between px-4 py-3">
              <span class="text-sm text-muted-foreground">3 months ago</span>
              <span class="text-sm font-mono">{{ threeMonthsAgo() | timeAgo:locale() }}</span>
            </div>
            <div class="flex items-center justify-between px-4 py-3">
              <span class="text-sm text-muted-foreground">In 10 minutes (future)</span>
              <span class="text-sm font-mono">{{ tenMinutesFromNow() | timeAgo:locale() }}</span>
            </div>
          </div>
        </div>
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>
      <app-code-preview [code]="code" [language]="'typescript'">
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4">Time Ago Examples</h3>
            <div class="rounded-md bg-muted p-6 border border-border space-y-4">
              <div>
                <div class="text-xs text-muted-foreground mb-2">Default (English)</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ fiveMinutesAgo() | timeAgo }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Spanish Locale</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ fiveMinutesAgo() | timeAgo:'es' }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">French Locale</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ threeHoursAgo() | timeAgo:'fr' }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Yesterday (numeric: auto)</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ oneDayAgo() | timeAgo }}</p>
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
              <td class="px-4 py-3 text-muted-foreground">Date | string | number</td>
              <td class="px-4 py-3 font-mono text-xs">—</td>
              <td class="px-4 py-3 text-muted-foreground">The date to convert (Date object, ISO string, or timestamp)</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">locale</td>
              <td class="px-4 py-3 text-muted-foreground">string</td>
              <td class="px-4 py-3 font-mono text-xs">'en'</td>
              <td class="px-4 py-3 text-muted-foreground">BCP 47 locale code (e.g., 'en', 'es', 'fr', 'de', 'ja')</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-bold my-8">Features</h2>
      <div class="rounded-md border border-border p-6 space-y-4">
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">100+ Locales</h4>
            <p class="text-sm text-muted-foreground">Powered by Intl.RelativeTimeFormat — supports every locale your browser supports, no extra bundles.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Natural Phrasing</h4>
            <p class="text-sm text-muted-foreground">Uses numeric: 'auto' for natural output like "yesterday" and "last week" instead of "1 day ago".</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Zero Dependencies</h4>
            <p class="text-sm text-muted-foreground">No moment.js, no date-fns — uses the browser's built-in Intl API for zero bundle overhead.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Future & Past Dates</h4>
            <p class="text-sm text-muted-foreground">Handles both past ("5 minutes ago") and future ("in 5 minutes") dates automatically.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Cached Formatter</h4>
            <p class="text-sm text-muted-foreground">Caches the Intl.RelativeTimeFormat instance per locale to avoid repeated construction overhead.</p>
          </div>
        </div>
      </div>

      <div class="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
        <app-author-credit author="Mofiro Jean" url="https://github.com/mofirojean" />
        <div class="flex gap-4">
          <app-next-prev-navigation
            [previous]="{ label: 'Text Transform', link: '/docs/pipes/text-transform' }"
            [next]="{ label: 'Truncate', link: '/docs/pipes/truncate' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class TimeAgoPage {
  locale = signal('en');

  thirtySecondsAgo = computed(() => new Date(Date.now() - 30_000));
  fiveMinutesAgo = computed(() => new Date(Date.now() - 5 * 60_000));
  threeHoursAgo = computed(() => new Date(Date.now() - 3 * 3_600_000));
  oneDayAgo = computed(() => new Date(Date.now() - 86_400_000));
  twoWeeksAgo = computed(() => new Date(Date.now() - 14 * 86_400_000));
  threeMonthsAgo = computed(() => new Date(Date.now() - 90 * 86_400_000));
  tenMinutesFromNow = computed(() => new Date(Date.now() + 10 * 60_000));

  onLocaleChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.locale.set(select.value);
  }

  code = `
import { Component } from '@angular/core';
import { TimeAgoPipePipe } from 'ngx-transforms';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [TimeAgoPipePipe],
  template: \`
    <!-- Default (English) -->
    <p>{{ lastLogin | timeAgo }}</p>

    <!-- With locale -->
    <p>{{ createdAt | timeAgo:'es' }}</p>
    <p>{{ updatedAt | timeAgo:'fr' }}</p>

    <!-- Accepts Date objects, ISO strings, and timestamps -->
    <p>{{ dateObject | timeAgo }}</p>
    <p>{{ '2024-01-15T10:30:00Z' | timeAgo }}</p>
    <p>{{ 1705312200000 | timeAgo }}</p>
  \`
})
export class ExampleComponent {
  lastLogin = new Date(Date.now() - 5 * 60_000);
  createdAt = new Date(Date.now() - 3 * 3_600_000);
  updatedAt = new Date(Date.now() - 86_400_000);
  dateObject = new Date(Date.now() - 7 * 86_400_000);
}
  `;
}
