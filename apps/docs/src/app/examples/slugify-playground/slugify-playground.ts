import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SlugifyPipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';

interface Preset {
  label: string;
  value: string;
  separator: string;
}

@Component({
  selector: 'app-slugify-playground',
  standalone: true,
  imports: [HlmButtonImports, HlmInputImports, FormsModule, SlugifyPipe],
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
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 md:col-span-2">
        <div class="grid w-full gap-1.5 md:col-span-2">
          <label for="slug-value" class="text-sm font-medium">Input</label>
          <input id="slug-value" hlmInput type="text" [(ngModel)]="valueModel" (ngModelChange)="onValue($event)" class="w-full font-mono" />
        </div>
        <div class="grid w-full gap-1.5">
          <label for="slug-sep" class="text-sm font-medium">Separator</label>
          <input id="slug-sep" hlmInput type="text" [(ngModel)]="sepModel" (ngModelChange)="onSep($event)" maxlength="3" class="w-full font-mono" />
        </div>
      </div>

      <!-- Before / After -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div class="rounded-lg border border-border bg-muted/30 p-4">
          <div class="text-xs text-muted-foreground mb-2">Input</div>
          <div class="text-sm font-mono break-all bg-background rounded p-3 border border-border">{{ value() }}</div>
        </div>
        <div class="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
          <div class="text-xs text-muted-foreground mb-2">Slug</div>
          <div class="text-sm font-mono break-all bg-background rounded p-3 border border-green-500/30 text-green-600 dark:text-green-400">{{ value() | slugify:separator() }}</div>
        </div>
      </div>

      <!-- URL preview -->
      <div class="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4 text-center">
        <div class="text-xs text-muted-foreground mb-1">URL preview</div>
        <div class="text-lg font-mono text-blue-500 break-all">example.com/blog/{{ value() | slugify:separator() }}</div>
      </div>

      <!-- Pipe output -->
      <div class="rounded-md bg-muted p-4 border border-border">
        <div class="text-xs text-muted-foreground mb-1 font-mono">'{{ value() }}' | slugify{{ separator() === '-' ? '' : ":'" + separator() + "'" }}</div>
        <code class="text-sm font-mono">'{{ value() | slugify:separator() }}'</code>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlugifyPlayground {
  value = signal('Hello World!');
  separator = signal('-');
  activePreset = signal('Greeting');

  valueModel = 'Hello World!';
  sepModel = '-';

  presets: Preset[] = [
    { label: 'Greeting', value: 'Hello World!', separator: '-' },
    { label: 'Accents', value: 'Café & Résumé', separator: '-' },
    { label: 'Mixed case', value: 'AngularJS ngx-Transforms', separator: '-' },
    { label: 'Article title', value: '10 Tips for Web Developers in 2026', separator: '-' },
    { label: 'Underscore', value: 'My Blog Post', separator: '_' },
    { label: 'Messy input', value: '   ---Hello!!!World---   ', separator: '-' },
  ];

  loadPreset(p: Preset) {
    this.activePreset.set(p.label);
    this.value.set(p.value);
    this.separator.set(p.separator);
    this.valueModel = p.value;
    this.sepModel = p.separator;
  }

  onValue(v: string) {
    this.value.set(v);
    this.activePreset.set('');
  }

  onSep(s: string) {
    this.separator.set(s || '-');
    this.activePreset.set('');
  }
}
