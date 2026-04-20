import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecodeUriPipe, EncodeUriPipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';

interface Preset {
  label: string;
  value: string;
}

@Component({
  selector: 'app-encode-uri-playground',
  standalone: true,
  imports: [HlmButtonImports, HlmInputImports, FormsModule, EncodeUriPipe, DecodeUriPipe],
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
        <label for="enc-uri-input" class="text-sm font-medium">Input URI</label>
        <input id="enc-uri-input" hlmInput type="text" [(ngModel)]="model" (ngModelChange)="onChange($event)" class="w-full font-mono" />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div class="rounded-lg border border-border bg-muted/30 p-4">
          <div class="text-xs text-muted-foreground mb-2">Input</div>
          <div class="text-sm font-mono break-all bg-background rounded p-3 border border-border">{{ value() }}</div>
        </div>
        <div class="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
          <div class="text-xs text-muted-foreground mb-2">encodeURI</div>
          <div class="text-sm font-mono break-all bg-background rounded p-3 border border-blue-500/30 text-blue-600 dark:text-blue-400">{{ value() | encodeURI }}</div>
        </div>
      </div>

      <div class="rounded-lg border border-purple-500/20 bg-purple-500/5 p-4">
        <div class="text-xs text-muted-foreground mb-2">Roundtrip (encodeURI -> decodeURI)</div>
        <div class="text-sm font-mono break-all bg-background rounded p-3 border border-purple-500/30 text-purple-600 dark:text-purple-400">{{ value() | encodeURI | decodeURI }}</div>
      </div>

      <div class="rounded-md bg-muted p-4 border border-border">
        <div class="text-xs text-muted-foreground mb-1 font-mono">'{{ value() }}' | encodeURI</div>
        <code class="text-sm font-mono break-all">'{{ value() | encodeURI }}'</code>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EncodeUriPlayground {
  value = signal('https://example.com/?q=hi world');
  model = 'https://example.com/?q=hi world';
  active = signal('URL with space');

  presets: Preset[] = [
    { label: 'URL with space', value: 'https://example.com/?q=hi world' },
    { label: 'Path with space', value: '/docs/getting started/intro.html' },
    { label: 'Unicode title', value: 'https://x.com/page/café résumé' },
    { label: 'Hash anchor', value: 'https://x.com/page#section title' },
    { label: 'Already encoded', value: 'hello%20world' },
    { label: 'Plain text', value: 'no special chars here' },
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