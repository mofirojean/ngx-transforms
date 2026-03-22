import { ShufflePipe } from './shuffle';
import { describe, it, expect, beforeEach } from 'vitest';

describe('ShufflePipe', () => {
  let pipe: ShufflePipe;

  beforeEach(() => {
    pipe = new ShufflePipe();
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

  it('should return same element for single-element array', () => {
    expect(pipe.transform([1])).toEqual([1]);
  });

  it('should handle two-element array', () => {
    const result = pipe.transform([1, 2]);
    expect(result).toHaveLength(2);
    expect(result.sort()).toEqual([1, 2]);
  });

  it('should return array of same length', () => {
    const input = [1, 2, 3, 4, 5];
    const result = pipe.transform(input);
    expect(result).toHaveLength(5);
  });

  it('should contain the same elements', () => {
    const input = [1, 2, 3, 4, 5];
    const result = pipe.transform(input);
    expect([...result].sort()).toEqual([1, 2, 3, 4, 5]);
  });

  it('should contain same elements for string arrays', () => {
    const input = ['a', 'b', 'c', 'd'];
    const result = pipe.transform(input);
    expect([...result].sort()).toEqual(['a', 'b', 'c', 'd']);
  });

  it('should preserve duplicate values', () => {
    const input = [1, 1, 2, 2, 3];
    const result = pipe.transform(input);
    expect([...result].sort()).toEqual([1, 1, 2, 2, 3]);
  });

  it('should handle mixed type arrays', () => {
    const input = [1, 'two', true, null];
    const result = pipe.transform(input);
    expect(result).toHaveLength(4);
    expect(result).toContain(1);
    expect(result).toContain('two');
    expect(result).toContain(true);
    expect(result).toContain(null);
  });

  it('should actually shuffle (at least one different order in 20 runs)', () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const original = JSON.stringify(input);
    let shuffled = false;

    for (let i = 0; i < 20; i++) {
      const result = pipe.transform(input);
      if (JSON.stringify(result) !== original) {
        shuffled = true;
        break;
      }
    }

    expect(shuffled).toBe(true);
  });

  it('should not mutate the original array', () => {
    const original = [1, 2, 3, 4, 5];
    const copy = [...original];
    pipe.transform(original);
    expect(original).toEqual(copy);
  });
});
