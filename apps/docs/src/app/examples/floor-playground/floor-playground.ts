import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import { FloorPipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';

interface Preset {
  label: string;
  value: number;
  precision: number;
}

@Component({
  selector: 'app-floor-playground',
  standalone: true,
  imports: [HlmButtonImports, FloorPipe],
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

      <!-- Visual comparison -->
      <div class="grid grid-cols-2 gap-3">
        <div class="rounded-lg border border-border bg-muted/30 p-4 text-center">
          <div class="text-xs text-muted-foreground mb-1">Input</div>
          <div class="text-3xl font-bold font-mono">{{ value() }}</div>
        </div>
        <div class="rounded-lg border border-purple-500/20 bg-purple-500/5 p-4 text-center">
          <div class="text-xs text-muted-foreground mb-1">Floor (↓)</div>
          <div class="text-3xl font-bold font-mono text-purple-500">{{ value() | floor:precision() }}</div>
        </div>
      </div>

      <!-- Result -->
      <div class="rounded-lg border border-purple-500/20 bg-purple-500/5 p-6 text-center">
        <div class="text-sm text-muted-foreground mb-1">Rounded down to {{ precision() }} decimal{{ precision() === 1 ? '' : 's' }}</div>
        <div class="text-5xl font-bold text-purple-500 mb-2">{{ value() | floor:precision() }}</div>
        <div class="text-sm text-muted-foreground">{{ value() }} | floor:{{ precision() }}</div>
      </div>

      <!-- Comparison grid -->
      <div>
        <p class="text-sm font-medium mb-2">All precisions</p>
        <div class="grid grid-cols-3 sm:grid-cols-4 gap-2">
          @for (p of [0, 1, 2, 3, 4, 5]; track p) {
            <div class="rounded-lg border p-3 text-center transition-colors"
              [class.border-purple-500]="precision() === p"
              [class.bg-purple-500/5]="precision() === p"
              [class.border-border]="precision() !== p">
              <div class="text-xs text-muted-foreground mb-1">floor:{{ p }}</div>
              <div class="text-sm font-bold font-mono"
                [class.text-purple-500]="precision() === p">{{ value() | floor:p }}</div>
            </div>
          }
        </div>
      </div>

      <!-- Pipe output -->
      <div class="rounded-md bg-muted p-4 border border-border">
        <div class="text-xs text-muted-foreground mb-1 font-mono">{{ value() }} | floor:{{ precision() }}</div>
        <code class="text-sm font-mono">{{ value() | floor:precision() }}</code>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FloorPlayground {
  value = signal(4.567);
  precision = signal(2);
  activePreset = signal('Truncate Price');

  presets: Preset[] = [
    { label: 'Truncate Price', value: 4.567, precision: 2 },
    { label: 'Drop Decimals', value: 9.99, precision: 0 },
    { label: 'Rating Display', value: 3.87, precision: 1 },
    { label: 'Negative', value: -4.1, precision: 0 },
    { label: 'Large Number', value: 1234.5678, precision: 1 },
    { label: 'High Precision', value: 0.987654, precision: 4 },
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