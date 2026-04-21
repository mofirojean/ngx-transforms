import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SplitPipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';

interface Preset {
  label: string;
  value: string;
  separator: string;
}

@Component({
  selector: 'app-split-playground',
  standalone: true,
  imports: [HlmButtonImports, HlmInputImports, FormsModule, SplitPipe, JsonPipe],
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

      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div class="grid w-full gap-1.5">
          <label for="split-value" class="text-sm font-medium">Input</label>
          <input id="split-value" hlmInput type="text" [(ngModel)]="valueModel" (ngModelChange)="onValue($event)" class="w-full font-mono" />
        </div>
        <div class="grid w-full gap-1.5">
          <label for="split-sep" class="text-sm font-medium">Separator</label>
          <input id="split-sep" hlmInput type="text" [(ngModel)]="sepModel" (ngModelChange)="onSep($event)" class="w-full font-mono" />
        </div>
      </div>

      <div class="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
        <div class="text-xs text-muted-foreground mb-2">Result ({{ (value() | split:separator()).length }} items)</div>
        <div class="flex flex-wrap gap-2">
          @for (part of value() | split:separator(); track $index) {
            <span class="inline-flex items-center rounded-md border border-blue-500/30 bg-background px-2.5 py-1 text-sm font-mono">{{ part }}</span>
          }
        </div>
      </div>

      <div class="rounded-md bg-muted p-4 border border-border">
        <div class="text-xs text-muted-foreground mb-1 font-mono">'{{ value() }}' | split:'{{ separator() }}'</div>
        <code class="text-sm font-mono break-all">{{ value() | split:separator() | json }}</code>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplitPlayground {
  value = signal('a,b,c,d');
  separator = signal(',');
  active = signal('CSV');

  valueModel = 'a,b,c,d';
  sepModel = ',';

  presets: Preset[] = [
    { label: 'CSV', value: 'a,b,c,d', separator: ',' },
    { label: 'Words', value: 'one two three four', separator: ' ' },
    { label: 'Path', value: '/users/john/docs/file.txt', separator: '/' },
    { label: 'Email parts', value: 'user.name@example.com', separator: '@' },
    { label: 'Chars', value: 'abcdef', separator: '' },
    { label: 'Lines', value: 'line1\nline2\nline3', separator: '\n' },
  ];

  load(p: Preset) {
    this.active.set(p.label);
    this.value.set(p.value);
    this.separator.set(p.separator);
    this.valueModel = p.value;
    this.sepModel = p.separator;
  }

  onValue(v: string) {
    this.value.set(v);
    this.active.set('');
  }

  onSep(s: string) {
    this.separator.set(s);
    this.active.set('');
  }
}
