import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HtmlSanitizePipe } from '@ngx-transforms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideShield,
  lucideAlertTriangle,
  lucideEye,
  lucideCode,
} from '@ng-icons/lucide';

interface SanitizeExample {
  label: string;
  html: string;
  danger: 'safe' | 'warning' | 'danger';
}

@Component({
  selector: 'app-rich-text-previewer',
  standalone: true,
  imports: [
    HlmInputImports,
    HlmLabelImports,
    HlmButtonImports,
    NgIcon,
    HtmlSanitizePipe,
  ],
  providers: [
    HtmlSanitizePipe,
    provideIcons({ lucideShield, lucideAlertTriangle, lucideEye, lucideCode }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-6 w-full p-4 md:p-6">
      <div class="text-center">
        <h3 class="text-xl font-semibold tracking-tight">Rich Text Previewer</h3>
        <p class="text-muted-foreground mt-1 text-sm">
          See how Angular's DomSanitizer strips dangerous HTML while keeping safe content.
        </p>
      </div>

      <!-- Security Info -->
      <div class="flex items-start gap-3 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
        <ng-icon name="lucideAlertTriangle" class="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
        <div>
          <h4 class="text-sm font-semibold">Security Note</h4>
          <p class="text-xs text-muted-foreground mt-1">
            The sanitize pipe removes dangerous elements like scripts and event handlers.
            Always validate input server-side as well.
          </p>
        </div>
      </div>

      <!-- Quick Examples -->
      <div>
        <label hlmLabel class="text-xs text-muted-foreground mb-2 block">Test Scenarios</label>
        <div class="flex flex-wrap gap-2">
          @for (example of examples; track example.label) {
            <button
              hlmBtn
              [variant]="example.danger === 'safe' ? 'outline' : example.danger === 'warning' ? 'outline' : 'outline'"
              size="sm"
              (click)="loadExample(example.html)"
              class="text-xs"
              [class.border-green-500/50]="example.danger === 'safe'"
              [class.border-amber-500/50]="example.danger === 'warning'"
              [class.border-red-500/50]="example.danger === 'danger'"
            >
              {{ example.label }}
            </button>
          }
        </div>
      </div>

      <!-- Input -->
      <div class="grid w-full gap-1.5">
        <label hlmLabel for="html-sanitize-input">HTML Input</label>
        <textarea
          hlmInput
          id="html-sanitize-input"
          rows="4"
          class="w-full resize-none h-20 font-mono text-sm"
          [value]="inputHtml()"
          (input)="onInput($event)"
          placeholder="Enter HTML to sanitize..."
        ></textarea>
      </div>

      <!-- Output -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Rendered -->
        <div class="rounded-lg border border-border overflow-hidden">
          <div class="bg-muted/50 px-4 py-2 border-b border-border flex items-center gap-2">
            <ng-icon name="lucideEye" class="h-4 w-4 text-muted-foreground" />
            <span class="text-sm font-medium">Rendered Output</span>
          </div>
          <div class="p-4 min-h-[80px]">
            <div class="prose prose-sm dark:prose-invert max-w-none" [innerHTML]="inputHtml() | htmlSanitize"></div>
          </div>
        </div>

        <!-- Source -->
        <div class="rounded-lg border border-border overflow-hidden">
          <div class="bg-muted/50 px-4 py-2 border-b border-border flex items-center gap-2">
            <ng-icon name="lucideCode" class="h-4 w-4 text-muted-foreground" />
            <span class="text-sm font-medium">Sanitized Source</span>
          </div>
          <div class="p-4 min-h-[80px]">
            <pre class="text-sm font-mono whitespace-pre-wrap break-all text-muted-foreground">{{ sanitizedSource() }}</pre>
          </div>
        </div>
      </div>

      <!-- What was stripped -->
      @if (strippedElements().length > 0) {
        <div class="rounded-lg border border-red-500/30 overflow-hidden">
          <div class="bg-red-500/5 px-4 py-2 border-b border-red-500/30 flex items-center gap-2">
            <ng-icon name="lucideShield" class="h-4 w-4 text-red-500" />
            <span class="text-sm font-medium text-red-600 dark:text-red-400">Stripped Elements</span>
          </div>
          <div class="p-4">
            <div class="flex flex-wrap gap-2">
              @for (el of strippedElements(); track el) {
                <span class="inline-flex items-center rounded-md bg-red-500/10 px-2.5 py-1 text-xs font-mono text-red-600 dark:text-red-400 line-through">
                  {{ el }}
                </span>
              }
            </div>
          </div>
        </div>
      }
    </div>
  `,
})
export class RichTextPreviewer {
  private sanitizer = inject(DomSanitizer);
  private sanitizePipe = inject(HtmlSanitizePipe);

  inputHtml = signal(
    '<h2>Welcome</h2>\n<p>This is <b>safe</b> content.</p>\n<script>alert("XSS")</script>'
  );

  sanitizedSource = computed(() => {
    const result = this.sanitizer.sanitize(0, this.inputHtml());
    return result || '';
  });

  strippedElements = computed(() => {
    const input = this.inputHtml();
    const stripped: string[] = [];
    const dangerousPatterns = [
      { regex: /<script[\s\S]*?<\/script>/gi, label: '<script>' },
      { regex: /<iframe[\s\S]*?(?:<\/iframe>|\/>)/gi, label: '<iframe>' },
      { regex: /<object[\s\S]*?(?:<\/object>|\/>)/gi, label: '<object>' },
      { regex: /<embed[\s\S]*?(?:<\/embed>|\/>)/gi, label: '<embed>' },
      { regex: /\bon\w+\s*=\s*["'][^"']*["']/gi, label: 'event handler' },
      { regex: /style\s*=\s*["'][^"']*expression\([^)]*\)[^"']*["']/gi, label: 'CSS expression' },
    ];
    for (const pattern of dangerousPatterns) {
      if (pattern.regex.test(input)) {
        stripped.push(pattern.label);
      }
    }
    return stripped;
  });

  examples: SanitizeExample[] = [
    {
      label: 'Safe HTML',
      html: '<h2>Title</h2>\n<p>A paragraph with <em>emphasis</em> and <strong>bold</strong> text.</p>',
      danger: 'safe',
    },
    {
      label: 'Script Injection',
      html: '<p>Normal text</p>\n<script>document.cookie</script>\n<p>More text</p>',
      danger: 'danger',
    },
    {
      label: 'Event Handler',
      html: '<div onmouseover="alert(\'xss\')">Hover me</div>\n<button onclick="steal()">Click</button>',
      danger: 'danger',
    },
    {
      label: 'Mixed Content',
      html: '<h1>Blog Post</h1>\n<p>Safe content here.</p>\n<iframe src="evil.com"></iframe>\n<b>Bold is fine</b>',
      danger: 'warning',
    },
  ];

  onInput(event: Event): void {
    this.inputHtml.set((event.target as HTMLTextAreaElement).value);
  }

  loadExample(html: string): void {
    this.inputHtml.set(html);
  }
}
