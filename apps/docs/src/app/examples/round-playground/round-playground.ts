import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import { CeilPipe, FloorPipe, RoundPipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';

interface Preset {
  label: string;
  value: number;
  precision: number;
}

@Component({
  selector: 'app-round-playground',
  standalone: true,
  imports: [HlmButtonImports, RoundPipe, CeilPipe, FloorPipe],
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

      <!-- Controls -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <p class="text-sm font-medium mb-2">Value</p>
          <div class="flex items-center gap-2">
            <button hlmBtn variant="outline" size="sm" class="w-8 h-8 p-0" (click)="adjustValue(-0.1)">-</button>
            <span class="text-lg font-bold w-24 text-center font-mono">{{ value().toFixed(4) }}</span>
            <button hlmBtn variant="outline" size="sm" class="w-8 h-8 p-0" (click)="adjustValue(0.1)">+</button>
          </div>
        </div>
        <div>
          <p class="text-sm font-medium mb-2">Precision</p>
          <div class="flex items-center gap-2">
            <button hlmBtn variant="outline" size="sm" class="w-8 h-8 p-0" (click)="adjustPrecision(-1)" [disabled]="precision() <= 0">-</button>
            <span class="text-lg font-bold w-8 text-center font-mono">{{ precision() }}</span>
            <button hlmBtn variant="outline" size="sm" class="w-8 h-8 p-0" (click)="adjustPrecision(1)" [disabled]="precision() >= 6">+</button>
          </div>
        </div>
      </div>

      <!-- Side-by-side comparison with ceil/floor -->
      <div class="grid grid-cols-3 gap-3">
        <div class="rounded-lg border border-purple-500/20 bg-purple-500/5 p-4 text-center">
          <div class="text-xs text-muted-foreground mb-1">Floor (↓)</div>
          <div class="text-2xl font-bold font-mono text-purple-500">{{ value() | floor:precision() }}</div>
        </div>
        <div class="rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-center ring-2 ring-green-500/20">
          <div class="text-xs text-muted-foreground mb-1">Round (≈)</div>
          <div class="text-2xl font-bold font-mono text-green-500">{{ value() | round:precision() }}</div>
        </div>
        <div class="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4 text-center">
          <div class="text-xs text-muted-foreground mb-1">Ceil (↑)</div>
          <div class="text-2xl font-bold font-mono text-blue-500">{{ value() | ceil:precision() }}</div>
        </div>
      </div>

      <!-- Result -->
      <div class="rounded-lg border border-green-500/20 bg-green-500/5 p-6 text-center">
        <div class="text-sm text-muted-foreground mb-1">Rounded to {{ precision() }} decimal{{ precision() === 1 ? '' : 's' }}</div>
        <div class="text-5xl font-bold text-green-500 mb-2">{{ value() | round:precision() }}</div>
        <div class="text-sm text-muted-foreground">{{ value() }} | round:{{ precision() }}</div>
      </div>

      <!-- Comparison grid -->
      <div>
        <p class="text-sm font-medium mb-2">All precisions</p>
        <div class="grid grid-cols-3 sm:grid-cols-4 gap-2">
          @for (p of [0, 1, 2, 3, 4, 5]; track p) {
            <div class="rounded-lg border p-3 text-center transition-colors"
              [class.border-green-500]="precision() === p"
              [class.bg-green-500/5]="precision() === p"
              [class.border-border]="precision() !== p">
              <div class="text-xs text-muted-foreground mb-1">round:{{ p }}</div>
              <div class="text-sm font-bold font-mono"
                [class.text-green-500]="precision() === p">{{ value() | round:p }}</div>
            </div>
          }
        </div>
      </div>

      <!-- Pipe output -->
      <div class="rounded-md bg-muted p-4 border border-border">
        <div class="text-xs text-muted-foreground mb-1 font-mono">{{ value() }} | round:{{ precision() }}</div>
        <code class="text-sm font-mono">{{ value() | round:precision() }}</code>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoundPlayground {
  value = signal(4.567);
  precision = signal(2);
  activePreset = signal('Standard Rounding');

  presets: Preset[] = [
    { label: 'Standard Rounding', value: 4.567, precision: 2 },
    { label: 'Half-up (.5)', value: 2.5, precision: 0 },
    { label: 'Currency', value: 19.995, precision: 2 },
    { label: 'Statistics', value: 0.666666, precision: 3 },
    { label: 'Negative', value: -2.5, precision: 0 },
    { label: 'Large Number', value: 1234.5678, precision: 1 },
  ];

  loadPreset(p: Preset) {
    this.activePreset.set(p.label);
    this.value.set(p.value);
    this.precision.set(p.precision);
  }

  adjustValue(delta: number) {
    this.value.update(v => Math.round((v + delta) * 10000) / 10000);
    this.activePreset.set('');
  }

  adjustPrecision(delta: number) {
    this.precision.update(v => Math.max(0, Math.min(6, v + delta)));
  }
}