import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IsFunctionPipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';

interface Preset {
  label: string;
  build: () => unknown;
  description: string;
}

@Component({
  selector: 'app-is-function-playground',
  standalone: true,
  imports: [HlmButtonImports, HlmInputImports, FormsModule, IsFunctionPipe],
  template: `
    <div class="flex flex-col gap-6 p-5">
      <div>
        <p class="text-sm font-medium mb-2">Try a value</p>
        <div class="flex flex-wrap gap-2">
          @for (p of presets; track p.label) {
            <button hlmBtn [variant]="active() === p.label ? 'default' : 'outline'" size="sm" (click)="load(p)">{{ p.label }}</button>
          }
        </div>
        <p class="text-xs text-muted-foreground mt-2">{{ description() }}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div class="rounded-lg border border-border bg-muted/30 p-4">
          <div class="text-xs text-muted-foreground mb-2">Value (JSON-stringified)</div>
          <code class="text-sm font-mono break-all block bg-background rounded p-3 border border-border">{{ rendered() }}</code>
        </div>
        <div class="rounded-lg p-4" [class.border]="true" [class.border-green-500]="value() | isFunction" [class.bg-green-500\\/5]="value() | isFunction" [class.border-amber-500\\/40]="!(value() | isFunction)" [class.bg-amber-500\\/5]="!(value() | isFunction)">
          <div class="text-xs text-muted-foreground mb-2">Result</div>
          <code class="text-2xl font-mono font-bold block" [class.text-green-600]="value() | isFunction" [class.dark:text-green-400]="value() | isFunction" [class.text-amber-600]="!(value() | isFunction)" [class.dark:text-amber-400]="!(value() | isFunction)">{{ value() | isFunction }}</code>
        </div>
      </div>

      <div class="rounded-md bg-muted p-4 border border-border">
        <div class="text-xs text-muted-foreground mb-1 font-mono">value | isFunction</div>
        <code class="text-sm font-mono">{{ value() | isFunction }}</code>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IsFunctionPlayground {
  active = signal('Arrow function');
  description = signal('A simple arrow function — typeof is "function".');
  value = signal<unknown>(() => 0);

  rendered = computed(() => {
    const v = this.value();
    if (typeof v === 'function') return `[Function: ${v.name || 'anonymous'}]`;
    try {
      return JSON.stringify(v);
    } catch {
      return String(v);
    }
  });

  presets: Preset[] = [
    { label: 'Arrow function', build: () => () => 0, description: 'A simple arrow function — typeof is "function".' },
    { label: 'Named function', build: () => function add(a: number, b: number) { return a + b; }, description: 'A regular named function declaration.' },
    { label: 'Async function', build: () => async () => 0, description: 'Async functions are still functions.' },
    { label: 'Class', build: () => class Foo {}, description: 'Class constructors count — they are callable.' },
    { label: 'Built-in', build: () => Math.max, description: 'Built-in methods like Math.max are functions.' },
    { label: 'Object', build: () => ({ call: () => 0 }), description: 'An object with a method is not itself a function.' },
    { label: 'String', build: () => '() => 0', description: 'A function literal as a string is just a string.' },
    { label: 'Null', build: () => null, description: 'Null is not callable.' },
  ];

  load(p: Preset) {
    this.active.set(p.label);
    this.description.set(p.description);
    this.value.set(p.build());
  }
}
