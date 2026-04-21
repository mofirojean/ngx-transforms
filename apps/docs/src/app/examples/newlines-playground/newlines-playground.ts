import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewlinesPipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';

interface Preset {
  label: string;
  value: string;
  replacement: string;
}

@Component({
  selector: 'app-newlines-playground',
  standalone: true,
  imports: [HlmButtonImports, HlmInputImports, FormsModule, NewlinesPipe],
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
        <label for="nl-value" class="text-sm font-medium">Input (multi-line)</label>
        <textarea id="nl-value" hlmInput rows="4" [(ngModel)]="valueModel" (ngModelChange)="onValue($event)" class="w-full font-mono text-sm resize-none h-28"></textarea>
      </div>

      <div class="grid w-full gap-1.5">
        <label for="nl-rep" class="text-sm font-medium">Replacement</label>
        <input id="nl-rep" hlmInput type="text" [(ngModel)]="repModel" (ngModelChange)="onRep($event)" class="w-full font-mono" placeholder="(default: <br>)" />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div class="rounded-lg border border-border bg-muted/30 p-4">
          <div class="text-xs text-muted-foreground mb-2">Raw output</div>
          <div class="text-sm font-mono break-all bg-background rounded p-3 border border-border max-h-40 overflow-auto">{{ value() | newlines:replacement() }}</div>
        </div>
        <div class="rounded-lg border border-purple-500/20 bg-purple-500/5 p-4">
          <div class="text-xs text-muted-foreground mb-2">Rendered via [innerHTML]</div>
          <div class="text-sm bg-background rounded p-3 border border-purple-500/30 min-h-20" [innerHTML]="value() | newlines:replacement()"></div>
        </div>
      </div>

      <div class="rounded-md bg-muted p-4 border border-border">
        <div class="text-xs text-muted-foreground mb-1 font-mono">text | newlines{{ replacement() === '&lt;br&gt;' ? '' : ":'" + replacement() + "'" }}</div>
        <code class="text-sm font-mono break-all">'{{ value() | newlines:replacement() }}'</code>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewlinesPlayground {
  value = signal('line one\nline two\nline three');
  replacement = signal('<br>');
  active = signal('HTML <br>');

  valueModel = 'line one\nline two\nline three';
  repModel = '<br>';

  presets: Preset[] = [
    { label: 'HTML <br>', value: 'line one\nline two\nline three', replacement: '<br>' },
    { label: 'Flatten space', value: 'line one\nline two\nline three', replacement: ' ' },
    { label: 'Pipe delim', value: 'a\nb\nc', replacement: ' | ' },
    { label: 'Remove', value: 'a\nb\nc', replacement: '' },
    { label: 'Bullet list', value: 'apples\nbananas\ncherries', replacement: '<br>• ' },
    { label: 'Windows CRLF', value: 'line1\r\nline2', replacement: '<br>' },
  ];

  load(p: Preset) {
    this.active.set(p.label);
    this.value.set(p.value);
    this.replacement.set(p.replacement);
    this.valueModel = p.value;
    this.repModel = p.replacement;
  }

  onValue(v: string) { this.value.set(v); this.active.set(''); }
  onRep(r: string) { this.replacement.set(r); this.active.set(''); }
}