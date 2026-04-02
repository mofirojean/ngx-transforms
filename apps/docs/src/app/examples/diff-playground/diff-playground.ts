import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { DiffPipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';

interface Product {
  id: number;
  name: string;
  category: string;
}

@Component({
  selector: 'app-diff-playground',
  standalone: true,
  imports: [HlmButtonImports, DiffPipe, JsonPipe],
  template: `
    <style>
      @keyframes fade-in {
        from { opacity: 0; transform: translateY(6px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .fade-in { animation: fade-in 250ms ease-out both; }
    </style>

    <div class="flex flex-col gap-6 p-5">

      <!-- Mode selector -->
      <div>
        <p class="text-sm font-medium mb-2">Mode</p>
        <div class="flex gap-2">
          <button hlmBtn [variant]="mode() === 'primitive' ? 'default' : 'outline'" size="sm" (click)="setMode('primitive')">Primitives</button>
          <button hlmBtn [variant]="mode() === 'object' ? 'default' : 'outline'" size="sm" (click)="setMode('object')">Objects</button>
        </div>
      </div>

      @if (mode() === 'primitive') {
        <!-- Primitive mode: two lists side by side -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="text-sm font-medium mb-2">List A</p>
            <div class="flex flex-wrap gap-2">
              @for (item of listA; track item) {
                <span class="rounded-md border border-blue-500/30 bg-blue-500/5 px-2.5 py-1 text-sm font-mono">{{ item }}</span>
              }
            </div>
          </div>
          <div>
            <p class="text-sm font-medium mb-2">List B <span class="text-xs text-muted-foreground">(toggle items)</span></p>
            <div class="flex flex-wrap gap-2">
              @for (item of allCompareItems; track item) {
                <button
                  hlmBtn
                  [variant]="isInListB(item) ? 'default' : 'outline'"
                  size="sm"
                  class="font-mono"
                  (click)="toggleListB(item)">
                  {{ item }}
                </button>
              }
            </div>
          </div>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-3 gap-3">
          <div class="rounded-lg border border-blue-500/20 bg-blue-500/5 p-3 text-center">
            <div class="text-2xl font-bold text-blue-500">{{ listA.length }}</div>
            <div class="text-xs text-muted-foreground">In List A</div>
          </div>
          <div class="rounded-lg border border-border bg-muted/30 p-3 text-center">
            <div class="text-2xl font-bold">{{ listB().length }}</div>
            <div class="text-xs text-muted-foreground">In List B</div>
          </div>
          <div class="rounded-lg border border-green-500/20 bg-green-500/5 p-3 text-center">
            <div class="text-2xl font-bold text-green-500">{{ (listA | diff:listB()).length }}</div>
            <div class="text-xs text-muted-foreground">Only in A</div>
          </div>
        </div>

        <!-- Result -->
        <div>
          <p class="text-sm font-medium mb-2">Diff Result <span class="text-xs text-muted-foreground">(items in A but not B)</span></p>
          @if ((listA | diff:listB()).length > 0) {
            <div class="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
              <div class="flex flex-wrap gap-2">
                @for (item of listA | diff:listB(); track $index) {
                  <span class="rounded-md border border-green-500/30 bg-card px-2.5 py-1 text-sm font-mono fade-in"
                    [style.animation-delay.ms]="$index * 50">{{ item }}</span>
                }
              </div>
            </div>
          } @else {
            <div class="rounded-lg border-2 border-dashed border-border p-6 text-center text-muted-foreground text-sm">No differences — all items are in both lists</div>
          }
        </div>

        <!-- Pipe output -->
        <div class="rounded-md bg-muted p-4 border border-border">
          <div class="text-xs text-muted-foreground mb-1 font-mono">listA | diff:{{ listB() | json }}</div>
          <code class="text-sm font-mono">{{ listA | diff:listB() | json }}</code>
        </div>
      }

      @if (mode() === 'object') {
        <!-- Object mode: inventory vs sold -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="text-sm font-medium mb-2">All Products <span class="text-xs text-muted-foreground">({{ allProducts.length }})</span></p>
            <div class="space-y-1.5">
              @for (p of allProducts; track p.id) {
                <div class="rounded-md border border-border px-3 py-2 text-sm flex justify-between items-center">
                  <span>{{ p.name }}</span>
                  <span class="text-xs text-muted-foreground">{{ p.category }}</span>
                </div>
              }
            </div>
          </div>
          <div>
            <p class="text-sm font-medium mb-2">Sold Products <span class="text-xs text-muted-foreground">(toggle)</span></p>
            <div class="space-y-1.5">
              @for (p of allProducts; track p.id) {
                <button
                  class="w-full rounded-md border px-3 py-2 text-sm flex justify-between items-center cursor-pointer transition-colors"
                  [class.border-red-500/30]="isSold(p.id)"
                  [class.bg-red-500/5]="isSold(p.id)"
                  [class.border-border]="!isSold(p.id)"
                  [class.opacity-50]="!isSold(p.id)"
                  (click)="toggleSold(p.id)">
                  <span>{{ p.name }}</span>
                  <span class="text-xs">{{ isSold(p.id) ? 'Sold' : 'Available' }}</span>
                </button>
              }
            </div>
          </div>
        </div>

        <!-- Unsold result -->
        <div>
          <p class="text-sm font-medium mb-2">
            Unsold Products
            <span class="text-muted-foreground">({{ (allProducts | diff:soldProducts():'id').length }} remaining)</span>
          </p>
          <div class="space-y-2">
            @for (p of allProducts | diff:soldProducts():'id'; track $index) {
              <div class="rounded-lg border border-green-500/20 bg-green-500/5 p-3 flex items-center gap-3 fade-in"
                [style.animation-delay.ms]="$index * 60">
                <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-500 text-xs font-bold">
                  {{ $any(p).id }}
                </div>
                <div class="flex-1">
                  <div class="font-medium text-sm">{{ $any(p).name }}</div>
                  <div class="text-xs text-muted-foreground">{{ $any(p).category }}</div>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Pipe output -->
        <div class="rounded-md bg-muted p-4 border border-border">
          <div class="text-xs text-muted-foreground mb-1 font-mono">allProducts | diff:soldProducts:'id'</div>
          <div class="text-xs text-muted-foreground">{{ allProducts.length }} → {{ (allProducts | diff:soldProducts():'id').length }} unsold</div>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiffPlayground {
  mode = signal<'primitive' | 'object'>('primitive');

  // Primitive mode
  listA = [1, 2, 3, 4, 5, 6, 7, 8];
  allCompareItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  listB = signal<number[]>([3, 5, 7, 9]);

  // Object mode
  allProducts: Product[] = [
    { id: 1, name: 'Laptop Pro', category: 'Electronics' },
    { id: 2, name: 'Wireless Mouse', category: 'Electronics' },
    { id: 3, name: 'Standing Desk', category: 'Furniture' },
    { id: 4, name: 'Monitor 27"', category: 'Electronics' },
    { id: 5, name: 'Ergonomic Chair', category: 'Furniture' },
    { id: 6, name: 'Keyboard MX', category: 'Electronics' },
    { id: 7, name: 'Desk Lamp', category: 'Furniture' },
    { id: 8, name: 'Webcam HD', category: 'Electronics' },
  ];
  soldIds = signal<number[]>([2, 4, 6]);
  soldProducts = computed(() =>
    this.allProducts.filter(p => this.soldIds().includes(p.id))
  );

  setMode(m: 'primitive' | 'object') {
    this.mode.set(m);
  }

  isInListB(item: number): boolean {
    return this.listB().includes(item);
  }

  toggleListB(item: number) {
    this.listB.update(list =>
      list.includes(item) ? list.filter(i => i !== item) : [...list, item]
    );
  }

  isSold(id: number): boolean {
    return this.soldIds().includes(id);
  }

  toggleSold(id: number) {
    this.soldIds.update(list =>
      list.includes(id) ? list.filter(i => i !== id) : [...list, id]
    );
  }
}
