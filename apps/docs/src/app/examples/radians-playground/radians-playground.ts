import {
  ChangeDetectionStrategy,
  Component,
  signal,
  computed,
} from '@angular/core';
import { RadiansPipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';

interface Preset {
  label: string;
  degrees: number;
}

@Component({
  selector: 'app-radians-playground',
  standalone: true,
  imports: [HlmButtonImports, RadiansPipe],
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
        <p class="text-sm font-medium mb-2">Degrees</p>
        <div class="flex items-center gap-2">
          <button hlmBtn variant="outline" size="sm" class="w-8 h-8 p-0" (click)="adjustDegrees(-15)">-</button>
          <span class="text-lg font-bold w-16 text-center font-mono">{{ degrees() }}</span>
          <button hlmBtn variant="outline" size="sm" class="w-8 h-8 p-0" (click)="adjustDegrees(15)">+</button>
        </div>
      </div>

      <!-- Visual -->
      <div class="grid grid-cols-2 gap-3">
        <div class="rounded-lg border border-border bg-muted/30 p-4 text-center">
          <div class="text-xs text-muted-foreground mb-1">Degrees</div>
          <div class="text-3xl font-bold font-mono">{{ degrees() }}</div>
        </div>
        <div class="rounded-lg border border-purple-500/20 bg-purple-500/5 p-4 text-center">
          <div class="text-xs text-muted-foreground mb-1">Radians</div>
          <div class="text-3xl font-bold font-mono text-purple-500">{{ radiansRounded() }}</div>
        </div>
      </div>

      <!-- Result -->
      <div class="rounded-lg border border-purple-500/20 bg-purple-500/5 p-6 text-center">
        <div class="text-sm text-muted-foreground mb-1">{{ degrees() }} degrees</div>
        <div class="text-5xl font-bold text-purple-500 mb-2">{{ radiansRounded() }}</div>
        <div class="text-sm text-muted-foreground">{{ degrees() }} | radians</div>
      </div>

      <!-- Reference table -->
      <div>
        <p class="text-sm font-medium mb-2">Reference</p>
        <div class="grid grid-cols-3 sm:grid-cols-4 gap-2">
          @for (ref of references; track ref.deg) {
            <button type="button" class="rounded-lg border p-3 text-center transition-colors cursor-pointer"
              [class.border-purple-500]="degrees() === ref.deg"
              [class.bg-purple-500/5]="degrees() === ref.deg"
              [class.border-border]="degrees() !== ref.deg"
              (click)="setDegrees(ref.deg)">
              <div class="text-xs text-muted-foreground mb-1">{{ ref.deg }}</div>
              <div class="text-sm font-bold font-mono"
                [class.text-purple-500]="degrees() === ref.deg">{{ ref.label }}</div>
            </button>
          }
        </div>
      </div>

      <!-- Pipe output -->
      <div class="rounded-md bg-muted p-4 border border-border">
        <div class="text-xs text-muted-foreground mb-1 font-mono">{{ degrees() }} | radians</div>
        <code class="text-sm font-mono">{{ degrees() | radians }}</code>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadiansPlayground {
  degrees = signal(180);
  activePreset = signal('180');

  radiansRounded = computed(() => {
    const rad = this.degrees() * (Math.PI / 180);
    return Math.round(rad * 10000) / 10000;
  });

  references = [
    { deg: 0, label: '0' },
    { deg: 30, label: 'PI/6' },
    { deg: 45, label: 'PI/4' },
    { deg: 60, label: 'PI/3' },
    { deg: 90, label: 'PI/2' },
    { deg: 180, label: 'PI' },
    { deg: 270, label: '3PI/2' },
    { deg: 360, label: '2PI' },
  ];

  presets: Preset[] = [
    { label: '0', degrees: 0 },
    { label: '45', degrees: 45 },
    { label: '90', degrees: 90 },
    { label: '180', degrees: 180 },
    { label: '360', degrees: 360 },
    { label: '-90', degrees: -90 },
    { label: '57.3', degrees: 57.2958 },
  ];

  loadPreset(p: Preset) {
    this.activePreset.set(p.label);
    this.degrees.set(p.degrees);
  }

  setDegrees(deg: number) {
    this.degrees.set(deg);
    this.activePreset.set('');
  }

  adjustDegrees(delta: number) {
    this.degrees.update(v => v + delta);
    this.activePreset.set('');
  }
}