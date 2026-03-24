import { TextToSpeechPipe } from './text-to-speech';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('TextToSpeechPipe', () => {
  let pipe: TextToSpeechPipe;
  let mockSpeak: ReturnType<typeof vi.fn>;
  const originalSpeechSynthesis = (window as any).speechSynthesis;
  const originalSpeechSynthesisUtterance = (globalThis as any).SpeechSynthesisUtterance;

  beforeEach(() => {
    mockSpeak = vi.fn();

    // Mock SpeechSynthesisUtterance (not available in jsdom)
    (globalThis as any).SpeechSynthesisUtterance = class {
      text = '';
      lang = '';
      constructor(text: string) {
        this.text = text;
      }
    };

    // Mock speechSynthesis globally
    (window as any).speechSynthesis = { speak: mockSpeak };

    pipe = new TextToSpeechPipe();
  });

  afterEach(() => {
    (window as any).speechSynthesis = originalSpeechSynthesis;
    (globalThis as any).SpeechSynthesisUtterance = originalSpeechSynthesisUtterance;
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should call speechSynthesis.speak with correct text', () => {
    pipe.transform('Hello');
    expect(mockSpeak).toHaveBeenCalledTimes(1);
    const utterance = mockSpeak.mock.calls[0][0] as SpeechSynthesisUtterance;
    expect(utterance.text).toBe('Hello');
  });

  it('should use default language en-US', () => {
    pipe.transform('Hello');
    const utterance = mockSpeak.mock.calls[0][0] as SpeechSynthesisUtterance;
    expect(utterance.lang).toBe('en-US');
  });

  it('should use custom language when provided', () => {
    pipe.transform('Bonjour', 'fr-FR');
    const utterance = mockSpeak.mock.calls[0][0] as SpeechSynthesisUtterance;
    expect(utterance.lang).toBe('fr-FR');
  });

  it('should not call speak for empty input', () => {
    pipe.transform('');
    expect(mockSpeak).not.toHaveBeenCalled();
  });

  it('should not call speak for null input', () => {
    pipe.transform(null as any);
    expect(mockSpeak).not.toHaveBeenCalled();
  });

  it('should not call speak for undefined input', () => {
    pipe.transform(undefined as any);
    expect(mockSpeak).not.toHaveBeenCalled();
  });

  it('should return void', () => {
    const result = pipe.transform('Hello');
    expect(result).toBeUndefined();
  });

  it('should not throw when speechSynthesis is unavailable', () => {
    (window as any).speechSynthesis = undefined;
    expect(() => pipe.transform('Hello')).not.toThrow();
  });
});
