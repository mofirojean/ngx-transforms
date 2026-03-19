import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { Flatten } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-flatten-playground',
  standalone: true,
  imports: [HlmButtonImports, Flatten, JsonPipe],
  template: `
    <style>
      @keyframes pop-in {
        from { opacity: 0; transform: scale(0.7); }
        to { opacity: 1; transform: scale(1); }
      }
      @keyframes flatten-drop {
        0% { transform: translateY(0); opacity: 1; }
        40% { transform: translateY(-12px); opacity: 0.8; }
        100% { transform: translateY(0); opacity: 1; }
      }
      .pop-in { animation: pop-in 250ms ease-out both; }
      .flatten-anim { animation: flatten-drop 400ms ease-in-out; }
    </style>

    <div class="flex flex-col gap-6 p-5">

      <!-- Presets -->
      <div>
        <p class="text-sm font-medium mb-2">Pick a nested structure</p>
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

      <!-- Depth control -->
      <div class="flex items-center gap-4">
        <p class="text-sm font-medium">Depth:</p>
        <div class="flex items-center gap-1">
          @for (d of depthOptions; track d.value) {
            <button
              hlmBtn
              [variant]="depth() === d.value ? 'default' : 'outline'"
              size="sm"
              class="w-16 text-xs"
              (click)="setDepth(d.value)">
              {{ d.label }}
            </button>
          }
        </div>
      </div>

      <!-- Nested input visualization -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <p class="text-sm font-medium">
            Input
            <span class="text-muted-foreground">({{ nestingDepth() }} levels deep)</span>
          </p>
        </div>
        <div class="rounded-lg border border-border bg-muted/30 p-4 font-mono text-sm overflow-x-auto">
          <div class="flex flex-wrap gap-1.5 items-center">
            @for (token of inputTokens(); track $index) {
              @if (token.type === 'bracket') {
                <span
                  class="font-bold text-base"
                  [class.text-blue-500]="token.depth === 0"
                  [class.text-purple-500]="token.depth === 1"
                  [class.text-pink-500]="token.depth === 2"
                  [class.text-orange-500]="token.depth === 3"
                  [class.text-green-500]="token.depth! >= 4">{{ token.value }}</span>
              } @else {
                <span class="inline-flex items-center rounded-md border border-border bg-card px-2 py-0.5 text-xs pop-in">{{ token.value }}</span>
              }
            }
          </div>
        </div>
      </div>

      <!-- Flatten button -->
      <div class="flex justify-center">
        <button
          hlmBtn
          size="lg"
          class="gap-2 shadow-lg shadow-primary/20"
          [disabled]="data().length === 0"
          (click)="triggerFlatten()">
          {{ animating() ? 'Flattening...' : 'Flatten!' }}
          <span class="text-xs opacity-70">(depth: {{ depth() === Infinity ? 'all' : depth() }})</span>
        </button>
      </div>

      <!-- Output visualization -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <p class="text-sm font-medium">
            Output
            <span class="text-muted-foreground">({{ flatResult().length }} items)</span>
          </p>
        </div>

        @if (flatResult().length === 0) {
          <div class="rounded-lg border-2 border-dashed border-border p-6 text-center text-muted-foreground text-sm">
            Pick a preset and hit Flatten
          </div>
        } @else {
          <div class="rounded-lg border border-primary/20 bg-primary/5 p-4">
            <div class="flex flex-wrap gap-1.5" [class.flatten-anim]="animating()">
              @for (item of flatResult(); track $index) {
                <span class="inline-flex items-center rounded-md border border-primary/30 bg-card px-2.5 py-1 text-sm font-mono pop-in"
                  [style.animation-delay.ms]="$index * 40">
                  {{ item }}
                </span>
              }
            </div>
          </div>
        }
      </div>

      <!-- Pipe output -->
      @if (flatResult().length > 0) {
        <div class="rounded-md bg-muted p-4 border border-border">
          <div class="text-xs text-muted-foreground mb-1">
            <span class="font-mono">data | flatten{{ depth() === Infinity ? '' : ':' + depth() }}</span>
          </div>
          <code class="text-sm font-mono break-all">{{ data() | flatten:depth() | json }}</code>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlattenPlayground {
  data = signal<unknown[]>([]);
  depth = signal<number>(Infinity);
  animating = signal(false);
  activePreset = signal('');

  depthOptions = [
    { label: '0', value: 0 },
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: 'All', value: Infinity },
  ];

  presets = [
    {
      label: 'Simple',
      data: [[1, 2], [3, 4], [5, 6]],
    },
    {
      label: 'Deep Nest',
      data: [1, [2, [3, [4, [5]]]]],
    },
    {
      label: 'Mixed',
      data: [['Angular', 'React'], ['Vue', ['Svelte', 'Solid']], 'Qwik'],
    },
    {
      label: 'File Tree',
      data: [['src', ['app', ['components', 'services']], 'assets'], ['docs', ['api', 'guides']]],
    },
    {
      label: 'Permissions',
      data: [['read', 'write'], ['execute'], ['admin', ['superadmin', 'moderator']]],
    },
  ];

  flatResult = computed(() => {
    const d = this.data();
    if (d.length === 0) return [];
    return (d as any[]).flat(this.depth());
  });

  nestingDepth = computed(() => {
    const measure = (arr: unknown[], level: number): number => {
      let max = level;
      for (const item of arr) {
        if (Array.isArray(item)) {
          max = Math.max(max, measure(item, level + 1));
        }
      }
      return max;
    };
    return this.data().length > 0 ? measure(this.data(), 1) : 0;
  });

  inputTokens = computed(() => {
    const tokens: { type: 'bracket' | 'value'; value: string; depth?: number }[] = [];
    const walk = (arr: unknown[], depth: number) => {
      tokens.push({ type: 'bracket', value: '[', depth });
      arr.forEach((item, i) => {
        if (Array.isArray(item)) {
          walk(item, depth + 1);
        } else {
          tokens.push({ type: 'value', value: String(item) });
        }
        if (i < arr.length - 1 && !Array.isArray(arr[i + 1])) {
          // comma handled by gap
        }
      });
      tokens.push({ type: 'bracket', value: ']', depth });
    };
    if (this.data().length > 0) {
      walk(this.data(), 0);
    }
    return tokens;
  });

  loadPreset(preset: typeof this.presets[0]) {
    this.activePreset.set(preset.label);
    this.data.set(JSON.parse(JSON.stringify(preset.data)));
  }

  setDepth(d: number) {
    this.depth.set(d);
  }

  triggerFlatten() {
    this.animating.set(true);
    setTimeout(() => {
      this.animating.set(false);
    }, 500);
  }

  protected readonly Infinity = Infinity;
}
