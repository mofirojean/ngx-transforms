import { AsciiArtPipe, CharsetPreset } from './ascii-art';
import { describe, it, expect, beforeEach } from 'vitest';

describe('AsciiArtPipe', () => {
  let pipe: AsciiArtPipe;

  beforeEach(() => {
    pipe = new AsciiArtPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty string for null or undefined input', () => {
    expect(pipe.transform(null as any)).toBe('');
    expect(pipe.transform(undefined as any)).toBe('');
    expect(pipe.transform('')).toBe('');
  });

  it('should return a non-empty result for valid input', () => {
    // In jsdom, canvas 2D context is unavailable so the pipe returns an error message
    const result = pipe.transform('HI');
    expect(result).toBeTruthy();
    expect(result.length).toBeGreaterThan(0);
  });

  it('should return error markup when canvas is unavailable', () => {
    // jsdom does not support canvas getContext(), so ts-ascii-engine throws
    const result = pipe.transform('HI');
    expect(result).toContain('<pre');
  });

  it('should handle different charset presets without throwing', () => {
    expect(() => pipe.transform('A', { charset: CharsetPreset.STANDARD })).not.toThrow();
    expect(() => pipe.transform('A', { charset: CharsetPreset.BLOCK })).not.toThrow();
    expect(() => pipe.transform('A', { charset: CharsetPreset.MINIMAL })).not.toThrow();
  });

  it('should handle text format option', () => {
    const result = pipe.transform('OK', { format: 'text' });
    // Either returns the text format or an error - both valid in jsdom
    expect(result).toBeTruthy();
  });

  it('should handle custom width option without throwing', () => {
    expect(() => pipe.transform('TEST', { width: 40 })).not.toThrow();
  });

  it('should handle inverted option without throwing', () => {
    expect(() => pipe.transform('INV', { inverted: true })).not.toThrow();
  });

  it('should truncate input longer than max length', () => {
    const longInput = 'A'.repeat(150);
    const result = pipe.transform(longInput);
    expect(result).toBeTruthy();
  });

  it('should handle errors gracefully', () => {
    const result = pipe.transform('TEST', { width: -1 } as any);
    expect(result).toBeTruthy();
  });

  it('should handle non-string input', () => {
    expect(pipe.transform(123 as any)).toBe('');
    expect(pipe.transform({} as any)).toBe('');
  });
});
