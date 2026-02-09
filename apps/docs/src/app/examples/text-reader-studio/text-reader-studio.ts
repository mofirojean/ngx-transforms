import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { TextToSpeechPipe } from '@ngx-transforms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideVolume2,
  lucideVolumeX,
  lucidePlay,
  lucideSquare,
  lucideGlobe,
} from '@ng-icons/lucide';

interface Language {
  label: string;
  value: string;
}

interface QuickPhrase {
  label: string;
  text: string;
  lang: string;
}

@Component({
  selector: 'app-text-reader-studio',
  standalone: true,
  imports: [
    HlmInputImports,
    HlmLabelImports,
    HlmButtonImports,
    BrnSelectImports,
    HlmSelectImports,
    NgIcon,
  ],
  providers: [
    provideIcons({ lucideVolume2, lucideVolumeX, lucidePlay, lucideSquare, lucideGlobe }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-6 w-full p-4 md:p-6">
      <div class="text-center">
        <h3 class="text-xl font-semibold tracking-tight">Text Reader Studio</h3>
        <p class="text-muted-foreground mt-1 text-sm">
          Type or select text and hear it spoken aloud in different languages.
        </p>
      </div>

      <!-- Quick Phrases -->
      <div>
        <label hlmLabel class="text-xs text-muted-foreground mb-2 block">Quick Phrases</label>
        <div class="flex flex-wrap gap-2">
          @for (phrase of quickPhrases; track phrase.label) {
            <button
              hlmBtn
              variant="outline"
              size="sm"
              (click)="loadPhrase(phrase)"
              class="text-xs"
            >
              {{ phrase.label }}
            </button>
          }
        </div>
      </div>

      <!-- Input -->
      <div class="grid w-full gap-1.5">
        <label hlmLabel for="speech-input">Text to Speak</label>
        <textarea
          hlmInput
          id="speech-input"
          rows="3"
          class="w-full resize-none"
          [value]="inputText()"
          (input)="onTextInput($event)"
          placeholder="Enter text to read aloud..."
        ></textarea>
        <span class="text-xs text-muted-foreground">{{ inputText().length }} characters</span>
      </div>

      <!-- Language Selector -->
      <div class="grid w-full gap-1.5">
        <label hlmLabel>Language</label>
        <brn-select [value]="selectedLang()" (valueChange)="onLangChange($event)">
          <hlm-select-trigger class="w-full">
            <hlm-select-value />
          </hlm-select-trigger>
          <hlm-select-content>
            @for (lang of languages; track lang.value) {
              <hlm-option [value]="lang.value">
                {{ lang.label }}
              </hlm-option>
            }
          </hlm-select-content>
        </brn-select>
      </div>

      <!-- Controls -->
      <div class="flex items-center justify-center gap-3">
        <button
          hlmBtn
          variant="default"
          (click)="speak()"
          [disabled]="!inputText() || !speechSupported"
          class="gap-2"
        >
          <ng-icon name="lucidePlay" class="h-4 w-4" />
          Speak
        </button>
        <button
          hlmBtn
          variant="outline"
          (click)="stop()"
          [disabled]="!isSpeaking()"
          class="gap-2"
        >
          <ng-icon name="lucideSquare" class="h-4 w-4" />
          Stop
        </button>
      </div>

      <!-- Status -->
      <div class="rounded-lg border border-border p-4 text-center">
        @if (!speechSupported) {
          <div class="flex items-center justify-center gap-2 text-amber-500">
            <ng-icon name="lucideVolumeX" class="h-5 w-5" />
            <span class="text-sm font-medium">Speech synthesis not available in this browser</span>
          </div>
        } @else if (isSpeaking()) {
          <div class="flex items-center justify-center gap-2 text-primary">
            <ng-icon name="lucideVolume2" class="h-5 w-5 animate-pulse" />
            <span class="text-sm font-medium">Speaking...</span>
          </div>
          <div class="flex justify-center gap-1 mt-3">
            @for (bar of soundBars; track $index) {
              <div
                class="w-1 bg-primary rounded-full animate-pulse"
                [style.height.px]="bar"
                [style.animation-delay.ms]="$index * 100"
              ></div>
            }
          </div>
        } @else {
          <div class="flex items-center justify-center gap-2 text-muted-foreground">
            <ng-icon name="lucideVolume2" class="h-5 w-5" />
            <span class="text-sm">Ready to speak</span>
          </div>
        }
      </div>

      <!-- Language Info -->
      <div class="rounded-lg border border-border overflow-hidden">
        <div class="bg-muted/50 px-4 py-2 border-b border-border flex items-center gap-2">
          <ng-icon name="lucideGlobe" class="h-4 w-4 text-muted-foreground" />
          <span class="text-sm font-medium">Current Settings</span>
        </div>
        <div class="p-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <span class="text-muted-foreground">Language</span>
            <p class="font-medium">{{ currentLangLabel() }}</p>
          </div>
          <div>
            <span class="text-muted-foreground">Locale Code</span>
            <p class="font-mono font-medium">{{ selectedLang() }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class TextReaderStudio {
  private ttsPipe = new TextToSpeechPipe();

  inputText = signal('Hello, welcome to ngx-transforms! This library provides powerful Angular pipes for everyday transformations.');
  selectedLang = signal('en-US');
  isSpeaking = signal(false);

  soundBars = [12, 20, 16, 24, 14, 22, 18, 26, 15, 21];

  speechSupported =
    typeof window !== 'undefined' && 'speechSynthesis' in window;

  languages: Language[] = [
    { label: 'English (US)', value: 'en-US' },
    { label: 'English (UK)', value: 'en-GB' },
    { label: 'French', value: 'fr-FR' },
    { label: 'Spanish', value: 'es-ES' },
    { label: 'German', value: 'de-DE' },
    { label: 'Italian', value: 'it-IT' },
    { label: 'Japanese', value: 'ja-JP' },
    { label: 'Chinese (Mandarin)', value: 'zh-CN' },
    { label: 'Portuguese', value: 'pt-BR' },
    { label: 'Korean', value: 'ko-KR' },
  ];

  currentLangLabel = computed(() => {
    const lang = this.languages.find((l) => l.value === this.selectedLang());
    return lang?.label || this.selectedLang();
  });

  quickPhrases: QuickPhrase[] = [
    { label: 'English', text: 'Hello! Welcome to the text-to-speech demo.', lang: 'en-US' },
    { label: 'French', text: 'Bonjour! Bienvenue dans la démonstration.', lang: 'fr-FR' },
    { label: 'Spanish', text: 'Hola! Bienvenido a la demostración.', lang: 'es-ES' },
    { label: 'German', text: 'Hallo! Willkommen bei der Demonstration.', lang: 'de-DE' },
  ];

  speak(): void {
    if (!this.speechSupported || !this.inputText()) return;
    window.speechSynthesis.cancel();
    this.isSpeaking.set(true);

    const utterance = new SpeechSynthesisUtterance(this.inputText());
    utterance.lang = this.selectedLang();
    utterance.onend = () => this.isSpeaking.set(false);
    utterance.onerror = () => this.isSpeaking.set(false);
    window.speechSynthesis.speak(utterance);
  }

  stop(): void {
    if (this.speechSupported) {
      window.speechSynthesis.cancel();
      this.isSpeaking.set(false);
    }
  }

  onTextInput(event: Event): void {
    this.inputText.set((event.target as HTMLTextAreaElement).value);
  }

  onLangChange(value: string | string[] | undefined): void {
    if (!value) return;
    const val = Array.isArray(value) ? value[0] : value;
    if (val) this.selectedLang.set(val);
  }

  loadPhrase(phrase: QuickPhrase): void {
    this.inputText.set(phrase.text);
    this.selectedLang.set(phrase.lang);
  }
}
