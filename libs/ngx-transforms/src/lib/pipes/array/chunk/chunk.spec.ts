import { ChunkPipe } from './chunk';
import { describe, it, expect, beforeEach } from 'vitest';

describe('ChunkPipe', () => {
  let pipe: ChunkPipe;

  beforeEach(() => {
    pipe = new ChunkPipe();
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

  it('should chunk into singles by default (size=1)', () => {
    expect(pipe.transform([1, 2, 3])).toEqual([[1], [2], [3]]);
  });

  it('should chunk into pairs', () => {
    expect(pipe.transform([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  it('should chunk into groups of 3', () => {
    expect(pipe.transform([1, 2, 3, 4, 5, 6], 3)).toEqual([[1, 2, 3], [4, 5, 6]]);
  });

  it('should handle last chunk being smaller', () => {
    expect(pipe.transform([1, 2, 3, 4, 5, 6, 7], 3)).toEqual([[1, 2, 3], [4, 5, 6], [7]]);
  });

  it('should return one chunk when size >= length', () => {
    expect(pipe.transform([1, 2, 3], 5)).toEqual([[1, 2, 3]]);
  });

  it('should return one chunk when size equals length', () => {
    expect(pipe.transform([1, 2, 3], 3)).toEqual([[1, 2, 3]]);
  });

  it('should return empty array for size=0', () => {
    expect(pipe.transform([1, 2, 3], 0)).toEqual([]);
  });

  it('should return empty array for negative size', () => {
    expect(pipe.transform([1, 2, 3], -1)).toEqual([]);
  });

  it('should work with string arrays', () => {
    expect(pipe.transform(['a', 'b', 'c', 'd'], 2)).toEqual([['a', 'b'], ['c', 'd']]);
  });

  it('should work with mixed types', () => {
    expect(pipe.transform([1, 'two', true, null], 2)).toEqual([[1, 'two'], [true, null]]);
  });

  it('should handle single element array', () => {
    expect(pipe.transform([1], 3)).toEqual([[1]]);
  });

  it('should not mutate the original array', () => {
    const original = [1, 2, 3, 4, 5];
    const result = pipe.transform(original, 2);
    expect(result).toEqual([[1, 2], [3, 4], [5]]);
    expect(original).toEqual([1, 2, 3, 4, 5]);
  });
});
