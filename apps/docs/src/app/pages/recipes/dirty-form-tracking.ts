import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideCopy } from '@ng-icons/lucide';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';
import { DirtyForm } from '../../examples/dirty-form/dirty-form';

@Component({
  selector: 'app-recipe-dirty-form-tracking',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ClipboardModule, NgIconComponent, MacosWindow, AuthorCredit, Breadcrumb, DirtyForm],
  providers: [provideIcons({ lucideCopy, lucideCheck })],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <div class="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4">
        Recipe
      </div>

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        Dirty-Form Tracking
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        Compare a form against its original snapshot, highlight only the
        changed fields, gate the Save button, and ship a minimal PATCH body
        all from two pipes in the template.
      </p>

      <div class="mb-10">
        <h2 class="text-2xl font-bold mb-3">The problem</h2>
        <p class="leading-7 text-muted-foreground">
          Real forms are big. Sending the whole record on every save is
          wasteful, hard to audit, and a magnet for stale-data overwrites.
          What you actually want is the delta just the fields that changed
          wrapped in a PATCH. Tracking dirty state manually means hand-rolled
          flags per field, an "are any dirty?" reducer, and rebuilding the
          PATCH body on submit. With pipes, the same answer falls out of
          comparing two snapshots in the template.
        </p>
      </div>

      <div class="mb-10">
        <h2 class="text-2xl font-bold mb-3">The pipes you'll combine</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <a routerLink="/docs/pipes/diff-obj" class="rounded-md border border-border p-4 hover:border-foreground/50 transition-colors">
            <div class="font-mono text-sm font-semibold mb-1">diffObj</div>
            <p class="text-xs text-muted-foreground">Returns only the entries of <em>current</em> whose values differ from <em>original</em>. That object IS the PATCH body.</p>
          </a>
          <a routerLink="/docs/pipes/is-empty" class="rounded-md border border-border p-4 hover:border-foreground/50 transition-colors">
            <div class="font-mono text-sm font-semibold mb-1">isEmpty</div>
            <p class="text-xs text-muted-foreground">Returns true when the diff has no keys — drives the disabled state of Save and Reset.</p>
          </a>
        </div>
      </div>

      <h2 class="text-2xl font-bold mb-4">Live example</h2>
      <p class="text-sm text-muted-foreground mb-3">
        Edit any field the row gets an amber ring and a "changed" badge,
        Save and Reset light up, and the PATCH body preview shows exactly
        what would be sent. Hit Save to commit; the original snapshot
        promotes to the current value and the form goes clean again.
      </p>
      <app-macos-window title="Profile Editor">
        <app-dirty-form />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">The pattern</h2>
      <p class="leading-7 text-muted-foreground mb-6">
        Hold the original record in one signal and the live edits in another.
        Wherever the template needs "what changed?", pipe
        <code class="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">current | diffObj: original</code>
        — that single expression is the PATCH body, the dirty flag, and the
        per-field highlight source.
      </p>

      <div class="relative rounded-lg border border-border bg-muted/30 overflow-hidden">
        <div class="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/50">
          <span class="text-xs font-mono text-muted-foreground">profile-editor.ts</span>
          <button
            type="button"
            (click)="onCopy()"
            class="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors"
            [cdkCopyToClipboard]="code"
          >
            @if (copied()) {
              <ng-icon name="lucideCheck" class="h-3.5 w-3.5 text-green-500"></ng-icon>
              <span>Copied</span>
            } @else {
              <ng-icon name="lucideCopy" class="h-3.5 w-3.5"></ng-icon>
              <span>Copy</span>
            }
          </button>
        </div>
        <pre class="overflow-x-auto p-4 text-sm leading-relaxed"><code class="font-mono" [innerHTML]="highlightedCode()"></code></pre>
      </div>

      <p class="leading-7 text-sm text-muted-foreground mt-3">
        On a successful save, promote <code class="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">current</code>
        into <code class="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">original</code> — the diff resets to empty automatically,
        Save disables, and the form is clean again. No manual flag housekeeping.
      </p>

      <h2 class="text-2xl font-bold my-8">Why diff-driven UI composes well</h2>
      <div class="rounded-md border border-border p-6 space-y-4">
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">One source of truth for "dirty"</h4>
            <p class="text-sm text-muted-foreground">The diff object answers every dirty-state question is anything changed (isEmpty), how many fields (Object.keys length), what to send (the diff itself).</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Minimal payloads by construction</h4>
            <p class="text-sm text-muted-foreground">You ship only what changed. No accidental stale overwrites of fields the user didn't touch a real production-grade win.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold">!</span>
          <div>
            <h4 class="font-semibold">Shallow comparison only</h4>
            <p class="text-sm text-muted-foreground">diffObj uses strict equality per key. Nested objects compare by reference, so a "deep" edit to a nested array won't register as changed unless the parent reference updates. Use an immutable update pattern (spread, immer) when nesting matters.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold">!</span>
          <div>
            <h4 class="font-semibold">Reactive Forms still apply</h4>
            <p class="text-sm text-muted-foreground">This recipe uses signals and ngModel for clarity. If you're on Reactive Forms, the same pattern works feed <code class="text-xs font-mono">form.value</code> through diffObj against a captured initial value.</p>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Extensions</h2>
      <ul class="list-disc list-inside space-y-2 text-muted-foreground">
        <li>Use the diff as your <strong>PATCH body</strong> directly most REST APIs accept partial bodies.</li>
        <li>Render an <strong>"unsaved changes" guard</strong> with <code class="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">!(current | diffObj: original | isEmpty)</code> on the router CanDeactivate.</li>
        <li>Pair with <a routerLink="/docs/pipes/keys" class="text-primary underline">keys</a> to render a <strong>changed-fields summary</strong> elsewhere on the page.</li>
        <li>Log an <strong>audit trail</strong> by pushing each saved diff to a history array small, sparse, ready for replay.</li>
        <li>Combine with <a routerLink="/docs/pipes/json-pretty" class="text-primary underline">jsonPretty</a> to display the PATCH body with syntax highlighting in dev tools.</li>
      </ul>

      <div class="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
        <app-author-credit author="Mofiro Jean" url="https://github.com/mofirojean" />
        <a routerLink="/docs/recipes" class="text-primary underline">← All recipes</a>
      </div>
    </div>
  `,
})
export class DirtyFormTrackingRecipe {
  readonly copied = signal(false);
  readonly highlightedCode = computed(() => {
    const grammar = Prism.languages['typescript'];
    return grammar ? Prism.highlight(this.code, grammar, 'typescript') : this.code;
  });

  onCopy() {
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }

  code = [
    "import { Component, signal } from '@angular/core';",
    "import { FormsModule } from '@angular/forms';",
    "import { JsonPipe } from '@angular/common';",
    "import { DiffObjPipe, IsEmptyPipe } from 'ngx-transforms';",
    '',
    'interface Profile {',
    '  name: string;',
    '  email: string;',
    "  role: 'admin' | 'editor' | 'viewer';",
    '}',
    '',
    'const SEED: Profile = {',
    "  name: 'Alice Mitchell',",
    "  email: 'alice@example.com',",
    "  role: 'editor',",
    '};',
    '',
    '@Component({',
    "  selector: 'app-profile-editor',",
    '  standalone: true,',
    '  imports: [FormsModule, JsonPipe, DiffObjPipe, IsEmptyPipe],',
    '  template: `',
    '    <input [ngModel]="current().name"',
    "           (ngModelChange)=\"set('name', $event)\" />",
    '    <input [ngModel]="current().email"',
    "           (ngModelChange)=\"set('email', $event)\" />",
    '',
    '    <pre>{{ current() | diffObj: original() | json }}</pre>',
    '',
    '    <button [disabled]="(current() | diffObj: original()) | isEmpty"',
    '            (click)="save()">',
    '      Save changes',
    '    </button>',
    '  `,',
    '})',
    'export class ProfileEditor {',
    '  original = signal<Profile>({ ...SEED });',
    '  current = signal<Profile>({ ...SEED });',
    '',
    '  set<K extends keyof Profile>(key: K, value: Profile[K]) {',
    '    this.current.update(c => ({ ...c, [key]: value }));',
    '  }',
    '',
    '  save() {',
    '    // PATCH body = current | diffObj: original',
    '    // On success, promote current → original to reset dirty state',
    '    this.original.set({ ...this.current() });',
    '  }',
    '}',
  ].join('\n');
}
