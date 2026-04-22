import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WrapPipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';

interface Preset {
  label: string;
  value: string;
  prefix: string;
  suffix: string;
}

@Component({
  selector: 'app-wrap-playground',
  standalone: true,
  imports: [HlmButtonImports, HlmInputImports, FormsModule, WrapPipe],
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

      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div class="grid w-full gap-1.5">
          <label for="wrap-value" class="text-sm font-medium">Value</label>
          <input id="wrap-value" hlmInput type="text" [(ngModel)]="valueModel" (ngModelChange)="onValue($event)" class="w-full font-mono" />
        </div>
        <div class="grid w-full gap-1.5">
          <label for="wrap-prefix" class="text-sm font-medium">Prefix</label>
          <input id="wrap-prefix" hlmInput type="text" [(ngModel)]="prefixModel" (ngModelChange)="onPrefix($event)" class="w-full font-mono" />
        </div>
        <div class="grid w-full gap-1.5">
          <label for="wrap-suffix" class="text-sm font-medium">Suffix <span class="text-xs text-muted-foreground">(empty = same as prefix)</span></label>
          <input id="wrap-suffix" hlmInput type="text" [(ngModel)]="suffixModel" (ngModelChange)="onSuffix($event)" class="w-full font-mono" />
        </div>
      </div>

      <div class="rounded-lg border border-blue-500/20 bg-blue-500/5 p-6 text-center">
        <div class="text-sm text-muted-foreground mb-1">Wrapped</div>
        <div class="text-3xl font-bold text-blue-500 mb-2 font-mono break-all">{{ value() | wrap:prefix():suffix() }}</div>
        <div class="text-sm text-muted-foreground">'{{ value() }}' | wrap:'{{ prefix() }}'{{ suffix() ? ":'" + suffix() + "'" : '' }}</div>
      </div>

      <div class="rounded-md bg-muted p-4 border border-border">
        <div class="text-xs text-muted-foreground mb-1 font-mono">'{{ value() }}' | wrap:'{{ prefix() }}':'{{ suffix() }}'</div>
        <code class="text-sm font-mono break-all">'{{ value() | wrap:prefix():suffix() }}'</code>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WrapPlayground {
  value = signal('value');
  prefix = signal('[');
  suffix = signal(']');
  active = signal('Brackets');

  valueModel = 'value';
  prefixModel = '[';
  suffixModel = ']';

  presets: Preset[] = [
    { label: 'Brackets', value: 'value', prefix: '[', suffix: ']' },
    { label: 'Bold markdown', value: 'bold', prefix: '**', suffix: '**' },
    { label: 'Parens', value: '42', prefix: '(', suffix: ')' },
    { label: 'HTML tag', value: 'span', prefix: '<', suffix: '>' },
    { label: 'Quoted', value: 'hello', prefix: '"', suffix: '"' },
    { label: 'HTML comment', value: 'todo', prefix: '<!-- ', suffix: ' -->' },
  ];

  load(p: Preset) {
    this.active.set(p.label);
    this.value.set(p.value);
    this.prefix.set(p.prefix);
    this.suffix.set(p.suffix);
    this.valueModel = p.value;
    this.prefixModel = p.prefix;
    this.suffixModel = p.suffix;
  }

  onValue(v: string) { this.value.set(v); this.active.set(''); }
  onPrefix(v: string) { this.prefix.set(v); this.active.set(''); }
  onSuffix(v: string) { this.suffix.set(v); this.active.set(''); }
}