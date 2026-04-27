import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DiffObjPipe, KeysPipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';

interface Preset {
  label: string;
  source: string;
  target: string;
}

@Component({
  selector: 'app-diff-obj-playground',
  standalone: true,
  imports: [HlmButtonImports, HlmInputImports, FormsModule, DiffObjPipe, KeysPipe, JsonPipe],
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

      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div class="grid w-full gap-1.5">
          <label for="diff-source" class="text-sm font-medium">Source object (value)</label>
          <textarea id="diff-source" hlmInput rows="4" [ngModel]="sourceJson()" (ngModelChange)="onSource($event)" class="w-full font-mono text-sm resize-none h-28"></textarea>
        </div>
        <div class="grid w-full gap-1.5">
          <label for="diff-target" class="text-sm font-medium">Compare to</label>
          <textarea id="diff-target" hlmInput rows="4" [ngModel]="targetJson()" (ngModelChange)="onTarget($event)" class="w-full font-mono text-sm resize-none h-28"></textarea>
        </div>
      </div>

      @if (sourceParse().error || targetParse().error) {
        <div class="rounded-md border border-red-500/30 bg-red-500/5 p-3 text-sm text-red-600 dark:text-red-400 font-mono space-y-1">
          @if (sourceParse().error) { <div>Source: {{ sourceParse().error }}</div> }
          @if (targetParse().error) { <div>Compare: {{ targetParse().error }}</div> }
        </div>
      }

      <!-- Diff result -->
      <div class="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 ring-2 ring-amber-500/20">
        <div class="flex items-center justify-between mb-2">
          <div class="text-xs text-muted-foreground">Differences in source vs compareTo</div>
          <span class="text-xs text-amber-600 dark:text-amber-400 font-mono">{{ (sourceParse().value | diffObj:targetParse().value | keys).length }} key(s)</span>
        </div>
        <code class="text-sm font-mono break-all block bg-background rounded p-3 border border-amber-500/30 text-amber-600 dark:text-amber-400">{{ sourceParse().value | diffObj:targetParse().value | json }}</code>
      </div>

      <!-- Diff key tags -->
      @if ((sourceParse().value | diffObj:targetParse().value | keys).length > 0) {
        <div>
          <p class="text-sm font-medium mb-2">Differing keys</p>
          <div class="flex flex-wrap gap-2">
            @for (key of sourceParse().value | diffObj:targetParse().value | keys; track key) {
              <span class="inline-flex items-center rounded-md border border-amber-500/30 bg-background px-2.5 py-1 text-sm font-mono text-amber-600 dark:text-amber-400">{{ key }}</span>
            }
          </div>
        </div>
      } @else {
        <div class="rounded-md border border-green-500/20 bg-green-500/5 p-4 text-center text-sm text-green-600 dark:text-green-400">
          No differences — every key in source matches compareTo.
        </div>
      }

      <div class="rounded-md bg-muted p-4 border border-border">
        <div class="text-xs text-muted-foreground mb-1 font-mono">source | diffObj:compareTo</div>
        <code class="text-sm font-mono break-all">{{ sourceParse().value | diffObj:targetParse().value | json }}</code>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiffObjPlayground {
  sourceJson = signal('{ "name": "Alice", "age": 30, "role": "admin", "active": true }');
  targetJson = signal('{ "name": "Alice", "age": 31, "role": "admin", "active": false }');
  active = signal('User update');

  sourceParse = computed<{ value: unknown; error: string }>(() => this.parse(this.sourceJson()));
  targetParse = computed<{ value: unknown; error: string }>(() => this.parse(this.targetJson()));

  presets: Preset[] = [
    {
      label: 'User update',
      source: '{ "name": "Alice", "age": 30, "role": "admin", "active": true }',
      target: '{ "name": "Alice", "age": 31, "role": "admin", "active": false }',
    },
    {
      label: 'No changes',
      source: '{ "a": 1, "b": 2, "c": 3 }',
      target: '{ "a": 1, "b": 2, "c": 3 }',
    },
    {
      label: 'New keys only',
      source: '{ "a": 1, "b": 2, "c": 3 }',
      target: '{ "a": 1 }',
    },
    {
      label: 'Form draft',
      source: '{ "title": "New post", "body": "Draft", "tags": ["draft"] }',
      target: '{ "title": "Old", "body": "Draft", "tags": ["draft"] }',
    },
    {
      label: 'Settings diff',
      source: '{ "theme": "dark", "lang": "en", "notifications": true }',
      target: '{ "theme": "light", "lang": "en", "notifications": true }',
    },
    {
      label: 'Empty target',
      source: '{ "a": 1, "b": 2 }',
      target: '{}',
    },
  ];

  load(p: Preset) {
    this.active.set(p.label);
    this.sourceJson.set(p.source);
    this.targetJson.set(p.target);
  }

  onSource(v: string) {
    this.sourceJson.set(v);
    this.active.set('');
  }

  onTarget(v: string) {
    this.targetJson.set(v);
    this.active.set('');
  }

  private parse(raw: string): { value: unknown; error: string } {
    try {
      return { value: JSON.parse(raw), error: '' };
    } catch (e) {
      return { value: {}, error: (e as Error).message };
    }
  }
}