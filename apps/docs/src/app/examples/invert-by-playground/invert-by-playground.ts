import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InvertByPipe, InvertPipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';

interface Preset {
  label: string;
  json: string;
}

@Component({
  selector: 'app-invert-by-playground',
  standalone: true,
  imports: [HlmButtonImports, HlmInputImports, FormsModule, InvertByPipe, InvertPipe, JsonPipe],
  template: `
    <div class="flex flex-col gap-6 p-5">
      <div>
        <p class="text-sm font-medium mb-2">Scenarios</p>
        <div class="flex flex-wrap gap-2">
          @for (p of presets; track p.label) {
            <button hlmBtn [variant]="active() === p.label ? 'default' : 'outline'" size="sm" (click)="load(p)">{{ p.label }}</button>
          }
        </div>
      </div>

      <div class="grid w-full gap-1.5">
        <label for="invertby-input" class="text-sm font-medium">Source object (JSON)</label>
        <textarea id="invertby-input" hlmInput rows="4" [ngModel]="json()" (ngModelChange)="onJson($event)" class="w-full font-mono text-sm resize-none h-28"></textarea>
      </div>

      @if (parseResult().error) {
        <div class="rounded-md border border-red-500/30 bg-red-500/5 p-3 text-sm text-red-600 dark:text-red-400 font-mono">
          JSON error: {{ parseResult().error }}
        </div>
      }

      <div class="rounded-lg border border-green-500/30 bg-green-500/10 p-4 ring-2 ring-green-500/20">
        <div class="text-xs text-muted-foreground mb-2">invertBy (groups all keys per value)</div>
        <code class="text-sm font-mono break-all block bg-background rounded p-3 border border-green-500/30 text-green-600 dark:text-green-400">{{ parseResult().value | invertBy | json }}</code>
      </div>

      <!-- Side by side with invert to show the difference -->
      <div>
        <p class="text-sm font-medium mb-2">vs invert (collisions lose data)</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-lg border border-purple-500/20 bg-purple-500/5 p-4">
            <div class="text-xs text-muted-foreground mb-2">invert</div>
            <code class="text-xs font-mono break-all block bg-background rounded p-2 border border-purple-500/30 text-purple-600 dark:text-purple-400">{{ parseResult().value | invert | json }}</code>
          </div>
          <div class="rounded-lg border border-green-500/30 bg-green-500/10 p-4">
            <div class="text-xs text-muted-foreground mb-2">invertBy</div>
            <code class="text-xs font-mono break-all block bg-background rounded p-2 border border-green-500/30 text-green-600 dark:text-green-400">{{ parseResult().value | invertBy | json }}</code>
          </div>
        </div>
      </div>

      <div class="rounded-md bg-muted p-4 border border-border">
        <div class="text-xs text-muted-foreground mb-1 font-mono">obj | invertBy</div>
        <code class="text-sm font-mono break-all">{{ parseResult().value | invertBy | json }}</code>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvertByPlayground {
  json = signal('{ "alice": "admin", "bob": "user", "carol": "admin", "dave": "user", "emma": "viewer" }');
  active = signal('Roles');

  parseResult = computed<{ value: unknown; error: string }>(() => {
    try {
      return { value: JSON.parse(this.json()), error: '' };
    } catch (e) {
      return { value: {}, error: (e as Error).message };
    }
  });

  presets: Preset[] = [
    { label: 'Roles', json: '{ "alice": "admin", "bob": "user", "carol": "admin", "dave": "user", "emma": "viewer" }' },
    { label: 'Status counts', json: '{ "task1": "done", "task2": "pending", "task3": "done", "task4": "blocked" }' },
    { label: 'Score buckets', json: '{ "alice": "A", "bob": "B", "carol": "A", "dave": "C", "emma": "B" }' },
    { label: 'Numeric collision', json: '{ "a": 1, "b": 2, "c": 1, "d": 3, "e": 2 }' },
    { label: 'No collisions', json: '{ "a": 1, "b": 2, "c": 3 }' },
    { label: 'All same', json: '{ "x": "yes", "y": "yes", "z": "yes" }' },
  ];

  load(p: Preset) {
    this.active.set(p.label);
    this.json.set(p.json);
  }

  onJson(v: string) {
    this.json.set(v);
    this.active.set('');
  }
}
