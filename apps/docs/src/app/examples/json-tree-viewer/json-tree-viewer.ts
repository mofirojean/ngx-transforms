import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { JsonTreeNode } from './json-tree-node';

interface Preset {
  label: string;
  json: string;
}

@Component({
  selector: 'app-json-tree-viewer',
  standalone: true,
  imports: [FormsModule, HlmButtonImports, HlmInputImports, JsonTreeNode],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-6 p-5">
      <div>
        <p class="text-sm font-medium mb-2">Try a payload</p>
        <div class="flex flex-wrap gap-2">
          @for (p of presets; track p.label) {
            <button hlmBtn [variant]="active() === p.label ? 'default' : 'outline'" size="sm" (click)="load(p)">{{ p.label }}</button>
          }
        </div>
      </div>

      <div class="grid w-full gap-1.5">
        <label for="json-input" class="text-sm font-medium">JSON</label>
        <textarea id="json-input" hlmInput rows="6" [ngModel]="json()" (ngModelChange)="onJson($event)" class="w-full font-mono text-sm resize-none h-40"></textarea>
      </div>

      @if (parseResult().error) {
        <div class="rounded-md border border-red-500/30 bg-red-500/5 p-3 text-sm text-red-600 dark:text-red-400 font-mono">
          JSON error: {{ parseResult().error }}
        </div>
      }

      <div class="rounded-lg border border-border bg-muted/30 p-4">
        <div class="text-xs text-muted-foreground mb-3">Rendered tree</div>
        <div class="bg-background rounded p-4 border border-border min-h-[6rem]">
          <app-json-tree-node [value]="parseResult().value" />
        </div>
      </div>
    </div>
  `,
})
export class JsonTreeViewer {
  json = signal(`{
  "user": { "name": "Alice", "age": 31, "roles": ["admin", "editor"] },
  "session": { "token": "abc123", "expiresIn": 3600 },
  "flags": { "beta": true, "darkMode": false, "experimentalAi": null }
}`);
  active = signal('User session');

  parseResult = computed<{ value: unknown; error: string }>(() => {
    const raw = this.json().trim();
    if (raw === '') return { value: null, error: '' };
    try {
      return { value: JSON.parse(raw), error: '' };
    } catch (e) {
      return { value: null, error: (e as Error).message };
    }
  });

  presets: Preset[] = [
    {
      label: 'User session',
      json: `{
  "user": { "name": "Alice", "age": 31, "roles": ["admin", "editor"] },
  "session": { "token": "abc123", "expiresIn": 3600 },
  "flags": { "beta": true, "darkMode": false, "experimentalAi": null }
}`,
    },
    {
      label: 'GitHub API',
      json: `{
  "id": 1296269,
  "name": "Hello-World",
  "owner": { "login": "octocat", "id": 1 },
  "topics": ["octocat", "atom", "electron"],
  "fork": false
}`,
    },
    {
      label: 'Nested arrays',
      json: `[
  [1, [2, [3, [4]]]],
  [{ "x": "deep" }, { "y": [true, false] }]
]`,
    },
    {
      label: 'Empty containers',
      json: `{ "items": [], "config": {}, "name": "" }`,
    },
    {
      label: 'Scalar',
      json: `42`,
    },
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
