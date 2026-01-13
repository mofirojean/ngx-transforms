import { Component } from '@angular/core';
import { HighlightPipe } from '@ngx-transforms';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { CodeBlock } from '../../reusables/code-block/code-block';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { TextHighlighter } from '../../examples/text-highlighter/text-highlighter';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';

@Component({
  selector: 'app-highlight-page',
  standalone: true,
  imports: [
    HighlightPipe,
    CodePreview,
    CodeBlock,
    NextPrevNavigation,
    MacosWindow,
    TextHighlighter,
    AuthorCredit,
    Breadcrumb,
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        Highlight Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        A powerful pipe that highlights search terms within text by wrapping matches with styled spans.
        Perfect for search results, documentation, and text filtering interfaces.
      </p>

      <!-- Use Cases -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Common Use Cases</h2>
        <div class="grid grid-cols-1 gap-3">
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold mt-0.5">1</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Search Results</h4>
                <p class="text-sm text-muted-foreground">Highlight search terms in search results to help users quickly identify relevant content.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-bold mt-0.5">2</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Code Editors</h4>
                <p class="text-sm text-muted-foreground">Highlight function names, variables, or keywords in code snippets for better readability.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-bold mt-0.5">3</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Documentation</h4>
                <p class="text-sm text-muted-foreground">Emphasize API names, technical terms, or important concepts in documentation.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-sm font-bold mt-0.5">4</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Filter Interfaces</h4>
                <p class="text-sm text-muted-foreground">Show matching terms in filtered lists or tables to provide visual feedback.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Interactive Example</h2>
      <app-macos-window title="Text Highlighter">
        <app-text-highlighter />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>

      <app-code-preview [code]="code" [language]="'typescript'">
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4">Basic Examples</h3>
            <div class="rounded-md bg-muted p-6 border border-border space-y-4">
              <div>
                <div class="text-xs text-muted-foreground mb-2">Simple Highlight</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm" [innerHTML]="'This is a test string' | highlight: 'test'"></p>
                </div>
              </div>

              <div>
                <div class="text-xs text-muted-foreground mb-2">Case Insensitive</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm" [innerHTML]="'TypeScript and typescript are similar' | highlight: 'typescript'"></p>
                </div>
              </div>

              <div>
                <div class="text-xs text-muted-foreground mb-2">Multiple Matches</div>
                <div class="rounded-md bg-background p-4">
                  <p class="text-sm" [innerHTML]="'Angular is great. Learn Angular today!' | highlight: 'Angular'"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </app-code-preview>

      <h2 class="text-2xl font-bold my-8">Styling the Highlights</h2>
      <div class="rounded-md border border-border p-6 space-y-4">
        <p class="text-sm text-muted-foreground mb-4">
          The pipe wraps matches with <code class="text-xs px-1.5 py-0.5 rounded bg-muted">&lt;span class="highlight"&gt;</code>.
          Add custom styles to your global stylesheet:
        </p>
        <app-code-block [code]="stylesCode" [language]="'css'" />
      </div>

      <h2 class="text-2xl font-bold my-8">Features</h2>
      <div class="rounded-md border border-border p-6 space-y-4">
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Case Insensitive</h4>
            <p class="text-sm text-muted-foreground">Matches are case-insensitive by default, finding both uppercase and lowercase variations.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Safe HTML</h4>
            <p class="text-sm text-muted-foreground">Uses Angular's DomSanitizer to safely render highlighted HTML without XSS vulnerabilities.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Regex Special Characters</h4>
            <p class="text-sm text-muted-foreground">Properly escapes regex special characters in the search term to prevent errors.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Null Safe</h4>
            <p class="text-sm text-muted-foreground">Handles null, undefined, and empty values gracefully without throwing errors.</p>
          </div>
        </div>
      </div>

      <div class="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
        <app-author-credit author="Mofiro Jean" url="https://github.com/mofirojean" />
        <div class="flex gap-4">
          <app-next-prev-navigation
            [previous]="{ label: 'Color Convert', link: '/docs/pipes/color-convert' }"
            [next]="{ label: 'IP Address Mask', link: '/docs/pipes/ip-address-mask' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class Highlight {
  code = `
import { Component } from '@angular/core';
import { HighlightPipe } from '@ngx-transforms';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [HighlightPipe],
  template: \`
    <!-- Simple highlight -->
    <p [innerHTML]="'Find the word test in this test string' | highlight:'test'"></p>

    <!-- With variable -->
    <input [(ngModel)]="searchTerm" placeholder="Search...">
    <p [innerHTML]="content | highlight:searchTerm"></p>

    <!-- In search results -->
    @for (result of searchResults; track result.id) {
      <div class="result-item">
        <h3 [innerHTML]="result.title | highlight:query"></h3>
        <p [innerHTML]="result.description | highlight:query"></p>
      </div>
    }
  \`
})
export class ExampleComponent {
  searchTerm = 'Angular';
  content = 'Angular is a platform for building applications';

  query = 'user';
  searchResults = [
    { id: 1, title: 'User Guide', description: 'Learn about user management' },
    { id: 2, title: 'User Settings', description: 'Configure user preferences' }
  ];
}
  `;

  stylesCode = `
/* Default yellow highlight */
.highlight {
  background-color: #ffeb3b;
  color: #000;
  padding: 0 2px;
  border-radius: 2px;
}

/* Custom blue highlight */
.highlight {
  background-color: rgba(59, 130, 246, 0.3);
  font-weight: 600;
}

/* Animated highlight */
.highlight {
  background: linear-gradient(90deg, #fbbf24, #f59e0b);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
  `;
}
