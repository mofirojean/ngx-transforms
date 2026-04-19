import { Component, ChangeDetectionStrategy } from '@angular/core';
import { StripTagsPipe } from '@ngx-transforms';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';
import { StripTagsPlayground } from '../../examples/strip-tags-playground/strip-tags-playground';

@Component({
  selector: 'app-strip-tags-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    StripTagsPipe,
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    AuthorCredit,
    Breadcrumb,
    StripTagsPlayground,
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        StripTags Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        Removes HTML tags from a string. Pass an array of allowed tag names
        to preserve specific tags. Always strips comments, scripts, and styles.
      </p>

      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Common Use Cases</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold mt-0.5">1</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Plain Text Previews</h4>
                <p class="text-sm text-muted-foreground">Strip formatting from rich content for list previews or summaries.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-bold mt-0.5">2</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Character Counts</h4>
                <p class="text-sm text-muted-foreground">Get accurate text length without HTML markup skewing the count.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-bold mt-0.5">3</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Limited-Tag Display</h4>
                <p class="text-sm text-muted-foreground">Allow only basic inline tags (b, i, a) in user-generated comments.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-bold mt-0.5">4</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Search Indexing</h4>
                <p class="text-sm text-muted-foreground">Extract plain text from content before indexing it for search.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Interactive Example</h2>
      <app-macos-window title="StripTags Playground">
        <app-strip-tags-playground />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>
      <app-code-preview [code]="code" [language]="'typescript'">
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4">StripTags Examples</h3>
            <div class="rounded-md bg-muted p-6 border border-border space-y-4">
              <div>
                <div class="text-xs text-muted-foreground mb-2">Strip all tags</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">'{{ html | stripTags }}'</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Keep inline tags</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">'{{ html | stripTags:allowed }}'</p>
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
              <td class="px-4 py-3 text-muted-foreground">The HTML string to strip</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">allowedTags</td>
              <td class="px-4 py-3 text-muted-foreground">string[]</td>
              <td class="px-4 py-3 font-mono text-xs">-</td>
              <td class="px-4 py-3 text-muted-foreground">Optional list of tag names to preserve (case-insensitive)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-bold my-8">Features</h2>
      <div class="rounded-md border border-border p-6 space-y-4">
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Allowlist Support</h4>
            <p class="text-sm text-muted-foreground">Preserve specific tags while stripping the rest, with attributes intact.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Always Removes Dangerous Content</h4>
            <p class="text-sm text-muted-foreground">Scripts, styles, comments, and DOCTYPEs are always stripped.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Case-Insensitive</h4>
            <p class="text-sm text-muted-foreground">Allowed tag names match regardless of input casing.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Null Safe</h4>
            <p class="text-sm text-muted-foreground">Returns empty string for null, undefined, or non-string inputs.</p>
          </div>
        </div>
      </div>

      <div class="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
        <app-author-credit author="Mofiro Jean" url="https://github.com/mofirojean" />
        <div class="flex gap-4">
          <app-next-prev-navigation
            [previous]="{ label: 'Slugify', link: '/docs/pipes/slugify' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class StripTagsPage {
  html = '<p>Hello <b>bold</b> and <i>italic</i> world!</p>';
  allowed = ['b', 'i'];

  code = [
    "import { Component } from '@angular/core';",
    "import { StripTagsPipe } from 'ngx-transforms';",
    '',
    '@Component({',
    "  selector: 'app-example',",
    '  standalone: true,',
    '  imports: [StripTagsPipe],',
    '  template: `',
    '    <!-- Plain text preview -->',
    '    <p>{{ post.html | stripTags }}</p>',
    '',
    '    <!-- Allow only inline formatting -->',
    "    <div [innerHTML]=\"comment | stripTags:allowedTags\"></div>",
    '',
    '    <!-- Character count without markup -->',
    '    <span>{{ (content | stripTags).length }} chars</span>',
    '  `',
    '})',
    'export class ExampleComponent {',
    "  post = { html: '<p>Hello <b>world</b></p>' };",
    "  comment = 'I think <b>this</b> is <script>alert(1)</script> cool';",
    "  allowedTags = ['b', 'i', 'a'];",
    "  content = '<h1>Title</h1><p>Body with <b>bold</b></p>';",
    '}',
  ].join('\n');
}
