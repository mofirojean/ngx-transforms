import { Component, signal, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AsciiGenerator, CharsetPreset, AsciiConfig } from 'ts-ascii-engine';

interface CharsetOption {
  label: string;
  value: CharsetPreset | string;
  description: string;
  preview: string;
}

interface PresetBanner {
  text: string;
  charset: CharsetPreset | string;
  width: number;
  fontSize: number;
  inverted: boolean;
}

@Component({
  selector: 'app-ascii-art-studio',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="max-w-6xl mx-auto p-6 space-y-6">
      <!-- Header -->
      <div class="text-center space-y-2">
        <h2 class="text-2xl font-bold">ASCII Art Studio</h2>
        <p class="text-muted-foreground">Create stunning text banners with customizable ASCII art</p>
      </div>

      <!-- Input Section -->
      <div class="grid gap-4 md:grid-cols-2">
        <!-- Text Input -->
        <div class="space-y-2">
          <label class="text-sm font-medium">Your Text</label>
          <input
            type="text"
            [(ngModel)]="textValue"
            (ngModelChange)="onTextChange($event)"
            [maxlength]="maxLength"
            placeholder="Enter text (max {{maxLength}} chars)"
            class="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <div class="text-xs text-muted-foreground">
            {{textValue.length}} / {{maxLength}} characters
          </div>
        </div>

        <!-- Width Control -->
        <div class="space-y-2">
          <label class="text-sm font-medium">Width (characters)</label>
          <input
            type="range"
            [(ngModel)]="widthValue"
            (ngModelChange)="onConfigChange()"
            min="40"
            max="120"
            step="10"
            class="w-full"
          />
          <div class="text-xs text-muted-foreground text-center">{{widthValue}}</div>
        </div>
      </div>

      <!-- Charset Selection -->
      <div class="space-y-2">
        <label class="text-sm font-medium">Character Set</label>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
          @for (option of charsetOptions; track option.value) {
            <button
              (click)="selectCharset(option.value)"
              [class.ring-2]="charsetValue === option.value"
              [class.ring-primary]="charsetValue === option.value"
              class="p-3 border border-border rounded-lg hover:bg-accent transition-colors text-left"
            >
              <div class="font-medium text-sm">{{option.label}}</div>
              <div class="text-xs text-muted-foreground mt-1">{{option.description}}</div>
              <div class="font-mono text-xs mt-2 overflow-hidden">{{option.preview}}</div>
            </button>
          }
        </div>
      </div>

      <!-- Advanced Options -->
      <div class="border border-border rounded-lg p-4 space-y-4">
        <h3 class="font-semibold text-sm">Advanced Options</h3>
        <div class="grid gap-4 md:grid-cols-3">
          <!-- Font Size -->
          <div class="space-y-2">
            <label class="text-sm font-medium">Font Size</label>
            <input
              type="range"
              [(ngModel)]="fontSizeValue"
              (ngModelChange)="onConfigChange()"
              min="24"
              max="96"
              step="12"
              class="w-full"
            />
            <div class="text-xs text-muted-foreground text-center">{{fontSizeValue}}px</div>
          </div>

          <!-- Inverted -->
          <div class="space-y-2">
            <label class="text-sm font-medium">Invert Colors</label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                [(ngModel)]="invertedValue"
                (ngModelChange)="onConfigChange()"
                class="w-4 h-4 rounded border-border"
              />
              <span class="text-sm">Enable inversion</span>
            </label>
          </div>

          <!-- Font Weight -->
          <div class="space-y-2">
            <label class="text-sm font-medium">Font Weight</label>
            <select
              [(ngModel)]="fontWeightValue"
              (ngModelChange)="onConfigChange()"
              class="w-full px-3 py-2 border border-border rounded-md bg-background"
            >
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
              <option value="300">Light</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Preset Banners -->
      <div class="space-y-2">
        <h3 class="font-semibold">Quick Presets</h3>
        <div class="flex flex-wrap gap-2">
          @for (preset of presets; track preset.text) {
            <button
              (click)="applyPreset(preset)"
              class="px-4 py-2 border border-border rounded-md hover:bg-accent transition-colors text-sm"
            >
              {{preset.text}}
            </button>
          }
        </div>
      </div>

      <!-- Output Preview -->
      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <h3 class="font-semibold">Preview</h3>
          <div class="flex gap-2">
            <button
              (click)="copyToClipboard()"
              class="px-3 py-1 text-xs border border-border rounded-md hover:bg-accent transition-colors"
            >
              {{copyButtonText()}}
            </button>
            <button
              (click)="downloadAsText()"
              class="px-3 py-1 text-xs border border-border rounded-md hover:bg-accent transition-colors"
            >
              Download
            </button>
          </div>
        </div>
        <div class="border border-border rounded-lg p-4 bg-muted/30 overflow-x-auto">
          <div
            class="font-mono text-xs leading-tight"
            [innerHTML]="asciiHtml()"
          ></div>
        </div>
        <div class="text-xs text-muted-foreground">
          Performance: {{processingTime()}}ms | Characters: {{characterCount()}}
        </div>
      </div>

      <!-- Usage Example -->
      <div class="border border-border rounded-lg p-4 space-y-2">
        <h3 class="font-semibold text-sm">Usage in Your Code</h3>
        <pre class="text-xs bg-muted p-3 rounded overflow-x-auto"><code>{{ usageExample() }}</code></pre>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    input[type="range"] {
      -webkit-appearance: none;
      appearance: none;
      background: transparent;
      cursor: pointer;
    }

    input[type="range"]::-webkit-slider-track {
      background: hsl(var(--border));
      height: 0.5rem;
      border-radius: 0.25rem;
    }

    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      background: hsl(var(--primary));
      height: 1.25rem;
      width: 1.25rem;
      border-radius: 50%;
      margin-top: -0.375rem;
    }

    input[type="range"]::-moz-range-track {
      background: hsl(var(--border));
      height: 0.5rem;
      border-radius: 0.25rem;
    }

    input[type="range"]::-moz-range-thumb {
      background: hsl(var(--primary));
      height: 1.25rem;
      width: 1.25rem;
      border-radius: 50%;
      border: none;
    }
  `],
})
export class AsciiArtStudio {
  private sanitizer = inject(DomSanitizer);
  private generator: AsciiGenerator;

  // Regular properties for form bindings
  textValue = 'HELLO';
  charsetValue: CharsetPreset | string = CharsetPreset.STANDARD;
  widthValue = 80;
  fontSizeValue = 48;
  invertedValue = false;
  fontWeightValue: 'normal' | 'bold' | '300' = 'normal';

  // Signals for reactive state
  copyButtonText = signal('Copy');
  processingTime = signal(0);
  characterCount = signal(0);
  private asciiOutput = signal<string>('');

  maxLength = 50; // Security: Limit input length

  // Charset options with previews
  charsetOptions: CharsetOption[] = [
    {
      label: 'Standard',
      value: CharsetPreset.STANDARD,
      description: 'Classic ASCII',
      preview: '@%#*+=-:.',
    },
    {
      label: 'Block',
      value: CharsetPreset.BLOCK,
      description: 'Solid blocks',
      preview: '██▓▒░',
    },
    {
      label: 'Minimal',
      value: CharsetPreset.MINIMAL,
      description: 'Simple & clean',
      preview: '@+.',
    },
    {
      label: 'Extended',
      value: CharsetPreset.EXTENDED,
      description: 'Full character set',
      preview: '$@B%8&WM#...',
    },
  ];

  // Quick presets for instant demos
  presets: PresetBanner[] = [
    { text: 'WELCOME', charset: CharsetPreset.BLOCK, width: 80, fontSize: 60, inverted: false },
    { text: 'ERROR', charset: CharsetPreset.STANDARD, width: 60, fontSize: 72, inverted: true },
    { text: 'SUCCESS', charset: CharsetPreset.MINIMAL, width: 70, fontSize: 48, inverted: false },
    { text: 'RETRO', charset: CharsetPreset.EXTENDED, width: 90, fontSize: 54, inverted: false },
  ];

  constructor() {
    // Initialize generator
    this.generator = new AsciiGenerator({
      charset: CharsetPreset.STANDARD,
      width: 80,
      optimized: true,
    });

    // Generate initial output
    this.generateAscii();
  }

  asciiHtml = computed(() => {
    return this.sanitizer.bypassSecurityTrustHtml(this.asciiOutput()) as SafeHtml;
  });

  // Generate usage example code
  usageExample = computed(() => {
    const options: string[] = [];

    if (this.charsetValue !== CharsetPreset.STANDARD) {
      options.push(`charset: CharsetPreset.${this.charsetValue}`);
    }
    if (this.widthValue !== 80) {
      options.push(`width: ${this.widthValue}`);
    }
    if (this.invertedValue) {
      options.push(`inverted: true`);
    }
    if (this.fontSizeValue !== 48 || this.fontWeightValue !== 'normal') {
      const textOpts: string[] = [];
      if (this.fontSizeValue !== 48) textOpts.push(`fontSize: ${this.fontSizeValue}`);
      if (this.fontWeightValue !== 'normal') textOpts.push(`fontWeight: '${this.fontWeightValue}'`);
      options.push(`textOptions: { ${textOpts.join(', ')} }`);
    }

    const optionsStr = options.length > 0 ? `:{ ${options.join(', ')} }` : '';
    return `{{ '${this.textValue}' | asciiArt${optionsStr} }}`;
  });

  onTextChange(value: string) {
    // Security: Enforce max length
    if (value.length > this.maxLength) {
      this.textValue = value.substring(0, this.maxLength);
    }
    this.generateAscii();
  }

  selectCharset(charset: CharsetPreset | string) {
    this.charsetValue = charset;
    this.onConfigChange();
  }

  onConfigChange() {
    this.generateAscii();
  }

  generateAscii() {
    if (!this.textValue) {
      this.asciiOutput.set('');
      return;
    }

    try {
      const start = performance.now();

      // Update generator config
      this.generator.updateConfig({
        charset: this.charsetValue,
        width: this.widthValue,
        inverted: this.invertedValue,
      });

      // Generate ASCII art
      const result = this.generator.convertText(this.textValue, {
        fontSize: this.fontSizeValue,
        fontWeight: this.fontWeightValue,
      });

      const end = performance.now();
      this.processingTime.set(Math.round((end - start) * 100) / 100);

      // Count characters
      const textLength = result.text.length;
      this.characterCount.set(textLength);

      // Store HTML output
      this.asciiOutput.set(result.html);
    } catch (error) {
      console.error('Error generating ASCII art:', error);
      this.asciiOutput.set('<pre class="text-red-500">Error generating ASCII art</pre>');
    }
  }

  applyPreset(preset: PresetBanner) {
    this.textValue = preset.text;
    this.charsetValue = preset.charset;
    this.widthValue = preset.width;
    this.fontSizeValue = preset.fontSize;
    this.invertedValue = preset.inverted;
    this.fontWeightValue = 'normal';
    this.generateAscii();
  }

  copyToClipboard() {
    const output = this.asciiOutput();
    const textContent = output.replace(/<[^>]*>/g, ''); // Strip HTML tags

    navigator.clipboard.writeText(textContent).then(
      () => {
        this.copyButtonText.set('Copied!');
        setTimeout(() => this.copyButtonText.set('Copy'), 2000);
      },
      (err) => {
        console.error('Failed to copy:', err);
        this.copyButtonText.set('Error');
        setTimeout(() => this.copyButtonText.set('Copy'), 2000);
      }
    );
  }

  downloadAsText() {
    const output = this.asciiOutput();
    const textContent = output.replace(/<[^>]*>/g, ''); // Strip HTML tags

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ascii-art-${this.textValue}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
