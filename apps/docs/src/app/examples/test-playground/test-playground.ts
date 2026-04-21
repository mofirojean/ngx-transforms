import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TestPipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';

interface Preset {
  label: string;
  value: string;
  pattern: string;
  flags: string;
}

@Component({
  selector: 'app-test-playground',
  standalone: true,
  imports: [HlmButtonImports, HlmInputImports, FormsModule, TestPipe],
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
          <label for="test-value" class="text-sm font-medium">Text</label>
          <input id="test-value" hlmInput type="text" [(ngModel)]="valueModel" (ngModelChange)="onValue($event)" class="w-full font-mono" />
        </div>
        <div class="grid w-full gap-1.5">
          <label for="test-flags" class="text-sm font-medium">Flags</label>
          <input id="test-flags" hlmInput type="text" [(ngModel)]="flagsModel" (ngModelChange)="onFlags($event)" maxlength="6" class="w-full font-mono" placeholder="i, m..." />
        </div>
      </div>

      <div class="grid w-full gap-1.5">
        <label for="test-pattern" class="text-sm font-medium">Pattern (regex)</label>
        <input id="test-pattern" hlmInput type="text" [(ngModel)]="patternModel" (ngModelChange)="onPattern($event)" class="w-full font-mono" />
      </div>

      <div class="rounded-lg p-6 text-center"
        [class.border]="true"
        [class.border-green-500/20]="value() | test:pattern():flags()"
        [class.bg-green-500/5]="value() | test:pattern():flags()"
        [class.border-red-500/20]="!(value() | test:pattern():flags())"
        [class.bg-red-500/5]="!(value() | test:pattern():flags())">
        <div class="text-sm text-muted-foreground mb-1">Result</div>
        <div class="text-5xl font-bold mb-2"
          [class.text-green-500]="value() | test:pattern():flags()"
          [class.text-red-500]="!(value() | test:pattern():flags())">
          {{ (value() | test:pattern():flags()) ? 'true' : 'false' }}
        </div>
        <div class="text-sm text-muted-foreground">
          {{ (value() | test:pattern():flags()) ? 'Pattern matches the input' : 'Pattern does not match' }}
        </div>
      </div>

      <div class="rounded-md bg-muted p-4 border border-border">
        <div class="text-xs text-muted-foreground mb-1 font-mono">'{{ value() }}' | test:'{{ pattern() }}':'{{ flags() }}'</div>
        <code class="text-sm font-mono">{{ (value() | test:pattern():flags()) ? 'true' : 'false' }}</code>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestPlayground {
  value = signal('user@example.com');
  pattern = signal('@');
  flags = signal('');
  active = signal('Has @');

  valueModel = 'user@example.com';
  patternModel = '@';
  flagsModel = '';

  presets: Preset[] = [
    { label: 'Has @', value: 'user@example.com', pattern: '@', flags: '' },
    { label: 'Email format', value: 'a@b.com', pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$', flags: '' },
    { label: 'Only digits', value: '12345', pattern: '^[0-9]+$', flags: '' },
    { label: 'Case-insensitive', value: 'Hello World', pattern: 'hello', flags: 'i' },
    { label: 'Starts with', value: 'hello world', pattern: '^hello', flags: '' },
    { label: 'Ends with', value: 'hello world', pattern: 'world$', flags: '' },
    { label: 'URL check', value: 'https://x.com', pattern: '^https?://', flags: '' },
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