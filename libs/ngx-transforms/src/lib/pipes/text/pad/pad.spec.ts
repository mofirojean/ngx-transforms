import { PadPipe } from './pad';
import { describe, it, expect, beforeEach } from 'vitest';

describe('PadPipe', () => {
  let pipe: PadPipe;

  beforeEach(() => {
    pipe = new PadPipe();
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

  it('should center with spaces by default', () => {
    expect(pipe.transform('hi', 6)).toBe('  hi  ');
  });

  it('should center with dashes', () => {
    expect(pipe.transform('x', 5, '-')).toBe('--x--');
  });

  it('should center with asterisks', () => {
    expect(pipe.transform('hi', 6, '*')).toBe('**hi**');
  });

  it('should handle uneven padding (extra on right)', () => {
    expect(pipe.transform('hi', 7, '*')).toBe('**hi***');
  });

  it('should handle uneven padding small', () => {
    expect(pipe.transform('x', 4, '-')).toBe('-x--');
  });

  it('should handle number input', () => {
    expect(pipe.transform(42, 6, '0')).toBe('004200');
  });

  it('should handle zero number input', () => {
    expect(pipe.transform(0, 3, '-')).toBe('-0-');
  });

  it('should return string unchanged when already target length', () => {
    expect(pipe.transform('hello', 5, '-')).toBe('hello');
  });

  it('should return string unchanged when longer than target', () => {
    expect(pipe.transform('helloworld', 5, '-')).toBe('helloworld');
  });

  it('should handle empty string input', () => {
    expect(pipe.transform('', 4, '*')).toBe('****');
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
    expect(pipe.transform('hi', 6, '')).toBe('  hi  ');
  });

  it('should handle single char target with single char pad', () => {
    expect(pipe.transform('x', 3, '-')).toBe('-x-');
  });

  it('should produce correct length', () => {
    const result = pipe.transform('test', 10, '.');
    expect(result.length).toBe(10);
  });

  it('should not mutate the original string', () => {
    const original = 'hi';
    pipe.transform(original, 6, '-');
    expect(original).toBe('hi');
  });
});