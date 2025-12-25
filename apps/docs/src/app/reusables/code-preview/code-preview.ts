import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideCopy, lucideCheck } from '@ng-icons/lucide';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import { Clipboard, ClipboardModule } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-code-preview',
  templateUrl: './code-preview.html',
  styleUrls: ['./code-preview.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIconComponent, ClipboardModule],
  providers: [provideIcons({ lucideCopy, lucideCheck })],
})
export class CodePreview {
  readonly code = input.required<string>();
  readonly language = input<string>('typescript');
  readonly copied = signal(false);

  readonly activeTab = signal('preview');

  private readonly clipboard = inject(Clipboard);

  readonly highlightedCode = computed(() => {
    const code = this.code();
    const grammar = Prism.languages[this.language()];
    if (!grammar) {
      return code;
    }
    return Prism.highlight(code, grammar, this.language());
  });

  copyToClipboard() {
    this.clipboard.copy(this.code());
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 3000);
  }
}
