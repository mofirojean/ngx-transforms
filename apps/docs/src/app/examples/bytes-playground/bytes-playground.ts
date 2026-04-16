import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import { BytesPipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';

interface Preset {
  label: string;
  value: number;
}

@Component({
  selector: 'app-bytes-playground',
  standalone: true,
  imports: [HlmButtonImports, BytesPipe],
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
        <p class="text-sm font-medium mb-2">File sizes</p>
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
          <p class="text-sm font-medium mb-2">Decimals</p>
          <div class="flex items-center gap-2">
            <button hlmBtn variant="outline" size="sm" class="w-8 h-8 p-0" (click)="adjustDecimals(-1)" [disabled]="decimals() <= 0">-</button>
            <span class="text-lg font-bold w-8 text-center font-mono">{{ decimals() }}</span>
            <button hlmBtn variant="outline" size="sm" class="w-8 h-8 p-0" (click)="adjustDecimals(1)" [disabled]="decimals() >= 4">+</button>
          </div>
        </div>
        <div>
          <p class="text-sm font-medium mb-2">Base</p>
          <div class="flex gap-2">
            <button hlmBtn [variant]="base() === 'decimal' ? 'default' : 'outline'" size="sm" (click)="setBase('decimal')">Decimal (KB)</button>
            <button hlmBtn [variant]="base() === 'binary' ? 'default' : 'outline'" size="sm" (click)="setBase('binary')">Binary (KiB)</button>
          </div>
        </div>
      </div>

      <!-- Multiplier -->
      <div>
        <p class="text-sm font-medium mb-2">Multiply</p>
        <div class="flex flex-wrap gap-2">
          @for (m of multipliers; track m.label) {
            <button
              hlmBtn
              variant="outline"
              size="sm"
              class="font-mono"
              (click)="multiply(m.factor)">
              {{ m.label }}
            </button>
          }
        </div>
      </div>

      <!-- Visual -->
      <div class="grid grid-cols-2 gap-3">
        <div class="rounded-lg border border-border bg-muted/30 p-4 text-center">
          <div class="text-xs text-muted-foreground mb-1">Raw bytes</div>
          <div class="text-2xl font-bold font-mono">{{ bytes() }}</div>
        </div>
        <div class="rounded-lg border border-green-500/20 bg-green-500/5 p-4 text-center">
          <div class="text-xs text-muted-foreground mb-1">Formatted</div>
          <div class="text-2xl font-bold font-mono text-green-500">{{ bytes() | bytes:decimals():base() }}</div>
        </div>
      </div>

      <!-- Result -->
      <div class="rounded-lg border border-green-500/20 bg-green-500/5 p-6 text-center">
        <div class="text-sm text-muted-foreground mb-1">{{ bytes() }} bytes</div>
        <div class="text-5xl font-bold text-green-500 mb-2">{{ bytes() | bytes:decimals():base() }}</div>
        <div class="text-sm text-muted-foreground">bytes:{{ decimals() }}:'{{ base() }}'</div>
      </div>

      <!-- Comparison -->
      <div>
        <p class="text-sm font-medium mb-2">Same value, both bases</p>
        <div class="grid grid-cols-2 gap-3">
          <div class="rounded-lg border border-border p-3 text-center">
            <div class="text-xs text-muted-foreground mb-1">Decimal (1000)</div>
            <div class="text-lg font-bold font-mono">{{ bytes() | bytes:decimals():'decimal' }}</div>
          </div>
          <div class="rounded-lg border border-border p-3 text-center">
            <div class="text-xs text-muted-foreground mb-1">Binary (1024)</div>
            <div class="text-lg font-bold font-mono">{{ bytes() | bytes:decimals():'binary' }}</div>
          </div>
        </div>
      </div>

      <!-- Pipe output -->
      <div class="rounded-md bg-muted p-4 border border-border">
        <div class="text-xs text-muted-foreground mb-1 font-mono">{{ bytes() }} | bytes:{{ decimals() }}:'{{ base() }}'</div>
        <code class="text-sm font-mono">{{ bytes() | bytes:decimals():base() }}</code>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BytesPlayground {
  bytes = signal(1536000);
  decimals = signal(1);
  base = signal<'decimal' | 'binary'>('decimal');
  activePreset = signal('Image');

  presets: Preset[] = [
    { label: 'Tiny', value: 256 },
    { label: 'Document', value: 48500 },
    { label: 'Image', value: 1536000 },
    { label: 'Video', value: 256000000 },
    { label: 'App Bundle', value: 1500000000 },
    { label: 'Database', value: 50000000000 },
  ];

  multipliers = [
    { label: 'x0.5', factor: 0.5 },
    { label: 'x2', factor: 2 },
    { label: 'x10', factor: 10 },
    { label: 'x1000', factor: 1000 },
  ];

  loadPreset(p: Preset) {
    this.activePreset.set(p.label);
    this.bytes.set(p.value);
  }

  multiply(factor: number) {
    this.bytes.update(v => Math.round(v * factor));
    this.activePreset.set('');
  }

  adjustDecimals(delta: number) {
    this.decimals.update(v => Math.max(0, Math.min(4, v + delta)));
  }

  setBase(b: 'decimal' | 'binary') {
    this.base.set(b);
  }
}