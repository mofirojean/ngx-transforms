import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EncodeUriComponentPipe, EncodeUriPipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';

interface Preset {
  label: string;
  value: string;
}

@Component({
  selector: 'app-encode-uri-component-playground',
  standalone: true,
  imports: [HlmButtonImports, HlmInputImports, FormsModule, EncodeUriComponentPipe, EncodeUriPipe],
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
        <label for="enc-comp-input" class="text-sm font-medium">Query value</label>
        <input id="enc-comp-input" hlmInput type="text" [(ngModel)]="model" (ngModelChange)="onChange($event)" class="w-full font-mono" />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div class="rounded-lg border border-border bg-muted/30 p-4">
          <div class="text-xs text-muted-foreground mb-2">Input</div>
          <div class="text-sm font-mono break-all bg-background rounded p-3 border border-border">{{ value() }}</div>
        </div>
        <div class="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
          <div class="text-xs text-muted-foreground mb-2">encodeURIComponent</div>
          <div class="text-sm font-mono break-all bg-background rounded p-3 border border-blue-500/30 text-blue-600 dark:text-blue-400">{{ value() | encodeURIComponent }}</div>
        </div>
      </div>

      <div>
        <p class="text-sm font-medium mb-2">vs encodeURI</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-lg border border-blue-500/30 bg-blue-500/10 p-4 ring-2 ring-blue-500/20">
            <div class="text-xs text-muted-foreground mb-2">encodeURIComponent (full)</div>
            <div class="text-sm font-bold font-mono text-blue-500 break-all bg-background rounded p-2 border border-blue-500/30">{{ value() | encodeURIComponent }}</div>
          </div>
          <div class="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
            <div class="text-xs text-muted-foreground mb-2">encodeURI (preserves URL chars)</div>
            <div class="text-sm font-bold font-mono text-amber-500 break-all bg-background rounded p-2 border border-amber-500/30">{{ value() | encodeURI }}</div>
          </div>
        </div>
      </div>

      <div class="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
        <div class="text-xs text-muted-foreground mb-2">Use in URL</div>
        <div class="text-sm font-mono break-all bg-background rounded p-3 border border-green-500/30 text-green-600 dark:text-green-400">https://search.com/?q={{ value() | encodeURIComponent }}</div>
      </div>

      <div class="rounded-md bg-muted p-4 border border-border">
        <div class="text-xs text-muted-foreground mb-1 font-mono">'{{ value() }}' | encodeURIComponent</div>
        <code class="text-sm font-mono break-all">'{{ value() | encodeURIComponent }}'</code>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EncodeUriComponentPlayground {
  value = signal('hi world&you');
  model = 'hi world&you';
  active = signal('Query with ampersand');

  presets: Preset[] = [
    { label: 'Query with ampersand', value: 'hi world&you' },
    { label: 'Path-like value', value: 'foo/bar?baz=1' },
    { label: 'Hash tag', value: '#angular' },
    { label: 'Email', value: 'a@b.com' },
    { label: 'Unicode', value: 'café résumé' },
    { label: 'Equation', value: '1+1=2' },
  ];

  load(p: Preset) {
    this.active.set(p.label);
    this.value.set(p.value);
    this.model = p.value;
  }

  onChange(v: string) {
    this.value.set(v);
    this.active.set('');
  }
}