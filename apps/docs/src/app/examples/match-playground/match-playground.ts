import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatchPipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';

interface Preset {
  label: string;
  value: string;
  pattern: string;
  flags: string;
}

@Component({
  selector: 'app-match-playground',
  standalone: true,
  imports: [HlmButtonImports, HlmInputImports, FormsModule, MatchPipe, JsonPipe],
  template: `
    <div class="flex flex-col gap-6 p-5">
      <div>
        <p class="text-sm font-medium mb-2">Scenarios</p>
        <div class="flex flex-wrap gap-2">
          @for (p of presets; track p.label) {
            <button hlmBtn [variant]="active() === p.label ? 'default' : 'outline'" size="sm" (click)="load(p)">{{ p.label }}</button>
          }
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div class="grid w-full gap-1.5 md:col-span-2">
          <label for="match-value" class="text-sm font-medium">Text</label>
          <input id="match-value" hlmInput type="text" [(ngModel)]="valueModel" (ngModelChange)="onValue($event)" class="w-full font-mono" />
        </div>
        <div class="grid w-full gap-1.5">
          <label for="match-flags" class="text-sm font-medium">Flags</label>
          <input id="match-flags" hlmInput type="text" [(ngModel)]="flagsModel" (ngModelChange)="onFlags($event)" maxlength="6" class="w-full font-mono" placeholder="g, i, gi..." />
        </div>
      </div>

      <div class="grid w-full gap-1.5">
        <label for="match-pattern" class="text-sm font-medium">Pattern (regex)</label>
        <input id="match-pattern" hlmInput type="text" [(ngModel)]="patternModel" (ngModelChange)="onPattern($event)" class="w-full font-mono" />
      </div>

      <div class="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
        <div class="text-xs text-muted-foreground mb-2">Matches ({{ (value() | match:pattern():flags()).length }})</div>
        @if ((value() | match:pattern():flags()).length > 0) {
          <div class="flex flex-wrap gap-2">
            @for (m of value() | match:pattern():flags(); track $index) {
              <span class="inline-flex items-center rounded-md border border-green-500/30 bg-background px-2.5 py-1 text-sm font-mono text-green-600 dark:text-green-400">{{ m }}</span>
            }
          </div>
        } @else {
          <div class="text-sm text-muted-foreground">No matches</div>
        }
      </div>

      <div class="rounded-md bg-muted p-4 border border-border">
        <div class="text-xs text-muted-foreground mb-1 font-mono">'{{ value() }}' | match:'{{ pattern() }}':'{{ flags() }}'</div>
        <code class="text-sm font-mono break-all">{{ value() | match:pattern():flags() | json }}</code>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchPlayground {
  value = signal('abc123def456');
  pattern = signal('[0-9]+');
  flags = signal('g');
  active = signal('Digits');

  valueModel = 'abc123def456';
  patternModel = '[0-9]+';
  flagsModel = 'g';

  presets: Preset[] = [
    { label: 'Digits', value: 'abc123def456', pattern: '[0-9]+', flags: 'g' },
    { label: 'Words', value: 'hello world foo', pattern: '[a-z]+', flags: 'g' },
    { label: 'Hashtags', value: 'Love #angular and #rxjs!', pattern: '#\\w+', flags: 'g' },
    { label: 'Emails', value: 'Email a@b.com or c@d.org', pattern: '[\\w.]+@[\\w.]+', flags: 'g' },
    { label: 'URLs', value: 'Visit https://foo.com and http://bar.io', pattern: 'https?://[\\w.]+', flags: 'g' },
    { label: 'Case-insensitive', value: 'HELLO World', pattern: '[a-z]+', flags: 'gi' },
  ];

  load(p: Preset) {
    this.active.set(p.label);
    this.value.set(p.value);
    this.pattern.set(p.pattern);
    this.flags.set(p.flags);
    this.valueModel = p.value;
    this.patternModel = p.pattern;
    this.flagsModel = p.flags;
  }

  onValue(v: string) { this.value.set(v); this.active.set(''); }
  onPattern(p: string) { this.pattern.set(p); this.active.set(''); }
  onFlags(f: string) { this.flags.set(f); this.active.set(''); }
}