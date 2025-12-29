import { Component, computed, signal } from '@angular/core';
import { CountPipe } from '@ngx-transforms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideBold, lucideItalic, lucideUnderline } from '@ng-icons/lucide';

@Component({
  selector: 'app-word-editor-count',
  standalone: true,
  imports: [CountPipe, NgIconComponent],
  providers: [provideIcons({ lucideBold, lucideItalic, lucideUnderline })],
  templateUrl: './word-editor-count.html',
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    .word-editor-toolbar {
      display: flex;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      border-bottom: 1px solid var(--border);
      background-color: var(--muted/50);
    }

    .toolbar-button {
      padding: 0.25rem;
      border: none;
      border-radius: var(--radius);
      background-color: transparent;
      color: var(--muted-foreground);
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .toolbar-button:hover {
      background-color: var(--accent);
      color: var(--accent-foreground);
    }

    .word-editor-content {
      padding: 1rem;
      min-height: 8rem;
      outline: none;
      font-size: 1rem;
      line-height: 1.75;
      color: var(--foreground);
    }

    .word-editor-content:empty::before {
      content: 'Start typing and see the magic happen...';
      color: var(--muted-foreground);
      pointer-events: none;
    }

    .word-editor-footer {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 1.5rem;
      padding: 0.75rem 1rem;
      border-top: 1px solid var(--border);
      background-color: var(--muted/50);
    }

    .word-count-value {
      font-size: 1rem;
      font-weight: 600;
      color: var(--primary);
      margin-right: 0.25rem;
    }

    .word-count-label {
      font-size: 0.75rem;
      color: var(--muted-foreground);
    }

    .divider {
      width: 1px;
      height: 1.25rem;
      background-color: var(--border);
    }
  `],
})
export class WordEditorCount {
  readonly content = signal('');
  readonly wordCount = computed(() => {
    const content = this.content().trim();
    if (!content) {
      return 0;
    }
    return content.split(/\s+/).length;
  });

  onContentChange(event: Event) {
    const target = event.target as HTMLElement;
    this.content.set(target.innerText.trim());
  }

  format(command: string) {
    // Note: document.execCommand is deprecated. For a production-ready rich-text editor,
    // consider a library like Tiptap, ProseMirror, or Quill.js.
    // This is kept for simplicity to demonstrate the functionality.
    document.execCommand(command, false, undefined);
  }
}

