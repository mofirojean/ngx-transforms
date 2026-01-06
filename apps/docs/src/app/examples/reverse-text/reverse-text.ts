import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';

@Component({
  selector: 'app-reverse-text',
  standalone: true,
  imports: [HlmInputImports, HlmLabelImports],
  template: `
    <style>
      @keyframes slide-fade-in {
        from {
          opacity: 0;
          transform: translateY(-20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .letter-enter {
        animation: slide-fade-in 300ms ease-out both;
        animation-delay: calc(30ms * var(--index));
      }
    </style>

    <div class="flex flex-col items-center gap-6 w-full text-center p-4">
      <div>
        <h3 class="text-xl font-semibold tracking-tight">
          Live Reverse Example
        </h3>
        <p class="text-muted-foreground mt-1 text-sm">
          Type in the box below to see it reversed instantly with an animation.
        </p>
      </div>

      <div class="grid w-full max-w-sm items-center gap-1.5">
        <label hlmLabel for="text-input">Enter Text</label>
        <input
          hlmInput
          id="text-input"
          type="text"
          class="w-full text-center"
          [value]="text()"
          (input)="onInput($event)"
          placeholder="Ambulance"
        />
      </div>

      <div
        class="p-6 rounded-xl border border-border w-full max-w-lg min-h-24 flex items-center justify-center"
        style="background-image: linear-gradient(to right, #673AB7, #DD0031, #FF5722);"
      >
        @if (reversedTextAsArray().length > 0) {
          <div class="flex justify-center flex-wrap">
            @for (char of reversedTextAsArray(); track char + $index) {
              <span
                class="text-4xl uppercase font-bold text-white letter-enter"
                [style.--index]="$index"
                [style.display]="char === ' ' ? 'inline' : 'inline-block'"
                [style.min-width]="char === ' ' ? '0.5ch' : 'auto'"
                animate.enter="letter-enter"
              >
                {{ char }}
              </span>
            }
          </div>
        } @else {
          <div class="text-white">
            Reversed text will appear here.
          </div>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReverseText {
  text = signal('Ambulance');
  reversedTextAsArray = computed(() => this.text().split('').reverse());

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.text.set(target.value);
  }
}
