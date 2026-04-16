import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import { PowPipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';

interface Preset {
  label: string;
  base: number;
  exponent: number;
}

@Component({
  selector: 'app-pow-playground',
  standalone: true,
  imports: [HlmButtonImports, PowPipe],
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
          <p class="text-sm font-medium mb-2">Base</p>
          <div class="flex items-center gap-2">
            <button hlmBtn variant="outline" size="sm" class="w-8 h-8 p-0" (click)="adjustBase(-1)">-</button>
            <span class="text-lg font-bold w-12 text-center font-mono">{{ base() }}</span>
            <button hlmBtn variant="outline" size="sm" class="w-8 h-8 p-0" (click)="adjustBase(1)">+</button>
          </div>
        </div>
        <div>
          <p class="text-sm font-medium mb-2">Exponent</p>
          <div class="flex items-center gap-2">
            <button hlmBtn variant="outline" size="sm" class="w-8 h-8 p-0" (click)="adjustExponent(-1)">-</button>
            <span class="text-lg font-bold w-8 text-center font-mono">{{ exponent() }}</span>
            <button hlmBtn variant="outline" size="sm" class="w-8 h-8 p-0" (click)="adjustExponent(1)">+</button>
          </div>
        </div>
      </div>

      <!-- Visual formula -->
      <div class="rounded-lg border border-border bg-muted/30 p-4 text-center">
        <span class="text-2xl font-mono font-bold">{{ base() }}</span>
        <sup class="text-lg font-mono font-bold text-amber-500">{{ exponent() }}</sup>
        <span class="text-2xl font-mono mx-3">=</span>
        <span class="text-2xl font-mono font-bold text-amber-500">{{ base() | pow:exponent() }}</span>
      </div>

      <!-- Result -->
      <div class="rounded-lg border border-amber-500/20 bg-amber-500/5 p-6 text-center">
        <div class="text-sm text-muted-foreground mb-1">{{ base() }} raised to the power of {{ exponent() }}</div>
        <div class="text-5xl font-bold text-amber-500 mb-2">{{ base() | pow:exponent() }}</div>
        <div class="text-sm text-muted-foreground">{{ base() }} | pow:{{ exponent() }}</div>
      </div>

      <!-- Powers table -->
      <div>
        <p class="text-sm font-medium mb-2">Powers of {{ base() }}</p>
        <div class="grid grid-cols-3 sm:grid-cols-5 gap-2">
          @for (e of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; track e) {
            <div class="rounded-lg border p-3 text-center transition-colors"
              [class.border-amber-500]="exponent() === e"
              [class.bg-amber-500/5]="exponent() === e"
              [class.border-border]="exponent() !== e">
              <div class="text-xs text-muted-foreground mb-1">
                {{ base() }}<sup>{{ e }}</sup>
              </div>
              <div class="text-sm font-bold font-mono"
                [class.text-amber-500]="exponent() === e">{{ base() | pow:e }}</div>
            </div>
          }
        </div>
      </div>

      <!-- Pipe output -->
      <div class="rounded-md bg-muted p-4 border border-border">
        <div class="text-xs text-muted-foreground mb-1 font-mono">{{ base() }} | pow:{{ exponent() }}</div>
        <code class="text-sm font-mono">{{ base() | pow:exponent() }}</code>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PowPlayground {
  base = signal(2);
  exponent = signal(3);
  activePreset = signal('Binary');

  presets: Preset[] = [
    { label: 'Binary', base: 2, exponent: 3 },
    { label: 'Square', base: 5, exponent: 2 },
    { label: 'Cube', base: 3, exponent: 3 },
    { label: 'Inverse', base: 2, exponent: -1 },
    { label: 'Square Root', base: 9, exponent: 0.5 },
    { label: 'Large', base: 10, exponent: 6 },
  ];

  loadPreset(p: Preset) {
    this.activePreset.set(p.label);
    this.base.set(p.base);
    this.exponent.set(p.exponent);
  }

  adjustBase(delta: number) {
    this.base.update(v => v + delta);
    this.activePreset.set('');
  }

  adjustExponent(delta: number) {
    this.exponent.update(v => v + delta);
    this.activePreset.set('');
  }
}