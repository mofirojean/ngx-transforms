import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LeftPadPipe, PadPipe, RightPadPipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';

interface Preset {
  label: string;
  value: string;
  length: number;
  char: string;
}

@Component({
  selector: 'app-pad-playground',
  standalone: true,
  imports: [HlmButtonImports, HlmInputImports, FormsModule, PadPipe, LeftPadPipe, RightPadPipe],
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
          <label for="p-value" class="text-sm font-medium">Value</label>
          <input id="p-value" hlmInput type="text" [(ngModel)]="valueModel" (ngModelChange)="onValue($event)" class="w-full font-mono" />
        </div>
        <div class="grid w-full gap-1.5">
          <label for="p-length" class="text-sm font-medium">Length</label>
          <div class="flex items-center gap-2">
            <button hlmBtn variant="outline" size="sm" class="w-8 h-8 p-0" (click)="adjustLength(-1)" [disabled]="length() <= 0">-</button>
            <span class="text-lg font-bold w-8 text-center font-mono">{{ length() }}</span>
            <button hlmBtn variant="outline" size="sm" class="w-8 h-8 p-0" (click)="adjustLength(1)">+</button>
          </div>
        </div>
        <div class="grid w-full gap-1.5">
          <label for="p-char" class="text-sm font-medium">Pad char</label>
          <input id="p-char" hlmInput type="text" [(ngModel)]="charModel" (ngModelChange)="onChar($event)" maxlength="3" class="w-full font-mono" />
        </div>
      </div>

      <!-- Centered result -->
      <div class="rounded-lg border border-purple-500/20 bg-purple-500/5 p-6 text-center">
        <div class="text-sm text-muted-foreground mb-1">Centered in {{ length() }} characters</div>
        <div class="text-3xl font-bold text-purple-500 mb-2 font-mono">[{{ value() | pad:length():char() }}]</div>
        <div class="text-sm text-muted-foreground">'{{ value() }}' | pad:{{ length() }}:'{{ char() }}'</div>
      </div>

      <!-- Comparison with leftPad/rightPad -->
      <div>
        <p class="text-sm font-medium mb-2">Compare all three</p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div class="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
            <div class="text-xs text-muted-foreground mb-2">leftPad</div>
            <div class="text-sm font-bold font-mono text-blue-500 bg-background rounded p-2 border border-blue-500/30 break-all">[{{ value() | leftPad:length():char() }}]</div>
          </div>
          <div class="rounded-lg border border-purple-500/30 bg-purple-500/10 p-4 ring-2 ring-purple-500/20">
            <div class="text-xs text-muted-foreground mb-2">pad (center)</div>
            <div class="text-sm font-bold font-mono text-purple-500 bg-background rounded p-2 border border-purple-500/30 break-all">[{{ value() | pad:length():char() }}]</div>
          </div>
          <div class="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
            <div class="text-xs text-muted-foreground mb-2">rightPad</div>
            <div class="text-sm font-bold font-mono text-green-500 bg-background rounded p-2 border border-green-500/30 break-all">[{{ value() | rightPad:length():char() }}]</div>
          </div>
        </div>
      </div>

      <!-- Pipe output -->
      <div class="rounded-md bg-muted p-4 border border-border">
        <div class="text-xs text-muted-foreground mb-1 font-mono">'{{ value() }}' | pad:{{ length() }}:'{{ char() }}'</div>
        <code class="text-sm font-mono">'{{ value() | pad:length():char() }}'</code>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PadPlayground {
  value = signal('x');
  length = signal(5);
  char = signal('-');
  activePreset = signal('Centered marker');

  valueModel = 'x';
  charModel = '-';

  presets: Preset[] = [
    { label: 'Centered marker', value: 'x', length: 5, char: '-' },
    { label: 'Section header', value: 'INTRO', length: 20, char: '=' },
    { label: 'Decorated title', value: 'hi', length: 10, char: '*' },
    { label: 'Uneven pad', value: 'hi', length: 7, char: '*' },
    { label: 'Large centered', value: 'TITLE', length: 30, char: '.' },
    { label: 'Number centered', value: '42', length: 6, char: '0' },
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