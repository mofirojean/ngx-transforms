import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { SumPipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-sum-playground',
  standalone: true,
  imports: [HlmButtonImports, SumPipe, JsonPipe],
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
          <button hlmBtn [variant]="mode() === 'object' ? 'default' : 'outline'" size="sm" (click)="setMode('object')">Cart Items</button>
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

        <!-- Stats -->
        <div class="grid grid-cols-2 gap-3">
          <div class="rounded-lg border border-border bg-muted/30 p-3 text-center">
            <div class="text-2xl font-bold">{{ numbers().length }}</div>
            <div class="text-xs text-muted-foreground">Items</div>
          </div>
          <div class="rounded-lg border border-green-500/20 bg-green-500/5 p-3 text-center">
            <div class="text-2xl font-bold text-green-500">{{ numbers() | sum }}</div>
            <div class="text-xs text-muted-foreground">Total</div>
          </div>
        </div>

        <!-- Result -->
        <div class="rounded-lg border border-green-500/20 bg-green-500/5 p-6 text-center">
          @if (numbers().length > 0) {
            <div class="text-5xl font-bold text-green-500 mb-2">{{ numbers() | sum }}</div>
            <div class="text-sm text-muted-foreground">Sum of {{ numbers() | json }}</div>
          } @else {
            <div class="text-2xl font-bold text-muted-foreground mb-2">--</div>
            <div class="text-sm text-muted-foreground">Add numbers to calculate the sum</div>
          }
        </div>

        <!-- Pipe output -->
        <div class="rounded-md bg-muted p-4 border border-border">
          <div class="text-xs text-muted-foreground mb-1 font-mono">{{ numbers() | json }} | sum</div>
          <code class="text-sm font-mono">{{ numbers() | sum }}</code>
        </div>
      }

      @if (mode() === 'object') {
        <!-- Cart items -->
        <div>
          <p class="text-sm font-medium mb-2">Shopping cart <span class="text-xs text-muted-foreground">(toggle to include)</span></p>
          <div class="space-y-2">
            @for (item of allCartItems; track item.id) {
              <button
                class="w-full rounded-lg border p-3 flex items-center gap-3 cursor-pointer transition-colors"
                [class.border-green-500/30]="isCartItemIncluded(item.id)"
                [class.bg-green-500/5]="isCartItemIncluded(item.id)"
                [class.border-border]="!isCartItemIncluded(item.id)"
                [class.opacity-50]="!isCartItemIncluded(item.id)"
                (click)="toggleCartItem(item.id)">
                <div class="flex-1 text-left">
                  <div class="text-sm font-medium">{{ item.name }}</div>
                  <div class="text-xs text-muted-foreground">Qty: {{ item.quantity }}</div>
                </div>
                <span class="font-mono text-sm font-bold"
                  [class.text-green-500]="isCartItemIncluded(item.id)"
                  [class.text-muted-foreground]="!isCartItemIncluded(item.id)">
                  {{ '$' + item.price }}
                </span>
              </button>
            }
          </div>
        </div>

        <!-- Cart total -->
        <div class="rounded-lg border border-green-500/20 bg-green-500/5 p-6 text-center">
          @if (selectedCartItems().length > 0) {
            <div class="text-sm text-muted-foreground mb-1">Cart total</div>
            <div class="text-5xl font-bold text-green-500 mb-2">{{ '$' + (selectedCartItems() | sum:'price') }}</div>
            <div class="text-sm text-muted-foreground">{{ selectedCartItems().length }} items | sum:'price'</div>
          } @else {
            <div class="text-2xl font-bold text-muted-foreground mb-2">--</div>
            <div class="text-sm text-muted-foreground">Add items to calculate the total</div>
          }
        </div>

        <!-- Pipe output -->
        <div class="rounded-md bg-muted p-4 border border-border">
          <div class="text-xs text-muted-foreground mb-1 font-mono">cartItems | sum:'price'</div>
          <code class="text-sm font-mono">{{ selectedCartItems() | sum:'price' }}</code>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SumPlayground {
  mode = signal<'primitive' | 'object'>('primitive');

  // Primitive mode
  allNumbers = [10, 25, 50, 75, 100, 150, 200, 35, 60, 15];
  numbers = signal<number[]>([10, 25, 50, 75, 100, 150]);

  // Object mode
  allCartItems: CartItem[] = [
    { id: 1, name: 'Laptop Pro', price: 1299, quantity: 1 },
    { id: 2, name: 'Wireless Mouse', price: 29, quantity: 2 },
    { id: 3, name: 'Standing Desk', price: 549, quantity: 1 },
    { id: 4, name: 'Monitor 27"', price: 399, quantity: 1 },
    { id: 5, name: 'Ergonomic Chair', price: 749, quantity: 1 },
    { id: 6, name: 'Keyboard MX', price: 99, quantity: 1 },
    { id: 7, name: 'Desk Lamp', price: 45, quantity: 3 },
    { id: 8, name: 'Webcam HD', price: 79, quantity: 1 },
  ];
  cartItemIds = signal<number[]>([1, 2, 3, 4, 5]);
  selectedCartItems = signal<CartItem[]>(this.allCartItems.filter(i => [1, 2, 3, 4, 5].includes(i.id)));

  setMode(m: 'primitive' | 'object') { this.mode.set(m); }

  isIncluded(n: number) { return this.numbers().includes(n); }
  toggleNumber(n: number) {
    this.numbers.update(list =>
      list.includes(n) ? list.filter(i => i !== n) : [...list, n]
    );
  }

  isCartItemIncluded(id: number) { return this.cartItemIds().includes(id); }
  toggleCartItem(id: number) {
    this.cartItemIds.update(list => {
      const updated = list.includes(id) ? list.filter(i => i !== id) : [...list, id];
      this.selectedCartItems.set(this.allCartItems.filter(i => updated.includes(i.id)));
      return updated;
    });
  }
}