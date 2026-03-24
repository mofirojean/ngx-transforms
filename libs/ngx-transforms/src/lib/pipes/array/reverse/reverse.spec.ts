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

  // --- String tests ---

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

  it('should return empty string for empty string input', () => {
    expect(pipe.transform('')).toBe('');
  });

  // --- Array tests ---

  it('should reverse an array of numbers', () => {
    expect(pipe.transform([1, 2, 3, 4, 5])).toEqual([5, 4, 3, 2, 1]);
  });

  it('should reverse an array of strings', () => {
    expect(pipe.transform(['a', 'b', 'c'])).toEqual(['c', 'b', 'a']);
  });

  it('should return empty array for empty array input', () => {
    expect(pipe.transform([])).toEqual([]);
  });

  it('should handle single element array', () => {
    expect(pipe.transform([42])).toEqual([42]);
  });

  it('should handle nested arrays without flattening', () => {
    expect(pipe.transform([[1, 2], [3, 4]])).toEqual([[3, 4], [1, 2]]);
  });

  it('should handle mixed type arrays', () => {
    expect(pipe.transform([1, 'two', 3, 'four'])).toEqual(['four', 3, 'two', 1]);
  });

  it('should not mutate the original array', () => {
    const original = [1, 2, 3];
    const result = pipe.transform(original);
    expect(result).toEqual([3, 2, 1]);
    expect(original).toEqual([1, 2, 3]);
  });

  // --- Null / undefined / invalid ---

  it('should return empty string for null input', () => {
    expect(pipe.transform(null as unknown as string)).toBe('');
  });

  it('should return empty string for undefined input', () => {
    expect(pipe.transform(undefined as unknown as string)).toBe('');
  });

  it('should return empty string for number input', () => {
    expect(pipe.transform(123 as unknown as string)).toBe('');
  });
});