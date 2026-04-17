import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CapitalizePipe, UpperFirstPipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';

interface Preset {
  label: string;
  value: string;
}

@Component({
  selector: 'app-capitalize-playground',
  standalone: true,
  imports: [HlmButtonImports, HlmInputImports, FormsModule, CapitalizePipe, UpperFirstPipe],
  template: `
    <style>
      @keyframes fade-in {
        from { opacity: 0; transform: translateY(6px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .fade-in { animation: fade-in 250ms ease-out both; }
    </style>

    <div class="flex flex-col gap-6 p-5">

      <!-- Presets -->
      <div>
        <p class="text-sm font-medium mb-2">Scenarios</p>
        <div class="flex flex-wrap gap-2">
          @for (p of presets; track p.label) {
            <button
              hlmBtn
              [variant]="activePreset() === p.label ? 'default' : 'outline'"
              size="sm"
              (click)="loadPreset(p)">
              {{ p.label }}
            </button>
          }
        </div>
      </div>

      <!-- Input -->
      <div class="grid w-full gap-1.5">
        <label for="capitalize-input" class="text-sm font-medium">Input</label>
        <input
          id="capitalize-input"
          hlmInput
          type="text"
          [(ngModel)]="inputModel"
          (ngModelChange)="onChange($event)"
          placeholder="Enter text..."
          class="w-full font-mono"
        />
      </div>

      <!-- Input display -->
      <div class="rounded-lg border border-border bg-muted/30 p-4">
        <div class="text-xs text-muted-foreground mb-2">Input</div>
        <div class="text-2xl font-mono break-all">{{ value() }}</div>
      </div>

      <!-- Result -->
      <div class="rounded-lg border border-blue-500/20 bg-blue-500/5 p-6 text-center">
        <div class="text-sm text-muted-foreground mb-1">Capitalized</div>
        <div class="text-4xl font-bold text-blue-500 mb-2 font-mono break-all">{{ value() | capitalize }}</div>
        <div class="text-sm text-muted-foreground">'{{ value() }}' | capitalize</div>
      </div>

      <!-- Comparison: capitalize vs upperFirst -->
      <div>
        <p class="text-sm font-medium mb-2">vs upperFirst</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
            <div class="text-xs text-muted-foreground mb-2">capitalize</div>
            <div class="text-lg font-bold font-mono text-blue-500 break-all">{{ value() | capitalize }}</div>
            <div class="text-xs text-muted-foreground mt-2">First upper, rest lower</div>
          </div>
          <div class="rounded-lg border border-purple-500/20 bg-purple-500/5 p-4">
            <div class="text-xs text-muted-foreground mb-2">upperFirst</div>
            <div class="text-lg font-bold font-mono text-purple-500 break-all">{{ value() | upperFirst }}</div>
            <div class="text-xs text-muted-foreground mt-2">First upper, rest preserved</div>
          </div>
        </div>
      </div>

      <!-- Pipe output -->
      <div class="rounded-md bg-muted p-4 border border-border">
        <div class="text-xs text-muted-foreground mb-1 font-mono">'{{ value() }}' | capitalize</div>
        <code class="text-sm font-mono">'{{ value() | capitalize }}'</code>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CapitalizePlayground {
  value = signal('hello WORLD');
  inputModel = 'hello WORLD';
  activePreset = signal('Mixed case');

  presets: Preset[] = [
    { label: 'Mixed case', value: 'hello WORLD' },
    { label: 'Lowercase', value: 'hello world' },
    { label: 'Uppercase', value: 'HELLO WORLD' },
    { label: 'Title', value: 'welcome to ngx-transforms' },
    { label: 'Alternating', value: 'hELLo WoRlD' },
    { label: 'Single letter', value: 'a' },
    { label: 'Starts with number', value: '123abc' },
  ];

  loadPreset(p: Preset) {
    this.activePreset.set(p.label);
    this.value.set(p.value);
    this.inputModel = p.value;
  }

  onChange(value: string) {
    this.value.set(value);
    this.activePreset.set('');
  }
}