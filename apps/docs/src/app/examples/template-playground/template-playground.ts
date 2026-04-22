import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TemplatePipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';

interface Preset {
  label: string;
  template: string;
  json: string;
}

interface ParseResult {
  values: Record<string, unknown>;
  error: string;
}

@Component({
  selector: 'app-template-playground',
  standalone: true,
  imports: [HlmButtonImports, HlmInputImports, FormsModule, TemplatePipe],
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
        <label for="tpl-template" class="text-sm font-medium">Template (use &#123;key&#125; or &#123;user.name&#125;)</label>
        <input id="tpl-template" hlmInput type="text" [ngModel]="template()" (ngModelChange)="onTemplate($event)" class="w-full font-mono" />
      </div>

      <div class="grid w-full gap-1.5">
        <label for="tpl-json" class="text-sm font-medium">Values (JSON)</label>
        <textarea id="tpl-json" hlmInput rows="3" [ngModel]="json()" (ngModelChange)="onJson($event)" class="w-full font-mono text-sm resize-none h-24"></textarea>
      </div>

      @if (parseResult().error) {
        <div class="rounded-md border border-red-500/30 bg-red-500/5 p-3 text-sm text-red-600 dark:text-red-400 font-mono">
          JSON error: {{ parseResult().error }}
        </div>
      }

      <div class="rounded-lg border border-blue-500/20 bg-blue-500/5 p-6 text-center">
        <div class="text-sm text-muted-foreground mb-1">Output</div>
        <div class="text-3xl font-bold text-blue-500 mb-2 font-mono break-all">{{ template() | template:parseResult().values }}</div>
      </div>

      <div class="rounded-md bg-muted p-4 border border-border">
        <div class="text-xs text-muted-foreground mb-1 font-mono">'{{ template() }}' | template:{{ json() }}</div>
        <code class="text-sm font-mono break-all">'{{ template() | template:parseResult().values }}'</code>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplatePlayground {
  template = signal('Hello {name}!');
  json = signal('{ "name": "Alice" }');
  active = signal('Greeting');

  parseResult = computed<ParseResult>(() => {
    try {
      const parsed = JSON.parse(this.json());
      return {
        values: parsed && typeof parsed === 'object' ? parsed : {},
        error: '',
      };
    } catch (e) {
      return { values: {}, error: (e as Error).message };
    }
  });

  presets: Preset[] = [
    { label: 'Greeting', template: 'Hello {name}!', json: '{ "name": "Alice" }' },
    { label: 'Profile', template: '{user.name} ({user.age})', json: '{ "user": { "name": "Bob", "age": 30 } }' },
    { label: 'Welcome', template: '{greeting} back, {name}!', json: '{ "greeting": "Welcome", "name": "Carol" }' },
    { label: 'Missing key', template: 'Hi {missing}!', json: '{ "name": "Dave" }' },
    { label: 'Multiple', template: '{x} + {y} = {z}', json: '{ "x": 2, "y": 3, "z": 5 }' },
    { label: 'Nested deep', template: '{a.b.c}', json: '{ "a": { "b": { "c": "deep" } } }' },
  ];

  load(p: Preset) {
    this.active.set(p.label);
    this.template.set(p.template);
    this.json.set(p.json);
  }

  onTemplate(v: string) {
    this.template.set(v);
    this.active.set('');
  }

  onJson(v: string) {
    this.json.set(v);
    this.active.set('');
  }
}
