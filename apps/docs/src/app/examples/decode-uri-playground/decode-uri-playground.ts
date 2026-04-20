import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecodeUriPipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';

interface Preset {
  label: string;
  value: string;
}

@Component({
  selector: 'app-decode-uri-playground',
  standalone: true,
  imports: [HlmButtonImports, HlmInputImports, FormsModule, DecodeUriPipe],
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
        <label for="dec-uri-input" class="text-sm font-medium">Encoded URI</label>
        <input id="dec-uri-input" hlmInput type="text" [(ngModel)]="model" (ngModelChange)="onChange($event)" class="w-full font-mono" />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div class="rounded-lg border border-border bg-muted/30 p-4">
          <div class="text-xs text-muted-foreground mb-2">Encoded</div>
          <div class="text-sm font-mono break-all bg-background rounded p-3 border border-border">{{ value() }}</div>
        </div>
        <div class="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
          <div class="text-xs text-muted-foreground mb-2">Decoded</div>
          <div class="text-sm font-mono break-all bg-background rounded p-3 border border-green-500/30 text-green-600 dark:text-green-400">{{ value() | decodeURI }}</div>
        </div>
      </div>

      <div class="rounded-md bg-muted p-4 border border-border">
        <div class="text-xs text-muted-foreground mb-1 font-mono">'{{ value() }}' | decodeURI</div>
        <code class="text-sm font-mono break-all">'{{ value() | decodeURI }}'</code>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DecodeUriPlayground {
  value = signal('https://example.com/?q=hi%20world');
  model = 'https://example.com/?q=hi%20world';
  active = signal('URL with space');

  presets: Preset[] = [
    { label: 'URL with space', value: 'https://example.com/?q=hi%20world' },
    { label: 'Path with space', value: '/docs/getting%20started/intro.html' },
    { label: 'Unicode', value: 'caf%C3%A9' },
    { label: 'Hash anchor', value: 'https://x.com/page#section%20title' },
    { label: 'Plain text', value: 'no special chars here' },
    { label: 'Malformed (safe)', value: 'broken%ZZ' },
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