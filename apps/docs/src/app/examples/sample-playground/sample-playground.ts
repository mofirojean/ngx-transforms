import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { SamplePipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-sample-playground',
  standalone: true,
  imports: [HlmButtonImports, SamplePipe, JsonPipe],
  template: `
    <style>
      @keyframes pop {
        0% { transform: scale(0.8); opacity: 0; }
        60% { transform: scale(1.05); }
        100% { transform: scale(1); opacity: 1; }
      }
      .pop { animation: pop 300ms ease-out both; }
    </style>

    <div class="flex flex-col gap-6 p-5">

      <!-- Preset picker -->
      <div>
        <p class="text-sm font-medium mb-2">Pick a pool</p>
        <div class="flex flex-wrap gap-2">
          @for (preset of presets; track preset.label) {
            <button
              hlmBtn
              [variant]="activePreset() === preset.label ? 'default' : 'outline'"
              size="sm"
              (click)="loadPreset(preset)">
              {{ preset.label }}
            </button>
          }
        </div>
      </div>

      @if (pool().length > 0) {
        <!-- N control -->
        <div class="flex items-center gap-4">
          <p class="text-sm font-medium">Pick:</p>
          <div class="flex items-center gap-1">
            @for (opt of nOptions(); track opt) {
              <button
                hlmBtn
                [variant]="n() === opt ? 'default' : 'outline'"
                size="sm"
                class="w-10 text-xs"
                (click)="setN(opt)">
                {{ opt }}
              </button>
            }
          </div>
          <span class="text-xs text-muted-foreground">of {{ pool().length }}</span>
        </div>

        <!-- Pool -->
        <div>
          <p class="text-sm font-medium mb-3">Pool</p>
          <div class="flex flex-wrap gap-2">
            @for (item of pool(); track $index) {
              <div class="rounded-lg border border-border bg-card px-3 py-2 text-sm font-mono transition-all"
                [class.border-primary/50]="isSelected(item)"
                [class.bg-primary/10]="isSelected(item)"
                [class.text-primary]="isSelected(item)"
                [class.font-bold]="isSelected(item)">
                {{ item }}
              </div>
            }
          </div>
        </div>

        <!-- Draw button -->
        <div class="flex justify-center">
          <button
            hlmBtn
            size="lg"
            class="gap-2 shadow-lg shadow-primary/20"
            (click)="draw()">
            Draw {{ n() }} random
          </button>
        </div>

        <!-- Result -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <p class="text-sm font-medium">
              Result
              @if (drawCount() > 0) {
                <span class="text-muted-foreground">(draw #{{ drawCount() }})</span>
              }
            </p>
          </div>

          @if (results().length > 0) {
            <div class="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
              <div class="flex flex-wrap gap-2">
                @for (item of results(); track $index) {
                  <span class="inline-flex items-center rounded-lg border border-green-500/30 bg-card px-3 py-1.5 text-sm font-mono font-bold pop"
                    [style.animation-delay.ms]="$index * 80">
                    {{ item }}
                  </span>
                }
              </div>
            </div>
          } @else {
            <div class="rounded-lg border-2 border-dashed border-border p-6 text-center text-muted-foreground text-sm">
              Hit the button to draw
            </div>
          }
        </div>

        <!-- History -->
        @if (history().length > 0) {
          <div>
            <p class="text-sm font-medium mb-2">
              History
              <span class="text-muted-foreground">(last {{ history().length }})</span>
            </p>
            <div class="space-y-1.5 max-h-32 overflow-y-auto">
              @for (entry of history(); track $index) {
                <div class="rounded-md bg-muted/50 px-3 py-1.5 font-mono text-xs text-muted-foreground truncate">
                  #{{ history().length - $index }}: {{ entry }}
                </div>
              }
            </div>
          </div>
        }

        <!-- Pipe output -->
        <div class="rounded-md bg-muted p-4 border border-border">
          <div class="text-xs text-muted-foreground mb-1 font-mono">
            pool | sample{{ n() === 1 ? '' : ':' + n() }}
          </div>
          <code class="text-sm font-mono break-all">{{ pool() | sample:n() | json }}</code>
        </div>
      } @else {
        <div class="rounded-lg border-2 border-dashed border-border p-8 text-center text-muted-foreground text-sm">
          Pick a pool above to get started
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SamplePlayground {
  pool = signal<string[]>([]);
  n = signal(1);
  activePreset = signal('');
  results = signal<string[]>([]);
  drawCount = signal(0);
  history = signal<string[]>([]);

  presets = [
    { label: 'Team', items: ['Alice', 'Bob', 'Carol', 'Dave', 'Emma', 'Frank', 'Grace', 'Henry'] },
    { label: 'Prizes', items: ['iPhone', 'AirPods', 'Gift Card', 'T-Shirt', 'Stickers', 'Mug', 'Hoodie', 'Backpack'] },
    { label: 'Topics', items: ['Angular', 'React', 'Vue', 'Svelte', 'Solid', 'Qwik', 'Astro', 'Next.js', 'Nuxt', 'Remix'] },
    { label: 'Colors', items: ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Pink', 'Cyan', 'Indigo', 'Teal', 'Amber', 'Lime'] },
  ];

  nOptions = computed(() => {
    const len = this.pool().length;
    const options = [];
    for (let i = 1; i <= Math.min(len, 6); i++) {
      options.push(i);
    }
    return options;
  });

  isSelected(item: string): boolean {
    return this.results().includes(item);
  }

  loadPreset(preset: typeof this.presets[0]) {
    this.activePreset.set(preset.label);
    this.pool.set([...preset.items]);
    this.n.set(1);
    this.results.set([]);
    this.drawCount.set(0);
    this.history.set([]);
  }

  setN(value: number) {
    this.n.set(value);
  }

  draw() {
    const arr = [...this.pool()];
    const count = Math.min(this.n(), arr.length);

    for (let i = arr.length - 1; i > arr.length - 1 - count; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    const picked = arr.slice(arr.length - count);
    this.results.set(picked);
    this.drawCount.update(c => c + 1);
    this.history.update(h => [picked.join(', '), ...h].slice(0, 5));
  }
}
