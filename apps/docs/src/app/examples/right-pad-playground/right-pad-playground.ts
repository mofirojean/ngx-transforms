import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RightPadPipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';

interface Preset {
  label: string;
  value: string;
  length: number;
  char: string;
}

@Component({
  selector: 'app-right-pad-playground',
  standalone: true,
  imports: [HlmButtonImports, HlmInputImports, FormsModule, RightPadPipe],
  template: `
    <div class="flex flex-col gap-6 p-5">

      <!-- Presets -->
      <div>
        <p class="text-sm font-medium mb-2">Scenarios</p>
        <div class="flex flex-wrap gap-2">
          @for (p of presets; track p.label) {
            <button
              hlmBtn
              [variant]="activePreset() === p.label ? 'default' : 'outline'"
              size="sm"
              (click)="loadPreset(p)">
              {{ p.label }}
            </button>
          }
        </div>
      </div>

      <!-- Inputs -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div class="grid w-full gap-1.5">
          <label for="rp-value" class="text-sm font-medium">Value</label>
          <input id="rp-value" hlmInput type="text" [(ngModel)]="valueModel" (ngModelChange)="onValue($event)" class="w-full font-mono" />
        </div>
        <div class="grid w-full gap-1.5">
          <label for="rp-length" class="text-sm font-medium">Length</label>
          <div class="flex items-center gap-2">
            <button hlmBtn variant="outline" size="sm" class="w-8 h-8 p-0" (click)="adjustLength(-1)" [disabled]="length() <= 0">-</button>
            <span class="text-lg font-bold w-8 text-center font-mono">{{ length() }}</span>
            <button hlmBtn variant="outline" size="sm" class="w-8 h-8 p-0" (click)="adjustLength(1)">+</button>
          </div>
        </div>
        <div class="grid w-full gap-1.5">
          <label for="rp-char" class="text-sm font-medium">Pad char</label>
          <input id="rp-char" hlmInput type="text" [(ngModel)]="charModel" (ngModelChange)="onChar($event)" maxlength="3" class="w-full font-mono" />
        </div>
      </div>

      <!-- Before / After -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div class="rounded-lg border border-border bg-muted/30 p-4">
          <div class="text-xs text-muted-foreground mb-2">Input ({{ value().length }} chars)</div>
          <div class="text-sm font-mono break-all bg-background rounded p-3 border border-border">[{{ value() }}]</div>
        </div>
        <div class="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
          <div class="text-xs text-muted-foreground mb-2">Padded ({{ (value() | rightPad:length():char()).length }} chars)</div>
          <div class="text-sm font-mono break-all bg-background rounded p-3 border border-green-500/30 text-green-600 dark:text-green-400">[{{ value() | rightPad:length():char() }}]</div>
        </div>
      </div>

      <!-- Result -->
      <div class="rounded-lg border border-green-500/20 bg-green-500/5 p-6 text-center">
        <div class="text-sm text-muted-foreground mb-1">Padded to {{ length() }} characters</div>
        <div class="text-3xl font-bold text-green-500 mb-2 font-mono">[{{ value() | rightPad:length():char() }}]</div>
        <div class="text-sm text-muted-foreground">'{{ value() }}' | rightPad:{{ length() }}:'{{ char() }}'</div>
      </div>

      <!-- Pipe output -->
      <div class="rounded-md bg-muted p-4 border border-border">
        <div class="text-xs text-muted-foreground mb-1 font-mono">'{{ value() }}' | rightPad:{{ length() }}:'{{ char() }}'</div>
        <code class="text-sm font-mono">'{{ value() | rightPad:length():char() }}'</code>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RightPadPlayground {
  value = signal('hi');
  length = signal(5);
  char = signal('.');
  activePreset = signal('Ellipsis fill');

  valueModel = 'hi';
  charModel = '.';

  presets: Preset[] = [
    { label: 'Ellipsis fill', value: 'hi', length: 5, char: '.' },
    { label: 'Left-aligned label', value: 'Name', length: 12, char: ' ' },
    { label: 'Dotted line', value: 'Total', length: 20, char: '.' },
    { label: 'Progress bar', value: '', length: 10, char: '#' },
    { label: 'Trailing zeros', value: '42', length: 5, char: '0' },
    { label: 'Underlined', value: 'hello', length: 12, char: '_' },
  ];

  loadPreset(p: Preset) {
    this.activePreset.set(p.label);
    this.value.set(p.value);
    this.length.set(p.length);
    this.char.set(p.char);
    this.valueModel = p.value;
    this.charModel = p.char;
  }

  onValue(v: string) {
    this.value.set(v);
    this.activePreset.set('');
  }

  onChar(c: string) {
    this.char.set(c);
    this.activePreset.set('');
  }

  adjustLength(delta: number) {
    this.length.update(n => Math.max(0, n + delta));
    this.activePreset.set('');
  }
}