import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { IntersectionPipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';

interface Member {
  id: number;
  name: string;
  role: string;
}

@Component({
  selector: 'app-intersection-playground',
  standalone: true,
  imports: [HlmButtonImports, IntersectionPipe, JsonPipe],
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
        <!-- Two lists with toggleable items -->
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
            <div class="text-2xl font-bold text-green-500">{{ (setA() | intersection:setB()).length }}</div>
            <div class="text-xs text-muted-foreground">Common</div>
          </div>
        </div>

        <!-- Result -->
        <div>
          <p class="text-sm font-medium mb-2">Intersection <span class="text-xs text-muted-foreground">(items in both A and B)</span></p>
          @if ((setA() | intersection:setB()).length > 0) {
            <div class="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
              <div class="flex flex-wrap gap-2">
                @for (item of setA() | intersection:setB(); track $index) {
                  <span class="rounded-md border border-green-500/30 bg-card px-2.5 py-1 text-sm font-mono fade-in"
                    [style.animation-delay.ms]="$index * 50">{{ item }}</span>
                }
              </div>
            </div>
          } @else {
            <div class="rounded-lg border-2 border-dashed border-border p-6 text-center text-muted-foreground text-sm">No common items</div>
          }
        </div>

        <!-- Pipe output -->
        <div class="rounded-md bg-muted p-4 border border-border">
          <div class="text-xs text-muted-foreground mb-1 font-mono">setA | intersection:setB</div>
          <code class="text-sm font-mono">{{ setA() | intersection:setB() | json }}</code>
        </div>
      }

      @if (mode() === 'object') {
        <!-- Team overlap -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="text-sm font-medium mb-2">Team Alpha <span class="text-xs text-muted-foreground">({{ teamA.length }})</span></p>
            <div class="space-y-1.5">
              @for (m of teamA; track m.id) {
                <div class="rounded-md border border-blue-500/20 bg-blue-500/5 px-3 py-2 text-sm flex justify-between items-center">
                  <span>{{ m.name }}</span>
                  <span class="text-xs text-muted-foreground">{{ m.role }}</span>
                </div>
              }
            </div>
          </div>
          <div>
            <p class="text-sm font-medium mb-2">Team Beta <span class="text-xs text-muted-foreground">(toggle)</span></p>
            <div class="space-y-1.5">
              @for (m of allMembers; track m.id) {
                <button
                  class="w-full rounded-md border px-3 py-2 text-sm flex justify-between items-center cursor-pointer transition-colors"
                  [class.border-purple-500/30]="isInTeamB(m.id)"
                  [class.bg-purple-500/5]="isInTeamB(m.id)"
                  [class.border-border]="!isInTeamB(m.id)"
                  [class.opacity-50]="!isInTeamB(m.id)"
                  (click)="toggleTeamB(m.id)">
                  <span>{{ m.name }}</span>
                  <span class="text-xs">{{ isInTeamB(m.id) ? 'In team' : 'Not in team' }}</span>
                </button>
              }
            </div>
          </div>
        </div>

        <!-- Shared members -->
        <div>
          <p class="text-sm font-medium mb-2">
            Shared Members
            <span class="text-muted-foreground">({{ (teamA | intersection:teamBMembers():'id').length }} in both teams)</span>
          </p>
          @if ((teamA | intersection:teamBMembers():'id').length > 0) {
            <div class="space-y-2">
              @for (m of teamA | intersection:teamBMembers():'id'; track $index) {
                <div class="rounded-lg border border-green-500/20 bg-green-500/5 p-3 flex items-center gap-3 fade-in"
                  [style.animation-delay.ms]="$index * 60">
                  <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-500 text-xs font-bold">
                    {{ $any(m).name.charAt(0) }}
                  </div>
                  <div class="flex-1">
                    <div class="font-medium text-sm">{{ $any(m).name }}</div>
                    <div class="text-xs text-muted-foreground">{{ $any(m).role }}</div>
                  </div>
                  <span class="text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 font-medium">Both teams</span>
                </div>
              }
            </div>
          } @else {
            <div class="rounded-lg border-2 border-dashed border-border p-6 text-center text-muted-foreground text-sm">No shared members</div>
          }
        </div>

        <!-- Pipe output -->
        <div class="rounded-md bg-muted p-4 border border-border">
          <div class="text-xs text-muted-foreground mb-1 font-mono">teamA | intersection:teamB:'id'</div>
          <div class="text-xs text-muted-foreground">{{ teamA.length }} + {{ teamBMembers().length }} → {{ (teamA | intersection:teamBMembers():'id').length }} shared</div>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntersectionPlayground {
  mode = signal<'primitive' | 'object'>('primitive');

  // Primitive mode
  allItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  setA = signal<number[]>([1, 2, 3, 4, 5, 6]);
  setB = signal<number[]>([4, 5, 6, 7, 8, 9]);

  // Object mode
  allMembers: Member[] = [
    { id: 1, name: 'Alice Chen', role: 'Engineer' },
    { id: 2, name: 'Bob Smith', role: 'Designer' },
    { id: 3, name: 'Carol White', role: 'PM' },
    { id: 4, name: 'Dave Brown', role: 'Engineer' },
    { id: 5, name: 'Emma Davis', role: 'Designer' },
    { id: 6, name: 'Frank Lee', role: 'Engineer' },
    { id: 7, name: 'Grace Kim', role: 'PM' },
    { id: 8, name: 'Henry Park', role: 'Engineer' },
  ];

  teamA: Member[] = [
    this.allMembers[0], this.allMembers[1], this.allMembers[2],
    this.allMembers[3], this.allMembers[4],
  ];

  teamBIds = signal<number[]>([3, 4, 5, 6, 7]);
  teamBMembers = computed(() =>
    this.allMembers.filter(m => this.teamBIds().includes(m.id))
  );

  setMode(m: 'primitive' | 'object') {
    this.mode.set(m);
  }

  isInSetA(item: number): boolean { return this.setA().includes(item); }
  isInSetB(item: number): boolean { return this.setB().includes(item); }

  toggleSetA(item: number) {
    this.setA.update(list =>
      list.includes(item) ? list.filter(i => i !== item) : [...list, item]
    );
  }

  toggleSetB(item: number) {
    this.setB.update(list =>
      list.includes(item) ? list.filter(i => i !== item) : [...list, item]
    );
  }

  isInTeamB(id: number): boolean { return this.teamBIds().includes(id); }

  toggleTeamB(id: number) {
    this.teamBIds.update(list =>
      list.includes(id) ? list.filter(i => i !== id) : [...list, id]
    );
  }
}
