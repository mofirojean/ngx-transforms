import { Component, ChangeDetectionStrategy } from '@angular/core';
import { WrapPipe } from '@ngx-transforms';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';
import { WrapPlayground } from '../../examples/wrap-playground/wrap-playground';

@Component({
  selector: 'app-wrap-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    WrapPipe,
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    AuthorCredit,
    Breadcrumb,
    WrapPlayground,
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        Wrap Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        Surrounds a string with a prefix and optional suffix. When no suffix
        is provided, the prefix is used on both sides — perfect for quotes,
        markdown, or symmetric decorators.
      </p>

      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Common Use Cases</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold mt-0.5">1</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Quoted Values</h4>
                <p class="text-sm text-muted-foreground">Wrap a value in quotes for display or inline code snippets.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-bold mt-0.5">2</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Markdown Formatting</h4>
                <p class="text-sm text-muted-foreground">Add ** or _ around text for bold or italic markdown output.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-bold mt-0.5">3</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Tag Labels</h4>
                <p class="text-sm text-muted-foreground">Render tags like [urgent] or (optional) in a list.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-bold mt-0.5">4</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Comment Blocks</h4>
                <p class="text-sm text-muted-foreground">Wrap text in &lt;!-- --&gt; for HTML comments in generated output.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Interactive Example</h2>
      <app-macos-window title="Wrap Playground">
        <app-wrap-playground />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>
      <app-code-preview [code]="code" [language]="'typescript'">
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4">Wrap Examples</h3>
            <div class="rounded-md bg-muted p-6 border border-border space-y-4">
              <div>
                <div class="text-xs text-muted-foreground mb-2">Brackets</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">'{{ 'value' | wrap:'[':']' }}'</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Symmetric (markdown bold)</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">'{{ 'bold' | wrap:'**' }}'</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Angle brackets</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">'{{ 'tag' | wrap:'<':'>' }}'</p>
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
              <td class="px-4 py-3 text-muted-foreground">string</td>
              <td class="px-4 py-3 font-mono text-xs">-</td>
              <td class="px-4 py-3 text-muted-foreground">The string to wrap</td>
            </tr>
            <tr class="border-b border-border">
              <td class="px-4 py-3 font-mono text-xs">prefix</td>
              <td class="px-4 py-3 text-muted-foreground">string</td>
              <td class="px-4 py-3 font-mono text-xs">''</td>
              <td class="px-4 py-3 text-muted-foreground">Text placed before the value</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">suffix</td>
              <td class="px-4 py-3 text-muted-foreground">string</td>
              <td class="px-4 py-3 font-mono text-xs">prefix</td>
              <td class="px-4 py-3 text-muted-foreground">Text placed after the value (defaults to prefix)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-bold my-8">Features</h2>
      <div class="rounded-md border border-border p-6 space-y-4">
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Symmetric Defaults</h4>
            <p class="text-sm text-muted-foreground">Omit the suffix to reuse the prefix — perfect for quotes and markdown.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Asymmetric Wrap</h4>
            <p class="text-sm text-muted-foreground">Pass different prefix and suffix for cases like &lt;tag&gt; or &lt;!-- comment --&gt;.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Multi-Char Support</h4>
            <p class="text-sm text-muted-foreground">Works with any string length — single chars, emoji, or full phrases.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Null Safe</h4>
            <p class="text-sm text-muted-foreground">Returns empty string for null, undefined, or non-string input.</p>
          </div>
        </div>
      </div>

      <div class="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
        <app-author-credit author="Mofiro Jean" url="https://github.com/mofirojean" />
        <div class="flex gap-4">
          <app-next-prev-navigation
            [previous]="{ label: 'Latinize', link: '/docs/pipes/latinize' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class WrapPage {
  code = [
    "import { Component } from '@angular/core';",
    "import { WrapPipe } from 'ngx-transforms';",
    '',
    '@Component({',
    "  selector: 'app-example',",
    '  standalone: true,',
    '  imports: [WrapPipe],',
    '  template: `',
    '    <!-- Bracketed tag -->',
    "    <span>{{ label | wrap:'[':']' }}</span>",
    '',
    '    <!-- Bold markdown -->',
    "    <code>{{ text | wrap:'**' }}</code>",
    '',
    '    <!-- HTML comment -->',
    "    <pre>{{ note | wrap:'<!-- ':' -->' }}</pre>",
    '  `',
    '})',
    'export class ExampleComponent {',
    "  label = 'urgent';",
    "  text = 'important';",
    "  note = 'TODO: review';",
    '}',
  ].join('\n');
}