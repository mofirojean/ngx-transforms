import {
  ChangeDetectionStrategy,
  Component,
  signal,
  computed,
} from '@angular/core';
import { DegreesPipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';

interface Preset {
  label: string;
  radians: number;
}

@Component({
  selector: 'app-degrees-playground',
  standalone: true,
  imports: [HlmButtonImports, DegreesPipe],
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
        <p class="text-sm font-medium mb-2">Common angles</p>
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

      <!-- Control -->
      <div>
        <p class="text-sm font-medium mb-2">Radians</p>
        <div class="flex items-center gap-2">
          <button hlmBtn variant="outline" size="sm" class="w-8 h-8 p-0" (click)="adjustRadians(-0.1)">-</button>
          <span class="text-lg font-bold w-20 text-center font-mono">{{ radians().toFixed(4) }}</span>
          <button hlmBtn variant="outline" size="sm" class="w-8 h-8 p-0" (click)="adjustRadians(0.1)">+</button>
        </div>
      </div>

      <!-- Visual -->
      <div class="grid grid-cols-2 gap-3">
        <div class="rounded-lg border border-border bg-muted/30 p-4 text-center">
          <div class="text-xs text-muted-foreground mb-1">Radians</div>
          <div class="text-3xl font-bold font-mono">{{ radians().toFixed(4) }}</div>
        </div>
        <div class="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4 text-center">
          <div class="text-xs text-muted-foreground mb-1">Degrees</div>
          <div class="text-3xl font-bold font-mono text-blue-500">{{ radians() | degrees }}</div>
        </div>
      </div>

      <!-- Result -->
      <div class="rounded-lg border border-blue-500/20 bg-blue-500/5 p-6 text-center">
        <div class="text-sm text-muted-foreground mb-1">{{ radians().toFixed(4) }} rad</div>
        <div class="text-5xl font-bold text-blue-500 mb-2">{{ degreesRounded() }}</div>
        <div class="text-sm text-muted-foreground">{{ radians().toFixed(4) }} | degrees</div>
      </div>

      <!-- Reference table -->
      <div>
        <p class="text-sm font-medium mb-2">Reference</p>
        <div class="grid grid-cols-3 sm:grid-cols-4 gap-2">
          @for (ref of references; track ref.deg) {
            <button type="button" class="rounded-lg border p-3 text-center transition-colors cursor-pointer"
              [class.border-blue-500]="isActiveRef(ref.rad)"
              [class.bg-blue-500/5]="isActiveRef(ref.rad)"
              [class.border-border]="!isActiveRef(ref.rad)"
              (click)="setRadians(ref.rad)">
              <div class="text-xs text-muted-foreground mb-1">{{ ref.label }}</div>
              <div class="text-sm font-bold font-mono"
                [class.text-blue-500]="isActiveRef(ref.rad)">{{ ref.deg }}</div>
            </button>
          }
        </div>
      </div>

      <!-- Pipe output -->
      <div class="rounded-md bg-muted p-4 border border-border">
        <div class="text-xs text-muted-foreground mb-1 font-mono">{{ radians().toFixed(4) }} | degrees</div>
        <code class="text-sm font-mono">{{ radians() | degrees }}</code>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DegreesPlayground {
  radians = signal(Math.PI);
  activePreset = signal('PI');

  degreesRounded = computed(() => {
    const deg = this.radians() * (180 / Math.PI);
    return Math.round(deg * 10000) / 10000;
  });

  references = [
    { label: '0', rad: 0, deg: '0' },
    { label: 'PI/6', rad: Math.PI / 6, deg: '30' },
    { label: 'PI/4', rad: Math.PI / 4, deg: '45' },
    { label: 'PI/3', rad: Math.PI / 3, deg: '60' },
    { label: 'PI/2', rad: Math.PI / 2, deg: '90' },
    { label: 'PI', rad: Math.PI, deg: '180' },
    { label: '3PI/2', rad: 3 * Math.PI / 2, deg: '270' },
    { label: '2PI', rad: 2 * Math.PI, deg: '360' },
  ];

  presets: Preset[] = [
    { label: '0', radians: 0 },
    { label: 'PI/4', radians: Math.PI / 4 },
    { label: 'PI/2', radians: Math.PI / 2 },
    { label: 'PI', radians: Math.PI },
    { label: '2PI', radians: 2 * Math.PI },
    { label: '-PI/2', radians: -Math.PI / 2 },
    { label: '1 rad', radians: 1 },
  ];

  loadPreset(p: Preset) {
    this.activePreset.set(p.label);
    this.radians.set(p.radians);
  }

  setRadians(rad: number) {
    this.radians.set(rad);
    this.activePreset.set('');
  }

  adjustRadians(delta: number) {
    this.radians.update(v => Math.round((v + delta) * 10000) / 10000);
    this.activePreset.set('');
  }

  isActiveRef(rad: number): boolean {
    return Math.abs(this.radians() - rad) < 0.0001;
  }
}