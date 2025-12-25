import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideCopy, lucideCheck } from '@ng-icons/lucide';
import { Clipboard, ClipboardModule } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-command-preview',
  templateUrl: './command-preview.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIconComponent, ClipboardModule],
  providers: [provideIcons({ lucideCopy, lucideCheck })],
})
export class CommandPreview {
  readonly command = input.required<string>();
  readonly copied = signal(false);

  private readonly clipboard = inject(Clipboard);

  copyToClipboard() {
    this.clipboard.copy(this.command());
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 3000);
  }
}
