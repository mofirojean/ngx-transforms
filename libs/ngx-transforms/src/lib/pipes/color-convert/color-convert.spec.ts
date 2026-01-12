import { ColorConvertPipe } from './color-convert';
import { describe, it, expect, beforeEach } from 'vitest';

describe('ColorConvertPipe', () => {
  let pipe: ColorConvertPipe;

  beforeEach(() => {
    pipe = new ColorConvertPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  // ==================== HEX to RGB Conversions ====================
  describe('HEX to RGB', () => {
    it('should convert 6-digit HEX to RGB', () => {
      expect(pipe.transform('#FF0000', 'rgb')).toBe('rgb(255, 0, 0)');
      expect(pipe.transform('#00FF00', 'rgb')).toBe('rgb(0, 255, 0)');
      expect(pipe.transform('#0000FF', 'rgb')).toBe('rgb(0, 0, 255)');
      expect(pipe.transform('#FFFFFF', 'rgb')).toBe('rgb(255, 255, 255)');
      expect(pipe.transform('#000000', 'rgb')).toBe('rgb(0, 0, 0)');
    });

    it('should convert 3-digit HEX to RGB', () => {
      expect(pipe.transform('#F00', 'rgb')).toBe('rgb(255, 0, 0)');
      expect(pipe.transform('#0F0', 'rgb')).toBe('rgb(0, 255, 0)');
      expect(pipe.transform('#00F', 'rgb')).toBe('rgb(0, 0, 255)');
      expect(pipe.transform('#FFF', 'rgb')).toBe('rgb(255, 255, 255)');
      expect(pipe.transform('#000', 'rgb')).toBe('rgb(0, 0, 0)');
    });

    it('should handle lowercase HEX', () => {
      expect(pipe.transform('#ff0000', 'rgb')).toBe('rgb(255, 0, 0)');
      expect(pipe.transform('#abc', 'rgb')).toBe('rgb(170, 187, 204)');
    });

    it('should handle mixed case HEX', () => {
      expect(pipe.transform('#Ff00Ff', 'rgb')).toBe('rgb(255, 0, 255)');
    });
  });

  // ==================== RGB to HEX Conversions ====================
  describe('RGB to HEX', () => {
    it('should convert RGB to HEX', () => {
      expect(pipe.transform('rgb(255, 0, 0)', 'hex')).toBe('#FF0000');
      expect(pipe.transform('rgb(0, 255, 0)', 'hex')).toBe('#00FF00');
      expect(pipe.transform('rgb(0, 0, 255)', 'hex')).toBe('#0000FF');
    });

    it('should handle RGB without spaces', () => {
      expect(pipe.transform('rgb(255,0,0)', 'hex')).toBe('#FF0000');
    });

    it('should handle RGB with extra spaces', () => {
      expect(pipe.transform('rgb( 255 , 0 , 0 )', 'hex')).toBe('#FF0000');
    });

    it('should handle case-insensitive RGB', () => {
      expect(pipe.transform('RGB(255, 0, 0)', 'hex')).toBe('#FF0000');
      expect(pipe.transform('Rgb(255, 0, 0)', 'hex')).toBe('#FF0000');
    });
  });

  // ==================== RGBA Support ====================
  describe('RGBA conversions', () => {
    it('should convert HEX with alpha to RGBA', () => {
      expect(pipe.transform('#FF000080', 'rgba')).toBe('rgba(255, 0, 0, 0.5)');
      expect(pipe.transform('#00FF00FF', 'rgba')).toBe('rgba(0, 255, 0, 1)');
      expect(pipe.transform('#0000FF00', 'rgba')).toBe('rgba(0, 0, 255, 0)');
    });

    it('should convert 4-digit HEX with alpha to RGBA', () => {
      expect(pipe.transform('#F008', 'rgba')).toBe('rgba(255, 0, 0, 0.53)');
      expect(pipe.transform('#0F0F', 'rgba')).toBe('rgba(0, 255, 0, 1)');
    });

    it('should convert RGBA to HEX with alpha', () => {
      expect(pipe.transform('rgba(255, 0, 0, 0.5)', 'hex')).toBe('#FF000080');
      expect(pipe.transform('rgba(0, 255, 0, 1)', 'hex')).toBe('#00FF00');
      expect(pipe.transform('rgba(0, 0, 255, 0)', 'hex')).toBe('#0000FF00');
    });

    it('should convert RGB to RGBA with alpha 1', () => {
      expect(pipe.transform('rgb(255, 0, 0)', 'rgba')).toBe('rgba(255, 0, 0, 1)');
    });

    it('should convert HEX to RGBA with alpha 1', () => {
      expect(pipe.transform('#FF0000', 'rgba')).toBe('rgba(255, 0, 0, 1)');
    });

    it('should handle RGBA with various alpha values', () => {
      expect(pipe.transform('rgba(255, 128, 64, 0.75)', 'hex')).toBe('#FF8040BF');
      expect(pipe.transform('rgba(100, 150, 200, 0.25)', 'rgba')).toBe('rgba(100, 150, 200, 0.25)');
    });

    it('should handle case-insensitive RGBA', () => {
      expect(pipe.transform('RGBA(255, 0, 0, 0.5)', 'hex')).toBe('#FF000080');
    });
  });

  // ==================== Edge Cases & Validation ====================
  describe('Edge cases and validation', () => {
    it('should return empty string for null input', () => {
      expect(pipe.transform(null as unknown as string, 'rgb')).toBe('');
    });

    it('should return empty string for undefined input', () => {
      expect(pipe.transform(undefined as unknown as string, 'rgb')).toBe('');
    });

    it('should return empty string for empty string input', () => {
      expect(pipe.transform('', 'rgb')).toBe('');
    });

    it('should return original value for invalid format', () => {
      expect(pipe.transform('invalid', 'rgb')).toBe('invalid');
      expect(pipe.transform('not-a-color', 'hex')).toBe('not-a-color');
    });

    it('should return original value for invalid HEX format', () => {
      expect(pipe.transform('#GGG', 'rgb')).toBe('#GGG');
      expect(pipe.transform('#GGGGGG', 'rgb')).toBe('#GGGGGG');
      expect(pipe.transform('#12345', 'rgb')).toBe('#12345'); // 5 digits invalid
    });

    it('should return original value for out-of-range RGB values', () => {
      expect(pipe.transform('rgb(256, 0, 0)', 'hex')).toBe('rgb(256, 0, 0)');
      expect(pipe.transform('rgb(0, 300, 0)', 'hex')).toBe('rgb(0, 300, 0)');
    });

    it('should return original value for out-of-range alpha', () => {
      expect(pipe.transform('rgba(255, 0, 0, 1.5)', 'hex')).toBe('rgba(255, 0, 0, 1.5)');
      expect(pipe.transform('rgba(255, 0, 0, -0.5)', 'hex')).toBe('rgba(255, 0, 0, -0.5)');
    });

    it('should handle whitespace around input', () => {
      expect(pipe.transform('  #FF0000  ', 'rgb')).toBe('rgb(255, 0, 0)');
      expect(pipe.transform('  rgb(255, 0, 0)  ', 'hex')).toBe('#FF0000');
    });
  });

  // ==================== RGB Output (Alpha Discarded) ====================
  describe('RGB output discards alpha', () => {
    it('should discard alpha when converting to RGB', () => {
      expect(pipe.transform('#FF000080', 'rgb')).toBe('rgb(255, 0, 0)');
      expect(pipe.transform('rgba(255, 0, 0, 0.5)', 'rgb')).toBe('rgb(255, 0, 0)');
    });
  });

  // ==================== HEX Output Preserves Alpha When < 1 ====================
  describe('HEX output with alpha', () => {
    it('should omit alpha in HEX when alpha is 1', () => {
      expect(pipe.transform('rgba(255, 0, 0, 1)', 'hex')).toBe('#FF0000');
      expect(pipe.transform('#FF0000FF', 'hex')).toBe('#FF0000');
    });

    it('should include alpha in HEX when alpha < 1', () => {
      expect(pipe.transform('rgba(255, 0, 0, 0.5)', 'hex')).toBe('#FF000080');
      expect(pipe.transform('#FF000080', 'hex')).toBe('#FF000080');
    });
  });

  // ==================== Type Safety ====================
  describe('Type safety', () => {
    it('should return original value for unknown target type', () => {
      expect(pipe.transform('#FF0000', 'unknown' as 'hex')).toBe('#FF0000');
    });

    it('should handle non-string input gracefully', () => {
      expect(pipe.transform(123 as unknown as string, 'rgb')).toBe('');
      expect(pipe.transform({} as unknown as string, 'rgb')).toBe('');
      expect(pipe.transform([] as unknown as string, 'rgb')).toBe('');
    });
  });
});
