import { RepeatPipe } from './repeat';
import { describe, it, expect, beforeEach } from 'vitest';

describe('RepeatPipe', () => {
  let pipe: RepeatPipe;

  beforeEach(() => {
    pipe = new RepeatPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty for null value', () => {
    expect(pipe.transform(null as unknown as string, 3)).toBe('');
  });

  it('should return empty for undefined value', () => {
    expect(pipe.transform(undefined as unknown as string, 3)).toBe('');
  });

  it('should return empty for non-string value', () => {
    expect(pipe.transform(42 as unknown as string, 3)).toBe('');
  });

  it('should return empty for negative count', () => {
    expect(pipe.transform('hi', -1)).toBe('');
  });

  it('should return empty for NaN count', () => {
    expect(pipe.transform('hi', NaN)).toBe('');
  });

  it('should return empty for Infinity count', () => {
    expect(pipe.transform('hi', Infinity)).toBe('');
  });

  it('should return empty for count of 0', () => {
    expect(pipe.transform('hi', 0)).toBe('');
  });

  it('should return the value once for count of 1', () => {
    expect(pipe.transform('hi', 1)).toBe('hi');
  });

  it('should repeat a dash 10 times', () => {
    expect(pipe.transform('-', 10)).toBe('----------');
  });

  it('should repeat a word 3 times', () => {
    expect(pipe.transform('ha', 3)).toBe('hahaha');
  });

  it('should handle empty string value', () => {
    expect(pipe.transform('', 5)).toBe('');
  });

  it('should floor non-integer count', () => {
    expect(pipe.transform('ab', 3.9)).toBe('ababab');
  });

  it('should repeat with separator', () => {
    expect(pipe.transform('item', 3, ', ')).toBe('item, item, item');
  });

  it('should repeat with single char separator', () => {
    expect(pipe.transform('x', 4, '-')).toBe('x-x-x-x');
  });

  it('should return single value when count is 1 with separator', () => {
    expect(pipe.transform('hi', 1, '-')).toBe('hi');
  });

  it('should handle multi-char separator', () => {
    expect(pipe.transform('a', 3, ' => ')).toBe('a => a => a');
  });

  it('should not mutate the original string', () => {
    const original = 'hi';
    pipe.transform(original, 3);
    expect(original).toBe('hi');
  });
});
