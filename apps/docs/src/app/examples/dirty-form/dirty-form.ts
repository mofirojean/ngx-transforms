import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePencil, lucideRotateCcw, lucideSave, lucideCircleCheck } from '@ng-icons/lucide';
import { DiffObjPipe, IsEmptyPipe } from '@ngx-transforms';

interface Profile extends Record<string, unknown> {
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  newsletter: boolean;
  bio: string;
}

const ORIGINAL: Profile = {
  name: 'Alice Mitchell',
  email: 'alice@example.com',
  role: 'editor',
  newsletter: true,
  bio: 'Frontend engineer interested in pipes and signals.',
};

const ROLES: Profile['role'][] = ['admin', 'editor', 'viewer'];

interface FieldDef {
  key: keyof Profile;
  label: string;
  type: 'text' | 'select' | 'toggle' | 'textarea';
}

const FIELDS: FieldDef[] = [
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'email', label: 'Email', type: 'text' },
  { key: 'role', label: 'Role', type: 'select' },
  { key: 'newsletter', label: 'Newsletter', type: 'toggle' },
  { key: 'bio', label: 'Bio', type: 'textarea' },
];

@Component({
  selector: 'app-dirty-form',
  standalone: true,
  imports: [FormsModule, JsonPipe, HlmButtonImports, HlmInputImports, NgIcon, DiffObjPipe, IsEmptyPipe],
  providers: [provideIcons({ lucidePencil, lucideRotateCcw, lucideSave, lucideCircleCheck })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-5 p-5">
      <!-- Form -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        @for (field of fields; track field.key) {
          <div class="grid w-full gap-1.5"
               [class.md:col-span-2]="field.type === 'textarea'">
            <label [for]="'field-' + field.key" class="text-sm font-medium flex items-center justify-between">
              <span class="flex items-center gap-2">
                {{ field.label }}
                @if (isChanged(field.key)) {
                  <span class="inline-flex items-center gap-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 px-2 py-0.5 text-[10px] font-mono">
                    <ng-icon name="lucidePencil" class="h-2.5 w-2.5"></ng-icon>
                    changed
                  </span>
                }
              </span>
              @if (isChanged(field.key)) {
                <span class="text-[10px] text-muted-foreground font-mono">was: {{ originalValue(field.key) }}</span>
              }
            </label>

            @switch (field.type) {
              @case ('text') {
                <input
                  [id]="'field-' + field.key"
                  hlmInput
                  type="text"
                  [ngModel]="current()[field.key]"
                  (ngModelChange)="updateField(field.key, $event)"
                  class="w-full text-sm"
                  [class.ring-2]="isChanged(field.key)"
                  [class.ring-amber-500\\/40]="isChanged(field.key)"
                />
              }
              @case ('select') {
                <select
                  [id]="'field-' + field.key"
                  [ngModel]="current()[field.key]"
                  (ngModelChange)="updateField(field.key, $event)"
                  class="w-full text-sm rounded-md border border-input bg-background px-3 py-1.5"
                  [class.ring-2]="isChanged(field.key)"
                  [class.ring-amber-500\\/40]="isChanged(field.key)"
                >
                  @for (r of roles; track r) {
                    <option [value]="r">{{ r }}</option>
                  }
                </select>
              }
              @case ('toggle') {
                <label class="inline-flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    [id]="'field-' + field.key"
                    type="checkbox"
                    [ngModel]="current()[field.key]"
                    (ngModelChange)="updateField(field.key, $event)"
                    class="h-4 w-4 rounded border-input"
                  />
                  <span>Subscribed to weekly newsletter</span>
                </label>
              }
              @case ('textarea') {
                <textarea
                  [id]="'field-' + field.key"
                  hlmInput
                  rows="3"
                  [ngModel]="current()[field.key]"
                  (ngModelChange)="updateField(field.key, $event)"
                  class="w-full text-sm resize-none h-20"
                  [class.ring-2]="isChanged(field.key)"
                  [class.ring-amber-500\\/40]="isChanged(field.key)"
                ></textarea>
              }
            }
          </div>
        }
      </div>

      <!-- Toolbar -->
      <div class="flex items-center gap-2">
        <button
          hlmBtn
          variant="default"
          size="sm"
          (click)="save()"
          [disabled]="(current() | diffObj: original) | isEmpty"
          class="gap-1.5"
        >
          <ng-icon name="lucideSave" class="h-3.5 w-3.5"></ng-icon>
          Save changes
        </button>
        <button
          hlmBtn
          variant="ghost"
          size="sm"
          (click)="reset()"
          [disabled]="(current() | diffObj: original) | isEmpty"
          class="gap-1.5"
        >
          <ng-icon name="lucideRotateCcw" class="h-3.5 w-3.5"></ng-icon>
          Reset
        </button>
        <span class="ml-auto text-xs text-muted-foreground">
          @if (!((current() | diffObj: original) | isEmpty)) {
            <span class="inline-flex items-center gap-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 px-2 py-1 font-mono">
              {{ changedCount() }} field(s) changed
            </span>
          } @else {
            <span class="inline-flex items-center gap-1 rounded-full bg-green-500/10 text-green-700 dark:text-green-400 px-2 py-1 font-mono">
              <ng-icon name="lucideCircleCheck" class="h-3 w-3"></ng-icon>
              No changes
            </span>
          }
        </span>
      </div>

      <!-- Diff & save toast -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div class="rounded-lg border border-border bg-muted/30 p-4">
          <div class="text-xs text-muted-foreground mb-2 font-mono">PATCH body — what will be sent</div>
          <pre class="text-xs font-mono overflow-auto max-h-40 leading-relaxed">{{ current() | diffObj: original | json }}</pre>
        </div>
        <div class="rounded-lg border border-border bg-muted/30 p-4">
          <div class="text-xs text-muted-foreground mb-2 font-mono">Original snapshot</div>
          <pre class="text-xs font-mono overflow-auto max-h-40 leading-relaxed">{{ original | json }}</pre>
        </div>
      </div>

      @if (savedToast()) {
        <div class="rounded-md border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-700 dark:text-green-400 flex items-center gap-2">
          <ng-icon name="lucideCircleCheck" class="h-4 w-4"></ng-icon>
          Sent PATCH with {{ lastSavedCount() }} field(s). Original snapshot updated.
        </div>
      }
    </div>
  `,
})
export class DirtyForm {
  readonly fields = FIELDS;
  readonly roles = ROLES;
  readonly original = signal<Profile>({ ...ORIGINAL });
  readonly current = signal<Profile>({ ...ORIGINAL });
  readonly savedToast = signal(false);
  readonly lastSavedCount = signal(0);

  readonly changedCount = computed(
    () => Object.keys(this.diff()).length,
  );

  private diff(): Record<string, unknown> {
    const orig = this.original();
    const curr = this.current();
    const result: Record<string, unknown> = {};
    for (const key of Object.keys(curr)) {
      if ((curr as Record<string, unknown>)[key] !== (orig as Record<string, unknown>)[key]) {
        result[key] = (curr as Record<string, unknown>)[key];
      }
    }
    return result;
  }

  updateField<K extends keyof Profile>(key: K, value: unknown) {
    this.current.update((c) => ({ ...c, [key]: value as Profile[K] }));
  }

  isChanged(key: keyof Profile): boolean {
    return this.current()[key] !== this.original()[key];
  }

  originalValue(key: keyof Profile): string {
    const v = this.original()[key];
    return typeof v === 'string' ? v : JSON.stringify(v);
  }

  save() {
    const count = this.changedCount();
    if (count === 0) return;
    // Simulate a successful PATCH — promote current to original.
    this.original.set({ ...this.current() });
    this.lastSavedCount.set(count);
    this.savedToast.set(true);
    setTimeout(() => this.savedToast.set(false), 2500);
  }

  reset() {
    this.current.set({ ...this.original() });
  }
}
