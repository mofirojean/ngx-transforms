import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
  OnDestroy,
} from '@angular/core';
import { MorseCodePipe } from '@ngx-transforms';
import { HlmTextareaImports } from '@spartan-ng/helm/textarea';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { provideIcons, NgIcon } from '@ng-icons/core';
import {
  lucidePlay,
  lucideStopCircle,
  lucideMessageSquareDashed,
  lucideArrowRight,
} from '@ng-icons/lucide';
import { HlmIcon } from '@spartan-ng/helm/icon';

@Component({
  selector: 'app-morse-code-generator',
  standalone: true,
  imports: [HlmTextareaImports, HlmButtonImports, NgIcon, HlmIcon],
  providers: [
    MorseCodePipe,
    provideIcons({
      lucidePlay,
      lucideStopCircle,
      lucideMessageSquareDashed,
      lucideArrowRight,
    }),
  ],
  template: `
    <div
      class="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-6 w-full bg-background p-8"
    >
      <!-- Left Card: Input -->
      <div
        class="flex flex-col gap-4 bg-card p-6 rounded-xl border shadow-sm h-full"
      >
        <div class="flex items-center gap-3">
          <div class="flex items-center justify-center rounded w-10 h-10 bg-primary text-primary-foreground shadow-sm hover:bg-primary/90">
            <ng-icon
              hlm
              name="lucideMessageSquareDashed"
              size="20px"
              class="text-primary"
            />
          </div>
          <div>
            <h3 class="text-lg font-semibold text-foreground">Input Text</h3>
            <p class="text-sm text-muted-foreground">
              Enter text to translate.
            </p>
          </div>
        </div>
        <textarea
          hlmTextarea
          id="message"
          class="w-full flex-grow resize-none text-base"
          rows="6"
          [value]="text()"
          (input)="onInput($event)"
          placeholder="Enter text here..."
        ></textarea>
      </div>

      <!-- Center Arrow -->
      <div class="hidden md:flex justify-center">
        <ng-icon name="lucideArrowRight" class="h-8 w-8 text-muted" />
      </div>

      <!-- Right Card: Output -->
      <div
        class="relative flex flex-col gap-4 bg-card p-6 rounded-xl border shadow-sm h-full"
      >
        <h3 class="text-lg font-semibold text-foreground">Morse Code Output</h3>
        <div
          class="flex-grow p-4 rounded-md border bg-muted flex items-center justify-center min-h-48"
        >
          <p
            class="text-3xl font-mono tracking-widest text-center overflow-y-auto text-foreground break-all"
          >
            {{ morseCode() || '...' }}
          </p>
        </div>
        <button
          hlmBtn
          class="rounded-full absolute bottom-5 right-5 w-12 h-12 bg-primary text-primary-foreground shadow-lg hover:bg-primary/90"
          (click)="togglePlayback()"
          [disabled]="!morseCode()"
          aria-label="Toggle Morse Code Playback"
        >
          @switch (playingState()) {
            @case ('playing') {
              <ng-icon hlm name="lucideStopCircle" class="h-6 w-6" />
            }
            @default {
              <ng-icon hlm name="lucidePlay" class="h-6 w-6" />
            }
          }
        </button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MorseCodeGenerator implements OnDestroy {
  private readonly morseCodePipe = inject(MorseCodePipe);

  // Audio state
  private readonly audioContext: AudioContext | null = null;
  private oscillator: OscillatorNode | null = null;
  playingState = signal<'idle' | 'playing'>('idle');

  text = signal('Hello World');
  morseCode = computed(() => this.morseCodePipe.transform(this.text()));

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioContext = new AudioContext();
    }
  }

  ngOnDestroy() {
    this.stopMorseCode();
    if (this.audioContext) {
      this.audioContext.close().then();
    }
  }

  onInput(event: Event): void {
    this.stopMorseCode();
    const target = event.target as HTMLTextAreaElement;
    this.text.set(target.value);
  }

  togglePlayback() {
    if (this.playingState() === 'playing') {
      this.stopMorseCode();
    } else {
      this.playMorseCode();
    }
  }

  private playMorseCode() {
    if (!this.audioContext || this.playingState() === 'playing') return;

    const morse = this.morseCode();
    if (!morse) return;

    this.playingState.set('playing');
    let time = this.audioContext.currentTime;
    this.oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    this.oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    this.oscillator.frequency.value = 750;
    gainNode.gain.value = 0;

    const dotDuration = 0.1;
    const dashDuration = dotDuration * 3;
    const symbolSpace = dotDuration;
    const letterSpace = dotDuration * 3;

    this.oscillator.onended = () => {
      this.playingState.set('idle');
      this.oscillator = null;
    };

    this.oscillator.start(time);

    for (const char of morse) {
      switch (char) {
        case '.':
          gainNode.gain.setValueAtTime(1, time);
          time += dotDuration;
          gainNode.gain.setValueAtTime(0, time);
          break;
        case '-':
          gainNode.gain.setValueAtTime(1, time);
          time += dashDuration;
          gainNode.gain.setValueAtTime(0, time);
          break;
        case ' ':
          time += letterSpace - symbolSpace;
          break;
        case '/':
          time += (dotDuration * 7) - letterSpace;
          break;
      }
      time += symbolSpace;
    }

    this.oscillator.stop(time);
  }

  private stopMorseCode() {
    if (this.oscillator) {
      this.oscillator.onended = null;
      this.oscillator.stop();
      this.oscillator.disconnect();
      this.oscillator = null;
    }
    this.playingState.set('idle');
  }
}
