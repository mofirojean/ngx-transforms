import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { LatinizePipe, SlugifyPipe, TruncatePipe } from '@ngx-transforms';

interface Preset {
  label: string;
  title: string;
}

@Component({
  selector: 'app-slug-builder',
  standalone: true,
  imports: [FormsModule, HlmButtonImports, HlmInputImports, LatinizePipe, SlugifyPipe, TruncatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-6 p-5">
      <div>
        <p class="text-sm font-medium mb-2">Try a title</p>
        <div class="flex flex-wrap gap-2">
          @for (p of presets; track p.label) {
            <button hlmBtn [variant]="active() === p.label ? 'default' : 'outline'" size="sm" (click)="load(p)">{{ p.label }}</button>
          }
        </div>
      </div>

      <div class="grid w-full gap-1.5">
        <label for="title-input" class="text-sm font-medium">Article title</label>
        <input id="title-input" hlmInput [ngModel]="title()" (ngModelChange)="onTitle($event)" class="w-full text-sm" />
      </div>

      <div class="grid grid-cols-1 gap-3">
        <div class="rounded-lg border border-border bg-muted/30 p-4">
          <div class="text-xs text-muted-foreground mb-1 font-mono">1. raw input</div>
          <code class="text-sm font-mono break-all block">{{ title() || '(empty)' }}</code>
        </div>

        <div class="rounded-lg border border-border bg-muted/30 p-4">
          <div class="text-xs text-muted-foreground mb-1 font-mono">2. | truncate: 60 : '' : true</div>
          <code class="text-sm font-mono break-all block">{{ title() | truncate: 60 : '' : true }}</code>
        </div>

        <div class="rounded-lg border border-border bg-muted/30 p-4">
          <div class="text-xs text-muted-foreground mb-1 font-mono">3. | latinize</div>
          <code class="text-sm font-mono break-all block">{{ title() | truncate: 60 : '' : true | latinize }}</code>
        </div>

        <div class="rounded-lg border border-primary/30 bg-primary/5 p-4">
          <div class="text-xs text-primary mb-1 font-mono">4. | slugify  → final URL slug</div>
          <code class="text-sm font-mono break-all block text-primary font-semibold">/blog/{{ title() | truncate: 60 : '' : true | latinize | slugify }}</code>
        </div>
      </div>
    </div>
  `,
})
export class SlugBuilder {
  title = signal('Café Tour de France — Étape 12');
  active = signal('Accents');

  presets: Preset[] = [
    { label: 'Accents', title: 'Café Tour de France — Étape 12' },
    { label: 'Typical post', title: 'How to Build an Angular App in 2026' },
    { label: 'Emoji', title: '🚀 Launch Day! My New Side Project 🎉' },
    {
      label: 'Run-on length',
      title: 'A Very Long Article About Performance Optimization Strategies in Modern Web Frameworks That Definitely Exceeds Reasonable Length',
    },
    { label: 'Punctuation', title: 'It\'s 2026: Angular vs. React — Who Wins?' },
    { label: 'CJK + ASCII', title: '東京 trip notes: best ramen spots' },
  ];

  load(p: Preset) {
    this.active.set(p.label);
    this.title.set(p.title);
  }

  onTitle(v: string) {
    this.title.set(v);
    this.active.set('');
  }
}