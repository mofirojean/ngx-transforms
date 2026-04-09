import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { MaxPipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

@Component({
  selector: 'app-max-playground',
  standalone: true,
  imports: [HlmButtonImports, MaxPipe, JsonPipe],
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
          <button hlmBtn [variant]="mode() === 'primitive' ? 'default' : 'outline'" size="sm" (click)="setMode('primitive')">Numbers</button>
          <button hlmBtn [variant]="mode() === 'object' ? 'default' : 'outline'" size="sm" (click)="setMode('object')">Objects</button>
        </div>
      </div>

      @if (mode() === 'primitive') {
        <!-- Number list with toggle -->
        <div>
          <p class="text-sm font-medium mb-2">Toggle numbers in the array</p>
          <div class="flex flex-wrap gap-2">
            @for (n of allNumbers; track n) {
              <button
                hlmBtn
                [variant]="isIncluded(n) ? 'default' : 'outline'"
                size="sm"
                class="font-mono"
                (click)="toggleNumber(n)">
                {{ n }}
              </button>
            }
          </div>
        </div>

        <!-- Result -->
        <div class="rounded-lg border border-blue-500/20 bg-blue-500/5 p-6 text-center">
          @if (numbers().length > 0) {
            <div class="text-5xl font-bold text-blue-500 mb-2">{{ numbers() | max }}</div>
            <div class="text-sm text-muted-foreground">Maximum of {{ numbers() | json }}</div>
          } @else {
            <div class="text-2xl font-bold text-muted-foreground mb-2">--</div>
            <div class="text-sm text-muted-foreground">Add numbers to find the maximum</div>
          }
        </div>

        <!-- Pipe output -->
        <div class="rounded-md bg-muted p-4 border border-border">
          <div class="text-xs text-muted-foreground mb-1 font-mono">{{ numbers() | json }} | max</div>
          <code class="text-sm font-mono">{{ numbers() | max }}</code>
        </div>
      }

      @if (mode() === 'object') {
        <!-- Product list -->
        <div>
          <p class="text-sm font-medium mb-2">Products <span class="text-xs text-muted-foreground">(toggle to include)</span></p>
          <div class="space-y-2">
            @for (p of allProducts; track p.id) {
              <button
                class="w-full rounded-lg border p-3 flex items-center gap-3 cursor-pointer transition-colors"
                [class.border-purple-500/30]="isProductIncluded(p.id)"
                [class.bg-purple-500/5]="isProductIncluded(p.id)"
                [class.border-border]="!isProductIncluded(p.id)"
                [class.opacity-50]="!isProductIncluded(p.id)"
                (click)="toggleProduct(p.id)">
                <div class="flex-1 text-left">
                  <div class="text-sm font-medium">{{ p.name }}</div>
                  <div class="text-xs text-muted-foreground">{{ p.category }}</div>
                </div>
                <span class="font-mono text-sm font-bold"
                  [class.text-purple-500]="isProductIncluded(p.id) && p.price === (selectedProducts() | max:'price')"
                  [class.text-muted-foreground]="!isProductIncluded(p.id) || p.price !== (selectedProducts() | max:'price')">
                  {{ '$' + p.price }}
                </span>
              </button>
            }
          </div>
        </div>

        <!-- Most expensive product -->
        <div class="rounded-lg border border-purple-500/20 bg-purple-500/5 p-6 text-center">
          @if (selectedProducts().length > 0) {
            <div class="text-sm text-muted-foreground mb-1">Most expensive</div>
            <div class="text-5xl font-bold text-purple-500 mb-2">{{ '$' + (selectedProducts() | max:'price') }}</div>
            <div class="text-sm text-muted-foreground">products | max:'price'</div>
          } @else {
            <div class="text-2xl font-bold text-muted-foreground mb-2">--</div>
            <div class="text-sm text-muted-foreground">Select products to find the most expensive</div>
          }
        </div>

        <!-- Pipe output -->
        <div class="rounded-md bg-muted p-4 border border-border">
          <div class="text-xs text-muted-foreground mb-1 font-mono">products | max:'price'</div>
          <code class="text-sm font-mono">{{ selectedProducts() | max:'price' }}</code>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaxPlayground {
  mode = signal<'primitive' | 'object'>('primitive');

  // Primitive mode
  allNumbers = [42, 7, 93, 15, 68, 3, 81, 27, 56, 12];
  numbers = signal<number[]>([42, 7, 93, 15, 68, 3]);

  // Object mode
  allProducts: Product[] = [
    { id: 1, name: 'Laptop Pro', price: 1299, category: 'Electronics' },
    { id: 2, name: 'Wireless Mouse', price: 29, category: 'Electronics' },
    { id: 3, name: 'Standing Desk', price: 549, category: 'Furniture' },
    { id: 4, name: 'Monitor 27"', price: 399, category: 'Electronics' },
    { id: 5, name: 'Ergonomic Chair', price: 749, category: 'Furniture' },
    { id: 6, name: 'Keyboard MX', price: 99, category: 'Electronics' },
    { id: 7, name: 'Desk Lamp', price: 45, category: 'Furniture' },
    { id: 8, name: 'Webcam HD', price: 79, category: 'Electronics' },
  ];
  productIds = signal<number[]>([1, 2, 3, 4, 5]);
  selectedProducts = signal<Product[]>(this.allProducts.filter(p => [1, 2, 3, 4, 5].includes(p.id)));

  setMode(m: 'primitive' | 'object') { this.mode.set(m); }

  isIncluded(n: number) { return this.numbers().includes(n); }
  toggleNumber(n: number) {
    this.numbers.update(list =>
      list.includes(n) ? list.filter(i => i !== n) : [...list, n]
    );
  }

  isProductIncluded(id: number) { return this.productIds().includes(id); }
  toggleProduct(id: number) {
    this.productIds.update(list => {
      const updated = list.includes(id) ? list.filter(i => i !== id) : [...list, id];
      this.selectedProducts.set(this.allProducts.filter(p => updated.includes(p.id)));
      return updated;
    });
  }
}
