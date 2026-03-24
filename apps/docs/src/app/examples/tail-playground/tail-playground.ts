import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { TailPipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-tail-playground',
  standalone: true,
  imports: [HlmButtonImports, TailPipe, JsonPipe],
  template: `
    <style>
      @keyframes slide-right {
        from { opacity: 0; transform: translateX(-12px); }
        to { opacity: 1; transform: translateX(0); }
      }
      .slide-right { animation: slide-right 250ms ease-out both; }
    </style>

    <div class="flex flex-col gap-6 p-5">

      <!-- Scenario picker -->
      <div>
        <p class="text-sm font-medium mb-2">Pick a scenario</p>
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
          <p class="text-sm font-medium">Skip first:</p>
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
          <div class="flex items-center justify-between mb-3">
            <p class="text-sm font-medium">
              {{ activePreset() }}
              <span class="text-muted-foreground">({{ items().length }} items)</span>
            </p>
            <div class="text-xs text-muted-foreground">
              Skipping {{ n() }}, keeping {{ keepCount() }}
            </div>
          </div>

          <!-- Timeline view -->
          <div class="relative">
            <!-- Progress bar -->
            <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-border"></div>

            <div class="space-y-2">
              @for (item of items(); track $index) {
                <div class="flex items-center gap-3 relative"
                  [class.opacity-40]="$index < n()"
                  [class.line-through]="$index < n()">

                  <!-- Dot -->
                  <div class="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold border-2 transition-all duration-200"
                    [class.border-red-500]="$index < n()"
                    [class.bg-red-500/10]="$index < n()"
                    [class.text-red-500]="$index < n()"
                    [class.border-primary]="$index >= n()"
                    [class.bg-primary/10]="$index >= n()"
                    [class.text-primary]="$index >= n()">
                    {{ $index + 1 }}
                  </div>

                  <!-- Content -->
                  <div class="flex-1 rounded-lg border p-3 transition-all duration-200"
                    [class.border-red-500/20]="$index < n()"
                    [class.bg-red-500/5]="$index < n()"
                    [class.border-border]="$index >= n()">
                    <span class="text-sm font-medium">{{ item }}</span>
                  </div>

                  <!-- Skip badge -->
                  @if ($index < n()) {
                    <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-red-500/10 text-red-500 font-medium shrink-0">skipped</span>
                  }
                </div>
              }
            </div>
          </div>

          <div class="flex gap-4 mt-3 text-xs text-muted-foreground">
            <span class="flex items-center gap-1">
              <span class="h-2 w-2 rounded-full bg-red-500/50"></span>
              Skipped ({{ n() }})
            </span>
            <span class="flex items-center gap-1">
              <span class="h-2 w-2 rounded-full bg-primary/50"></span>
              Kept ({{ keepCount() }})
            </span>
          </div>
        </div>

        <!-- Output -->
        <div>
          <p class="text-sm font-medium mb-2">Output</p>
          @if ((items() | tail:n()).length > 0) {
            <div class="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
              <div class="flex flex-wrap gap-2">
                @for (item of items() | tail:n(); track $index) {
                  <span class="inline-flex items-center rounded-md border border-green-500/30 bg-card px-2.5 py-1 text-sm font-mono slide-right"
                    [style.animation-delay.ms]="$index * 60">
                    {{ item }}
                  </span>
                }
              </div>
            </div>
          } @else {
            <div class="rounded-lg border-2 border-dashed border-border p-6 text-center text-muted-foreground text-sm">
              All items skipped
            </div>
          }
        </div>

        <!-- Pipe output -->
        <div class="rounded-md bg-muted p-4 border border-border">
          <div class="text-xs text-muted-foreground mb-1 font-mono">
            items | tail{{ n() === 1 ? '' : ':' + n() }}
          </div>
          <code class="text-sm font-mono break-all">{{ items() | tail:n() | json }}</code>
        </div>
      } @else {
        <div class="rounded-lg border-2 border-dashed border-border p-8 text-center text-muted-foreground text-sm">
          Pick a scenario above to get started
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TailPlayground {
  items = signal<string[]>([]);
  n = signal(1);
  activePreset = signal('');

  presets = [
    { label: 'Notifications', items: ['Welcome email sent', 'Profile updated', 'First login', 'Password changed', 'New follower', 'Post published'] },
    { label: 'Git Log', items: ['fix: typo in readme', 'feat: add auth', 'refactor: cleanup', 'fix: login bug', 'chore: deps update', 'feat: dashboard'] },
    { label: 'Pagination', items: ['Page 1', 'Page 2', 'Page 3', 'Page 4', 'Page 5', 'Page 6', 'Page 7', 'Page 8'] },
    { label: 'Chat Messages', items: ['Hey!', 'How are you?', 'Good, you?', 'Working on a project', 'Sounds cool!', 'Want to see?', 'Sure!'] },
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