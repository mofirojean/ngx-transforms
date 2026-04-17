import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import { SqrtPipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';

interface Preset {
  label: string;
  value: number;
}

@Component({
  selector: 'app-sqrt-playground',
  standalone: true,
  imports: [HlmButtonImports, SqrtPipe],
  template: `
    <style>
      @keyframes fade-in {
        from { opacity: 0; transform: translateY(6px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .fade-in { animation: fade-in 250ms ease-out both; }
    </style>

    <div class="flex flex-col gap-6 p-5">

      <!-- Presets -->
      <div>
        <p class="text-sm font-medium mb-2">Quick values</p>
        <div class="flex flex-wrap gap-2">
          @for (p of presets; track p.label) {
            <button
              hlmBtn
              [variant]="activePreset() === p.label ? 'default' : 'outline'"
              size="sm"
              class="font-mono"
              (click)="loadPreset(p)">
              {{ p.label }}
            </button>
          }
        </div>
      </div>

      <!-- Control -->
      <div>
        <p class="text-sm font-medium mb-2">Value</p>
        <div class="flex items-center gap-2">
          <button hlmBtn variant="outline" size="sm" class="w-8 h-8 p-0" (click)="adjustValue(-1)" [disabled]="value() <= 0">-</button>
          <span class="text-lg font-bold w-16 text-center font-mono">{{ value() }}</span>
          <button hlmBtn variant="outline" size="sm" class="w-8 h-8 p-0" (click)="adjustValue(1)">+</button>
        </div>
      </div>

      <!-- Visual -->
      <div class="grid grid-cols-2 gap-3">
        <div class="rounded-lg border border-border bg-muted/30 p-4 text-center">
          <div class="text-xs text-muted-foreground mb-1">Input</div>
          <div class="text-3xl font-bold font-mono">{{ value() }}</div>
        </div>
        <div class="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4 text-center">
          <div class="text-xs text-muted-foreground mb-1">Square Root</div>
          <div class="text-3xl font-bold font-mono text-amber-500">{{ value() | sqrt }}</div>
        </div>
      </div>

      <!-- Result -->
      <div class="rounded-lg border border-amber-500/20 bg-amber-500/5 p-6 text-center">
        @if ((value() | sqrt) !== undefined) {
          <div class="text-sm text-muted-foreground mb-1">Square root of {{ value() }}</div>
          <div class="text-5xl font-bold text-amber-500 mb-2">{{ value() | sqrt }}</div>
          <div class="text-sm text-muted-foreground">{{ value() }} | sqrt</div>
        } @else {
          <div class="text-2xl font-bold text-muted-foreground mb-2">undefined</div>
          <div class="text-sm text-muted-foreground">Negative numbers have no real square root</div>
        }
      </div>

      <!-- Perfect squares grid -->
      <div>
        <p class="text-sm font-medium mb-2">Perfect squares</p>
        <div class="grid grid-cols-4 sm:grid-cols-5 gap-2">
          @for (n of perfectSquares; track n) {
            <button type="button" class="rounded-lg border p-3 text-center transition-colors cursor-pointer"
              [class.border-amber-500]="value() === n"
              [class.bg-amber-500/5]="value() === n"
              [class.border-border]="value() !== n"
              (click)="setValue(n)">
              <div class="text-xs text-muted-foreground mb-1">{{ n }}</div>
              <div class="text-sm font-bold font-mono"
                [class.text-amber-500]="value() === n">{{ n | sqrt }}</div>
            </button>
          }
        </div>
      </div>

      <!-- Pipe output -->
      <div class="rounded-md bg-muted p-4 border border-border">
        <div class="text-xs text-muted-foreground mb-1 font-mono">{{ value() }} | sqrt</div>
        <code class="text-sm font-mono">{{ value() | sqrt }}</code>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SqrtPlayground {
  value = signal(16);
  activePreset = signal('16');

  perfectSquares = [1, 4, 9, 16, 25, 36, 49, 64, 81, 100];

  presets: Preset[] = [
    { label: '4', value: 4 },
    { label: '16', value: 16 },
    { label: '25', value: 25 },
    { label: '100', value: 100 },
    { label: '144', value: 144 },
    { label: '2', value: 2 },
    { label: '0.25', value: 0.25 },
  ];

  loadPreset(p: Preset) {
    this.activePreset.set(p.label);
    this.value.set(p.value);
  }

  setValue(n: number) {
    this.value.set(n);
    this.activePreset.set('');
  }

  adjustValue(delta: number) {
    this.value.update(v => Math.max(0, v + delta));
    this.activePreset.set('');
  }
}