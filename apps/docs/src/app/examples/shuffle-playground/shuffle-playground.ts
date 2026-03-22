import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { ShufflePipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';

interface Card {
  label: string;
  color: string;
}

@Component({
  selector: 'app-shuffle-playground',
  standalone: true,
  imports: [HlmButtonImports, ShufflePipe],
  template: `
    <style>
      @keyframes card-pop {
        0% { transform: scale(1); }
        30% { transform: scale(1.08) rotate(2deg); }
        60% { transform: scale(0.95) rotate(-1deg); }
        100% { transform: scale(1) rotate(0); }
      }
      .card-pop { animation: card-pop 400ms ease-out; }
    </style>

    <div class="flex flex-col gap-6 p-5">

      <!-- Scenario picker -->
      <div>
        <p class="text-sm font-medium mb-2">Pick a deck</p>
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
        <!-- Stats -->
        <div class="grid grid-cols-3 gap-3">
          <div class="rounded-lg border border-border bg-muted/30 p-3 text-center">
            <div class="text-2xl font-bold text-foreground">{{ items().length }}</div>
            <div class="text-xs text-muted-foreground">Items</div>
          </div>
          <div class="rounded-lg border border-primary/20 bg-primary/5 p-3 text-center">
            <div class="text-2xl font-bold text-primary">{{ shuffleCount() }}</div>
            <div class="text-xs text-muted-foreground">Shuffles</div>
          </div>
          <div class="rounded-lg border border-border bg-muted/30 p-3 text-center">
            <div class="text-2xl font-bold text-foreground">{{ possiblePermutations() }}</div>
            <div class="text-xs text-muted-foreground">Permutations</div>
          </div>
        </div>

        <!-- Shuffle button -->
        <div class="flex justify-center">
          <button
            hlmBtn
            size="lg"
            class="gap-2 shadow-lg shadow-primary/20"
            (click)="doShuffle()">
            Shuffle!
          </button>
        </div>

        <!-- Cards display -->
        <div>
          <p class="text-sm font-medium mb-3">Current order</p>
          <div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
            @for (card of displayCards(); track card.label + $index) {
              <div
                class="rounded-lg border border-border p-2 text-center text-sm font-medium transition-all"
                [class.card-pop]="animating()"
                [style.background-color]="card.color + '15'"
                [style.border-color]="card.color + '40'"
                [style.color]="card.color"
                [style.animation-delay.ms]="$index * 30">
                {{ card.label }}
              </div>
            }
          </div>
        </div>

        <!-- History -->
        @if (history().length > 0) {
          <div>
            <p class="text-sm font-medium mb-2">
              Shuffle history
              <span class="text-muted-foreground">(last {{ history().length }})</span>
            </p>
            <div class="space-y-2 max-h-40 overflow-y-auto">
              @for (entry of history(); track $index) {
                <div class="rounded-md bg-muted/50 px-3 py-2 font-mono text-xs text-muted-foreground truncate">
                  #{{ history().length - $index }}: {{ entry }}
                </div>
              }
            </div>
          </div>
        }

        <!-- Pipe output -->
        <div class="rounded-md bg-muted p-4 border border-border">
          <div class="text-xs text-muted-foreground mb-1 font-mono">items | shuffle</div>
          <code class="text-sm font-mono break-all text-foreground">
            [{{ labelsOnly() | shuffle }}]
          </code>
        </div>
      } @else {
        <div class="rounded-lg border-2 border-dashed border-border p-8 text-center text-muted-foreground text-sm">
          Pick a deck above to get started
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShufflePlayground {
  items = signal<Card[]>([]);
  activePreset = signal('');
  shuffleCount = signal(0);
  animating = signal(false);
  history = signal<string[]>([]);

  // Expose labels for the pipe to shuffle in the template
  labelsOnly = computed(() => this.items().map(c => c.label));

  displayCards = signal<Card[]>([]);

  presets = [
    {
      label: 'Playing Cards',
      items: [
        { label: 'A\u2660', color: '#1a1a2e' }, { label: 'K\u2665', color: '#e74c3c' },
        { label: 'Q\u2666', color: '#e67e22' }, { label: 'J\u2663', color: '#1a1a2e' },
        { label: '10\u2660', color: '#1a1a2e' }, { label: '9\u2665', color: '#e74c3c' },
        { label: '8\u2666', color: '#e67e22' }, { label: '7\u2663', color: '#1a1a2e' },
      ],
    },
    {
      label: 'Team Members',
      items: [
        { label: 'Alice', color: '#8b5cf6' }, { label: 'Bob', color: '#3b82f6' },
        { label: 'Carol', color: '#10b981' }, { label: 'Dave', color: '#f59e0b' },
        { label: 'Emma', color: '#ef4444' }, { label: 'Frank', color: '#6366f1' },
        { label: 'Grace', color: '#ec4899' }, { label: 'Henry', color: '#14b8a6' },
      ],
    },
    {
      label: 'Quiz Questions',
      items: [
        { label: 'Q1', color: '#8b5cf6' }, { label: 'Q2', color: '#3b82f6' },
        { label: 'Q3', color: '#10b981' }, { label: 'Q4', color: '#f59e0b' },
        { label: 'Q5', color: '#ef4444' }, { label: 'Q6', color: '#6366f1' },
        { label: 'Q7', color: '#ec4899' }, { label: 'Q8', color: '#14b8a6' },
        { label: 'Q9', color: '#f97316' }, { label: 'Q10', color: '#a855f7' },
      ],
    },
    {
      label: 'Playlist',
      items: [
        { label: 'Track 1', color: '#1db954' }, { label: 'Track 2', color: '#1db954' },
        { label: 'Track 3', color: '#1db954' }, { label: 'Track 4', color: '#1db954' },
        { label: 'Track 5', color: '#1db954' }, { label: 'Track 6', color: '#1db954' },
        { label: 'Track 7', color: '#1db954' }, { label: 'Track 8', color: '#1db954' },
      ],
    },
  ];

  possiblePermutations = computed(() => {
    const n = this.items().length;
    if (n <= 1) return '1';
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result > 999999 ? `${(result / 1000000).toFixed(1)}M` : result.toLocaleString();
  });

  loadPreset(preset: typeof this.presets[0]) {
    this.activePreset.set(preset.label);
    this.items.set([...preset.items]);
    this.displayCards.set([...preset.items]);
    this.shuffleCount.set(0);
    this.history.set([]);
  }

  doShuffle() {
    const cards = this.items();
    // Fisher-Yates in component to update display
    const arr = [...cards];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    this.items.set(arr);
    this.displayCards.set(arr);
    this.shuffleCount.update(n => n + 1);
    this.history.update(h => [arr.map(c => c.label).join(', '), ...h].slice(0, 5));

    // Trigger animation
    this.animating.set(true);
    setTimeout(() => this.animating.set(false), 450);
  }
}
