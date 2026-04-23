import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KeysPipe, ValuesPipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';

interface Preset {
  label: string;
  json: string;
}

@Component({
  selector: 'app-values-playground',
  standalone: true,
  imports: [HlmButtonImports, HlmInputImports, FormsModule, ValuesPipe, KeysPipe, JsonPipe],
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
        <label for="vals-input" class="text-sm font-medium">Object (JSON)</label>
        <textarea id="vals-input" hlmInput rows="4" [ngModel]="json()" (ngModelChange)="onJson($event)" class="w-full font-mono text-sm resize-none h-28"></textarea>
      </div>

      @if (parseResult().error) {
        <div class="rounded-md border border-red-500/30 bg-red-500/5 p-3 text-sm text-red-600 dark:text-red-400 font-mono">
          JSON error: {{ parseResult().error }}
        </div>
      }

      <!-- keys + values side-by-side -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div class="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
          <div class="text-xs text-muted-foreground mb-2">Keys ({{ (parseResult().value | keys).length }})</div>
          <div class="flex flex-wrap gap-2 max-h-40 overflow-auto">
            @for (key of parseResult().value | keys; track key) {
              <span class="inline-flex items-center rounded-md border border-blue-500/30 bg-background px-2.5 py-1 text-sm font-mono text-blue-600 dark:text-blue-400">{{ key }}</span>
            }
          </div>
        </div>
        <div class="rounded-lg border border-green-500/30 bg-green-500/10 p-4 ring-2 ring-green-500/20">
          <div class="text-xs text-muted-foreground mb-2">Values ({{ (parseResult().value | values).length }})</div>
          <div class="flex flex-wrap gap-2 max-h-40 overflow-auto">
            @for (val of parseResult().value | values; track $index) {
              <span class="inline-flex items-center rounded-md border border-green-500/30 bg-background px-2.5 py-1 text-sm font-mono text-green-600 dark:text-green-400">{{ stringify(val) }}</span>
            }
          </div>
        </div>
      </div>

      <div class="rounded-md bg-muted p-4 border border-border">
        <div class="text-xs text-muted-foreground mb-1 font-mono">obj | values</div>
        <code class="text-sm font-mono break-all">{{ parseResult().value | values | json }}</code>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValuesPlayground {
  json = signal('{ "name": "Alice", "age": 30, "email": "a@b.com" }');
  active = signal('User');

  parseResult = computed<{ value: unknown; error: string }>(() => {
    try {
      return { value: JSON.parse(this.json()), error: '' };
    } catch (e) {
      return { value: {}, error: (e as Error).message };
    }
  });

  presets: Preset[] = [
    { label: 'User', json: '{ "name": "Alice", "age": 30, "email": "a@b.com" }' },
    { label: 'Stats', json: '{ "min": 1, "max": 99, "avg": 50 }' },
    { label: 'Empty', json: '{}' },
    { label: 'Array', json: '["a", "b", "c"]' },
    { label: 'Mixed types', json: '{ "name": "Bob", "active": true, "tags": ["admin"] }' },
    { label: 'With null', json: '{ "a": 1, "b": null, "c": "x" }' },
  ];

  load(p: Preset) {
    this.active.set(p.label);
    this.json.set(p.json);
  }

  onJson(v: string) {
    this.json.set(v);
    this.active.set('');
  }

  stringify(value: unknown): string {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (typeof value === 'string') return `"${value}"`;
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  }
}