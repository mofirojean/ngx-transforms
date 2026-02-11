import { Component } from '@angular/core';
import { HtmlSanitizePipe } from '@ngx-transforms';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { RichTextPreviewer } from '../../examples/rich-text-previewer/rich-text-previewer';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';

@Component({
  selector: 'app-html-sanitize-page',
  standalone: true,
  imports: [
    HtmlSanitizePipe,
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    RichTextPreviewer,
    AuthorCredit,
    Breadcrumb,
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        HTML Sanitize Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        Sanitizes HTML input to remove dangerous elements like scripts and event handlers while
        preserving safe HTML tags. Uses Angular's built-in DomSanitizer for trusted sanitization.
      </p>

      <!-- Security Warning -->
      <div class="mb-8 flex items-start gap-3 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
        <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-bold mt-0.5">!</span>
        <div>
          <h4 class="font-semibold mb-1">Security Consideration</h4>
          <p class="text-sm text-muted-foreground">
            This pipe uses Angular's DomSanitizer to strip unsafe content. Always validate and sanitize
            input server-side as well. Do not rely solely on client-side sanitization for security.
          </p>
        </div>
      </div>

      <!-- Use Cases -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Common Use Cases</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold mt-0.5">1</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">CMS Content Display</h4>
                <p class="text-sm text-muted-foreground">Render rich content from a CMS while stripping any injected scripts.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-bold mt-0.5">2</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Comment Systems</h4>
                <p class="text-sm text-muted-foreground">Allow basic formatting in comments while preventing malicious content.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-bold mt-0.5">3</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Email HTML Rendering</h4>
                <p class="text-sm text-muted-foreground">Display HTML emails safely by removing embedded scripts and dangerous tags.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-bold mt-0.5">4</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Rich Text Editors</h4>
                <p class="text-sm text-muted-foreground">Sanitize output from WYSIWYG editors before displaying to other users.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Interactive Example</h2>
      <app-macos-window title="Rich Text Previewer">
        <app-rich-text-previewer />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>
      <app-code-preview [code]="code" [language]="'typescript'">
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4">Sanitization Examples</h3>
            <div class="rounded-md bg-muted p-6 border border-border space-y-4">
              <div>
                <div class="text-xs text-muted-foreground mb-2">Safe HTML (preserved)</div>
                <div class="rounded-md bg-background p-4">
                  <div class="text-sm" [innerHTML]="'<p>This <b>bold</b> and <em>italic</em> text is safe.</p>' | htmlSanitize"></div>
                </div>
              </div>
              <div>
                <div class="text-xs text-muted-foreground mb-2">Script tags (stripped)</div>
                <div class="rounded-md bg-background p-4">
                  <div class="text-sm" [innerHTML]="scriptExample | htmlSanitize"></div>
                  <p class="text-xs text-muted-foreground mt-2">Script tag was removed, only safe content remains.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </app-code-preview>

      <h2 class="text-2xl font-bold my-8">How It Works</h2>
      <div class="rounded-lg border border-border p-6 space-y-4">
        <div class="flex items-start gap-3">
          <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold">1</span>
          <div>
            <h4 class="font-semibold mb-1">Input is sanitized</h4>
            <p class="text-sm text-muted-foreground">Angular's DomSanitizer processes the HTML, removing dangerous elements like scripts, iframes, and event handlers.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold">2</span>
          <div>
            <h4 class="font-semibold mb-1">Safe HTML is preserved</h4>
            <p class="text-sm text-muted-foreground">Standard HTML tags like paragraphs, headings, bold, italic, and links are kept intact.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold">3</span>
          <div>
            <h4 class="font-semibold mb-1">Result is marked as SafeHtml</h4>
            <p class="text-sm text-muted-foreground">The output is wrapped as SafeHtml, allowing it to be used with Angular's [innerHTML] binding.</p>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Features</h2>
      <div class="rounded-md border border-border p-6 space-y-4">
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Angular DomSanitizer</h4>
            <p class="text-sm text-muted-foreground">Built on Angular's trusted security infrastructure, not a custom implementation.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">XSS Protection</h4>
            <p class="text-sm text-muted-foreground">Strips script tags, event handlers (onclick, onmouseover), and other injection vectors.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">SafeHtml Return Type</h4>
            <p class="text-sm text-muted-foreground">Returns Angular's SafeHtml type for direct use with [innerHTML] binding.</p>
          </div>
        </div>
      </div>

      <div class="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
        <app-author-credit author="Mofiro Jean" url="https://github.com/mofirojean" />
        <div class="flex gap-4">
          <app-next-prev-navigation
            [previous]="{ label: 'HTML Escape', link: '/docs/pipes/html-escape' }"
            [next]="{ label: 'Text to Speech', link: '/docs/pipes/text-to-speech' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class HtmlSanitizePage {
  scriptExample = '<p>Safe content</p><script>alert("XSS")</script><p>More safe content</p>';

  code = `
import { Component } from '@angular/core';
import { HtmlSanitizePipe } from 'ngx-transforms';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [HtmlSanitizePipe],
  template: \`
    <!-- Safe HTML is preserved, scripts are stripped -->
    <div [innerHTML]="htmlContent | htmlSanitize"></div>

    <!-- CMS content display -->
    <article [innerHTML]="article.body | htmlSanitize"></article>

    <!-- Comment with formatting -->
    <div [innerHTML]="comment.text | htmlSanitize"></div>
  \`
})
export class ExampleComponent {
  htmlContent = '<p>Hello</p><script>alert("xss")</script>';
  article = { body: '<h2>Title</h2><p>Content with <b>bold</b></p>' };
  comment = { text: '<p>Great post! <em>Thanks</em></p>' };
}
  `;
}
