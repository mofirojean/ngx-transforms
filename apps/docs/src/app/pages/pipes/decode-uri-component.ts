import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DecodeUriComponentPipe } from '@ngx-transforms';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';
import { DecodeUriComponentPlayground } from '../../examples/decode-uri-component-playground/decode-uri-component-playground';

@Component({
  selector: 'app-decode-uri-component-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DecodeUriComponentPipe,
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    AuthorCredit,
    Breadcrumb,
    DecodeUriComponentPlayground,
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        DecodeURIComponent Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        Decodes a URI component encoded with encodeURIComponent. Returns the
        input unchanged if the string contains a malformed escape sequence.
      </p>

      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Common Use Cases</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold mt-0.5">1</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Read Query Params</h4>
                <p class="text-sm text-muted-foreground">Decode encoded query parameter values for display.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-bold mt-0.5">2</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Slug to Display Name</h4>
                <p class="text-sm text-muted-foreground">Convert encoded URL slugs back to readable display labels.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-bold mt-0.5">3</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Search Term Display</h4>
                <p class="text-sm text-muted-foreground">Show the user what they searched for in a banner or header.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-bold mt-0.5">4</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Symmetric Roundtrips</h4>
                <p class="text-sm text-muted-foreground">Pair with encodeURIComponent for safe encode/decode operations.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Interactive Example</h2>
      <app-macos-window title="DecodeURIComponent Playground">
        <app-decode-uri-component-playground />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>
      <app-code-preview [code]="code" [language]="'typescript'">
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4">DecodeURIComponent Examples</h3>
            <div class="rounded-md bg-muted p-6 border border-border space-y-4">
              <div>
                <div class="text-xs text-muted-foreground mb-2">Decode query value</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">'{{ encoded | decodeURIComponent }}'</p>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Decode hash tag</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm font-mono">'{{ tag | decodeURIComponent }}'</p>
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
            <tr>
              <td class="px-4 py-3 font-mono text-xs">value</td>
              <td class="px-4 py-3 text-muted-foreground">string</td>
              <td class="px-4 py-3 font-mono text-xs">-</td>
              <td class="px-4 py-3 text-muted-foreground">The encoded URI component to decode</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-bold my-8">Features</h2>
      <div class="rounded-md border border-border p-6 space-y-4">
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Symmetrical with EncodeURIComponent</h4>
            <p class="text-sm text-muted-foreground">Reverses encodeURIComponent — the perfect inverse pair.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Decodes Reserved Characters</h4>
            <p class="text-sm text-muted-foreground">Restores &amp;, =, /, ?, # and others to their literal characters.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Malformed Input Safe</h4>
            <p class="text-sm text-muted-foreground">Returns the input unchanged on bad escape sequences — no exceptions thrown.</p>
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
            [previous]="{ label: 'DecodeURI', link: '/docs/pipes/decode-uri' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class DecodeUriComponentPage {
  encoded = 'hi%20world%26you';
  tag = '%23angular';

  code = [
    "import { Component } from '@angular/core';",
    "import { DecodeUriComponentPipe } from 'ngx-transforms';",
    '',
    '@Component({',
    "  selector: 'app-example',",
    '  standalone: true,',
    '  imports: [DecodeUriComponentPipe],',
    '  template: `',
    '    <!-- Show search term -->',
    '    <h1>Results for: {{ queryParam | decodeURIComponent }}</h1>',
    '',
    '    <!-- Decode user slug -->',
    '    <span>@{{ encodedSlug | decodeURIComponent }}</span>',
    '  `',
    '})',
    'export class ExampleComponent {',
    "  queryParam = 'angular%20pipes';",
    "  encodedSlug = 'caf%C3%A9-resume';",
    '}',
  ].join('\n');
}