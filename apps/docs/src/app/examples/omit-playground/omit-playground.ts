import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KeysPipe, OmitPipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';

interface Preset {
  label: string;
  json: string;
  keys: string[];
}

@Component({
  selector: 'app-omit-playground',
  standalone: true,
  imports: [HlmButtonImports, HlmInputImports, FormsModule, OmitPipe, KeysPipe, JsonPipe],
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
        <label for="omit-input" class="text-sm font-medium">Source object (JSON)</label>
        <textarea id="omit-input" hlmInput rows="4" [ngModel]="json()" (ngModelChange)="onJson($event)" class="w-full font-mono text-sm resize-none h-28"></textarea>
      </div>

      @if (parseResult().error) {
        <div class="rounded-md border border-red-500/30 bg-red-500/5 p-3 text-sm text-red-600 dark:text-red-400 font-mono">
          JSON error: {{ parseResult().error }}
        </div>
      }

      <!-- Key selector -->
      <div>
        <p class="text-sm font-medium mb-2">Toggle keys to remove</p>
        <div class="flex flex-wrap gap-2">
          @for (key of parseResult().value | keys; track key) {
            <button
              hlmBtn
              [variant]="excludedKeys().includes(key) ? 'destructive' : 'outline'"
              size="sm"
              class="font-mono"
              (click)="toggleKey(key)">
              {{ key }}
            </button>
          }
        </div>
        @if ((parseResult().value | keys).length === 0) {
          <p class="text-sm text-muted-foreground">No keys to omit</p>
        }
      </div>

      <!-- Before / after -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div class="rounded-lg border border-border bg-muted/30 p-4">
          <div class="text-xs text-muted-foreground mb-2">Source ({{ (parseResult().value | keys).length }} keys)</div>
          <code class="text-sm font-mono break-all block bg-background rounded p-3 border border-border">{{ parseResult().value | json }}</code>
        </div>
        <div class="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
          <div class="text-xs text-muted-foreground mb-2">After omit ({{ (parseResult().value | omit:excludedKeys() | keys).length }} keys)</div>
          <code class="text-sm font-mono break-all block bg-background rounded p-3 border border-green-500/30 text-green-600 dark:text-green-400">{{ parseResult().value | omit:excludedKeys() | json }}</code>
        </div>
      </div>

      <div class="rounded-md bg-muted p-4 border border-border">
        <div class="text-xs text-muted-foreground mb-1 font-mono">obj | omit:{{ excludedKeys() | json }}</div>
        <code class="text-sm font-mono break-all">{{ parseResult().value | omit:excludedKeys() | json }}</code>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OmitPlayground {
  json = signal('{ "id": 1, "name": "Alice", "email": "a@b.com", "password": "secret", "role": "admin" }');
  excludedKeys = signal<string[]>(['password']);
  active = signal('Strip secrets');

  parseResult = computed<{ value: unknown; error: string }>(() => {
    try {
      return { value: JSON.parse(this.json()), error: '' };
    } catch (e) {
      return { value: {}, error: (e as Error).message };
    }
  });

  presets: Preset[] = [
    {
      label: 'Strip secrets',
      json: '{ "id": 1, "name": "Alice", "email": "a@b.com", "password": "secret", "role": "admin" }',
      keys: ['password'],
    },
    {
      label: 'Drop internals',
      json: '{ "title": "Post", "body": "...", "_id": "x", "__v": 0, "createdAt": "2026" }',
      keys: ['_id', '__v'],
    },
    {
      label: 'Audit safe',
      json: '{ "user": "Alice", "action": "login", "ip": "1.2.3.4", "userAgent": "...", "timestamp": "now" }',
      keys: ['ip', 'userAgent'],
    },
    {
      label: 'No exclusions',
      json: '{ "a": 1, "b": 2, "c": 3 }',
      keys: [],
    },
  ];

  load(p: Preset) {
    this.active.set(p.label);
    this.json.set(p.json);
    this.excludedKeys.set([...p.keys]);
  }

  onJson(v: string) {
    this.json.set(v);
    this.active.set('');
  }

  toggleKey(key: string) {
    this.excludedKeys.update((list) =>
      list.includes(key) ? list.filter((k) => k !== key) : [...list, key]
    );
    this.active.set('');
  }
}
