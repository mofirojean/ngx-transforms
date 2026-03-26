import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { ChunkPipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-chunk-playground',
  standalone: true,
  imports: [HlmButtonImports, ChunkPipe, JsonPipe],
  template: `
    <style>
      @keyframes slide-in {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .slide-in { animation: slide-in 250ms ease-out both; }
    </style>

    <div class="flex flex-col gap-6 p-5">

      <!-- Preset picker -->
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
        <!-- Size control -->
        <div class="flex items-center gap-4">
          <p class="text-sm font-medium">Chunk size:</p>
          <div class="flex items-center gap-1">
            @for (opt of sizeOptions(); track opt) {
              <button
                hlmBtn
                [variant]="size() === opt ? 'default' : 'outline'"
                size="sm"
                class="w-10 text-xs"
                (click)="setSize(opt)">
                {{ opt }}
              </button>
            }
          </div>
          <span class="text-xs text-muted-foreground">{{ chunkCount() }} chunks</span>
        </div>

        <!-- Flat input -->
        <div>
          <p class="text-sm font-medium mb-2">
            Input
            <span class="text-muted-foreground">({{ items().length }} items)</span>
          </p>
          <div class="flex flex-wrap gap-1.5">
            @for (item of items(); track $index) {
              <span class="rounded-md border border-border bg-card px-2 py-1 text-xs font-mono">{{ item }}</span>
            }
          </div>
        </div>

        <!-- Chunked output -->
        <div>
          <p class="text-sm font-medium mb-2">
            Output
            <span class="text-muted-foreground">({{ chunkCount() }} chunks of {{ size() }})</span>
          </p>
          <div class="space-y-2">
            @for (chunk of items() | chunk:size(); track $index; let chunkIdx = $index) {
              <div class="rounded-lg border p-3 slide-in"
                [style.animation-delay.ms]="$index * 80"
                [style.border-color]="chunkColors[$index % chunkColors.length] + '40'"
                [style.background-color]="chunkColors[$index % chunkColors.length] + '08'">
                <div class="flex items-center gap-2">
                  <span class="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                    [style.background-color]="chunkColors[$index % chunkColors.length] + '20'"
                    [style.color]="chunkColors[$index % chunkColors.length]">
                    {{ $index + 1 }}
                  </span>
                  <div class="flex flex-wrap gap-1.5">
                    @for (item of $any(chunk); track $index) {
                      <span class="rounded-md border bg-card px-2.5 py-1 text-sm font-mono"
                        [style.border-color]="chunkColors[chunkIdx % chunkColors.length] + '30'">
                        {{ item }}
                      </span>
                    }
                  </div>
                  <span class="ml-auto text-xs text-muted-foreground">{{ $any(chunk).length }} items</span>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Pipe output -->
        <div class="rounded-md bg-muted p-4 border border-border">
          <div class="text-xs text-muted-foreground mb-1 font-mono">
            items | chunk:{{ size() }}
          </div>
          <code class="text-sm font-mono break-all">{{ items() | chunk:size() | json }}</code>
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
export class ChunkPlayground {
  items = signal<string[]>([]);
  size = signal(2);
  activePreset = signal('');

  chunkColors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#14b8a6', '#6366f1'];

  presets = [
    { label: 'Products', items: ['Laptop', 'Phone', 'Tablet', 'Watch', 'Headphones', 'Speaker', 'Camera', 'Monitor', 'Keyboard', 'Mouse', 'Charger', 'Case'] },
    { label: 'Students', items: ['Alice', 'Bob', 'Carol', 'Dave', 'Emma', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack'] },
    { label: 'Tasks', items: ['Design', 'Build', 'Test', 'Review', 'Deploy', 'Monitor', 'Fix', 'Document', 'Release'] },
    { label: 'Alphabet', items: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('') },
  ];

  chunkCount = computed(() => {
    const len = this.items().length;
    const s = this.size();
    if (s <= 0 || len === 0) return 0;
    return Math.ceil(len / s);
  });

  sizeOptions = computed(() => {
    const len = this.items().length;
    const options = [];
    for (let i = 1; i <= Math.min(len, 8); i++) {
      options.push(i);
    }
    return options;
  });

  loadPreset(preset: typeof this.presets[0]) {
    this.activePreset.set(preset.label);
    this.items.set([...preset.items]);
    this.size.set(2);
  }

  setSize(value: number) {
    this.size.set(value);
  }
}
