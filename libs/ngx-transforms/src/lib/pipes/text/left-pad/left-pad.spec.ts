import { LeftPadPipe } from './left-pad';
import { describe, it, expect, beforeEach } from 'vitest';

describe('LeftPadPipe', () => {
  let pipe: LeftPadPipe;

  beforeEach(() => {
    pipe = new LeftPadPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty string for null value', () => {
    expect(pipe.transform(null as unknown as string, 5)).toBe('');
  });

  it('should return empty string for undefined value', () => {
    expect(pipe.transform(undefined as unknown as string, 5)).toBe('');
  });

  it('should pad with spaces by default', () => {
    expect(pipe.transform('hi', 5)).toBe('   hi');
  });

  it('should pad with zeros', () => {
    expect(pipe.transform('5', 3, '0')).toBe('005');
  });

  it('should pad with dashes', () => {
    expect(pipe.transform('hi', 6, '-')).toBe('----hi');
  });

  it('should handle number input', () => {
    expect(pipe.transform(42, 5, '0')).toBe('00042');
  });

  it('should handle zero number input', () => {
    expect(pipe.transform(0, 3, '0')).toBe('000');
  });

  it('should return string unchanged when already target length', () => {
    expect(pipe.transform('hello', 5, '0')).toBe('hello');
  });

  it('should return string unchanged when longer than target', () => {
    expect(pipe.transform('helloworld', 5, '0')).toBe('helloworld');
  });

  it('should handle empty string input', () => {
    expect(pipe.transform('', 3, '*')).toBe('***');
  });

  it('should handle zero length', () => {
    expect(pipe.transform('hi', 0)).toBe('hi');
  });

  it('should handle negative length by returning unchanged', () => {
    expect(pipe.transform('hi', -5)).toBe('hi');
  });

  it('should handle NaN length by returning unchanged', () => {
    expect(pipe.transform('hi', NaN)).toBe('hi');
  });

  it('should default to space when empty char given', () => {
    expect(pipe.transform('hi', 5, '')).toBe('   hi');
  });

  it('should handle multi-character pad string', () => {
    expect(pipe.transform('hi', 8, 'ab')).toBe('abababhi');
  });

  it('should truncate multi-character pad correctly', () => {
    expect(pipe.transform('hi', 5, 'abc')).toBe('abchi');
  });

  it('should not mutate the original string', () => {
    const original = 'hi';
    pipe.transform(original, 5, '-');
    expect(original).toBe('hi');
  });
});