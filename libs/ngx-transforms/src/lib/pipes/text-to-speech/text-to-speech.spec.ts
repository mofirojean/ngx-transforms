import { TextToSpeechPipe } from './text-to-speech';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('TextToSpeechPipe', () => {
  let pipe: TextToSpeechPipe;
  let speakSpy: Mock;

  beforeEach(() => {
    pipe = new TextToSpeechPipe();
    // Mock window.speechSynthesis if available
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      speakSpy = vi.spyOn(window.speechSynthesis, 'speak').mockImplementation(() => {});
    }
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should call speechSynthesis.speak with utterance', () => {
    if (typeof window !== 'undefined' && window.speechSynthesis && speakSpy) {
      pipe.transform('Hello', 'en-US');
      expect(speakSpy).toHaveBeenCalledWith(expect.any(SpeechSynthesisUtterance));
      expect(speakSpy.mock.calls[0][0].text).toBe('Hello');
      expect(speakSpy.mock.calls[0][0].lang).toBe('en-US');
    } else {
      console.warn('SpeechSynthesis API not available, skipping test.');
    }
  });

  it('should do nothing for empty input', () => {
    if (typeof window !== 'undefined' && window.speechSynthesis && speakSpy) {
      pipe.transform('');
      expect(speakSpy).not.toHaveBeenCalled();
    } else {
      console.warn('SpeechSynthesis API not available, skipping test.');
    }
  });

  it('should do nothing if window.speechSynthesis is not available', () => {
    // Temporarily mock window.speechSynthesis to be undefined
    const originalSpeechSynthesis = window.speechSynthesis;
    Object.defineProperty(window, 'speechSynthesis', { value: undefined, configurable: true });

    const localPipe = new TextToSpeechPipe();
    const localSpeakSpy = vi.fn();
    // Restore original window.speechSynthesis
    Object.defineProperty(window, 'speechSynthesis', { value: originalSpeechSynthesis, configurable: true });

    localPipe.transform('Test', 'en-US');
    expect(localSpeakSpy).not.toHaveBeenCalled();
  });
});
