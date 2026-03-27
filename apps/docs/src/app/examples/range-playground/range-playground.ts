import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { RangePipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-range-playground',
  standalone: true,
  imports: [HlmButtonImports, RangePipe, JsonPipe],
  template: `
    <style>
      @keyframes pop-in {
        from { opacity: 0; transform: scale(0.8); }
        to { opacity: 1; transform: scale(1); }
      }
      .pop-in { animation: pop-in 200ms ease-out both; }
    </style>

    <div class="flex flex-col gap-6 p-5">

      <!-- Presets -->
      <div>
        <p class="text-sm font-medium mb-2">Quick presets</p>
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

      <!-- Controls -->
      <div class="grid grid-cols-3 gap-4">
        <div>
          <p class="text-sm font-medium mb-2">Count</p>
          <div class="flex items-center gap-2">
            <button hlmBtn variant="outline" size="sm" class="w-8 h-8 p-0" (click)="adjustCount(-1)" [disabled]="count() <= 1">-</button>
            <span class="text-lg font-bold w-8 text-center">{{ count() }}</span>
            <button hlmBtn variant="outline" size="sm" class="w-8 h-8 p-0" (click)="adjustCount(1)" [disabled]="count() >= 20">+</button>
          </div>
        </div>
        <div>
          <p class="text-sm font-medium mb-2">Start</p>
          <div class="flex items-center gap-2">
            <button hlmBtn variant="outline" size="sm" class="w-8 h-8 p-0" (click)="adjustStart(-1)">-</button>
            <span class="text-lg font-bold w-8 text-center">{{ start() }}</span>
            <button hlmBtn variant="outline" size="sm" class="w-8 h-8 p-0" (click)="adjustStart(1)">+</button>
          </div>
        </div>
        <div>
          <p class="text-sm font-medium mb-2">Step</p>
          <div class="flex items-center gap-2">
            <button hlmBtn variant="outline" size="sm" class="w-8 h-8 p-0" (click)="adjustStep(-1)" [disabled]="step() <= -5">-</button>
            <span class="text-lg font-bold w-8 text-center">{{ step() }}</span>
            <button hlmBtn variant="outline" size="sm" class="w-8 h-8 p-0" (click)="adjustStep(1)" [disabled]="step() >= 10">+</button>
          </div>
        </div>
      </div>

      <!-- Visual output -->
      <div>
        <p class="text-sm font-medium mb-2">
          Result
          <span class="text-muted-foreground">({{ (count() | range:start():step()).length }} items)</span>
        </p>
        @if ((count() | range:start():step()).length > 0) {
          <div class="flex flex-wrap gap-2">
            @for (num of count() | range:start():step(); track $index) {
              <div class="flex h-10 w-14 items-center justify-center rounded-lg border border-primary/30 bg-primary/5 text-sm font-mono font-bold text-primary pop-in"
                [style.animation-delay.ms]="$index * 40">
                {{ num }}
              </div>
            }
          </div>
        } @else {
          <div class="rounded-lg border-2 border-dashed border-border p-6 text-center text-muted-foreground text-sm">
            Empty range
          </div>
        }
      </div>

      <!-- Use case demos -->
      <div>
        <p class="text-sm font-medium mb-2">Live demos</p>
        <div class="space-y-3">
          <!-- Star rating -->
          <div class="rounded-lg border border-border p-3">
            <div class="text-xs text-muted-foreground mb-2">Star rating (5 | range:1)</div>
            <div class="flex gap-1">
              @for (star of 5 | range:1; track star) {
                <button
                  class="text-2xl transition-colors cursor-pointer"
                  [class.text-yellow-500]="star <= selectedRating()"
                  [class.text-muted-foreground/30]="star > selectedRating()"
                  (click)="selectedRating.set(star)">
                  ★
                </button>
              }
              <span class="ml-2 text-sm text-muted-foreground self-center">{{ selectedRating() }}/5</span>
            </div>
          </div>

          <!-- Skeleton loader -->
          <div class="rounded-lg border border-border p-3">
            <div class="text-xs text-muted-foreground mb-2">Skeleton loader (3 | range)</div>
            <div class="space-y-2">
              @for (i of 3 | range; track i) {
                <div class="flex gap-3 animate-pulse">
                  <div class="h-8 w-8 rounded-full bg-muted"></div>
                  <div class="flex-1 space-y-1.5">
                    <div class="h-3 w-1/3 rounded bg-muted"></div>
                    <div class="h-3 w-2/3 rounded bg-muted"></div>
                  </div>
                </div>
              }
            </div>
          </div>

          <!-- Pagination -->
          <div class="rounded-lg border border-border p-3">
            <div class="text-xs text-muted-foreground mb-2">Pagination (5 | range:1)</div>
            <div class="flex gap-1">
              @for (page of 5 | range:1; track page) {
                <button
                  hlmBtn
                  [variant]="page === selectedPage() ? 'default' : 'outline'"
                  size="sm"
                  class="w-8 h-8 p-0 text-xs"
                  (click)="selectedPage.set(page)">
                  {{ page }}
                </button>
              }
            </div>
          </div>
        </div>
      </div>

      <!-- Pipe output -->
      <div class="rounded-md bg-muted p-4 border border-border">
        <div class="text-xs text-muted-foreground mb-1 font-mono">
          {{ count() }} | range{{ start() === 0 && step() === 1 ? '' : ':' + start() }}{{ step() === 1 ? '' : ':' + step() }}
        </div>
        <code class="text-sm font-mono break-all">{{ count() | range:start():step() | json }}</code>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RangePlayground {
  count = signal(5);
  start = signal(0);
  step = signal(1);
  activePreset = signal('');
  selectedRating = signal(3);
  selectedPage = signal(1);

  presets = [
    { label: '0-4', count: 5, start: 0, step: 1 },
    { label: '1-10', count: 10, start: 1, step: 1 },
    { label: 'Even', count: 5, start: 0, step: 2 },
    { label: 'Odd', count: 5, start: 1, step: 2 },
    { label: 'By 10s', count: 5, start: 10, step: 10 },
    { label: 'Countdown', count: 5, start: 5, step: -1 },
  ];

  loadPreset(preset: typeof this.presets[0]) {
    this.activePreset.set(preset.label);
    this.count.set(preset.count);
    this.start.set(preset.start);
    this.step.set(preset.step);
  }

  adjustCount(delta: number) {
    this.count.update(v => Math.max(0, Math.min(20, v + delta)));
  }

  adjustStart(delta: number) {
    this.start.update(v => v + delta);
  }

  adjustStep(delta: number) {
    this.step.update(v => v + delta);
  }
}
