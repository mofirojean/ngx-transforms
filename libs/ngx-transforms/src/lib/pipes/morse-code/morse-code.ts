import { Pipe, PipeTransform } from '@angular/core';

/**
 * MorseCodePipe: Converts text to Morse code.
 *
 * @param {string} value - The text to convert to Morse code.
 *
 * @returns {string} - The Morse code representation (e.g., 'SOS' → '... --- ...').
 *
 * @example
 * {{ 'SOS' | morseCode }} // Outputs: '... --- ...'
 * {{ 'HELP' | morseCode }} // Outputs: '.... . .-.. .--.'
 * <p>{{ userInput | morseCode }}</p>
 *
 * @author Mofiro Jean
 */
@Pipe({
  name: 'morseCode',
  standalone: true
})
export class MorseCodePipe implements PipeTransform {
  private readonly morseCodeMap: { [key: string]: string } = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
    '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
    '8': '---..', '9': '----.'
  };

  transform(value: string): string {
    if (!value || typeof value !== 'string') {
      return '';
    }

    return value
      .toUpperCase()
      .split('')
      .map(char => this.morseCodeMap[char] || '')
      .filter(code => code)
      .join(' ');
  }
}
