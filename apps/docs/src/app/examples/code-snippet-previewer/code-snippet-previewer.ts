import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HtmlEscapePipe } from '@ngx-transforms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCode, lucideShield, lucideArrowRight } from '@ng-icons/lucide';

interface HtmlExample {
  label: string;
  html: string;
}

@Component({
  selector: 'app-code-snippet-previewer',
  standalone: true,
  imports: [HlmInputImports, HlmLabelImports, HlmButtonImports, NgIcon],
  providers: [provideIcons({ lucideCode, lucideShield, lucideArrowRight })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-6 w-full p-4 md:p-6">
      <div class="text-center">
        <h3 class="text-xl font-semibold tracking-tight">Code Snippet Previewer</h3>
        <p class="text-muted-foreground mt-1 text-sm">
          See how HTML characters get escaped to prevent XSS and display code safely.
        </p>
      </div>

      <!-- Quick Examples -->
      <div>
        <label hlmLabel class="text-xs text-muted-foreground mb-2 block">Quick Examples</label>
        <div class="flex flex-wrap gap-2">
          @for (example of examples; track example.label) {
            <button
              hlmBtn
              variant="outline"
              size="sm"
              (click)="loadExample(example.html)"
              class="text-xs"
            >
              {{ example.label }}
            </button>
          }
        </div>
      </div>

      <!-- Input -->
      <div class="grid w-full gap-1.5">
        <label hlmLabel for="html-input">Raw HTML Input</label>
        <textarea
          hlmInput
          id="html-input"
          rows="10"
          class="w-full h-20 resize-none font-mono text-sm"
          [value]="inputHtml()"
          (input)="onInput($event)"
          placeholder="Type HTML here..."
        ></textarea>
      </div>

      <!-- Output Comparison -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Raw -->
        <div class="rounded-lg border border-border overflow-hidden">
          <div class="bg-muted/50 px-4 py-2 border-b border-border flex items-center gap-2">
            <ng-icon name="lucideCode" class="h-4 w-4 text-muted-foreground" />
            <span class="text-sm font-medium">Raw HTML</span>
          </div>
          <div class="p-4">
            <pre class="text-sm font-mono whitespace-pre-wrap break-all text-muted-foreground">{{ inputHtml() }}</pre>
          </div>
        </div>

        <!-- Escaped -->
        <div class="rounded-lg border border-border overflow-hidden">
          <div class="bg-muted/50 px-4 py-2 border-b border-border flex items-center gap-2">
            <ng-icon name="lucideShield" class="h-4 w-4 text-green-600 dark:text-green-400" />
            <span class="text-sm font-medium">Escaped Output</span>
          </div>
          <div class="p-4">
            <pre class="text-sm font-mono whitespace-pre-wrap break-all">{{ escapedResult() }}</pre>
          </div>
        </div>
      </div>

      <!-- Character Mapping -->
      @if (escapedChars().length > 0) {
        <div class="rounded-lg border border-border overflow-hidden">
          <div class="bg-muted/50 px-4 py-2 border-b border-border">
            <span class="text-sm font-medium">Characters Escaped ({{ escapedChars().length }})</span>
          </div>
          <div class="p-4">
            <div class="flex flex-wrap gap-2">
              @for (mapping of escapedChars(); track mapping.original + $index) {
                <div class="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1 text-xs font-mono">
                  <span class="text-red-500 dark:text-red-400">{{ mapping.original }}</span>
                  <ng-icon name="lucideArrowRight" class="h-3 w-3 text-muted-foreground" />
                  <span class="text-green-600 dark:text-green-400">{{ mapping.entity }}</span>
                </div>
              }
            </div>
          </div>
        </div>
      }
    </div>
  `,
})
export class CodeSnippetPreviewer {
  private htmlEscapePipe = new HtmlEscapePipe();

  inputHtml = signal('<div class="container">\n  <p>Hello <strong>World</strong></p>\n</div>');

  escapedResult = computed(() =>
    this.htmlEscapePipe.transform(this.inputHtml())
  );

  escapedChars = computed(() => {
    const input = this.inputHtml();
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&apos;',
    };
    const found: { original: string; entity: string }[] = [];
    const seen = new Set<string>();
    for (const char of input) {
      if (map[char] && !seen.has(char)) {
        seen.add(char);
        found.push({ original: char, entity: map[char] });
      }
    }
    return found;
  });

  examples: HtmlExample[] = [
    {
      label: 'HTML Tags',
      html: '<div class="container">\n  <p>Hello <strong>World</strong></p>\n</div>',
    },
    {
      label: 'Script Tag',
      html: '<script>alert("XSS attack!")</script>',
    },
    {
      label: 'Attributes',
      html: '<img src="photo.jpg" alt="A photo & caption">',
    },
    {
      label: 'Operators',
      html: "5 > 3 && 2 < 4 is \"true\"",
    },
  ];

  onInput(event: Event): void {
    this.inputHtml.set((event.target as HTMLTextAreaElement).value);
  }

  loadExample(html: string): void {
    this.inputHtml.set(html);
  }
}
