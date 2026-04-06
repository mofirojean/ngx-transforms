import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { SomePipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';

interface Server {
  id: number;
  name: string;
  status: string;
}

@Component({
  selector: 'app-some-playground',
  standalone: true,
  imports: [HlmButtonImports, SomePipe, JsonPipe],
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
        <!-- Primitive: toggle values -->
        <div>
          <p class="text-sm font-medium mb-2">Click items to toggle between true/false</p>
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
          <p class="text-xs text-muted-foreground mt-2">At least one <code>true</code> to pass the check</p>
        </div>

        <!-- Result badge -->
        <div class="rounded-lg border p-6 text-center transition-colors"
          [class.border-green-500/30]="items() | some:true"
          [class.bg-green-500/5]="items() | some:true"
          [class.border-red-500/30]="!(items() | some:true)"
          [class.bg-red-500/5]="!(items() | some:true)">
          <div class="text-4xl font-bold mb-2" [class.text-green-500]="items() | some:true" [class.text-red-500]="!(items() | some:true)">
            {{ (items() | some:true) ? 'FOUND' : 'NONE' }}
          </div>
          <div class="text-sm text-muted-foreground">
            items | some:true → {{ items() | some:true }}
          </div>
        </div>

        <!-- Pipe output -->
        <div class="rounded-md bg-muted p-4 border border-border">
          <div class="text-xs text-muted-foreground mb-1 font-mono">{{ items() | json }} | some:true</div>
          <code class="text-sm font-mono">{{ items() | some:true }}</code>
        </div>
      }

      @if (mode() === 'object') {
        <!-- Object: server monitoring -->
        <div>
          <p class="text-sm font-medium mb-2">Server Dashboard <span class="text-xs text-muted-foreground">(click to toggle status)</span></p>
          <div class="space-y-2">
            @for (server of servers(); track server.id; let i = $index) {
              <button
                class="w-full rounded-lg border p-3 flex items-center gap-3 cursor-pointer transition-colors"
                [class.border-red-500/30]="server.status === 'down'"
                [class.bg-red-500/5]="server.status === 'down'"
                [class.border-green-500/30]="server.status === 'healthy'"
                [class.bg-green-500/5]="server.status === 'healthy'"
                (click)="toggleServer(i)">
                <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                  [class.bg-green-500/20]="server.status === 'healthy'"
                  [class.text-green-500]="server.status === 'healthy'"
                  [class.bg-red-500/20]="server.status === 'down'"
                  [class.text-red-500]="server.status === 'down'">
                  {{ server.status === 'healthy' ? '✓' : '!' }}
                </div>
                <div class="flex-1 text-left">
                  <div class="text-sm font-medium">{{ server.name }}</div>
                </div>
                <span class="text-[10px] px-2 py-0.5 rounded-full font-medium"
                  [class.bg-green-500/10]="server.status === 'healthy'"
                  [class.text-green-500]="server.status === 'healthy'"
                  [class.bg-red-500/10]="server.status === 'down'"
                  [class.text-red-500]="server.status === 'down'">
                  {{ server.status }}
                </span>
              </button>
            }
          </div>
        </div>

        <!-- Alert status -->
        <div class="rounded-lg border p-6 text-center transition-colors"
          [class.border-red-500/30]="servers() | some:'down':'status'"
          [class.bg-red-500/5]="servers() | some:'down':'status'"
          [class.border-green-500/30]="!(servers() | some:'down':'status')"
          [class.bg-green-500/5]="!(servers() | some:'down':'status')">
          <div class="text-3xl font-bold mb-2"
            [class.text-red-500]="servers() | some:'down':'status'"
            [class.text-green-500]="!(servers() | some:'down':'status')">
            {{ (servers() | some:'down':'status') ? 'Alert: Server Down!' : 'All Systems Operational' }}
          </div>
          <div class="text-sm text-muted-foreground">
            servers | some:'down':'status' → {{ servers() | some:'down':'status' }}
          </div>
        </div>

        <!-- Pipe output -->
        <div class="rounded-md bg-muted p-4 border border-border">
          <div class="text-xs text-muted-foreground mb-1 font-mono">servers | some:'down':'status'</div>
          <code class="text-sm font-mono">{{ servers() | some:'down':'status' }}</code>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SomePlayground {
  mode = signal<'primitive' | 'object'>('primitive');

  items = signal<boolean[]>([false, false, true, false, false, false]);

  servers = signal<Server[]>([
    { id: 1, name: 'api-prod-01', status: 'healthy' },
    { id: 2, name: 'api-prod-02', status: 'healthy' },
    { id: 3, name: 'worker-01', status: 'down' },
    { id: 4, name: 'worker-02', status: 'healthy' },
    { id: 5, name: 'db-primary', status: 'healthy' },
    { id: 6, name: 'db-replica', status: 'healthy' },
  ]);

  setMode(m: 'primitive' | 'object') { this.mode.set(m); }

  toggleItem(index: number) {
    this.items.update(arr => {
      const copy = [...arr];
      copy[index] = !copy[index];
      return copy;
    });
  }

  toggleServer(index: number) {
    this.servers.update(arr => {
      const copy = arr.map(s => ({ ...s }));
      copy[index].status = copy[index].status === 'healthy' ? 'down' : 'healthy';
      return copy;
    });
  }
}
