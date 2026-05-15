import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCreditCard, lucideMail, lucideGlobe, lucideShieldCheck } from '@ng-icons/lucide';
import {
  CreditCardMaskPipe,
  EmailMaskPipe,
  IpAddressMaskPipe,
  MatchPipe,
} from '@ngx-transforms';

interface Preset {
  label: string;
  text: string;
}

const CARD_PATTERN = '\\b(?:\\d[ -]*?){13,16}\\b';
const EMAIL_PATTERN = '\\b[\\w.+-]+@[\\w-]+\\.[\\w.-]+\\b';
const IP_PATTERN = '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b';

@Component({
  selector: 'app-leak-detector',
  standalone: true,
  imports: [
    FormsModule,
    HlmButtonImports,
    HlmInputImports,
    NgIcon,
    MatchPipe,
    CreditCardMaskPipe,
    EmailMaskPipe,
    IpAddressMaskPipe,
  ],
  providers: [provideIcons({ lucideCreditCard, lucideMail, lucideGlobe, lucideShieldCheck })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-5 p-5">
      <div>
        <p class="text-sm font-medium mb-2">Try a scenario</p>
        <div class="flex flex-wrap gap-2">
          @for (p of presets; track p.label) {
            <button hlmBtn [variant]="active() === p.label ? 'default' : 'outline'" size="sm" (click)="load(p)">{{ p.label }}</button>
          }
        </div>
      </div>

      <div class="grid w-full gap-1.5">
        <label for="leak-input" class="text-sm font-medium flex items-center gap-2">
          <ng-icon name="lucideShieldCheck" class="h-4 w-4"></ng-icon>
          Paste any text chat transcript, server log, email thread
        </label>
        <textarea id="leak-input" hlmInput rows="6" [ngModel]="text()" (ngModelChange)="onText($event)" class="w-full font-mono text-sm resize-none h-32"></textarea>
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <button hlmBtn [variant]="showChain() ? 'default' : 'outline'" size="sm" class="ml-auto" (click)="toggleChain()">
          {{ showChain() ? 'Hide chains' : 'Show chains' }}
        </button>
      </div>

      <!-- Three detection cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <!-- Credit cards -->
        <div class="rounded-lg border border-red-500/30 bg-red-500/5 p-4">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-2 text-sm font-medium text-red-700 dark:text-red-400">
              <ng-icon name="lucideCreditCard" class="h-4 w-4"></ng-icon>
              <span>Credit cards</span>
            </div>
            <span class="rounded-full bg-red-500/20 text-red-700 dark:text-red-300 px-2 py-0.5 text-xs font-mono">{{ (text() | match: cardPattern).length }}</span>
          </div>
          @if ((text() | match: cardPattern).length === 0) {
            <p class="text-xs text-muted-foreground italic">No card numbers detected.</p>
          } @else {
            <ul class="space-y-1">
              @for (card of text() | match: cardPattern; track $index) {
                <li class="font-mono text-xs bg-background rounded px-2 py-1 border border-red-500/20 truncate">{{ card | creditCardMask }}</li>
              }
            </ul>
          }
          @if (showChain()) {
            <code class="mt-3 block text-[10px] font-mono text-muted-foreground/70 break-all">text | match: re | creditCardMask</code>
          }
        </div>

        <!-- Emails -->
        <div class="rounded-lg border border-blue-500/30 bg-blue-500/5 p-4">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-2 text-sm font-medium text-blue-700 dark:text-blue-400">
              <ng-icon name="lucideMail" class="h-4 w-4"></ng-icon>
              <span>Emails</span>
            </div>
            <span class="rounded-full bg-blue-500/20 text-blue-700 dark:text-blue-300 px-2 py-0.5 text-xs font-mono">{{ (text() | match: emailPattern).length }}</span>
          </div>
          @if ((text() | match: emailPattern).length === 0) {
            <p class="text-xs text-muted-foreground italic">No emails detected.</p>
          } @else {
            <ul class="space-y-1">
              @for (email of text() | match: emailPattern; track $index) {
                <li class="font-mono text-xs bg-background rounded px-2 py-1 border border-blue-500/20 truncate">{{ email | emailMask }}</li>
              }
            </ul>
          }
          @if (showChain()) {
            <code class="mt-3 block text-[10px] font-mono text-muted-foreground/70 break-all">text | match: re | emailMask</code>
          }
        </div>

        <!-- IPs -->
        <div class="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-2 text-sm font-medium text-amber-700 dark:text-amber-400">
              <ng-icon name="lucideGlobe" class="h-4 w-4"></ng-icon>
              <span>IP addresses</span>
            </div>
            <span class="rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 px-2 py-0.5 text-xs font-mono">{{ (text() | match: ipPattern).length }}</span>
          </div>
          @if ((text() | match: ipPattern).length === 0) {
            <p class="text-xs text-muted-foreground italic">No IPs detected.</p>
          } @else {
            <ul class="space-y-1">
              @for (ip of text() | match: ipPattern; track $index) {
                <li class="font-mono text-xs bg-background rounded px-2 py-1 border border-amber-500/20 truncate">{{ ip | ipAddressMask }}</li>
              }
            </ul>
          }
          @if (showChain()) {
            <code class="mt-3 block text-[10px] font-mono text-muted-foreground/70 break-all">text | match: re | ipAddressMask</code>
          }
        </div>
      </div>

      <!-- Total summary -->
      <div class="rounded-md bg-muted/50 border border-border px-4 py-3 flex items-center justify-between text-sm">
        <span class="text-muted-foreground">Total potential PII leaks detected</span>
        <span class="font-mono font-bold tabular-nums">
          {{ (text() | match: cardPattern).length + (text() | match: emailPattern).length + (text() | match: ipPattern).length }}
        </span>
      </div>
    </div>
  `,
})
export class LeakDetector {
  readonly cardPattern = CARD_PATTERN;
  readonly emailPattern = EMAIL_PATTERN;
  readonly ipPattern = IP_PATTERN;

  readonly text = signal(this.defaultText());
  readonly showChain = signal(false);
  readonly active = signal('Support ticket');

  readonly presets: Preset[] = [
    {
      label: 'Support ticket',
      text: this.defaultText(),
    },
    {
      label: 'Server log',
      text: `2026-05-14T09:12:33Z INFO  Request from 203.0.113.42 user=ops@acme.io
2026-05-14T09:12:34Z WARN  Payment retry — card 4242 4242 4242 4242 declined
2026-05-14T09:13:01Z INFO  Failover to 10.0.0.7
2026-05-14T09:13:02Z INFO  Notified admin@acme.io`,
    },
    {
      label: 'Email thread',
      text: `From: billing@vendor.com
To: ops@acme.io
Subject: Card on file updated

Hi team,
Please confirm 5555 5555 5555 4444 is the active card.
Our office at 198.51.100.12 will charge it weekly.
Sarah`,
    },
    {
      label: 'Clean text',
      text: 'No sensitive data here just a regular sentence about the weather and a coffee order.',
    },
  ];

  load(p: Preset) {
    this.active.set(p.label);
    this.text.set(p.text);
  }

  onText(v: string) {
    this.text.set(v);
    this.active.set('');
  }

  toggleChain() {
    this.showChain.update((v) => !v);
  }

  private defaultText(): string {
    return `Hi support,

My card 4111 1111 1111 1111 keeps getting declined.
You can reach me at alice@example.com or call from 192.168.1.42.
Backup card: 5500 0000 0000 0004.

Alice`;
  }
}
