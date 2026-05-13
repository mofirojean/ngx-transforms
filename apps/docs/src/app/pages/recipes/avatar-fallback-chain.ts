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
import { AvatarFallback } from '../../examples/avatar-fallback/avatar-fallback';

@Component({
  selector: 'app-recipe-avatar-fallback-chain',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ClipboardModule, NgIconComponent, MacosWindow, AuthorCredit, Breadcrumb, AvatarFallback],
  providers: [provideIcons({ lucideCopy, lucideCheck })],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <div class="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4">
        Recipe
      </div>

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        Avatar Fallback Chain
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        Render a user avatar gracefully for any shape of profile data
        gravatar when an email is present, colored initials when only a
        name is, a generic placeholder when neither.
      </p>

      <div class="mb-10">
        <h2 class="text-2xl font-bold mb-3">The problem</h2>
        <p class="leading-7 text-muted-foreground">
          User records come in with messy completeness, some have email
          but no name, some have a name but no email, and a few are fully
          anonymous. A good avatar UI doesn't break in any of those states;
          it degrades gracefully through a chain of fallbacks. Doing this
          imperatively in a component class means three branches of
          conditionals plus DOM coordination. With pipes, the chain lives
          in the template, right next to the markup it controls.
        </p>
      </div>

      <div class="mb-10">
        <h2 class="text-2xl font-bold mb-3">The pipes you'll combine</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <a routerLink="/docs/pipes/gravatar" class="rounded-md border border-border p-4 hover:border-foreground/50 transition-colors">
            <div class="font-mono text-sm font-semibold mb-1">gravatar</div>
            <p class="text-xs text-muted-foreground">Email → md5-hashed avatar URL at the size you ask for. First-choice renderer.</p>
          </a>
          <a routerLink="/docs/pipes/initials" class="rounded-md border border-border p-4 hover:border-foreground/50 transition-colors">
            <div class="font-mono text-sm font-semibold mb-1">initials</div>
            <p class="text-xs text-muted-foreground">"Alice Mitchell" → "AM". Second-choice renderer for the colored-circle look.</p>
          </a>
          <a routerLink="/docs/pipes/is-empty" class="rounded-md border border-border p-4 hover:border-foreground/50 transition-colors">
            <div class="font-mono text-sm font-semibold mb-1">isEmpty</div>
            <p class="text-xs text-muted-foreground">The gate that decides which branch wins. Treats null, undefined, and "" as empty.</p>
          </a>
        </div>
      </div>

      <h2 class="text-2xl font-bold mb-4">Live example</h2>
      <p class="text-sm text-muted-foreground mb-3">
        Edit the name and email, click a scenario preset, switch sizes the
        active branch caption tells you which fallback is rendering. Toggle
        <strong>Show chain</strong> to see the
        <code class="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">&#64;if / &#64;else if / &#64;else</code>
        ladder light up in sync.
      </p>
      <app-macos-window title="User Avatar with Fallback Chain">
        <app-avatar-fallback />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">The pattern</h2>
      <p class="leading-7 text-muted-foreground mb-6">
        Wrap the whole chain in an
        <code class="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">&#64;if / &#64;else if / &#64;else</code>
        ladder, with
        <code class="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">isEmpty</code>
        guarding each branch from top to bottom. Each branch's renderer
        runs its own pipe to format the data
        <code class="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">gravatar</code>
        on the email,
        <code class="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">initials</code>
        on the name. The component class stays empty of fallback logic.
      </p>

      <div class="relative rounded-lg border border-border bg-muted/30 overflow-hidden">
        <div class="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/50">
          <span class="text-xs font-mono text-muted-foreground">user-avatar.ts</span>
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
        Order matters: the most-preferred branch goes first. Adding a fourth
        fallback later, say a default URL stored per-tenant is one more
        <code class="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">&#64;else if</code>
        block above the placeholder, no class changes.
      </p>

      <h2 class="text-2xl font-bold my-8">Why conditional substitution composes well</h2>
      <div class="rounded-md border border-border p-6 space-y-4">
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Only the winning branch renders</h4>
            <p class="text-sm text-muted-foreground">Angular's control-flow blocks tear down branches that don't match. You don't pay for the initials computation when the gravatar branch is active.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Adding a branch is one line</h4>
            <p class="text-sm text-muted-foreground">Want a "company logo" fallback above the placeholder? One <code class="text-xs font-mono">&#64;else if</code> block, no refactor.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold">!</span>
          <div>
            <h4 class="font-semibold">isEmpty doesn't catch whitespace strings</h4>
            <p class="text-sm text-muted-foreground">"   " counts as non-empty. Chain <a routerLink="/docs/pipes/trim" class="text-primary underline">trim</a> before isEmpty if your inputs might be padded <code class="text-xs font-mono">email | trim | isEmpty</code>.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold">!</span>
          <div>
            <h4 class="font-semibold">Gravatar always returns a URL</h4>
            <p class="text-sm text-muted-foreground">Even with an unknown email, gravatar returns its generic placeholder. To fall back when the image itself fails to load, wire an <code class="text-xs font-mono">(error)</code> handler on the img element that flips a signal covered in extensions.</p>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Extensions</h2>
      <ul class="list-disc list-inside space-y-2 text-muted-foreground">
        <li>Handle <strong>image-load failure</strong> separately: add <code class="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">(error)="failed.set(true)"</code> on the img and short-circuit to the initials branch.</li>
        <li>Use a <strong>stable hue per name</strong> for the initials background (string-hash → HSL) so the same user always gets the same color — this recipe's playground demonstrates the trick.</li>
        <li>Insert a <strong>company-logo branch</strong> above the placeholder for organizational accounts.</li>
        <li>Pair with <a routerLink="/docs/pipes/trim" class="text-primary underline">trim</a> in front of isEmpty if user inputs may include whitespace-only strings.</li>
        <li>Render <strong>multiple avatars at multiple sizes</strong> — the same chain works at any size without modification.</li>
      </ul>

      <div class="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
        <app-author-credit author="Mofiro Jean" url="https://github.com/mofirojean" />
        <a routerLink="/docs/recipes" class="text-primary underline">← All recipes</a>
      </div>
    </div>
  `,
})
export class AvatarFallbackChainRecipe {
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
    "import { Component, input } from '@angular/core';",
    "import { GravatarPipe, InitialsPipe, IsEmptyPipe } from 'ngx-transforms';",
    '',
    'interface User {',
    '  name: string;',
    '  email: string;',
    '}',
    '',
    '@Component({',
    "  selector: 'app-user-avatar',",
    '  standalone: true,',
    '  imports: [GravatarPipe, InitialsPipe, IsEmptyPipe],',
    '  template: `',
    '    @if (!(user().email | isEmpty)) {',
    "      <img [src]=\"user().email | gravatar: size()\" class=\"avatar\" />",
    '    } @else if (!(user().name | isEmpty)) {',
    "      <span class=\"avatar initials\" [style.background]=\"colorFromName(user().name)\">",
    "        {{ user().name | initials }}",
    '      </span>',
    '    } @else {',
    "      <span class=\"avatar placeholder\">?</span>",
    '    }',
    '  `,',
    '})',
    'export class UserAvatar {',
    '  user = input.required<User>();',
    '  size = input<number>(56);',
    '',
    '  colorFromName(name: string): string {',
    '    let hash = 0;',
    '    for (const c of name) hash = c.charCodeAt(0) + ((hash << 5) - hash);',
    '    return `hsl(${Math.abs(hash) % 360}, 65%, 50%)`;',
    '  }',
    '}',
  ].join('\n');
}
