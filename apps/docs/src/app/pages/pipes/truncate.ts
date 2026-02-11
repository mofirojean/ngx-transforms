import { Component } from '@angular/core';
import { TruncatePipe } from '@ngx-transforms';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { ContentPreviewManager } from '../../examples/content-preview-manager/content-preview-manager';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';

@Component({
  selector: 'app-truncate-page',
  standalone: true,
  imports: [
    TruncatePipe,
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    ContentPreviewManager,
    AuthorCredit,
    Breadcrumb,
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        Truncate Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        Truncates strings to a specified maximum length with configurable ellipsis and optional word
        boundary preservation. Perfect for content previews, notification text, and card descriptions.
      </p>

      <!-- Use Cases -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Common Use Cases</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold mt-0.5">1</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Blog Post Excerpts</h4>
                <p class="text-sm text-muted-foreground">Show article previews in content cards without overflowing the layout.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-bold mt-0.5">2</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Notification Messages</h4>
                <p class="text-sm text-muted-foreground">Truncate push notification content to fit within platform character limits.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-bold mt-0.5">3</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Data Table Cells</h4>
                <p class="text-sm text-muted-foreground">Keep table columns compact by truncating long descriptions or URLs.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-bold mt-0.5">4</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Social Feed Cards</h4>
                <p class="text-sm text-muted-foreground">Display post previews in feeds with consistent card heights.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Interactive Example</h2>
      <app-macos-window title="Content Preview Manager">
        <app-content-preview-manager />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>
      <app-code-preview [code]="code" [language]="'typescript'">
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4">Truncation Examples</h3>
            <div class="rounded-md bg-muted p-6 border border-border space-y-4">
              <div>
                <div class="text-xs text-muted-foreground mb-2">Default (10 chars)</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ 'This is a long sentence' | truncate }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Custom Length (20 chars)</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ 'This is a long sentence' | truncate: 20 }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Custom Ellipsis</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ 'This is a long sentence' | truncate: 18: ' [more]' }}</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Preserve Words</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">{{ 'This is a long sentence' | truncate: 20: '...': true }}</p>
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
              <td class="px-4 py-3 font-mono text-xs">maxLength</td>
              <td class="px-4 py-3 text-muted-foreground">number</td>
              <td class="px-4 py-3 font-mono text-xs">10</td>
              <td class="px-4 py-3 text-muted-foreground">Maximum length including ellipsis</td>
            </tr>
            <tr class="border-b border-border">
              <td class="px-4 py-3 font-mono text-xs">ellipsis</td>
              <td class="px-4 py-3 text-muted-foreground">string</td>
              <td class="px-4 py-3 font-mono text-xs">'...'</td>
              <td class="px-4 py-3 text-muted-foreground">String appended to truncated text</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">preserveWords</td>
              <td class="px-4 py-3 text-muted-foreground">boolean</td>
              <td class="px-4 py-3 font-mono text-xs">false</td>
              <td class="px-4 py-3 text-muted-foreground">Truncate at word boundary instead of mid-word</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-bold my-8">Features</h2>
      <div class="rounded-md border border-border p-6 space-y-4">
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Smart Word Boundary</h4>
            <p class="text-sm text-muted-foreground">Optionally avoids cutting words mid-syllable for cleaner previews.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Customizable Ellipsis</h4>
            <p class="text-sm text-muted-foreground">Use any suffix like '...', ' [more]', or ' →' to indicate truncation.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Null Safe</h4>
            <p class="text-sm text-muted-foreground">Gracefully handles null, undefined, and non-string inputs by returning an empty string.</p>
          </div>
        </div>
      </div>

      <div class="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
        <app-author-credit author="Mofiro Jean" url="https://github.com/mofirojean" />
        <div class="flex gap-4">
          <app-next-prev-navigation
            [previous]="{ label: 'ASCII Art', link: '/docs/pipes/ascii-art' }"
            [next]="{ label: 'HTML Escape', link: '/docs/pipes/html-escape' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class TruncatePage {
  code = `
import { Component } from '@angular/core';
import { TruncatePipe } from 'ngx-transforms';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [TruncatePipe],
  template: \`
    <!-- Default: 10 chars with '...' -->
    <p>{{ 'This is a long sentence' | truncate }}</p>

    <!-- Custom max length -->
    <p>{{ article.description | truncate: 80 }}</p>

    <!-- Custom ellipsis -->
    <p>{{ title | truncate: 30: ' [more]' }}</p>

    <!-- Preserve word boundaries -->
    <p>{{ content | truncate: 50: '...': true }}</p>
  \`
})
export class ExampleComponent {
  article = { description: 'A very long description...' };
  title = 'An extremely long article title';
  content = 'Words are preserved at boundaries';
}
  `;
}
