import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { ReversePipe } from '@ngx-transforms';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-reverse-array',
  standalone: true,
  imports: [HlmInputImports, HlmButtonImports, ReversePipe, JsonPipe],
  template: `
    <style>
      @keyframes card-enter {
        from { opacity: 0; transform: scale(0.8) translateY(10px); }
        to { opacity: 1; transform: scale(1) translateY(0); }
      }
      @keyframes swap-left {
        0% { transform: translateX(0); }
        50% { transform: translateX(-20px) translateY(-30px) scale(1.1); }
        100% { transform: translateX(0); }
      }
      @keyframes swap-right {
        0% { transform: translateX(0); }
        50% { transform: translateX(20px) translateY(-30px) scale(1.1); }
        100% { transform: translateX(0); }
      }
      .card-enter { animation: card-enter 300ms ease-out both; }
      .is-reversing .swap-left { animation: swap-left 500ms ease-in-out; }
      .is-reversing .swap-right { animation: swap-right 500ms ease-in-out; }
    </style>

    <div class="flex flex-col gap-6 p-4">
      <!-- Presets -->
      <div>
        <p class="text-sm font-medium mb-2">Quick presets</p>
        <div class="flex flex-wrap gap-2">
          @for (preset of presets; track preset.label) {
            <button
              hlmBtn
              variant="outline"
              size="sm"
              (click)="loadPreset(preset.items)">
              {{ preset.label }}
            </button>
          }
        </div>
      </div>

      <!-- Add item -->
      <div class="flex gap-2">
        <input
          hlmInput
          type="text"
          class="flex-1"
          placeholder="Type an item and press Enter or Add"
          [value]="inputValue()"
          (input)="onInput($event)"
          (keydown.enter)="addItem()"
        />
        <button hlmBtn size="sm" (click)="addItem()" [disabled]="!inputValue()">Add</button>
        <button hlmBtn variant="destructive" size="sm" (click)="clearAll()" [disabled]="items().length === 0">Clear</button>
      </div>

      <!-- Array display -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <p class="text-sm font-medium">
            {{ isReversed() ? 'Reversed' : 'Original' }}
            <span class="text-muted-foreground">({{ items().length }} items)</span>
          </p>
          <button
            hlmBtn
            size="sm"
            [disabled]="items().length < 2"
            (click)="reverseItems()">
            {{ isReversed() ? 'Reset' : 'Reverse!' }}
          </button>
        </div>

        @if (items().length === 0) {
          <div class="rounded-lg border-2 border-dashed border-border p-8 text-center text-muted-foreground text-sm">
            Add items above or pick a preset to get started
          </div>
        } @else {
          <div
            class="flex flex-wrap gap-2"
            [class.is-reversing]="animating()">
            @for (item of displayItems(); track trackItem($index, item)) {
              <button
                hlmBtn
                variant="outline"
                class="card-enter relative group"
                (click)="removeItem($index)">
                <span class="text-base">{{ item }}</span>
                <span class="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">x</span>
              </button>
            }
          </div>
        }
      </div>

      <!-- Output preview -->
      @if (items().length > 0) {
        <div class="rounded-md bg-muted p-4 border border-border">
          <div class="text-xs text-muted-foreground mb-1">Pipe output</div>
          <code class="text-sm font-mono break-all">{{ items() | reverse | json }}</code>
        </div>
      }

      <!-- Score -->
      <div class="flex items-center gap-4 text-sm text-muted-foreground">
        <span>Reversals: {{ reversalCount() }}</span>
        <span>Items added: {{ addedCount() }}</span>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReverseArray {
  inputValue = signal('');
  items = signal<string[]>([]);
  isReversed = signal(false);
  animating = signal(false);
  reversalCount = signal(0);
  addedCount = signal(0);

  displayItems = computed(() => {
    const arr = this.items();
    return this.isReversed() ? [...arr].reverse() : arr;
  });

  presets = [
    { label: 'Numbers', items: ['1', '2', '3', '4', '5'] },
    { label: 'Emojis', items: ['🚀', '🔥', '💎', '⚡', '🎯', '🌈'] },
    { label: 'Colors', items: ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple'] },
    { label: 'Days', items: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
    { label: 'Stack', items: ['Angular', 'TypeScript', 'RxJS', 'NgRx', 'Tailwind'] },
  ];

  trackItem(index: number, item: string) {
    return `${index}-${item}-${this.isReversed()}`;
  }

  onInput(event: Event) {
    this.inputValue.set((event.target as HTMLInputElement).value);
  }

  addItem() {
    const val = this.inputValue().trim();
    if (!val) return;
    this.items.update(arr => [...arr, val]);
    this.inputValue.set('');
    this.addedCount.update(n => n + 1);
    this.isReversed.set(false);
  }

  removeItem(index: number) {
    const actualIndex = this.isReversed()
      ? this.items().length - 1 - index
      : index;
    this.items.update(arr => arr.filter((_, i) => i !== actualIndex));
  }

  clearAll() {
    this.items.set([]);
    this.isReversed.set(false);
  }

  loadPreset(preset: string[]) {
    this.items.set([...preset]);
    this.isReversed.set(false);
  }

  reverseItems() {
    this.animating.set(true);
    setTimeout(() => {
      this.isReversed.update(v => !v);
      this.reversalCount.update(n => n + 1);
      this.animating.set(false);
    }, 300);
  }
}