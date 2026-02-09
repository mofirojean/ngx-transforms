import { Component } from '@angular/core';
import { HtmlEscapePipe } from '@ngx-transforms';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { CodeSnippetPreviewer } from '../../examples/code-snippet-previewer/code-snippet-previewer';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';

@Component({
  selector: 'app-html-escape-page',
  standalone: true,
  imports: [
    HtmlEscapePipe,
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    CodeSnippetPreviewer,
    AuthorCredit,
    Breadcrumb,
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        HTML Escape Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        Converts special HTML characters to their entity equivalents, preventing browsers from
        interpreting input as HTML. Essential for safely displaying user-generated content and code snippets.
      </p>

      <!-- Use Cases -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Common Use Cases</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold mt-0.5">1</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">User-Generated Content</h4>
                <p class="text-sm text-muted-foreground">Safely display comments, reviews, and forum posts without XSS risk.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-bold mt-0.5">2</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Code Documentation</h4>
                <p class="text-sm text-muted-foreground">Display HTML code samples as readable text in documentation pages.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-bold mt-0.5">3</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Form Input Display</h4>
                <p class="text-sm text-muted-foreground">Echo back form input safely without executing any embedded HTML.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-bold mt-0.5">4</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Log Viewers</h4>
                <p class="text-sm text-muted-foreground">Render raw log entries that may contain HTML-like syntax without parsing them.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Interactive Example</h2>
      <app-macos-window title="Code Snippet Previewer">
        <app-code-snippet-previewer />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>
      <app-code-preview [code]="code" [language]="'typescript'">
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4">Escape Examples</h3>
            <div class="rounded-md bg-muted p-6 border border-border space-y-4">
              <div class="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <div class="text-xs text-muted-foreground mb-1">Input</div>
                  <code class="text-sm">{{ htmlExample }}</code>
                </div>
                <div class="h-px flex-1 mx-4 bg-border hidden sm:block"></div>
                <div>
                  <div class="text-xs text-muted-foreground mb-1">Output</div>
                  <code class="font-mono text-primary font-bold text-sm">{{ htmlExample | htmlEscape }}</code>
                </div>
              </div>
              <div class="h-px bg-border"></div>
              <div class="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <div class="text-xs text-muted-foreground mb-1">Input</div>
                  <code class="text-sm">{{ scriptExample }}</code>
                </div>
                <div class="h-px flex-1 mx-4 bg-border hidden sm:block"></div>
                <div>
                  <div class="text-xs text-muted-foreground mb-1">Output</div>
                  <code class="font-mono text-primary font-bold text-sm break-all">{{ scriptExample | htmlEscape }}</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </app-code-preview>

      <h2 class="text-2xl font-bold my-8">Character Mapping</h2>
      <div class="rounded-md border border-border overflow-hidden">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border bg-muted/50">
              <th class="px-4 py-3 text-left font-semibold">Character</th>
              <th class="px-4 py-3 text-left font-semibold">Entity</th>
              <th class="px-4 py-3 text-left font-semibold">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-border">
              <td class="px-4 py-3 font-mono font-bold">&amp;</td>
              <td class="px-4 py-3 font-mono text-primary">&amp;amp;</td>
              <td class="px-4 py-3 text-muted-foreground">Ampersand</td>
            </tr>
            <tr class="border-b border-border">
              <td class="px-4 py-3 font-mono font-bold">&lt;</td>
              <td class="px-4 py-3 font-mono text-primary">&amp;lt;</td>
              <td class="px-4 py-3 text-muted-foreground">Less than</td>
            </tr>
            <tr class="border-b border-border">
              <td class="px-4 py-3 font-mono font-bold">&gt;</td>
              <td class="px-4 py-3 font-mono text-primary">&amp;gt;</td>
              <td class="px-4 py-3 text-muted-foreground">Greater than</td>
            </tr>
            <tr class="border-b border-border">
              <td class="px-4 py-3 font-mono font-bold">"</td>
              <td class="px-4 py-3 font-mono text-primary">&amp;quot;</td>
              <td class="px-4 py-3 text-muted-foreground">Double quote</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono font-bold">'</td>
              <td class="px-4 py-3 font-mono text-primary">&amp;apos;</td>
              <td class="px-4 py-3 text-muted-foreground">Single quote / Apostrophe</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-bold my-8">Features</h2>
      <div class="rounded-md border border-border p-6 space-y-4">
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">XSS Prevention</h4>
            <p class="text-sm text-muted-foreground">Neutralizes all HTML-significant characters so they render as plain text.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Complete Entity Coverage</h4>
            <p class="text-sm text-muted-foreground">Covers all 5 special HTML characters: ampersand, angle brackets, and quotes.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Null Safe</h4>
            <p class="text-sm text-muted-foreground">Returns an empty string for null, undefined, or non-string inputs.</p>
          </div>
        </div>
      </div>

      <div class="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
        <app-author-credit author="Mofiro Jean" url="https://github.com/mofirojean" />
        <div class="flex gap-4">
          <app-next-prev-navigation
            [previous]="{ label: 'Truncate', link: '/docs/pipes/truncate' }"
            [next]="{ label: 'HTML Sanitize', link: '/docs/pipes/html-sanitize' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class HtmlEscapePage {
  htmlExample = '<p>Hello</p>';
  scriptExample = '<script>alert("XSS")</script>';

  code = `
import { Component } from '@angular/core';
import { HtmlEscapePipe } from '@ngx-transforms';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [HtmlEscapePipe],
  template: \`
    <!-- Escape HTML tags -->
    <p>{{ '<p>Hello</p>' | htmlEscape }}</p>
    <!-- Output: &lt;p&gt;Hello&lt;/p&gt; -->

    <!-- Prevent script injection -->
    <p>{{ userInput | htmlEscape }}</p>

    <!-- Display code snippets safely -->
    <pre>{{ codeSnippet | htmlEscape }}</pre>
  \`
})
export class ExampleComponent {
  userInput = '<script>alert("XSS")</script>';
  codeSnippet = '<div class="container"><p>Hello</p></div>';
}
  `;
}
