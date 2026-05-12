import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CurrencyPipe, JsonPipe } from '@angular/common';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideCircleCheck,
  lucideCirclePlus,
  lucideCircleMinus,
  lucideDollarSign,
  lucideHardDrive,
  lucideRotateCcw,
  lucideTarget,
  lucideTrendingUp,
  lucideUsers,
  lucideZap,
} from '@ng-icons/lucide';
import {
  AveragePipe,
  BytesPipe,
  CountPipe,
  MaxPipe,
  PercentagePipe,
  PluckPipe,
  SumPipe,
  UniquePipe,
} from '@ngx-transforms';

interface Order {
  id: string;
  customer: string;
  total: number;
  fileSizeBytes: number;
  status: 'completed' | 'pending' | 'failed';
  region: 'NA' | 'EU' | 'APAC';
}

type RegionFilter = 'all' | Order['region'];

const SEED_ORDERS: Order[] = [
  { id: 'ord_001', customer: 'Acme Corp', total: 1240, fileSizeBytes: 4_500_000, status: 'completed', region: 'NA' },
  { id: 'ord_002', customer: 'Globex', total: 750, fileSizeBytes: 12_300_000, status: 'completed', region: 'EU' },
  { id: 'ord_003', customer: 'Initech', total: 2100, fileSizeBytes: 850_000, status: 'pending', region: 'NA' },
  { id: 'ord_004', customer: 'Stark Industries', total: 5450, fileSizeBytes: 98_500_000, status: 'completed', region: 'APAC' },
  { id: 'ord_005', customer: 'Acme Corp', total: 320, fileSizeBytes: 1_200_000, status: 'failed', region: 'NA' },
  { id: 'ord_006', customer: 'Wayne Enterprises', total: 8900, fileSizeBytes: 245_000_000, status: 'completed', region: 'EU' },
];

const RANDOM_CUSTOMERS = ['Acme Corp', 'Globex', 'Initech', 'Stark Industries', 'Wayne Enterprises', 'Soylent Co', 'Hooli', 'Pied Piper'];
const RANDOM_REGIONS: Order['region'][] = ['NA', 'EU', 'APAC'];
const RANDOM_STATUSES: Order['status'][] = ['completed', 'pending', 'failed'];
const REGION_TABS: { label: string; value: RegionFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'NA', value: 'NA' },
  { label: 'EU', value: 'EU' },
  { label: 'APAC', value: 'APAC' },
];

@Component({
  selector: 'app-dashboard-stats',
  standalone: true,
  imports: [
    CurrencyPipe,
    JsonPipe,
    HlmButtonImports,
    NgIcon,
    AveragePipe,
    BytesPipe,
    CountPipe,
    MaxPipe,
    PercentagePipe,
    PluckPipe,
    SumPipe,
    UniquePipe,
  ],
  providers: [
    provideIcons({
      lucideCircleCheck,
      lucideCirclePlus,
      lucideCircleMinus,
      lucideDollarSign,
      lucideHardDrive,
      lucideRotateCcw,
      lucideTarget,
      lucideTrendingUp,
      lucideUsers,
      lucideZap,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-5 p-5">
      <!-- Controls -->
      <div class="flex flex-col gap-3">
        <div class="flex flex-wrap items-center gap-2">
          <button hlmBtn variant="default" size="sm" (click)="addOrder()" class="gap-1.5">
            <ng-icon name="lucideCirclePlus" class="h-3.5 w-3.5"></ng-icon>
            Add order
          </button>
          <button hlmBtn variant="outline" size="sm" (click)="removeOrder()" [disabled]="orders().length === 0" class="gap-1.5">
            <ng-icon name="lucideCircleMinus" class="h-3.5 w-3.5"></ng-icon>
            Remove last
          </button>
          <button hlmBtn variant="ghost" size="sm" (click)="reset()" class="gap-1.5">
            <ng-icon name="lucideRotateCcw" class="h-3.5 w-3.5"></ng-icon>
            Reset
          </button>
          <button hlmBtn [variant]="boost() ? 'default' : 'outline'" size="sm" (click)="toggleBoost()" class="gap-1.5 ml-auto">
            <ng-icon name="lucideZap" class="h-3.5 w-3.5"></ng-icon>
            {{ boost() ? '10x boost ON' : '10x boost' }}
          </button>
          <button hlmBtn [variant]="showChains() ? 'default' : 'outline'" size="sm" (click)="toggleChains()">
            {{ showChains() ? 'Hide chains' : 'Show chains' }}
          </button>
        </div>

        <div class="flex items-center gap-1.5 text-xs">
          <span class="text-muted-foreground mr-1">Region:</span>
          @for (tab of regionTabs; track tab.value) {
            <button
              hlmBtn
              [variant]="region() === tab.value ? 'default' : 'outline'"
              size="sm"
              class="h-7 px-3"
              (click)="setRegion(tab.value)"
            >{{ tab.label }}</button>
          }
          <span class="ml-auto text-xs text-muted-foreground tabular-nums">
            {{ effectiveOrders().length }} / {{ orders().length }} orders
          </span>
        </div>
      </div>

      <!-- Stats grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <!-- Total Revenue -->
        <div class="rounded-lg border border-border p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/5">
          <div class="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <ng-icon name="lucideDollarSign" class="h-3.5 w-3.5"></ng-icon>
            <span>Total Revenue</span>
          </div>
          <div class="text-2xl font-bold tabular-nums">
            {{ ((effectiveOrders() | sum: 'total') ?? 0) | currency: 'USD' : 'symbol' : '1.0-0' }}
          </div>
          @if (showChains()) {
            <code class="mt-2 block text-[10px] font-mono text-muted-foreground/70 break-all">orders | sum:'total' | currency</code>
          }
        </div>

        <!-- Average Order Value -->
        <div class="rounded-lg border border-border p-4 bg-gradient-to-br from-blue-500/10 to-indigo-500/5">
          <div class="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <ng-icon name="lucideTrendingUp" class="h-3.5 w-3.5"></ng-icon>
            <span>Avg Order Value</span>
          </div>
          <div class="text-2xl font-bold tabular-nums">
            {{ ((effectiveOrders() | average: 'total') ?? 0) | currency: 'USD' : 'symbol' : '1.0-0' }}
          </div>
          @if (showChains()) {
            <code class="mt-2 block text-[10px] font-mono text-muted-foreground/70 break-all">orders | average:'total' | currency</code>
          }
        </div>

        <!-- Largest Order -->
        <div class="rounded-lg border border-border p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/5">
          <div class="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <ng-icon name="lucideTarget" class="h-3.5 w-3.5"></ng-icon>
            <span>Largest Order</span>
          </div>
          <div class="text-2xl font-bold tabular-nums">
            {{ ((effectiveOrders() | max: 'total') ?? 0) | currency: 'USD' : 'symbol' : '1.0-0' }}
          </div>
          @if (showChains()) {
            <code class="mt-2 block text-[10px] font-mono text-muted-foreground/70 break-all">orders | max:'total' | currency</code>
          }
        </div>

        <!-- Storage Used -->
        <div class="rounded-lg border border-border p-4 bg-gradient-to-br from-orange-500/10 to-amber-500/5">
          <div class="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <ng-icon name="lucideHardDrive" class="h-3.5 w-3.5"></ng-icon>
            <span>Storage Used</span>
          </div>
          <div class="text-2xl font-bold tabular-nums">
            {{ (effectiveOrders() | sum: 'fileSizeBytes') ?? 0 | bytes }}
          </div>
          @if (showChains()) {
            <code class="mt-2 block text-[10px] font-mono text-muted-foreground/70 break-all">orders | sum:'fileSizeBytes' | bytes</code>
          }
        </div>

        <!-- Unique Customers -->
        <div class="rounded-lg border border-border p-4 bg-gradient-to-br from-cyan-500/10 to-teal-500/5">
          <div class="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <ng-icon name="lucideUsers" class="h-3.5 w-3.5"></ng-icon>
            <span>Unique Customers</span>
          </div>
          <div class="text-2xl font-bold tabular-nums">
            {{ effectiveOrders() | pluck: 'customer' | unique | count }}
          </div>
          @if (showChains()) {
            <code class="mt-2 block text-[10px] font-mono text-muted-foreground/70 break-all">orders | pluck:'customer' | unique | count</code>
          }
        </div>

        <!-- Completion Rate -->
        <div class="rounded-lg border border-border p-4 bg-gradient-to-br from-slate-500/10 to-zinc-500/5">
          <div class="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <ng-icon name="lucideCircleCheck" class="h-3.5 w-3.5"></ng-icon>
            <span>Completion Rate</span>
          </div>
          <div class="text-2xl font-bold tabular-nums">
            @if (effectiveOrders().length > 0) {
              {{ completedCount() | percentage: effectiveOrders().length : 1 }}%
            } @else {
              <span class="text-muted-foreground">—</span>
            }
          </div>
          @if (showChains()) {
            <code class="mt-2 block text-[10px] font-mono text-muted-foreground/70 break-all">completed | percentage:total:1</code>
          }
        </div>
      </div>

      <!-- Source data peek -->
      <details class="rounded-md border border-border bg-muted/30 p-3 text-xs">
        <summary class="font-mono text-muted-foreground cursor-pointer select-none">
          Source data — {{ effectiveOrders().length }} order(s) feeding all six cards
        </summary>
        <pre class="mt-3 font-mono overflow-auto max-h-48 text-[10px] leading-relaxed">{{ effectiveOrders() | json }}</pre>
      </details>
    </div>
  `,
})
export class DashboardStats {
  readonly orders = signal<Order[]>(SEED_ORDERS);
  readonly boost = signal(false);
  readonly region = signal<RegionFilter>('all');
  readonly showChains = signal(false);

  readonly regionTabs = REGION_TABS;

  readonly filteredOrders = computed(() => {
    const r = this.region();
    return r === 'all' ? this.orders() : this.orders().filter((o) => o.region === r);
  });

  readonly effectiveOrders = computed(() => {
    const mult = this.boost() ? 10 : 1;
    if (mult === 1) return this.filteredOrders();
    return this.filteredOrders().map((o) => ({
      ...o,
      total: o.total * mult,
      fileSizeBytes: o.fileSizeBytes * mult,
    }));
  });

  readonly completedCount = computed(
    () => this.effectiveOrders().filter((o) => o.status === 'completed').length,
  );

  addOrder() {
    const customer = RANDOM_CUSTOMERS[Math.floor(Math.random() * RANDOM_CUSTOMERS.length)];
    const region = RANDOM_REGIONS[Math.floor(Math.random() * RANDOM_REGIONS.length)];
    const status = RANDOM_STATUSES[Math.floor(Math.random() * RANDOM_STATUSES.length)];
    const total = Math.floor(Math.random() * 9900) + 100;
    const fileSizeBytes = Math.floor(Math.random() * 500_000_000) + 100_000;
    const id = `ord_${String(this.orders().length + 1).padStart(3, '0')}`;
    this.orders.update((arr) => [...arr, { id, customer, total, fileSizeBytes, status, region }]);
  }

  removeOrder() {
    this.orders.update((arr) => arr.slice(0, -1));
  }

  reset() {
    this.orders.set(SEED_ORDERS);
    this.boost.set(false);
    this.region.set('all');
  }

  toggleBoost() {
    this.boost.update((v) => !v);
  }

  toggleChains() {
    this.showChains.update((v) => !v);
  }

  setRegion(r: RegionFilter) {
    this.region.set(r);
  }
}
