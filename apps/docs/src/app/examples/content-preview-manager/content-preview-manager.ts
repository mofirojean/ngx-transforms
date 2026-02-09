import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { TruncatePipe } from '@ngx-transforms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideScissors, lucideType, lucideAlignLeft } from '@ng-icons/lucide';

interface PreviewPreset {
  label: string;
  text: string;
  maxLength: number;
  ellipsis: string;
  preserveWords: boolean;
}

@Component({
  selector: 'app-content-preview-manager',
  standalone: true,
  imports: [HlmInputImports, HlmLabelImports, HlmButtonImports, NgIcon],
  providers: [provideIcons({ lucideScissors, lucideType, lucideAlignLeft })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-6 w-full p-4 md:p-6">
      <div class="text-center">
        <h3 class="text-xl font-semibold tracking-tight">Content Preview Manager</h3>
        <p class="text-muted-foreground mt-1 text-sm">
          Adjust truncation settings to preview how your content will appear in cards, feeds, and notifications.
        </p>
      </div>

      <!-- Quick Presets -->
      <div>
        <label hlmLabel class="text-xs text-muted-foreground mb-2 block">Quick Presets</label>
        <div class="flex flex-wrap gap-2">
          @for (preset of presets; track preset.label) {
            <button
              hlmBtn
              variant="outline"
              size="sm"
              (click)="loadPreset(preset)"
              class="text-xs"
            >
              {{ preset.label }}
            </button>
          }
        </div>
      </div>

      <!-- Input -->
      <div class="grid w-full gap-1.5">
        <label hlmLabel for="content-input">Content</label>
        <textarea
          hlmInput
          id="content-input"
          rows="10"
          class="w-full h-14 resize-none"
          [value]="inputText()"
          (input)="onTextInput($event)"
          placeholder="Enter text to truncate..."
        ></textarea>
        <span class="text-xs text-muted-foreground">{{ inputText().length }} characters</span>
      </div>

      <!-- Controls -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="grid gap-1.5">
          <label hlmLabel for="max-length">Max Length</label>
          <input
            hlmInput
            id="max-length"
            type="number"
            min="1"
            max="500"
            [value]="maxLength()"
            (input)="onMaxLengthInput($event)"
            class="w-full"
          />
        </div>
        <div class="grid gap-1.5">
          <label hlmLabel for="ellipsis-input">Ellipsis</label>
          <input
            hlmInput
            id="ellipsis-input"
            type="text"
            [value]="ellipsis()"
            (input)="onEllipsisInput($event)"
            class="w-full"
          />
        </div>
        <div class="grid gap-1.5">
          <label hlmLabel>Preserve Words</label>
          <button
            hlmBtn
            [variant]="preserveWords() ? 'default' : 'outline'"
            size="sm"
            (click)="togglePreserveWords()"
            class="w-full justify-center"
          >
            <ng-icon name="lucideAlignLeft" class="h-4 w-4 mr-2" />
            {{ preserveWords() ? 'On' : 'Off' }}
          </button>
        </div>
      </div>

      <!-- Result -->
      <div class="rounded-lg border border-border overflow-hidden">
        <div class="bg-muted/50 px-4 py-2 border-b border-border flex items-center gap-2">
          <ng-icon name="lucideScissors" class="h-4 w-4 text-muted-foreground" />
          <span class="text-sm font-medium">Preview</span>
        </div>
        <div class="p-4 space-y-4">
          <div>
            <div class="text-xs text-muted-foreground mb-1">Original ({{ inputText().length }} chars)</div>
            <p class="text-sm text-muted-foreground/70 line-clamp-2">{{ inputText() }}</p>
          </div>
          <div class="h-px bg-border"></div>
          <div>
            <div class="text-xs text-muted-foreground mb-1">Truncated ({{ truncatedResult().length }} chars)</div>
            <p class="text-sm font-medium">{{ truncatedResult() }}</p>
          </div>
        </div>
      </div>

      <!-- Visual Cards Preview -->
      <div>
        <label hlmLabel class="mb-2 block">Card Preview</label>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="rounded-lg border border-border p-4">
            <div class="h-20 rounded-md bg-muted/50 mb-3"></div>
            <h4 class="font-semibold text-sm mb-1">Article Title</h4>
            <p class="text-xs text-muted-foreground">{{ truncatedResult() }}</p>
          </div>
          <div class="rounded-lg border border-border p-4 flex items-start gap-3">
            <div class="h-10 w-10 rounded-full bg-muted/50 shrink-0"></div>
            <div class="min-w-0">
              <h4 class="font-semibold text-sm">Notification</h4>
              <p class="text-xs text-muted-foreground">{{ truncatedResult() }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ContentPreviewManager {
  private truncatePipe = new TruncatePipe();

  inputText = signal(
    'Angular is a platform and framework for building single-page client applications using HTML and TypeScript. It implements core and optional functionality as a set of TypeScript libraries that you import into your applications.'
  );
  maxLength = signal(60);
  ellipsis = signal('...');
  preserveWords = signal(true);

  truncatedResult = computed(() =>
    this.truncatePipe.transform(
      this.inputText(),
      this.maxLength(),
      this.ellipsis(),
      this.preserveWords()
    )
  );

  presets: PreviewPreset[] = [
    {
      label: 'Blog Excerpt',
      text: 'Angular is a platform and framework for building single-page client applications using HTML and TypeScript. It implements core and optional functionality as a set of TypeScript libraries that you import into your applications.',
      maxLength: 80,
      ellipsis: '...',
      preserveWords: true,
    },
    {
      label: 'Tweet',
      text: 'Just shipped a new feature using Angular pipes! The developer experience is incredible when you have the right tools. #Angular #WebDev #TypeScript',
      maxLength: 140,
      ellipsis: '...',
      preserveWords: true,
    },
    {
      label: 'Notification',
      text: 'Your pull request "feat: add truncation support for content previews" has been approved and merged into the main branch.',
      maxLength: 40,
      ellipsis: '...',
      preserveWords: true,
    },
    {
      label: 'Table Cell',
      text: 'This is a very long description that needs to fit inside a compact data table cell without breaking the layout.',
      maxLength: 25,
      ellipsis: ' [...]',
      preserveWords: false,
    },
  ];

  onTextInput(event: Event): void {
    this.inputText.set((event.target as HTMLTextAreaElement).value);
  }

  onMaxLengthInput(event: Event): void {
    const val = parseInt((event.target as HTMLInputElement).value, 10);
    if (!isNaN(val) && val > 0) this.maxLength.set(val);
  }

  onEllipsisInput(event: Event): void {
    this.ellipsis.set((event.target as HTMLInputElement).value);
  }

  togglePreserveWords(): void {
    this.preserveWords.update((v) => !v);
  }

  loadPreset(preset: PreviewPreset): void {
    this.inputText.set(preset.text);
    this.maxLength.set(preset.maxLength);
    this.ellipsis.set(preset.ellipsis);
    this.preserveWords.set(preset.preserveWords);
  }
}
