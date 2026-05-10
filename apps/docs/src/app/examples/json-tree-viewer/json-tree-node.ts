import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { IsArrayPipe, IsObjectPipe, PairsPipe } from '@ngx-transforms';

/**
 * Recursive renderer for unknown JSON values.
 *
 * The component imports itself so each [value] can be any shape — array,
 * object, or scalar. Branching is done entirely with the boolean pipes from
 * ngx-transforms: `isArray`, `isObject`, plus `pairs` for object iteration.
 *
 * This is the technique behind the "JSON Tree Viewer" recipe.
 */
@Component({
  selector: 'app-json-tree-node',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [JsonPipe, IsArrayPipe, IsObjectPipe, PairsPipe],
  template: `
    @if (value() | isArray) {
      <span class="text-muted-foreground">[</span>
      @if (asArray().length > 0) {
        <button
          type="button"
          class="ml-1 text-[10px] uppercase tracking-wider text-muted-foreground hover:text-foreground"
          (click)="toggle()"
        >{{ expanded() ? '−' : '+' }} {{ asArray().length }} {{ asArray().length === 1 ? 'item' : 'items' }}</button>
        @if (expanded()) {
          <div class="pl-4 border-l border-border/40 ml-1 mt-1 space-y-1">
            @for (item of asArray(); track $index) {
              <div class="flex gap-2">
                <span class="text-xs text-muted-foreground/60 font-mono shrink-0 w-6 text-right">{{ $index }}:</span>
                <app-json-tree-node [value]="item" [depth]="depth() + 1" />
              </div>
            }
          </div>
        }
      }
      <span class="text-muted-foreground">]</span>
    } @else if (value() | isObject) {
      <span class="text-muted-foreground">&#123;</span>
      @if ((value() | pairs).length > 0) {
        <button
          type="button"
          class="ml-1 text-[10px] uppercase tracking-wider text-muted-foreground hover:text-foreground"
          (click)="toggle()"
        >{{ expanded() ? '−' : '+' }} {{ (value() | pairs).length }} {{ (value() | pairs).length === 1 ? 'key' : 'keys' }}</button>
        @if (expanded()) {
          <div class="pl-4 border-l border-border/40 ml-1 mt-1 space-y-1">
            @for (entry of value() | pairs; track entry[0]) {
              <div class="flex gap-2">
                <span class="text-xs font-mono shrink-0 text-pink-600 dark:text-pink-400">{{ entry[0] }}:</span>
                <app-json-tree-node [value]="entry[1]" [depth]="depth() + 1" />
              </div>
            }
          </div>
        }
      }
      <span class="text-muted-foreground">&#125;</span>
    } @else {
      <span class="font-mono text-xs" [class.text-emerald-600]="isString()" [class.dark:text-emerald-400]="isString()" [class.text-violet-600]="isNumber()" [class.dark:text-violet-400]="isNumber()" [class.text-amber-600]="isBool()" [class.dark:text-amber-400]="isBool()" [class.text-muted-foreground]="isNullish()">{{ value() | json }}</span>
    }
  `,
})
export class JsonTreeNode {
  value = input<unknown>(null);
  depth = input<number>(0);

  private readonly _expanded = signal(true);
  expanded = computed(() => this._expanded() || this.depth() === 0);

  asArray = computed(() => this.value() as unknown[]);
  isString = computed(() => typeof this.value() === 'string');
  isNumber = computed(() => typeof this.value() === 'number');
  isBool = computed(() => typeof this.value() === 'boolean');
  isNullish = computed(() => this.value() === null || this.value() === undefined);

  toggle() {
    this._expanded.update((v) => !v);
  }
}
