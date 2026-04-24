import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PairsPipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';

interface Preset {
  label: string;
  json: string;
}

@Component({
  selector: 'app-pairs-playground',
  standalone: true,
  imports: [HlmButtonImports, HlmInputImports, FormsModule, PairsPipe, JsonPipe],
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
        <label for="pairs-input" class="text-sm font-medium">Object (JSON)</label>
        <textarea id="pairs-input" hlmInput rows="4" [ngModel]="json()" (ngModelChange)="onJson($event)" class="w-full font-mono text-sm resize-none h-28"></textarea>
      </div>

      @if (parseResult().error) {
        <div class="rounded-md border border-red-500/30 bg-red-500/5 p-3 text-sm text-red-600 dark:text-red-400 font-mono">
          JSON error: {{ parseResult().error }}
        </div>
      }

      <!-- Visual entries table -->
      <div class="rounded-lg border border-purple-500/20 bg-purple-500/5 p-4">
        <div class="text-xs text-muted-foreground mb-2">Entries ({{ (parseResult().value | pairs).length }})</div>
        @if ((parseResult().value | pairs).length > 0) {
          <div class="rounded-md border border-purple-500/20 overflow-hidden">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-purple-500/20 bg-background">
                  <th class="px-3 py-2 text-left font-semibold text-blue-600 dark:text-blue-400 font-mono">key</th>
                  <th class="px-3 py-2 text-left font-semibold text-green-600 dark:text-green-400 font-mono">value</th>
                </tr>
              </thead>
              <tbody>
                @for (entry of parseResult().value | pairs; track entry[0]) {
                  <tr class="border-b border-purple-500/10 last:border-0">
                    <td class="px-3 py-2 font-mono text-blue-600 dark:text-blue-400">{{ entry[0] }}</td>
                    <td class="px-3 py-2 font-mono text-green-600 dark:text-green-400">{{ stringify(entry[1]) }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        } @else {
          <div class="text-sm text-muted-foreground">No entries</div>
        }
      </div>

      <div class="rounded-md bg-muted p-4 border border-border">
        <div class="text-xs text-muted-foreground mb-1 font-mono">obj | pairs</div>
        <code class="text-sm font-mono break-all">{{ parseResult().value | pairs | json }}</code>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PairsPlayground {
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
    { label: 'Settings', json: '{ "theme": "dark", "lang": "en", "notifications": true }' },
    { label: 'Empty', json: '{}' },
    { label: 'Array', json: '["a", "b", "c"]' },
    { label: 'Mixed types', json: '{ "name": "Bob", "active": true, "tags": ["admin"] }' },
    { label: 'Stats', json: '{ "min": 1, "max": 99, "avg": 50 }' },
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