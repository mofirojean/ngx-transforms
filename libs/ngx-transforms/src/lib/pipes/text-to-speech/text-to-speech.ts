import { Pipe, PipeTransform } from '@angular/core';

/**
 * TextToSpeechPipe: Converts text to speech using the Web Speech API.
 *
 * @param {string} value - The text to convert to speech.
 * @param {string} [lang='en-US'] - The language (local) for speech synthesis.
 *
 * @returns {void} - Triggers speech synthesis (no return value).
 *
 * @example
 * <div>{{ Hello World' | textToSpeech }}</div>
 * <div>{{ 'Bonjour' | textToSpeech:'fr-FR' }}h</div>
 *
 * @author Mofiro Jean
 */
@Pipe({
  name: 'textToSpeech',
  standalone: true
})
export class TextToSpeechPipe implements PipeTransform {
  transform(value: string, lang = 'en-US'): void {
    if (!value || typeof window === 'undefined' || !window.speechSynthesis) return;
    const uttrance = new SpeechSynthesisUtterance(value);
    uttrance.lang = lang;
    window.speechSynthesis.speak(uttrance);
  }
}
