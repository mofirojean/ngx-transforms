import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { EveryPipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';

interface Task {
  id: number;
  title: string;
  status: string;
}

@Component({
  selector: 'app-every-playground',
  standalone: true,
  imports: [HlmButtonImports, EveryPipe, JsonPipe],
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
        <!-- Primitive: toggle values to true -->
        <div>
          <p class="text-sm font-medium mb-2">Click items to toggle their value</p>
          <div class="flex flex-wrap gap-2">
            @for (item of items(); track $index) {
              <button
                hlmBtn
                [variant]="item ? 'default' : 'outline'"
                size="sm"
                class="font-mono"
                (click)="toggleItem($index)">
                {{ item }}
              </button>
            }
          </div>
          <p class="text-xs text-muted-foreground mt-2">Toggle all to <code>true</code> to pass the check</p>
        </div>

        <!-- Result badge -->
        <div class="rounded-lg border p-6 text-center transition-colors"
          [class.border-green-500/30]="items() | every:true"
          [class.bg-green-500/5]="items() | every:true"
          [class.border-red-500/30]="!(items() | every:true)"
          [class.bg-red-500/5]="!(items() | every:true)">
          <div class="text-4xl font-bold mb-2" [class.text-green-500]="items() | every:true" [class.text-red-500]="!(items() | every:true)">
            {{ (items() | every:true) ? 'PASS' : 'FAIL' }}
          </div>
          <div class="text-sm text-muted-foreground">
            items | every:true → {{ items() | every:true }}
          </div>
        </div>

        <!-- Pipe output -->
        <div class="rounded-md bg-muted p-4 border border-border">
          <div class="text-xs text-muted-foreground mb-1 font-mono">{{ items() | json }} | every:true</div>
          <code class="text-sm font-mono">{{ items() | every:true }}</code>
        </div>
      }

      @if (mode() === 'object') {
        <!-- Object: task checklist -->
        <div>
          <p class="text-sm font-medium mb-2">Sprint Tasks <span class="text-xs text-muted-foreground">(click to toggle status)</span></p>
          <div class="space-y-2">
            @for (task of tasks(); track task.id; let i = $index) {
              <button
                class="w-full rounded-lg border p-3 flex items-center gap-3 cursor-pointer transition-colors"
                [class.border-green-500/30]="task.status === 'done'"
                [class.bg-green-500/5]="task.status === 'done'"
                [class.border-border]="task.status !== 'done'"
                (click)="toggleTask(i)">
                <div class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                  [class.bg-green-500/20]="task.status === 'done'"
                  [class.text-green-500]="task.status === 'done'"
                  [class.bg-muted]="task.status !== 'done'"
                  [class.text-muted-foreground]="task.status !== 'done'">
                  {{ task.status === 'done' ? '✓' : task.id }}
                </div>
                <div class="flex-1 text-left">
                  <div class="text-sm font-medium">{{ task.title }}</div>
                </div>
                <span class="text-[10px] px-2 py-0.5 rounded-full font-medium"
                  [class.bg-green-500/10]="task.status === 'done'"
                  [class.text-green-500]="task.status === 'done'"
                  [class.bg-amber-500/10]="task.status === 'pending'"
                  [class.text-amber-500]="task.status === 'pending'">
                  {{ task.status }}
                </span>
              </button>
            }
          </div>
        </div>

        <!-- Sprint status -->
        <div class="rounded-lg border p-6 text-center transition-colors"
          [class.border-green-500/30]="tasks() | every:'done':'status'"
          [class.bg-green-500/5]="tasks() | every:'done':'status'"
          [class.border-amber-500/30]="!(tasks() | every:'done':'status')"
          [class.bg-amber-500/5]="!(tasks() | every:'done':'status')">
          <div class="text-3xl font-bold mb-2"
            [class.text-green-500]="tasks() | every:'done':'status'"
            [class.text-amber-500]="!(tasks() | every:'done':'status')">
            {{ (tasks() | every:'done':'status') ? 'Sprint Complete!' : 'Sprint In Progress' }}
          </div>
          <div class="text-sm text-muted-foreground">
            tasks | every:'done':'status' → {{ tasks() | every:'done':'status' }}
          </div>
        </div>

        <!-- Pipe output -->
        <div class="rounded-md bg-muted p-4 border border-border">
          <div class="text-xs text-muted-foreground mb-1 font-mono">tasks | every:'done':'status'</div>
          <code class="text-sm font-mono">{{ tasks() | every:'done':'status' }}</code>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EveryPlayground {
  mode = signal<'primitive' | 'object'>('primitive');

  items = signal<boolean[]>([true, true, false, true, false, true]);

  tasks = signal<Task[]>([
    { id: 1, title: 'Design API schema', status: 'done' },
    { id: 2, title: 'Implement auth middleware', status: 'done' },
    { id: 3, title: 'Write unit tests', status: 'pending' },
    { id: 4, title: 'Set up CI pipeline', status: 'done' },
    { id: 5, title: 'Deploy to staging', status: 'pending' },
    { id: 6, title: 'Code review', status: 'done' },
  ]);

  setMode(m: 'primitive' | 'object') { this.mode.set(m); }

  toggleItem(index: number) {
    this.items.update(arr => {
      const copy = [...arr];
      copy[index] = !copy[index];
      return copy;
    });
  }

  toggleTask(index: number) {
    this.tasks.update(arr => {
      const copy = arr.map(t => ({ ...t }));
      copy[index].status = copy[index].status === 'done' ? 'pending' : 'done';
      return copy;
    });
  }
}
