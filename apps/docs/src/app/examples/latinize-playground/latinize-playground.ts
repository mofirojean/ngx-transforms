import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LatinizePipe, SlugifyPipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';

interface Preset {
  label: string;
  value: string;
}

@Component({
  selector: 'app-latinize-playground',
  standalone: true,
  imports: [HlmButtonImports, HlmInputImports, FormsModule, LatinizePipe, SlugifyPipe],
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
        <label for="lat-input" class="text-sm font-medium">Input</label>
        <input id="lat-input" hlmInput type="text" [(ngModel)]="model" (ngModelChange)="onChange($event)" class="w-full font-mono" />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div class="rounded-lg border border-border bg-muted/30 p-4">
          <div class="text-xs text-muted-foreground mb-2">Input</div>
          <div class="text-lg font-mono break-all bg-background rounded p-3 border border-border">{{ value() }}</div>
        </div>
        <div class="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
          <div class="text-xs text-muted-foreground mb-2">Latinized</div>
          <div class="text-lg font-mono break-all bg-background rounded p-3 border border-green-500/30 text-green-600 dark:text-green-400">{{ value() | latinize }}</div>
        </div>
      </div>

      <div>
        <p class="text-sm font-medium mb-2">vs slugify</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-lg border border-green-500/30 bg-green-500/10 p-4 ring-2 ring-green-500/20">
            <div class="text-xs text-muted-foreground mb-2">latinize (preserves casing & spaces)</div>
            <div class="text-lg font-bold font-mono text-green-500 break-all bg-background rounded p-2 border border-green-500/30">{{ value() | latinize }}</div>
          </div>
          <div class="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
            <div class="text-xs text-muted-foreground mb-2">slugify (URL-friendly)</div>
            <div class="text-lg font-bold font-mono text-amber-500 break-all bg-background rounded p-2 border border-amber-500/30">{{ value() | slugify }}</div>
          </div>
        </div>
      </div>

      <div class="rounded-md bg-muted p-4 border border-border">
        <div class="text-xs text-muted-foreground mb-1 font-mono">'{{ value() }}' | latinize</div>
        <code class="text-sm font-mono break-all">'{{ value() | latinize }}'</code>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LatinizePlayground {
  value = signal('Café Résumé');
  model = 'Café Résumé';
  active = signal('French');

  presets: Preset[] = [
    { label: 'French', value: 'Café Résumé' },
    { label: 'Spanish', value: 'El niño está aquí' },
    { label: 'German', value: 'schöne Grüße' },
    { label: 'All vowels', value: 'áéíóú àèìòù âêîôû äëïöü' },
    { label: 'Mixed case', value: 'Naïve RÉSUMÉ' },
    { label: 'No accents', value: 'plain text' },
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