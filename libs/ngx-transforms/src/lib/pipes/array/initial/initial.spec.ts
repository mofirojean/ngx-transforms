import { InitialPipe } from './initial';
import { describe, it, expect, beforeEach } from 'vitest';

describe('InitialPipe', () => {
  let pipe: InitialPipe;

  beforeEach(() => {
    pipe = new InitialPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty array for null', () => {
    expect(pipe.transform(null as unknown as unknown[])).toEqual([]);
  });

  it('should return empty array for undefined', () => {
    expect(pipe.transform(undefined as unknown as unknown[])).toEqual([]);
  });

  it('should return empty array for string input', () => {
    expect(pipe.transform('hello' as unknown as unknown[])).toEqual([]);
  });

  it('should return empty array for empty array', () => {
    expect(pipe.transform([])).toEqual([]);
  });

  it('should remove last element by default', () => {
    expect(pipe.transform([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4]);
  });

  it('should remove last string element by default', () => {
    expect(pipe.transform(['a', 'b', 'c'])).toEqual(['a', 'b']);
  });

  it('should return empty array for single element with default n', () => {
    expect(pipe.transform([1])).toEqual([]);
  });

  it('should remove last 2 elements', () => {
    expect(pipe.transform([1, 2, 3, 4, 5], 2)).toEqual([1, 2, 3]);
  });

  it('should remove last 3 elements', () => {
    expect(pipe.transform([1, 2, 3, 4, 5], 3)).toEqual([1, 2]);
  });

  it('should return full copy when n is 0', () => {
    expect(pipe.transform([1, 2, 3], 0)).toEqual([1, 2, 3]);
  });

  it('should return empty array when n equals length', () => {
    expect(pipe.transform([1, 2, 3], 3)).toEqual([]);
  });

  it('should return empty array when n exceeds length', () => {
    expect(pipe.transform([1, 2, 3], 5)).toEqual([]);
  });

  it('should return full copy for negative n', () => {
    expect(pipe.transform([1, 2, 3], -1)).toEqual([1, 2, 3]);
  });

  it('should work with mixed type arrays', () => {
    expect(pipe.transform([1, 'two', true, null], 2)).toEqual([1, 'two']);
  });

  it('should not mutate the original array', () => {
    const original = [1, 2, 3, 4, 5];
    const result = pipe.transform(original, 2);
    expect(result).toEqual([1, 2, 3]);
    expect(original).toEqual([1, 2, 3, 4, 5]);
  });
});
