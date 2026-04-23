import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KeysPipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';

interface Preset {
  label: string;
  json: string;
}

@Component({
  selector: 'app-keys-playground',
  standalone: true,
  imports: [HlmButtonImports, HlmInputImports, FormsModule, KeysPipe, JsonPipe],
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
        <label for="keys-input" class="text-sm font-medium">Object (JSON)</label>
        <textarea id="keys-input" hlmInput rows="4" [ngModel]="json()" (ngModelChange)="onJson($event)" class="w-full font-mono text-sm resize-none h-28"></textarea>
      </div>

      @if (parseResult().error) {
        <div class="rounded-md border border-red-500/30 bg-red-500/5 p-3 text-sm text-red-600 dark:text-red-400 font-mono">
          JSON error: {{ parseResult().error }}
        </div>
      }

      <div class="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
        <div class="text-xs text-muted-foreground mb-2">Keys ({{ (parseResult().value | keys).length }})</div>
        @if ((parseResult().value | keys).length > 0) {
          <div class="flex flex-wrap gap-2">
            @for (key of parseResult().value | keys; track key) {
              <span class="inline-flex items-center rounded-md border border-blue-500/30 bg-background px-2.5 py-1 text-sm font-mono text-blue-600 dark:text-blue-400">{{ key }}</span>
            }
          </div>
        } @else {
          <div class="text-sm text-muted-foreground">No keys</div>
        }
      </div>

      <div class="rounded-md bg-muted p-4 border border-border">
        <div class="text-xs text-muted-foreground mb-1 font-mono">obj | keys</div>
        <code class="text-sm font-mono break-all">{{ parseResult().value | keys | json }}</code>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeysPlayground {
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
    { label: 'Config', json: '{ "host": "localhost", "port": 3000, "ssl": false }' },
    { label: 'Empty', json: '{}' },
    { label: 'Array', json: '["a", "b", "c"]' },
    { label: 'Nested', json: '{ "user": { "name": "Bob" }, "active": true }' },
    { label: 'Many keys', json: '{ "a": 1, "b": 2, "c": 3, "d": 4, "e": 5, "f": 6 }' },
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