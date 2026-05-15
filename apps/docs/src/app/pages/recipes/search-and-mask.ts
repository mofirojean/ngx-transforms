import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideCopy } from '@ng-icons/lucide';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';
import { LeakDetector } from '../../examples/leak-detector/leak-detector';

@Component({
  selector: 'app-recipe-search-and-mask',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ClipboardModule, NgIconComponent, MacosWindow, AuthorCredit, Breadcrumb, LeakDetector],
  providers: [provideIcons({ lucideCopy, lucideCheck })],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <div class="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4">
        Recipe
      </div>

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        PII Leak Detector
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        Scan unstructured text for sensitive patterns credit cards, emails,
        IP addresses and render each detection through its own masking pipe.
        A support-ticket auditor in three pipe chains.
      </p>

      <div class="mb-10">
        <h2 class="text-2xl font-bold mb-3">The problem</h2>
        <p class="leading-7 text-muted-foreground">
          Customer messages, server logs, error reports any free-text input
          your app surfaces to humans can leak PII. Card numbers in chat
          transcripts. Emails in error dumps. Internal IPs in stack traces.
          A support agent needs to see what was leaked, redacted, before
          forwarding the ticket. Doing this manually means a regex pass plus
          per-type formatting code; with pipes, the same chain runs in the
          template alongside the UI that displays it.
        </p>
      </div>

      <div class="mb-10">
        <h2 class="text-2xl font-bold mb-3">The pipes you'll combine</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <a routerLink="/docs/pipes/match" class="rounded-md border border-border p-4 hover:border-foreground/50 transition-colors">
            <div class="font-mono text-sm font-semibold mb-1">match</div>
            <p class="text-xs text-muted-foreground">The scanner returns every regex match in the input text as an array of strings.</p>
          </a>
          <a routerLink="/docs/pipes/credit-card-mask" class="rounded-md border border-border p-4 hover:border-foreground/50 transition-colors">
            <div class="font-mono text-sm font-semibold mb-1">creditCardMask</div>
            <p class="text-xs text-muted-foreground">Per-match masker keeps the last four digits, hides the rest.</p>
          </a>
          <a routerLink="/docs/pipes/email-mask" class="rounded-md border border-border p-4 hover:border-foreground/50 transition-colors">
            <div class="font-mono text-sm font-semibold mb-1">emailMask</div>
            <p class="text-xs text-muted-foreground">Keeps the first and last letters of the local part; the rest is hidden.</p>
          </a>
          <a routerLink="/docs/pipes/ip-address-mask" class="rounded-md border border-border p-4 hover:border-foreground/50 transition-colors">
            <div class="font-mono text-sm font-semibold mb-1">ipAddressMask</div>
            <p class="text-xs text-muted-foreground">Masks the last two octets keeps geo, hides the host.</p>
          </a>
        </div>
      </div>

      <h2 class="text-2xl font-bold mb-4">Live example</h2>
      <p class="text-sm text-muted-foreground mb-3">
        Paste a real support ticket, server log, or email thread. Each detection card lists every match found, already masked copy-safe.
        Toggle <strong>Show chains</strong> to see the pipe expression on each card.
      </p>
      <app-macos-window title="PII Leak Detector">
        <app-leak-detector />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">The pattern</h2>
      <p class="leading-7 text-muted-foreground mb-6">
        For each sensitive class, the template runs a two-step chain. First
        <code class="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">match</code>
        extracts every occurrence of a regex pattern from the source text into
        an array; then
        <code class="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">&#64;for</code>
        iterates the array and runs each entry through its respective masking pipe.
        Each detection class lives in its own card with its own count badge.
      </p>

      <div class="relative rounded-lg border border-border bg-muted/30 overflow-hidden">
        <div class="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/50">
          <span class="text-xs font-mono text-muted-foreground">leak-detector.ts</span>
          <button
            type="button"
            (click)="onCopy()"
            class="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors"
            [cdkCopyToClipboard]="code"
          >
            @if (copied()) {
              <ng-icon name="lucideCheck" class="h-3.5 w-3.5 text-green-500"></ng-icon>
              <span>Copied</span>
            } @else {
              <ng-icon name="lucideCopy" class="h-3.5 w-3.5"></ng-icon>
              <span>Copy</span>
            }
          </button>
        </div>
        <pre class="overflow-x-auto p-4 text-sm leading-relaxed"><code class="font-mono" [innerHTML]="highlightedCode()"></code></pre>
      </div>

      <p class="leading-7 text-sm text-muted-foreground mt-3">
        The component class holds only the regex patterns and a signal for the
        source text. The detection-and-redaction logic lives entirely in the
        template. Add a fourth class (passport numbers, SSNs) by adding one
        more card block; no class changes.
      </p>

      <h2 class="text-2xl font-bold my-8">Why scan-and-transform composes well</h2>
      <div class="rounded-md border border-border p-6 space-y-4">
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Detection and masking decouple</h4>
            <p class="text-sm text-muted-foreground">The regex says <em>what to find</em>. The mask pipe says <em>how to redact</em>. Swap either independently change the email regex without touching the masker, or replace the masker without re-writing the scan.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Empty match handling is free</h4>
            <p class="text-sm text-muted-foreground">match returns an empty array when nothing is found, so the &#64;for naturally renders nothing. No null guards in the component class.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold">!</span>
          <div>
            <h4 class="font-semibold">Regex quality is on you</h4>
            <p class="text-sm text-muted-foreground">The pipe doesn't validate Luhn for cards or DNS for emails these regexes are pattern scanners, not validators. Tighten them for production use cases that care about false positives.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold">!</span>
          <div>
            <h4 class="font-semibold">Inline redaction needs replace</h4>
            <p class="text-sm text-muted-foreground">This recipe shows match + mask as a side-panel audit. If you want the original text with sensitive items replaced inline, chain <a routerLink="/docs/pipes/replace" class="text-primary underline">replace</a> with a regex pattern instead.</p>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Extensions</h2>
      <ul class="list-disc list-inside space-y-2 text-muted-foreground">
        <li>Add a <strong>passport / SSN</strong> card with a custom mask pipe same shape, fourth column.</li>
        <li>Surface a <strong>total leak count</strong> by summing the three array lengths in the template (the playground already does this).</li>
        <li>Pair with <a routerLink="/docs/pipes/unique" class="text-primary underline">unique</a> after match to dedupe repeat detections.</li>
        <li>Use <a routerLink="/docs/pipes/replace" class="text-primary underline">replace</a> with a regex pattern for an <strong>inline-redacted view</strong> alongside the audit.</li>
      </ul>

      <div class="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
        <app-author-credit author="Mofiro Jean" url="https://github.com/mofirojean" />
        <a routerLink="/docs/recipes" class="text-primary underline">← All recipes</a>
      </div>
    </div>
  `,
})
export class SearchAndMaskRecipe {
  readonly copied = signal(false);
  readonly highlightedCode = computed(() => {
    const grammar = Prism.languages['typescript'];
    return grammar ? Prism.highlight(this.code, grammar, 'typescript') : this.code;
  });

  onCopy() {
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }

  code = [
    "import { Component, signal } from '@angular/core';",
    "import { FormsModule } from '@angular/forms';",
    "import {",
    "  MatchPipe, CreditCardMaskPipe, EmailMaskPipe, IpAddressMaskPipe,",
    "} from 'ngx-transforms';",
    '',
    'const CARD_RE = String.raw`\\b(?:\\d[ -]*?){13,16}\\b`;',
    'const EMAIL_RE = String.raw`\\b[\\w.+-]+@[\\w-]+\\.[\\w.-]+\\b`;',
    'const IP_RE = String.raw`\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b`;',
    '',
    '@Component({',
    "  selector: 'app-leak-detector',",
    '  standalone: true,',
    '  imports: [',
    '    FormsModule, MatchPipe,',
    '    CreditCardMaskPipe, EmailMaskPipe, IpAddressMaskPipe,',
    '  ],',
    '  template: `',
    "    <textarea [ngModel]=\"text()\" (ngModelChange)=\"text.set($event)\"></textarea>",
    '',
    '    <section>',
    '      <h3>Credit cards ({{ (text() | match: cardRe).length }})</h3>',
    '      @for (card of text() | match: cardRe; track $index) {',
    '        <code>{{ card | creditCardMask }}</code>',
    '      }',
    '    </section>',
    '',
    '    <section>',
    '      <h3>Emails ({{ (text() | match: emailRe).length }})</h3>',
    '      @for (email of text() | match: emailRe; track $index) {',
    '        <code>{{ email | emailMask }}</code>',
    '      }',
    '    </section>',
    '',
    '    <section>',
    '      <h3>IPs ({{ (text() | match: ipRe).length }})</h3>',
    '      @for (ip of text() | match: ipRe; track $index) {',
    '        <code>{{ ip | ipAddressMask }}</code>',
    '      }',
    '    </section>',
    '  `,',
    '})',
    'export class LeakDetector {',
    '  cardRe = CARD_RE;',
    '  emailRe = EMAIL_RE;',
    '  ipRe = IP_RE;',
    "  text = signal('');",
    '}',
  ].join('\n');
}
