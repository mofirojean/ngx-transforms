import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RepeatPipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';

interface Preset {
  label: string;
  value: string;
  count: number;
  separator: string;
}

@Component({
  selector: 'app-repeat-playground',
  standalone: true,
  imports: [HlmButtonImports, HlmInputImports, FormsModule, RepeatPipe],
  template: `
    <div class="flex flex-col gap-6 p-5">

      <!-- Presets -->
      <div>
        <p class="text-sm font-medium mb-2">Scenarios</p>
        <div class="flex flex-wrap gap-2">
          @for (p of presets; track p.label) {
            <button hlmBtn [variant]="activePreset() === p.label ? 'default' : 'outline'" size="sm" (click)="loadPreset(p)">{{ p.label }}</button>
          }
        </div>
      </div>

      <!-- Inputs -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div class="grid w-full gap-1.5">
          <label for="rpt-value" class="text-sm font-medium">Value</label>
          <input id="rpt-value" hlmInput type="text" [(ngModel)]="valueModel" (ngModelChange)="onValue($event)" class="w-full font-mono" />
        </div>
        <div class="grid w-full gap-1.5">
          <label for="rpt-count" class="text-sm font-medium">Count</label>
          <div class="flex items-center gap-2">
            <button hlmBtn variant="outline" size="sm" class="w-8 h-8 p-0" (click)="adjustCount(-1)" [disabled]="count() <= 0">-</button>
            <span class="text-lg font-bold w-8 text-center font-mono">{{ count() }}</span>
            <button hlmBtn variant="outline" size="sm" class="w-8 h-8 p-0" (click)="adjustCount(1)">+</button>
          </div>
        </div>
        <div class="grid w-full gap-1.5">
          <label for="rpt-sep" class="text-sm font-medium">Separator</label>
          <input id="rpt-sep" hlmInput type="text" [(ngModel)]="sepModel" (ngModelChange)="onSep($event)" maxlength="10" class="w-full font-mono" placeholder="(empty = no separator)" />
        </div>
      </div>

      <!-- Result -->
      <div class="rounded-lg border border-blue-500/20 bg-blue-500/5 p-6 text-center">
        <div class="text-sm text-muted-foreground mb-1">Repeated {{ count() }} times</div>
        <div class="text-3xl font-bold text-blue-500 mb-2 font-mono break-all">{{ value() | repeat:count():separator() }}</div>
        <div class="text-sm text-muted-foreground">'{{ value() }}' | repeat:{{ count() }}{{ separator() ? ':' + "'" + separator() + "'" : '' }}</div>
      </div>

      <!-- Pipe output -->
      <div class="rounded-md bg-muted p-4 border border-border">
        <div class="text-xs text-muted-foreground mb-1 font-mono">'{{ value() }}' | repeat:{{ count() }}{{ separator() ? ":'" + separator() + "'" : '' }}</div>
        <code class="text-sm font-mono break-all">'{{ value() | repeat:count():separator() }}'</code>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepeatPlayground {
  value = signal('-');
  count = signal(10);
  separator = signal('');
  activePreset = signal('Divider line');

  valueModel = '-';
  sepModel = '';

  presets: Preset[] = [
    { label: 'Divider line', value: '-', count: 10, separator: '' },
    { label: 'Double-line', value: '=', count: 20, separator: '' },
    { label: 'Laugh', value: 'ha', count: 4, separator: '' },
    { label: 'CSV', value: 'item', count: 3, separator: ', ' },
    { label: 'Chain', value: 'link', count: 4, separator: ' -> ' },
    { label: 'Hearts', value: 'o', count: 6, separator: '' },
  ];

  loadPreset(p: Preset) {
    this.activePreset.set(p.label);
    this.value.set(p.value);
    this.count.set(p.count);
    this.separator.set(p.separator);
    this.valueModel = p.value;
    this.sepModel = p.separator;
  }

  onValue(v: string) {
    this.value.set(v);
    this.activePreset.set('');
  }

  onSep(s: string) {
    this.separator.set(s);
    this.activePreset.set('');
  }

  adjustCount(delta: number) {
    this.count.update(n => Math.max(0, n + delta));
    this.activePreset.set('');
  }
}
