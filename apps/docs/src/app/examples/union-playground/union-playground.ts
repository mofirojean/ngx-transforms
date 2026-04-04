import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { UnionPipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';

interface User {
  id: number;
  name: string;
  team: string;
}

@Component({
  selector: 'app-union-playground',
  standalone: true,
  imports: [HlmButtonImports, UnionPipe, JsonPipe],
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
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="text-sm font-medium mb-2">Set A <span class="text-xs text-muted-foreground">(toggle items)</span></p>
            <div class="flex flex-wrap gap-2">
              @for (item of allItems; track item) {
                <button
                  hlmBtn
                  [variant]="isInSetA(item) ? 'default' : 'outline'"
                  size="sm"
                  class="font-mono"
                  (click)="toggleSetA(item)">
                  {{ item }}
                </button>
              }
            </div>
          </div>
          <div>
            <p class="text-sm font-medium mb-2">Set B <span class="text-xs text-muted-foreground">(toggle items)</span></p>
            <div class="flex flex-wrap gap-2">
              @for (item of allItems; track item) {
                <button
                  hlmBtn
                  [variant]="isInSetB(item) ? 'default' : 'outline'"
                  size="sm"
                  class="font-mono"
                  (click)="toggleSetB(item)">
                  {{ item }}
                </button>
              }
            </div>
          </div>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-3 gap-3">
          <div class="rounded-lg border border-blue-500/20 bg-blue-500/5 p-3 text-center">
            <div class="text-2xl font-bold text-blue-500">{{ setA().length }}</div>
            <div class="text-xs text-muted-foreground">In Set A</div>
          </div>
          <div class="rounded-lg border border-purple-500/20 bg-purple-500/5 p-3 text-center">
            <div class="text-2xl font-bold text-purple-500">{{ setB().length }}</div>
            <div class="text-xs text-muted-foreground">In Set B</div>
          </div>
          <div class="rounded-lg border border-green-500/20 bg-green-500/5 p-3 text-center">
            <div class="text-2xl font-bold text-green-500">{{ (setA() | union:setB()).length }}</div>
            <div class="text-xs text-muted-foreground">Union</div>
          </div>
        </div>

        <!-- Result -->
        <div>
          <p class="text-sm font-medium mb-2">Union <span class="text-xs text-muted-foreground">(all unique items from both)</span></p>
          @if ((setA() | union:setB()).length > 0) {
            <div class="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
              <div class="flex flex-wrap gap-2">
                @for (item of setA() | union:setB(); track $index) {
                  <span class="rounded-md border border-green-500/30 bg-card px-2.5 py-1 text-sm font-mono fade-in"
                    [style.animation-delay.ms]="$index * 50">{{ item }}</span>
                }
              </div>
            </div>
          } @else {
            <div class="rounded-lg border-2 border-dashed border-border p-6 text-center text-muted-foreground text-sm">Both sets are empty</div>
          }
        </div>

        <!-- Pipe output -->
        <div class="rounded-md bg-muted p-4 border border-border">
          <div class="text-xs text-muted-foreground mb-1 font-mono">setA | union:setB</div>
          <code class="text-sm font-mono">{{ setA() | union:setB() | json }}</code>
        </div>
      }

      @if (mode() === 'object') {
        <!-- Team merge -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="text-sm font-medium mb-2">Frontend Team <span class="text-xs text-muted-foreground">({{ frontendTeam.length }})</span></p>
            <div class="space-y-1.5">
              @for (u of frontendTeam; track u.id) {
                <div class="rounded-md border border-blue-500/20 bg-blue-500/5 px-3 py-2 text-sm flex justify-between items-center">
                  <span>{{ u.name }}</span>
                  <span class="text-xs text-blue-500">Frontend</span>
                </div>
              }
            </div>
          </div>
          <div>
            <p class="text-sm font-medium mb-2">Backend Team <span class="text-xs text-muted-foreground">(toggle)</span></p>
            <div class="space-y-1.5">
              @for (u of allUsers; track u.id) {
                <button
                  class="w-full rounded-md border px-3 py-2 text-sm flex justify-between items-center cursor-pointer transition-colors"
                  [class.border-purple-500/30]="isInBackend(u.id)"
                  [class.bg-purple-500/5]="isInBackend(u.id)"
                  [class.border-border]="!isInBackend(u.id)"
                  [class.opacity-50]="!isInBackend(u.id)"
                  (click)="toggleBackend(u.id)">
                  <span>{{ u.name }}</span>
                  <span class="text-xs">{{ isInBackend(u.id) ? 'In team' : 'Not in team' }}</span>
                </button>
              }
            </div>
          </div>
        </div>

        <!-- Merged team -->
        <div>
          <p class="text-sm font-medium mb-2">
            All Engineers
            <span class="text-muted-foreground">({{ (frontendTeam | union:backendMembers():'id').length }} unique)</span>
          </p>
          <div class="space-y-2">
            @for (u of frontendTeam | union:backendMembers():'id'; track $index) {
              <div class="rounded-lg border border-green-500/20 bg-green-500/5 p-3 flex items-center gap-3 fade-in"
                [style.animation-delay.ms]="$index * 60">
                <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-500 text-xs font-bold">
                  {{ $any(u).name.charAt(0) }}
                </div>
                <div class="flex-1">
                  <div class="font-medium text-sm">{{ $any(u).name }}</div>
                </div>
                <span class="text-[10px] px-2 py-0.5 rounded-full font-medium"
                  [class.bg-blue-500/10]="$any(u).team === 'Frontend'"
                  [class.text-blue-500]="$any(u).team === 'Frontend'"
                  [class.bg-purple-500/10]="$any(u).team === 'Backend'"
                  [class.text-purple-500]="$any(u).team === 'Backend'">
                  {{ $any(u).team }}
                </span>
              </div>
            }
          </div>
        </div>

        <!-- Pipe output -->
        <div class="rounded-md bg-muted p-4 border border-border">
          <div class="text-xs text-muted-foreground mb-1 font-mono">frontendTeam | union:backendTeam:'id'</div>
          <div class="text-xs text-muted-foreground">{{ frontendTeam.length }} + {{ backendMembers().length }} → {{ (frontendTeam | union:backendMembers():'id').length }} unique</div>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnionPlayground {
  mode = signal<'primitive' | 'object'>('primitive');

  // Primitive mode
  allItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  setA = signal<number[]>([1, 2, 3, 4, 5]);
  setB = signal<number[]>([4, 5, 6, 7, 8]);

  // Object mode
  allUsers: User[] = [
    { id: 1, name: 'Alice Chen', team: 'Frontend' },
    { id: 2, name: 'Bob Smith', team: 'Frontend' },
    { id: 3, name: 'Carol White', team: 'Frontend' },
    { id: 4, name: 'Dave Brown', team: 'Backend' },
    { id: 5, name: 'Emma Davis', team: 'Backend' },
    { id: 6, name: 'Frank Lee', team: 'Backend' },
    { id: 7, name: 'Grace Kim', team: 'Backend' },
    { id: 8, name: 'Henry Park', team: 'Frontend' },
  ];

  frontendTeam: User[] = this.allUsers.filter(u => u.team === 'Frontend');
  backendIds = signal<number[]>([3, 4, 5, 6]);
  backendMembers = computed(() =>
    this.allUsers.filter(u => this.backendIds().includes(u.id))
  );

  setMode(m: 'primitive' | 'object') { this.mode.set(m); }

  isInSetA(item: number) { return this.setA().includes(item); }
  isInSetB(item: number) { return this.setB().includes(item); }
  toggleSetA(item: number) {
    this.setA.update(l => l.includes(item) ? l.filter(i => i !== item) : [...l, item]);
  }
  toggleSetB(item: number) {
    this.setB.update(l => l.includes(item) ? l.filter(i => i !== item) : [...l, item]);
  }

  isInBackend(id: number) { return this.backendIds().includes(id); }
  toggleBackend(id: number) {
    this.backendIds.update(l => l.includes(id) ? l.filter(i => i !== id) : [...l, id]);
  }
}
