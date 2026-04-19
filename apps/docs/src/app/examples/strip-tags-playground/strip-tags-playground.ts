import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StripTagsPipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';

interface Preset {
  label: string;
  value: string;
  allowed: string;
}

@Component({
  selector: 'app-strip-tags-playground',
  standalone: true,
  imports: [HlmButtonImports, HlmInputImports, FormsModule, StripTagsPipe, JsonPipe],
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

      <!-- HTML Input -->
      <div class="grid w-full gap-1.5">
        <label for="st-html" class="text-sm font-medium">HTML Input</label>
        <textarea
          id="st-html"
          hlmInput
          rows="4"
          [(ngModel)]="htmlModel"
          (ngModelChange)="onHtml($event)"
          class="w-full font-mono text-sm resize-none h-24"></textarea>
      </div>

      <!-- Allowed tags -->
      <div class="grid w-full gap-1.5">
        <label for="st-allowed" class="text-sm font-medium">Allowed tags <span class="text-xs text-muted-foreground">(comma-separated, empty = strip all)</span></label>
        <input id="st-allowed" hlmInput type="text" [(ngModel)]="allowedModel" (ngModelChange)="onAllowed($event)" class="w-full font-mono" placeholder="e.g., b, i, a" />
      </div>

      <!-- Before / After -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div class="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
          <div class="text-xs text-muted-foreground mb-2">Raw HTML</div>
          <div class="text-sm font-mono break-all bg-background rounded p-3 border border-red-500/30 max-h-40 overflow-auto">{{ html() }}</div>
        </div>
        <div class="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
          <div class="text-xs text-muted-foreground mb-2">Stripped</div>
          <div class="text-sm font-mono break-all bg-background rounded p-3 border border-green-500/30 text-green-600 dark:text-green-400 max-h-40 overflow-auto">{{ html() | stripTags:allowedArray() }}</div>
        </div>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 gap-3">
        <div class="rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-center">
          <div class="text-2xl font-bold font-mono text-red-500">{{ html().length }}</div>
          <div class="text-xs text-muted-foreground">Input chars</div>
        </div>
        <div class="rounded-lg border border-green-500/20 bg-green-500/5 p-3 text-center">
          <div class="text-2xl font-bold font-mono text-green-500">{{ (html() | stripTags:allowedArray()).length }}</div>
          <div class="text-xs text-muted-foreground">Output chars</div>
        </div>
      </div>

      <!-- Pipe output -->
      <div class="rounded-md bg-muted p-4 border border-border">
        <div class="text-xs text-muted-foreground mb-1 font-mono">html | stripTags{{ allowedArray().length ? ':' + (allowedArray() | json) : '' }}</div>
        <code class="text-sm font-mono break-all">{{ html() | stripTags:allowedArray() }}</code>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StripTagsPlayground {
  html = signal('<p>Hello <b>bold</b> and <i>italic</i> world!</p>');
  allowedRaw = signal('');
  activePreset = signal('Basic markup');

  htmlModel = '<p>Hello <b>bold</b> and <i>italic</i> world!</p>';
  allowedModel = '';

  allowedArray = computed<string[]>(() =>
    this.allowedRaw()
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0)
  );

  presets: Preset[] = [
    { label: 'Basic markup', value: '<p>Hello <b>bold</b> and <i>italic</i> world!</p>', allowed: '' },
    { label: 'Keep inline', value: '<div><p>Visit <a href="/">home</a> for <b>bold</b> info</p></div>', allowed: 'a, b' },
    { label: 'Script injection', value: 'Safe<script>alert("XSS")</script>Text', allowed: '' },
    { label: 'With comments', value: 'Before<!-- secret -->After<p>hi</p>', allowed: '' },
    { label: 'Nested tags', value: '<ul><li>One</li><li>Two</li></ul>', allowed: '' },
    { label: 'Keep lists', value: '<div><ul><li>One</li><li>Two</li></ul></div>', allowed: 'ul, li' },
  ];

  loadPreset(p: Preset) {
    this.activePreset.set(p.label);
    this.html.set(p.value);
    this.allowedRaw.set(p.allowed);
    this.htmlModel = p.value;
    this.allowedModel = p.allowed;
  }

  onHtml(v: string) {
    this.html.set(v);
    this.activePreset.set('');
  }

  onAllowed(v: string) {
    this.allowedRaw.set(v);
    this.activePreset.set('');
  }
}
