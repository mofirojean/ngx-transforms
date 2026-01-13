import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideCopy, lucideCheck } from '@ng-icons/lucide';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-css';
import { Clipboard, ClipboardModule } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-code-block',
  standalone: true,
  imports: [NgIconComponent, ClipboardModule],
  providers: [provideIcons({ lucideCopy, lucideCheck })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative group">
      <button
        class="absolute top-3 right-3 z-10 p-2 rounded-md bg-muted hover:bg-muted/80 transition-colors opacity-0 group-hover:opacity-100"
        [class.opacity-100]="copied()"
        (click)="copyToClipboard()"
        title="Copy code"
      >
        @if (copied()) {
          <ng-icon name="lucideCheck" class="h-4 w-4 text-green-600"></ng-icon>
        } @else {
          <ng-icon name="lucideCopy" class="h-4 w-4"></ng-icon>
        }
      </button>

      <pre class="my-0! rounded-lg! overflow-x-auto"><code
        class="language-{{ language() }}"
        [innerHTML]="highlightedCode()"></code></pre>
    </div>
  `,
  styles: `
    pre {
      margin: 0;
      padding: 1rem;
      background: var(--color-muted);
      border-radius: 0.5rem;
      font-size: 0.875rem;
      line-height: 1.5;
    }

    code {
      font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
    }
  `
})
export class CodeBlock {
  readonly code = input.required<string>();
  readonly language = input<string>('typescript');
  readonly copied = signal(false);

  private readonly clipboard = inject(Clipboard);

  readonly highlightedCode = computed(() => {
    const code = this.code().trim();
    const grammar = Prism.languages[this.language()];
    if (!grammar) {
      return code;
    }
    return Prism.highlight(code, grammar, this.language());
  });

  copyToClipboard() {
    this.clipboard.copy(this.code());
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }
}
