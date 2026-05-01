import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IsObjectPipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';

interface Preset {
  label: string;
  json: string;
}

@Component({
  selector: 'app-is-object-playground',
  standalone: true,
  imports: [HlmButtonImports, HlmInputImports, FormsModule, IsObjectPipe, JsonPipe],
  template: `
    <div class="flex flex-col gap-6 p-5">
      <div>
        <p class="text-sm font-medium mb-2">Try a value</p>
        <div class="flex flex-wrap gap-2">
          @for (p of presets; track p.label) {
            <button hlmBtn [variant]="active() === p.label ? 'default' : 'outline'" size="sm" (click)="load(p)">{{ p.label }}</button>
          }
        </div>
      </div>

      <div class="grid w-full gap-1.5">
        <label for="is-object-input" class="text-sm font-medium">Custom value (JSON)</label>
        <input id="is-object-input" hlmInput [ngModel]="json()" (ngModelChange)="onJson($event)" class="w-full font-mono text-sm" />
      </div>

      @if (parseResult().error) {
        <div class="rounded-md border border-red-500/30 bg-red-500/5 p-3 text-sm text-red-600 dark:text-red-400 font-mono">
          JSON error: {{ parseResult().error }}
        </div>
      }

      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div class="rounded-lg border border-border bg-muted/30 p-4">
          <div class="text-xs text-muted-foreground mb-2">Value</div>
          <code class="text-sm font-mono break-all block bg-background rounded p-3 border border-border">{{ parseResult().value | json }}</code>
        </div>
        <div class="rounded-lg p-4" [class.border]="true" [class.border-green-500]="parseResult().value | isObject" [class.bg-green-500\\/5]="parseResult().value | isObject" [class.border-amber-500\\/40]="!(parseResult().value | isObject)" [class.bg-amber-500\\/5]="!(parseResult().value | isObject)">
          <div class="text-xs text-muted-foreground mb-2">Result</div>
          <code class="text-2xl font-mono font-bold block" [class.text-green-600]="parseResult().value | isObject" [class.dark:text-green-400]="parseResult().value | isObject" [class.text-amber-600]="!(parseResult().value | isObject)" [class.dark:text-amber-400]="!(parseResult().value | isObject)">{{ parseResult().value | isObject }}</code>
        </div>
      </div>

      <div class="rounded-md bg-muted p-4 border border-border">
        <div class="text-xs text-muted-foreground mb-1 font-mono">value | isObject</div>
        <code class="text-sm font-mono">{{ parseResult().value | isObject }}</code>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IsObjectPlayground {
  json = signal('{ "name": "Alice", "age": 30 }');
  active = signal('Plain object');

  parseResult = computed<{ value: unknown; error: string }>(() => {
    const raw = this.json().trim();
    if (raw === '') return { value: undefined, error: '' };
    try {
      return { value: JSON.parse(raw), error: '' };
    } catch (e) {
      return { value: undefined, error: (e as Error).message };
    }
  });

  presets: Preset[] = [
    { label: 'Plain object', json: '{ "name": "Alice", "age": 30 }' },
    { label: 'Empty object', json: '{}' },
    { label: 'Nested', json: '{ "user": { "id": 1 } }' },
    { label: 'Array', json: '[1, 2, 3]' },
    { label: 'Null', json: 'null' },
    { label: 'String', json: '"abc"' },
    { label: 'Number', json: '42' },
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
