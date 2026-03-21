import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { TruthifyPipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';

@Component({
  selector: 'app-truthify-playground',
  standalone: true,
  imports: [HlmButtonImports, HlmInputImports, TruthifyPipe, JsonPipe],
  template: `
    <style>
      @keyframes fade-in {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
      }
      .fade-in { animation: fade-in 250ms ease-out both; }
    </style>

    <div class="flex flex-col gap-6 p-5">

      <!-- Presets -->
      <div>
        <p class="text-sm font-medium mb-2">Scenarios</p>
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

      <!-- Add custom value -->
      <div class="flex gap-2">
        <select
          class="rounded-md border border-border bg-background px-3 py-2 text-sm flex-1"
          (change)="onTypeChange($event)">
          <option value="string">Add string</option>
          <option value="number">Add number</option>
          <option value="empty">Add empty string</option>
          <option value="null">Add null</option>
          <option value="undefined">Add undefined</option>
          <option value="false">Add false</option>
          <option value="zero">Add 0</option>
          <option value="NaN">Add NaN</option>
        </select>
        @if (addType() === 'string' || addType() === 'number') {
          <input
            hlmInput
            type="text"
            class="w-32"
            placeholder="Value"
            [value]="inputValue()"
            (input)="onInput($event)"
            (keydown.enter)="addItem()"
          />
        }
        <button hlmBtn size="sm" (click)="addItem()">Add</button>
        <button hlmBtn variant="destructive" size="sm" (click)="clearAll()" [disabled]="items().length === 0">Clear</button>
      </div>

      <!-- Input array -->
      @if (items().length > 0) {
        <div>
          <div class="flex items-center justify-between mb-2">
            <p class="text-sm font-medium">
              Input
              <span class="text-muted-foreground">({{ items().length }} items)</span>
            </p>
          </div>
          <div class="flex flex-wrap gap-2">
            @for (item of items(); track $index) {
              <button
                hlmBtn
                variant="outline"
                size="sm"
                class="relative group font-mono text-xs"
                [class.border-red-500/30]="isFalsy(item.value)"
                [class.bg-red-500/5]="isFalsy(item.value)"
                [class.text-red-500]="isFalsy(item.value)"
                [class.border-green-500/30]="!isFalsy(item.value)"
                [class.bg-green-500/5]="!isFalsy(item.value)"
                [class.text-green-500]="!isFalsy(item.value)"
                (click)="removeItem($index)">
                {{ item.display }}
                <span class="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">x</span>
              </button>
            }
          </div>
          <div class="flex gap-4 mt-2 text-xs text-muted-foreground">
            <span class="flex items-center gap-1">
              <span class="h-2 w-2 rounded-full bg-green-500/50"></span>
              Truthy
            </span>
            <span class="flex items-center gap-1">
              <span class="h-2 w-2 rounded-full bg-red-500/50"></span>
              Falsy (will be removed)
            </span>
          </div>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-3 gap-3">
          <div class="rounded-lg border border-border bg-muted/30 p-3 text-center">
            <div class="text-2xl font-bold text-foreground">{{ items().length }}</div>
            <div class="text-xs text-muted-foreground">Total</div>
          </div>
          <div class="rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-center">
            <div class="text-2xl font-bold text-red-500">{{ falsyCount() }}</div>
            <div class="text-xs text-muted-foreground">Falsy</div>
          </div>
          <div class="rounded-lg border border-green-500/20 bg-green-500/5 p-3 text-center">
            <div class="text-2xl font-bold text-green-500">{{ truthyCount() }}</div>
            <div class="text-xs text-muted-foreground">Truthy</div>
          </div>
        </div>

        <!-- Output -->
        <div>
          <p class="text-sm font-medium mb-2">
            Output
            <span class="text-muted-foreground">(after truthify)</span>
          </p>
          @if (truthyCount() > 0) {
            <div class="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
              <div class="flex flex-wrap gap-2">
                @for (item of rawValues() | truthify; track $index) {
                  <span class="inline-flex items-center rounded-md border border-green-500/30 bg-card px-2.5 py-1 text-sm font-mono fade-in"
                    [style.animation-delay.ms]="$index * 60">
                    {{ displayValue(item) }}
                  </span>
                }
              </div>
            </div>
          } @else {
            <div class="rounded-lg border-2 border-dashed border-border p-6 text-center text-muted-foreground text-sm">
              All values are falsy — output is empty
            </div>
          }
        </div>

        <!-- Pipe output -->
        <div class="rounded-md bg-muted p-4 border border-border">
          <div class="text-xs text-muted-foreground mb-1 font-mono">data | truthify</div>
          <code class="text-sm font-mono break-all">{{ rawValues() | truthify | json }}</code>
        </div>
      } @else {
        <div class="rounded-lg border-2 border-dashed border-border p-8 text-center text-muted-foreground text-sm">
          Pick a scenario or add values to get started
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TruthifyPlayground {
  items = signal<{ value: unknown; display: string }[]>([]);
  activePreset = signal('');
  addType = signal('string');
  inputValue = signal('');

  presets = [
    {
      label: 'Mixed Bag',
      items: [
        { value: 1, display: '1' },
        { value: '', display: '""' },
        { value: 'hello', display: '"hello"' },
        { value: null, display: 'null' },
        { value: 0, display: '0' },
        { value: true, display: 'true' },
        { value: false, display: 'false' },
        { value: undefined, display: 'undefined' },
      ],
    },
    {
      label: 'Form Fields',
      items: [
        { value: 'John', display: '"John"' },
        { value: '', display: '""' },
        { value: 'john@mail.com', display: '"john@mail.com"' },
        { value: '', display: '""' },
        { value: null, display: 'null' },
        { value: '555-0100', display: '"555-0100"' },
        { value: undefined, display: 'undefined' },
      ],
    },
    {
      label: 'CSV Import',
      items: [
        { value: 'Alice', display: '"Alice"' },
        { value: '', display: '""' },
        { value: '', display: '""' },
        { value: 'Bob', display: '"Bob"' },
        { value: '', display: '""' },
        { value: 'Carol', display: '"Carol"' },
        { value: '', display: '""' },
        { value: '', display: '""' },
        { value: 'Dave', display: '"Dave"' },
      ],
    },
    {
      label: 'API Response',
      items: [
        { value: { id: 1 }, display: '{id:1}' },
        { value: null, display: 'null' },
        { value: { id: 2 }, display: '{id:2}' },
        { value: undefined, display: 'undefined' },
        { value: null, display: 'null' },
        { value: { id: 3 }, display: '{id:3}' },
      ],
    },
    {
      label: 'All Falsy',
      items: [
        { value: 0, display: '0' },
        { value: '', display: '""' },
        { value: null, display: 'null' },
        { value: undefined, display: 'undefined' },
        { value: false, display: 'false' },
        { value: NaN, display: 'NaN' },
      ],
    },
  ];

  rawValues = computed(() => this.items().map(i => i.value));

  falsyCount = computed(() => this.items().filter(i => !i.value).length);

  truthyCount = computed(() => this.items().filter(i => Boolean(i.value)).length);

  isFalsy(value: unknown): boolean {
    return !Boolean(value);
  }

  displayValue(value: unknown): string {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (typeof value === 'string') return `"${value}"`;
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  }

  loadPreset(preset: typeof this.presets[0]) {
    this.activePreset.set(preset.label);
    this.items.set([...preset.items]);
  }

  onTypeChange(event: Event) {
    this.addType.set((event.target as HTMLSelectElement).value);
  }

  onInput(event: Event) {
    this.inputValue.set((event.target as HTMLInputElement).value);
  }

  addItem() {
    const type = this.addType();
    let item: { value: unknown; display: string };

    switch (type) {
      case 'string':
        item = { value: this.inputValue(), display: `"${this.inputValue()}"` };
        break;
      case 'number':
        item = { value: Number(this.inputValue()), display: this.inputValue() || '0' };
        break;
      case 'empty':
        item = { value: '', display: '""' };
        break;
      case 'null':
        item = { value: null, display: 'null' };
        break;
      case 'undefined':
        item = { value: undefined, display: 'undefined' };
        break;
      case 'false':
        item = { value: false, display: 'false' };
        break;
      case 'zero':
        item = { value: 0, display: '0' };
        break;
      case 'NaN':
        item = { value: NaN, display: 'NaN' };
        break;
      default:
        return;
    }

    this.items.update(arr => [...arr, item]);
    this.inputValue.set('');
  }

  removeItem(index: number) {
    this.items.update(arr => arr.filter((_, i) => i !== index));
  }

  clearAll() {
    this.items.set([]);
    this.activePreset.set('');
  }
}