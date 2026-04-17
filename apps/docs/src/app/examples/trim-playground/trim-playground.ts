import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TrimPipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';

interface Preset {
  label: string;
  value: string;
  chars: string;
}

@Component({
  selector: 'app-trim-playground',
  standalone: true,
  imports: [HlmButtonImports, HlmInputImports, FormsModule, TrimPipe],
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
        <label for="trim-input" class="text-sm font-medium">Input</label>
        <input
          id="trim-input"
          hlmInput
          type="text"
          [(ngModel)]="rawValueModel"
          (ngModelChange)="onValueChange($event)"
          placeholder="Enter a string..."
          class="w-full font-mono"
        />
      </div>

      <!-- Chars input -->
      <div class="grid w-full gap-1.5">
        <label for="trim-chars" class="text-sm font-medium">Trim characters <span class="text-xs text-muted-foreground">(leave empty for whitespace)</span></label>
        <input
          id="trim-chars"
          hlmInput
          type="text"
          [(ngModel)]="charsModel"
          (ngModelChange)="onCharsChange($event)"
          placeholder="e.g., -* for dashes and asterisks"
          class="w-full font-mono"
        />
      </div>

      <!-- Before / After -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div class="rounded-lg border border-border bg-muted/30 p-4">
          <div class="text-xs text-muted-foreground mb-2">Input ({{ rawValue().length }} chars)</div>
          <div class="text-sm font-mono break-all bg-background rounded p-3 border border-border">
            <span class="bg-red-500/10 text-red-600 dark:text-red-400">[{{ rawValue() }}]</span>
          </div>
        </div>
        <div class="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
          <div class="text-xs text-muted-foreground mb-2">Trimmed</div>
          <div class="text-sm font-mono break-all bg-background rounded p-3 border border-green-500/30">
            <span class="text-green-600 dark:text-green-400">[{{ chars() ? (rawValue() | trim:chars()) : (rawValue() | trim) }}]</span>
          </div>
        </div>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-3 gap-3">
        <div class="rounded-lg border border-border bg-muted/30 p-3 text-center">
          <div class="text-2xl font-bold font-mono">{{ rawValue().length }}</div>
          <div class="text-xs text-muted-foreground">Before</div>
        </div>
        <div class="rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-center">
          <div class="text-2xl font-bold font-mono text-red-500">{{ charsRemoved() }}</div>
          <div class="text-xs text-muted-foreground">Removed</div>
        </div>
        <div class="rounded-lg border border-green-500/20 bg-green-500/5 p-3 text-center">
          <div class="text-2xl font-bold font-mono text-green-500">{{ (chars() ? (rawValue() | trim:chars()) : (rawValue() | trim)).length }}</div>
          <div class="text-xs text-muted-foreground">After</div>
        </div>
      </div>

      <!-- Pipe output -->
      <div class="rounded-md bg-muted p-4 border border-border">
        <div class="text-xs text-muted-foreground mb-1 font-mono">
          '{{ rawValue() }}' | trim{{ chars() ? ":'" + chars() + "'" : '' }}
        </div>
        <code class="text-sm font-mono">'{{ chars() ? (rawValue() | trim:chars()) : (rawValue() | trim) }}'</code>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrimPlayground {
  rawValue = signal('   hello world   ');
  chars = signal('');
  activePreset = signal('Whitespace');

  rawValueModel = '   hello world   ';
  charsModel = '';

  charsRemoved = computed(() => {
    const raw = this.rawValue();
    const c = this.chars();
    let trimmed: string;
    if (!c) {
      trimmed = raw.trim();
    } else {
      const escaped = c
        .split('')
        .map(ch => ch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
        .join('');
      const regex = new RegExp(`^[${escaped}]+|[${escaped}]+$`, 'g');
      trimmed = raw.replace(regex, '');
    }
    return raw.length - trimmed.length;
  });

  presets: Preset[] = [
    { label: 'Whitespace', value: '   hello world   ', chars: '' },
    { label: 'Dashes', value: '--hello--', chars: '-' },
    { label: 'Asterisks', value: '***title***', chars: '*' },
    { label: 'Mixed chars', value: '-*-heading-*-', chars: '-*' },
    { label: 'Tabs & newlines', value: '\t\n hello \n\t', chars: '' },
    { label: 'Dots', value: '...loading...', chars: '.' },
  ];

  loadPreset(p: Preset) {
    this.activePreset.set(p.label);
    this.rawValue.set(p.value);
    this.chars.set(p.chars);
    this.rawValueModel = p.value;
    this.charsModel = p.chars;
  }

  onValueChange(value: string) {
    this.rawValue.set(value);
    this.activePreset.set('');
  }

  onCharsChange(value: string) {
    this.chars.set(value);
    this.activePreset.set('');
  }
}