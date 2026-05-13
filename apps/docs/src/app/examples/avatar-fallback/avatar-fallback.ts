import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideUser, lucideCircleOff, lucideMail, lucideImage } from '@ng-icons/lucide';
import { GravatarPipe, InitialsPipe, IsEmptyPipe } from '@ngx-transforms';

interface User {
  name: string;
  email: string;
}

interface Scenario {
  label: string;
  user: User;
  hint: string;
}

type AvatarSize = 32 | 56 | 96;
type Branch = 'gravatar' | 'initials' | 'placeholder';

const SCENARIOS: Scenario[] = [
  { label: 'Full profile', user: { name: 'Alice Mitchell', email: 'alice@example.com' }, hint: 'Both name and email present — gravatar wins.' },
  { label: 'Email only', user: { name: '', email: 'support@acme.io' }, hint: 'Name missing — gravatar still works from email.' },
  { label: 'Name only', user: { name: 'Bob Sanders', email: '' }, hint: 'No email — fall back to colored initials.' },
  { label: 'Anonymous', user: { name: '', email: '' }, hint: 'No data at all — final placeholder branch.' },
];

const SIZE_OPTIONS: { label: string; value: AvatarSize }[] = [
  { label: 'SM', value: 32 },
  { label: 'MD', value: 56 },
  { label: 'LG', value: 96 },
];

@Component({
  selector: 'app-avatar-fallback',
  standalone: true,
  imports: [
    FormsModule,
    HlmButtonImports,
    HlmInputImports,
    NgIcon,
    GravatarPipe,
    InitialsPipe,
    IsEmptyPipe,
  ],
  providers: [provideIcons({ lucideUser, lucideCircleOff, lucideMail, lucideImage })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-5 p-5">
      <!-- Scenario presets -->
      <div>
        <p class="text-sm font-medium mb-2">Try a profile shape</p>
        <div class="flex flex-wrap gap-2">
          @for (s of scenarios; track s.label) {
            <button hlmBtn [variant]="active() === s.label ? 'default' : 'outline'" size="sm" (click)="load(s)">{{ s.label }}</button>
          }
        </div>
      </div>

      <!-- Live editor -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div class="grid w-full gap-1.5">
          <label for="name-input" class="text-sm font-medium">Name</label>
          <input id="name-input" hlmInput placeholder="Alice Mitchell" [ngModel]="user().name" (ngModelChange)="setName($event)" class="w-full text-sm" />
        </div>
        <div class="grid w-full gap-1.5">
          <label for="email-input" class="text-sm font-medium">Email</label>
          <input id="email-input" hlmInput placeholder="alice@example.com" [ngModel]="user().email" (ngModelChange)="setEmail($event)" class="w-full text-sm" />
        </div>
      </div>

      <!-- Toolbar: size + show-chains -->
      <div class="flex flex-wrap items-center gap-2">
        <span class="text-xs text-muted-foreground mr-1">Size:</span>
        @for (s of sizeOptions; track s.value) {
          <button hlmBtn [variant]="size() === s.value ? 'default' : 'outline'" size="sm" class="h-7 px-3" (click)="setSize(s.value)">{{ s.label }}</button>
        }
        <button hlmBtn [variant]="showChain() ? 'default' : 'outline'" size="sm" class="ml-auto" (click)="toggleChain()">
          {{ showChain() ? 'Hide chain' : 'Show chain' }}
        </button>
      </div>

      <!-- Big preview -->
      <div class="rounded-lg border border-border bg-muted/30 p-6 flex flex-col items-center gap-4">
        <!-- The actual fallback chain rendered here -->
        @if (!(user().email | isEmpty)) {
          <img
            [src]="user().email | gravatar: size()"
            [alt]="user().name || user().email"
            [width]="size()"
            [height]="size()"
            class="rounded-full border border-border shadow-sm"
          />
        } @else if (!(user().name | isEmpty)) {
          <div
            class="rounded-full flex items-center justify-center font-bold text-white shadow-sm select-none"
            [style.width.px]="size()"
            [style.height.px]="size()"
            [style.font-size.px]="size() * 0.4"
            [style.background]="initialsColor()"
          >
            {{ user().name | initials }}
          </div>
        } @else {
          <div
            class="rounded-full flex items-center justify-center bg-muted text-muted-foreground border border-border shadow-sm"
            [style.width.px]="size()"
            [style.height.px]="size()"
          >
            <ng-icon name="lucideUser" [style.font-size.px]="size() * 0.5"></ng-icon>
          </div>
        }

        <!-- Active-branch caption -->
        <div class="text-center">
          <div class="inline-flex items-center gap-2 rounded-full bg-background border border-border px-3 py-1 text-xs">
            @switch (activeBranch()) {
              @case ('gravatar') {
                <ng-icon name="lucideImage" class="h-3.5 w-3.5 text-green-600 dark:text-green-400"></ng-icon>
                <span><strong>Gravatar</strong> branch — email present</span>
              }
              @case ('initials') {
                <ng-icon name="lucideMail" class="h-3.5 w-3.5 text-blue-600 dark:text-blue-400"></ng-icon>
                <span><strong>Initials</strong> branch — email missing, name present</span>
              }
              @case ('placeholder') {
                <ng-icon name="lucideCircleOff" class="h-3.5 w-3.5 text-amber-600 dark:text-amber-400"></ng-icon>
                <span><strong>Placeholder</strong> branch — neither name nor email</span>
              }
            }
          </div>
          @if (scenarioHint()) {
            <p class="mt-2 text-xs text-muted-foreground max-w-md mx-auto">{{ scenarioHint() }}</p>
          }
        </div>

        @if (showChain()) {
          <div class="w-full max-w-xl mt-2">
            <div class="rounded-md bg-background border border-border p-3 text-[11px] font-mono space-y-1 text-muted-foreground">
              <div [class.text-foreground]="activeBranch() === 'gravatar'" [class.font-semibold]="activeBranch() === 'gravatar'">
                <span class="text-amber-600 dark:text-amber-400">&#64;if</span> (!(user.email <span class="text-pink-600 dark:text-pink-400">| isEmpty</span>))   →   &lt;img [src]="email <span class="text-pink-600 dark:text-pink-400">| gravatar: size</span>" /&gt;
              </div>
              <div [class.text-foreground]="activeBranch() === 'initials'" [class.font-semibold]="activeBranch() === 'initials'">
                <span class="text-amber-600 dark:text-amber-400">&#64;else if</span> (!(user.name <span class="text-pink-600 dark:text-pink-400">| isEmpty</span>))   →   &lt;span&gt;&#123;&#123; name <span class="text-pink-600 dark:text-pink-400">| initials</span> &#125;&#125;&lt;/span&gt;
              </div>
              <div [class.text-foreground]="activeBranch() === 'placeholder'" [class.font-semibold]="activeBranch() === 'placeholder'">
                <span class="text-amber-600 dark:text-amber-400">&#64;else</span>   →   &lt;icon name="user" /&gt;
              </div>
            </div>
          </div>
        }
      </div>

      <!-- Size comparison -->
      <div class="rounded-md border border-border bg-muted/30 p-4">
        <div class="text-xs text-muted-foreground mb-3">Same chain at every size:</div>
        <div class="flex items-end gap-6">
          @for (s of sizeOptions; track s.value) {
            <div class="flex flex-col items-center gap-2">
              @if (!(user().email | isEmpty)) {
                <img [src]="user().email | gravatar: s.value" [alt]="" [width]="s.value" [height]="s.value" class="rounded-full border border-border" />
              } @else if (!(user().name | isEmpty)) {
                <div class="rounded-full flex items-center justify-center font-bold text-white"
                     [style.width.px]="s.value" [style.height.px]="s.value"
                     [style.font-size.px]="s.value * 0.4" [style.background]="initialsColor()">
                  {{ user().name | initials }}
                </div>
              } @else {
                <div class="rounded-full flex items-center justify-center bg-muted text-muted-foreground border border-border"
                     [style.width.px]="s.value" [style.height.px]="s.value">
                  <ng-icon name="lucideUser" [style.font-size.px]="s.value * 0.5"></ng-icon>
                </div>
              }
              <span class="text-[10px] font-mono text-muted-foreground">{{ s.label }} ({{ s.value }}px)</span>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class AvatarFallback {
  readonly scenarios = SCENARIOS;
  readonly sizeOptions = SIZE_OPTIONS;

  readonly user = signal<User>(SCENARIOS[0].user);
  readonly size = signal<AvatarSize>(56);
  readonly showChain = signal(false);
  readonly active = signal('Full profile');

  readonly scenarioHint = computed(() => {
    const label = this.active();
    return label ? this.scenarios.find((s) => s.label === label)?.hint ?? '' : '';
  });

  readonly activeBranch = computed<Branch>(() => {
    const u = this.user();
    if (u.email && u.email.trim()) return 'gravatar';
    if (u.name && u.name.trim()) return 'initials';
    return 'placeholder';
  });

  readonly initialsColor = computed(() => {
    const name = this.user().name || '';
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 65%, 50%)`;
  });

  load(scenario: Scenario) {
    this.active.set(scenario.label);
    this.user.set({ ...scenario.user });
  }

  setName(name: string) {
    this.user.update((u) => ({ ...u, name }));
    this.active.set('');
  }

  setEmail(email: string) {
    this.user.update((u) => ({ ...u, email }));
    this.active.set('');
  }

  setSize(size: AvatarSize) {
    this.size.set(size);
  }

  toggleChain() {
    this.showChain.update((v) => !v);
  }
}