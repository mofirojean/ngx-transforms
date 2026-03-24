import { MorseCodePipe } from './morse-code';
import { describe, it, expect, beforeEach } from 'vitest';

describe('MorseCodePipe', () => {
  let pipe: MorseCodePipe;

  beforeEach(() => {
    pipe = new MorseCodePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should convert "SOS" to "... --- ..."', () => {
    expect(pipe.transform('SOS')).toBe('... --- ...');
  });

  it('should convert "HELP" to ".... . .-.. .--."', () => {
    expect(pipe.transform('HELP')).toBe('.... . .-.. .--.');
  });

  it('should handle mixed case input', () => {
    expect(pipe.transform('HeLp')).toBe('.... . .-.. .--.');
  });

  it('should ignore invalid characters', () => {
    expect(pipe.transform('SOS!@#')).toBe('... --- ...');
  });

  it('should return empty string for empty input', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('should return empty string for null input', () => {
    expect(pipe.transform(null as any)).toBe('');
  });

  it('should return empty string for undefined input', () => {
    expect(pipe.transform(undefined as any)).toBe('');
  });

  it('should convert numbers correctly', () => {
    expect(pipe.transform('123')).toBe('.---- ..--- ...--');
  });
});
