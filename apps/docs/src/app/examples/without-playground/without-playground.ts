import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { WithoutPipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';

interface User {
  name: string;
  role: string;
  status: string;
}

@Component({
  selector: 'app-without-playground',
  standalone: true,
  imports: [HlmButtonImports, WithoutPipe, JsonPipe],
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
        <!-- Primitive mode -->
        <div>
          <p class="text-sm font-medium mb-2">Pick items to exclude</p>
          <div class="flex flex-wrap gap-2">
            @for (item of primitiveItems; track item) {
              <button
                hlmBtn
                [variant]="isExcluded(item) ? 'destructive' : 'outline'"
                size="sm"
                class="font-mono"
                (click)="toggleExclude(item)">
                {{ item }}
              </button>
            }
          </div>
          <p class="text-xs text-muted-foreground mt-2">Click to toggle exclusion</p>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-3 gap-3">
          <div class="rounded-lg border border-border bg-muted/30 p-3 text-center">
            <div class="text-2xl font-bold">{{ primitiveItems.length }}</div>
            <div class="text-xs text-muted-foreground">Total</div>
          </div>
          <div class="rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-center">
            <div class="text-2xl font-bold text-red-500">{{ primitiveExcludes().length }}</div>
            <div class="text-xs text-muted-foreground">Excluding</div>
          </div>
          <div class="rounded-lg border border-green-500/20 bg-green-500/5 p-3 text-center">
            <div class="text-2xl font-bold text-green-500">{{ (primitiveItems | without:primitiveExcludes()).length }}</div>
            <div class="text-xs text-muted-foreground">Remaining</div>
          </div>
        </div>

        <!-- Result -->
        <div>
          <p class="text-sm font-medium mb-2">Result</p>
          @if ((primitiveItems | without:primitiveExcludes()).length > 0) {
            <div class="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
              <div class="flex flex-wrap gap-2">
                @for (item of primitiveItems | without:primitiveExcludes(); track $index) {
                  <span class="rounded-md border border-green-500/30 bg-card px-2.5 py-1 text-sm font-mono fade-in"
                    [style.animation-delay.ms]="$index * 50">{{ item }}</span>
                }
              </div>
            </div>
          } @else {
            <div class="rounded-lg border-2 border-dashed border-border p-6 text-center text-muted-foreground text-sm">All items excluded</div>
          }
        </div>

        <!-- Pipe output -->
        <div class="rounded-md bg-muted p-4 border border-border">
          <div class="text-xs text-muted-foreground mb-1 font-mono">items | without:{{ primitiveExcludes() | json }}</div>
          <code class="text-sm font-mono">{{ primitiveItems | without:primitiveExcludes() | json }}</code>
        </div>
      }

      @if (mode() === 'object') {
        <!-- Object mode -->
        <div>
          <p class="text-sm font-medium mb-2">Filter by status</p>
          <div class="flex flex-wrap gap-2">
            @for (status of allStatuses; track status) {
              <button
                hlmBtn
                [variant]="isStatusExcluded(status) ? 'destructive' : 'outline'"
                size="sm"
                (click)="toggleStatusExclude(status)">
                {{ status }}
              </button>
            }
          </div>
          <p class="text-xs text-muted-foreground mt-2">Click a status to exclude it</p>
        </div>

        <!-- User list -->
        <div>
          <p class="text-sm font-medium mb-2">
            Users
            <span class="text-muted-foreground">({{ (users | without:statusExcludes():'status').length }} of {{ users.length }})</span>
          </p>
          <div class="space-y-2">
            @for (user of users | without:statusExcludes():'status'; track $index) {
              <div class="rounded-lg border border-border p-3 flex items-center gap-3 fade-in"
                [style.animation-delay.ms]="$index * 60">
                <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                  {{ $any(user).name.charAt(0) }}
                </div>
                <div class="flex-1 min-w-0">
                  <div class="font-medium text-sm">{{ $any(user).name }}</div>
                  <div class="text-xs text-muted-foreground">{{ $any(user).role }}</div>
                </div>
                <span class="text-[10px] px-2 py-0.5 rounded-full font-medium"
                  [class.bg-green-500/10]="$any(user).status === 'active'"
                  [class.text-green-500]="$any(user).status === 'active'"
                  [class.bg-amber-500/10]="$any(user).status === 'pending'"
                  [class.text-amber-500]="$any(user).status === 'pending'"
                  [class.bg-red-500/10]="$any(user).status === 'banned'"
                  [class.text-red-500]="$any(user).status === 'banned'"
                  [class.bg-muted]="$any(user).status === 'inactive'"
                  [class.text-muted-foreground]="$any(user).status === 'inactive'">
                  {{ $any(user).status }}
                </span>
              </div>
            }
          </div>
        </div>

        <!-- Pipe output -->
        <div class="rounded-md bg-muted p-4 border border-border">
          <div class="text-xs text-muted-foreground mb-1 font-mono">users | without:{{ statusExcludes() | json }}:'status'</div>
          <div class="text-xs text-muted-foreground">{{ users.length }} → {{ (users | without:statusExcludes():'status').length }} users</div>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithoutPlayground {
  mode = signal<'primitive' | 'object'>('primitive');
  primitiveExcludes = signal<number[]>([]);
  statusExcludes = signal<string[]>([]);

  primitiveItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  allStatuses = ['active', 'pending', 'banned', 'inactive'];

  users: User[] = [
    { name: 'Alice Chen', role: 'Admin', status: 'active' },
    { name: 'Bob Smith', role: 'Editor', status: 'active' },
    { name: 'Carol White', role: 'Viewer', status: 'pending' },
    { name: 'Dave Brown', role: 'Editor', status: 'banned' },
    { name: 'Emma Davis', role: 'Admin', status: 'active' },
    { name: 'Frank Lee', role: 'Viewer', status: 'inactive' },
    { name: 'Grace Kim', role: 'Editor', status: 'active' },
    { name: 'Henry Park', role: 'Viewer', status: 'banned' },
    { name: 'Ivy Chen', role: 'Editor', status: 'pending' },
    { name: 'Jack Wilson', role: 'Viewer', status: 'active' },
  ];

  setMode(m: 'primitive' | 'object') {
    this.mode.set(m);
  }

  isExcluded(item: number): boolean {
    return this.primitiveExcludes().includes(item);
  }

  toggleExclude(item: number) {
    this.primitiveExcludes.update(list =>
      list.includes(item) ? list.filter(i => i !== item) : [...list, item]
    );
  }

  isStatusExcluded(status: string): boolean {
    return this.statusExcludes().includes(status);
  }

  toggleStatusExclude(status: string) {
    this.statusExcludes.update(list =>
      list.includes(status) ? list.filter(s => s !== status) : [...list, status]
    );
  }
}
