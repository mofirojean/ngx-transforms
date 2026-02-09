import { Component } from '@angular/core';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { TextReaderStudio } from '../../examples/text-reader-studio/text-reader-studio';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';

@Component({
  selector: 'app-text-to-speech-page',
  standalone: true,
  imports: [
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    TextReaderStudio,
    AuthorCredit,
    Breadcrumb,
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        Text to Speech Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        Converts text to speech using the Web Speech API. Supports configurable language
        and locale settings for multi-language speech synthesis.
      </p>

      <!-- Use Cases -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Common Use Cases</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold mt-0.5">1</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Accessibility Features</h4>
                <p class="text-sm text-muted-foreground">Add screen reader capabilities for visually impaired users.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-bold mt-0.5">2</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Language Learning</h4>
                <p class="text-sm text-muted-foreground">Help users hear correct pronunciation of words and phrases in foreign languages.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-bold mt-0.5">3</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Content Narration</h4>
                <p class="text-sm text-muted-foreground">Add "read aloud" buttons to articles, blog posts, and documentation pages.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-bold mt-0.5">4</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Voice Notifications</h4>
                <p class="text-sm text-muted-foreground">Announce important events and alerts using audio feedback.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Interactive Example</h2>
      <app-macos-window title="Text Reader Studio">
        <app-text-reader-studio />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>
      <app-code-preview [code]="code" [language]="'typescript'">
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4">Implementation Pattern</h3>
            <div class="rounded-md bg-muted p-6 border border-border space-y-4">
              <div class="flex items-start gap-3 rounded-md bg-blue-500/5 border border-blue-500/20 p-4">
                <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold">i</span>
                <p class="text-sm text-muted-foreground">
                  This pipe returns <code class="text-xs px-1.5 py-0.5 rounded bg-muted">void</code> and triggers speech as a side effect.
                  Use it programmatically via a button click rather than in template interpolation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </app-code-preview>

      <h2 class="text-2xl font-bold my-8">Supported Languages</h2>
      <div class="rounded-md border border-border overflow-hidden">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border bg-muted/50">
              <th class="px-4 py-3 text-left font-semibold">Language</th>
              <th class="px-4 py-3 text-left font-semibold">Locale Code</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-border">
              <td class="px-4 py-3">English (US)</td>
              <td class="px-4 py-3 font-mono text-primary">en-US</td>
            </tr>
            <tr class="border-b border-border">
              <td class="px-4 py-3">English (UK)</td>
              <td class="px-4 py-3 font-mono text-primary">en-GB</td>
            </tr>
            <tr class="border-b border-border">
              <td class="px-4 py-3">French</td>
              <td class="px-4 py-3 font-mono text-primary">fr-FR</td>
            </tr>
            <tr class="border-b border-border">
              <td class="px-4 py-3">Spanish</td>
              <td class="px-4 py-3 font-mono text-primary">es-ES</td>
            </tr>
            <tr class="border-b border-border">
              <td class="px-4 py-3">German</td>
              <td class="px-4 py-3 font-mono text-primary">de-DE</td>
            </tr>
            <tr class="border-b border-border">
              <td class="px-4 py-3">Japanese</td>
              <td class="px-4 py-3 font-mono text-primary">ja-JP</td>
            </tr>
            <tr>
              <td class="px-4 py-3">Chinese (Mandarin)</td>
              <td class="px-4 py-3 font-mono text-primary">zh-CN</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-bold my-8">Features</h2>
      <div class="rounded-md border border-border p-6 space-y-4">
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Multi-Language Support</h4>
            <p class="text-sm text-muted-foreground">Pass any BCP 47 language tag to speak text in different languages and accents.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Web Speech API</h4>
            <p class="text-sm text-muted-foreground">Built on the standard Web Speech API, supported by all modern browsers.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">SSR Safe</h4>
            <p class="text-sm text-muted-foreground">Checks for window and speechSynthesis availability, safe for server-side rendering.</p>
          </div>
        </div>
      </div>

      <div class="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
        <app-author-credit author="Mofiro Jean" url="https://github.com/mofirojean" />
        <div class="flex gap-4">
          <app-next-prev-navigation
            [previous]="{ label: 'HTML Sanitize', link: '/docs/pipes/html-sanitize' }"
            [next]="{ label: 'Device Type', link: '/docs/pipes/device-type' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class TextToSpeechPage {
  code = `
import { Component } from '@angular/core';
import { TextToSpeechPipe } from '@ngx-transforms';

@Component({
  selector: 'app-example',
  standalone: true,
  template: \`
    <button (click)="speak('Hello World')">
      Speak English
    </button>
    <button (click)="speak('Bonjour le monde', 'fr-FR')">
      Speak French
    </button>
  \`
})
export class ExampleComponent {
  private ttsPipe = new TextToSpeechPipe();

  speak(text: string, lang = 'en-US'): void {
    this.ttsPipe.transform(text, lang);
  }
}
  `;
}
