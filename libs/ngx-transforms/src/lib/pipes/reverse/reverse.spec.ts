import { ReversePipe } from './reverse';
import { describe, it, expect, beforeEach } from 'vitest';

describe('ReversePipe', () => {
  let pipe: ReversePipe;

  beforeEach(() => {
    pipe = new ReversePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should reverse "hello" to "olleh"', () => {
    expect(pipe.transform('hello')).toBe('olleh');
  });

  it('should reverse "12345" to "54321"', () => {
    expect(pipe.transform('12345')).toBe('54321');
  });

  it('should handle single character', () => {
    expect(pipe.transform('a')).toBe('a');
  });

  it('should handle spaces and special characters', () => {
    expect(pipe.transform('hello world!')).toBe('!dlrow olleh');
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
});
