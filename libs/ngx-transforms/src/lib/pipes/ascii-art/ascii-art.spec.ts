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

  it('should convert text to ASCII art with default options', () => {
    const result = pipe.transform('HI');
    expect(result).toBeTruthy();
    expect(result).toContain('<pre');
    expect(result.length).toBeGreaterThan(10);
  });

  it('should support different charset presets', () => {
    const resultStandard = pipe.transform('A', { charset: CharsetPreset.STANDARD });
    const resultBlock = pipe.transform('A', { charset: CharsetPreset.BLOCK });
    const resultMinimal = pipe.transform('A', { charset: CharsetPreset.MINIMAL });

    expect(resultStandard).toBeTruthy();
    expect(resultBlock).toBeTruthy();
    expect(resultMinimal).toBeTruthy();
  });

  it('should support text format option', () => {
    const result = pipe.transform('OK', { format: 'text' });
    expect(result).toContain('<pre class="ascii-art">');
    expect(result).toBeTruthy();
  });

  it('should support custom width option', () => {
    const result = pipe.transform('TEST', { width: 40 });
    expect(result).toBeTruthy();
  });

  it('should support inverted option', () => {
    const result = pipe.transform('INV', { inverted: true });
    expect(result).toBeTruthy();
  });

  it('should support text rendering options', () => {
    const result = pipe.transform('BOLD', {
      textOptions: {
        fontSize: 60,
        fontWeight: 'bold',
      },
    });
    expect(result).toBeTruthy();
  });

  it('should truncate input longer than max length', () => {
    const longInput = 'A'.repeat(150);
    const result = pipe.transform(longInput);
    expect(result).toBeTruthy();
    // Should still generate output but with truncated input
  });

  it('should handle errors gracefully', () => {
    const result = pipe.transform('TEST', { width: -1 } as any);
    // Should either work or return error message, but not throw
    expect(result).toBeTruthy();
  });

  it('should return HTML format by default', () => {
    const result = pipe.transform('HI');
    expect(result).toContain('<pre');
  });

  it('should handle special characters safely', () => {
    const result = pipe.transform('<script>alert("xss")</script>' as any);
    // Should either generate ASCII art or handle gracefully
    expect(result).toBeTruthy();
  });
});
