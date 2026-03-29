import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { PluckPipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-pluck-playground',
  standalone: true,
  imports: [HlmButtonImports, PluckPipe, JsonPipe],
  template: `
    <style>
      @keyframes fade-in {
        from { opacity: 0; transform: translateY(6px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .fade-in { animation: fade-in 250ms ease-out both; }
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

      @if (data().length > 0) {
        <!-- Key selector -->
        <div>
          <p class="text-sm font-medium mb-2">Extract property</p>
          <div class="flex flex-wrap gap-2">
            @for (k of availableKeys(); track k) {
              <button
                hlmBtn
                [variant]="selectedKey() === k ? 'default' : 'outline'"
                size="sm"
                class="font-mono text-xs"
                (click)="selectKey(k)">
                {{ k }}
              </button>
            }
          </div>
        </div>

        <!-- Source data table -->
        <div>
          <p class="text-sm font-medium mb-2">
            Source
            <span class="text-muted-foreground">({{ data().length }} objects)</span>
          </p>
          <div class="rounded-lg border border-border overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-border bg-muted/50">
                    @for (col of columns(); track col) {
                      <th class="px-3 py-2 text-left font-medium text-xs"
                        [class.bg-primary/10]="col === selectedKey()"
                        [class.text-primary]="col === selectedKey()">
                        {{ col }}
                      </th>
                    }
                  </tr>
                </thead>
                <tbody>
                  @for (row of data(); track $index) {
                    <tr class="border-b border-border last:border-0">
                      @for (col of columns(); track col) {
                        <td class="px-3 py-2 font-mono text-xs"
                          [class.bg-primary/5]="col === selectedKey()"
                          [class.font-bold]="col === selectedKey()"
                          [class.text-primary]="col === selectedKey()">
                          {{ getCellValue(row, col) }}
                        </td>
                      }
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Extracted values -->
        <div>
          <p class="text-sm font-medium mb-2">
            Extracted
            <span class="text-muted-foreground font-mono">(| pluck:'{{ selectedKey() }}')</span>
          </p>
          <div class="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
            <div class="flex flex-wrap gap-2">
              @for (val of data() | pluck:selectedKey(); track $index) {
                <span class="rounded-md border border-green-500/30 bg-card px-2.5 py-1 text-sm font-mono fade-in"
                  [style.animation-delay.ms]="$index * 60">
                  {{ val }}
                </span>
              }
            </div>
          </div>
        </div>

        <!-- Pipe output -->
        <div class="rounded-md bg-muted p-4 border border-border">
          <div class="text-xs text-muted-foreground mb-1 font-mono">
            data | pluck:'{{ selectedKey() }}'
          </div>
          <code class="text-sm font-mono break-all">{{ data() | pluck:selectedKey() | json }}</code>
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
export class PluckPlayground {
  data = signal<Record<string, unknown>[]>([]);
  selectedKey = signal('');
  activePreset = signal('');
  availableKeys = signal<string[]>([]);

  presets = [
    {
      label: 'Team',
      keys: ['name', 'role', 'email'],
      data: [
        { name: 'Alice', role: 'Admin', email: 'alice@team.com' },
        { name: 'Bob', role: 'Editor', email: 'bob@team.com' },
        { name: 'Carol', role: 'Viewer', email: 'carol@team.com' },
        { name: 'Dave', role: 'Editor', email: 'dave@team.com' },
        { name: 'Emma', role: 'Admin', email: 'emma@team.com' },
      ],
    },
    {
      label: 'Products',
      keys: ['name', 'price', 'category'],
      data: [
        { name: 'Laptop', price: 999, category: 'Electronics' },
        { name: 'Shirt', price: 29, category: 'Clothing' },
        { name: 'Book', price: 15, category: 'Education' },
        { name: 'Phone', price: 699, category: 'Electronics' },
        { name: 'Desk', price: 249, category: 'Furniture' },
      ],
    },
    {
      label: 'Orders',
      keys: ['id', 'total', 'status', 'customer.name'],
      data: [
        { id: 'ORD-001', total: 129, status: 'shipped', customer: { name: 'Alice' } },
        { id: 'ORD-002', total: 79, status: 'pending', customer: { name: 'Bob' } },
        { id: 'ORD-003', total: 249, status: 'shipped', customer: { name: 'Carol' } },
        { id: 'ORD-004', total: 59, status: 'cancelled', customer: { name: 'Dave' } },
      ],
    },
    {
      label: 'Repos',
      keys: ['name', 'stars', 'language', 'owner.login'],
      data: [
        { name: 'angular', stars: 96000, language: 'TypeScript', owner: { login: 'angular' } },
        { name: 'react', stars: 225000, language: 'JavaScript', owner: { login: 'facebook' } },
        { name: 'vue', stars: 207000, language: 'TypeScript', owner: { login: 'vuejs' } },
        { name: 'svelte', stars: 78000, language: 'JavaScript', owner: { login: 'sveltejs' } },
      ],
    },
  ];

  columns = computed(() => {
    const data = this.data();
    if (data.length === 0) return [];
    return this.availableKeys();
  });

  getCellValue(row: Record<string, unknown>, key: string): string {
    const val = key.split('.').reduce(
      (current, segment) => (current as Record<string, unknown>)?.[segment],
      row as unknown
    );
    return val === undefined ? '-' : String(val);
  }

  loadPreset(preset: typeof this.presets[0]) {
    this.activePreset.set(preset.label);
    this.data.set([...preset.data]);
    this.availableKeys.set(preset.keys);
    this.selectedKey.set(preset.keys[0]);
  }

  selectKey(key: string) {
    this.selectedKey.set(key);
  }
}
