import { Flatten } from './flatten';
import { describe, it, expect, beforeEach } from 'vitest';

describe('Flatten', () => {
  let pipe: Flatten;

  beforeEach(() => {
    pipe = new Flatten();
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

  it('should return empty array for number input', () => {
    expect(pipe.transform(42 as unknown as unknown[])).toEqual([]);
  });

  it('should return empty array for empty array', () => {
    expect(pipe.transform([])).toEqual([]);
  });

  it('should return same elements for already flat array', () => {
    expect(pipe.transform([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it('should flatten one level of nesting', () => {
    expect(pipe.transform([[1, 2], [3, 4]])).toEqual([1, 2, 3, 4]);
  });

  it('should flatten deeply nested arrays', () => {
    expect(pipe.transform([1, [2, [3, [4, [5]]]]])).toEqual([1, 2, 3, 4, 5]);
  });

  it('should flatten string arrays', () => {
    expect(pipe.transform([['a', 'b'], ['c']])).toEqual(['a', 'b', 'c']);
  });

  it('should flatten mixed type arrays', () => {
    expect(pipe.transform([[1, 'two'], [3, 'four']])).toEqual([1, 'two', 3, 'four']);
  });

  // --- Custom depth ---

  it('should flatten only 1 level when depth is 1', () => {
    expect(pipe.transform([1, [2, [3]]], 1)).toEqual([1, 2, [3]]);
  });

  it('should flatten 2 levels when depth is 2', () => {
    expect(pipe.transform([1, [2, [3, [4]]]], 2)).toEqual([1, 2, 3, [4]]);
  });

  it('should not flatten when depth is 0', () => {
    expect(pipe.transform([[1, 2], [3, 4]], 0)).toEqual([[1, 2], [3, 4]]);
  });

  it('should not mutate the original array', () => {
    const original = [[1, 2], [3, 4]];
    const result = pipe.transform(original);
    expect(result).toEqual([1, 2, 3, 4]);
    expect(original).toEqual([[1, 2], [3, 4]]);
  });
});
