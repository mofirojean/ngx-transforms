import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InvertPipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';

interface Preset {
  label: string;
  json: string;
}

@Component({
  selector: 'app-invert-playground',
  standalone: true,
  imports: [HlmButtonImports, HlmInputImports, FormsModule, InvertPipe, JsonPipe],
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
        <label for="invert-input" class="text-sm font-medium">Source object (JSON)</label>
        <textarea id="invert-input" hlmInput rows="4" [ngModel]="json()" (ngModelChange)="onJson($event)" class="w-full font-mono text-sm resize-none h-28"></textarea>
      </div>

      @if (parseResult().error) {
        <div class="rounded-md border border-red-500/30 bg-red-500/5 p-3 text-sm text-red-600 dark:text-red-400 font-mono">
          JSON error: {{ parseResult().error }}
        </div>
      }

      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div class="rounded-lg border border-border bg-muted/30 p-4">
          <div class="text-xs text-muted-foreground mb-2">Source</div>
          <code class="text-sm font-mono break-all block bg-background rounded p-3 border border-border">{{ parseResult().value | json }}</code>
        </div>
        <div class="rounded-lg border border-purple-500/20 bg-purple-500/5 p-4">
          <div class="text-xs text-muted-foreground mb-2">Inverted (last wins on collision)</div>
          <code class="text-sm font-mono break-all block bg-background rounded p-3 border border-purple-500/30 text-purple-600 dark:text-purple-400">{{ parseResult().value | invert | json }}</code>
        </div>
      </div>

      <div class="rounded-md bg-muted p-4 border border-border">
        <div class="text-xs text-muted-foreground mb-1 font-mono">obj | invert</div>
        <code class="text-sm font-mono break-all">{{ parseResult().value | invert | json }}</code>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvertPlayground {
  json = signal('{ "en": "hello", "fr": "bonjour", "es": "hola" }');
  active = signal('Translations');

  parseResult = computed<{ value: unknown; error: string }>(() => {
    try {
      return { value: JSON.parse(this.json()), error: '' };
    } catch (e) {
      return { value: {}, error: (e as Error).message };
    }
  });

  presets: Preset[] = [
    { label: 'Translations', json: '{ "en": "hello", "fr": "bonjour", "es": "hola" }' },
    { label: 'Numeric values', json: '{ "a": 1, "b": 2, "c": 3 }' },
    { label: 'Collision (last wins)', json: '{ "a": 1, "b": 2, "c": 1 }' },
    { label: 'Status codes', json: '{ "ok": 200, "notFound": 404, "serverError": 500 }' },
    { label: 'Booleans', json: '{ "yes": true, "no": false, "agree": true }' },
    { label: 'Empty', json: '{}' },
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
