import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { InitialPipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-initial-playground',
  standalone: true,
  imports: [HlmButtonImports, InitialPipe, JsonPipe],
  template: `
    <style>
      @keyframes fade-in {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
      }
      .fade-in { animation: fade-in 250ms ease-out both; }
    </style>

    <div class="flex flex-col gap-6 p-5">

      <!-- Scenario picker -->
      <div>
        <p class="text-sm font-medium mb-2">Pick a dataset</p>
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

      @if (items().length > 0) {
        <!-- N control -->
        <div class="flex items-center gap-4">
          <p class="text-sm font-medium">Remove last:</p>
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
        </div>

        <!-- Visual -->
        <div>
          <p class="text-sm font-medium mb-3">
            Items
            <span class="text-muted-foreground">({{ items().length }} total)</span>
          </p>
          <div class="flex flex-wrap gap-2">
            @for (item of items(); track $index) {
              <div
                class="rounded-lg border px-3 py-2 text-sm font-mono transition-all duration-200"
                [class.border-border]="$index < keepCount()"
                [class.bg-card]="$index < keepCount()"
                [class.border-red-500/30]="$index >= keepCount()"
                [class.bg-red-500/5]="$index >= keepCount()"
                [class.text-red-500]="$index >= keepCount()"
                [class.line-through]="$index >= keepCount()"
                [class.opacity-50]="$index >= keepCount()">
                {{ item }}
              </div>
            }
          </div>
          <div class="flex gap-4 mt-2 text-xs text-muted-foreground">
            <span class="flex items-center gap-1">
              <span class="h-2 w-2 rounded-full bg-foreground/20"></span>
              Kept ({{ keepCount() }})
            </span>
            <span class="flex items-center gap-1">
              <span class="h-2 w-2 rounded-full bg-red-500/50"></span>
              Removed ({{ n() }})
            </span>
          </div>
        </div>

        <!-- Output -->
        <div>
          <p class="text-sm font-medium mb-2">Output</p>
          @if ((items() | initial:n()).length > 0) {
            <div class="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
              <div class="flex flex-wrap gap-2">
                @for (item of items() | initial:n(); track $index) {
                  <span class="inline-flex items-center rounded-md border border-green-500/30 bg-card px-2.5 py-1 text-sm font-mono fade-in"
                    [style.animation-delay.ms]="$index * 50">
                    {{ item }}
                  </span>
                }
              </div>
            </div>
          } @else {
            <div class="rounded-lg border-2 border-dashed border-border p-6 text-center text-muted-foreground text-sm">
              All items removed
            </div>
          }
        </div>

        <!-- Pipe output -->
        <div class="rounded-md bg-muted p-4 border border-border">
          <div class="text-xs text-muted-foreground mb-1 font-mono">
            items | initial{{ n() === 1 ? '' : ':' + n() }}
          </div>
          <code class="text-sm font-mono break-all">{{ items() | initial:n() | json }}</code>
        </div>
      } @else {
        <div class="rounded-lg border-2 border-dashed border-border p-8 text-center text-muted-foreground text-sm">
          Pick a dataset above to get started
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InitialPlayground {
  items = signal<string[]>([]);
  n = signal(1);
  activePreset = signal('');

  presets = [
    { label: 'Leaderboard', items: ['1st: Alice', '2nd: Bob', '3rd: Carol', '4th: Dave', '5th: Emma', '6th: Frank'] },
    { label: 'Steps', items: ['Sign Up', 'Verify Email', 'Setup Profile', 'Connect Apps', 'Complete'] },
    { label: 'Breadcrumbs', items: ['Home', 'Products', 'Electronics', 'Phones', 'iPhone 15'] },
    { label: 'History', items: ['Mon 9am', 'Mon 2pm', 'Tue 10am', 'Wed 11am', 'Thu 3pm', 'Fri 9am', 'Fri 5pm'] },
  ];

  keepCount = computed(() => Math.max(0, this.items().length - this.n()));

  nOptions = computed(() => {
    const len = this.items().length;
    const options = [];
    for (let i = 0; i <= Math.min(len, 6); i++) {
      options.push(i);
    }
    return options;
  });

  loadPreset(preset: typeof this.presets[0]) {
    this.activePreset.set(preset.label);
    this.items.set([...preset.items]);
    this.n.set(1);
  }

  setN(value: number) {
    this.n.set(value);
  }
}