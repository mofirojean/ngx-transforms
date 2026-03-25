import { SamplePipe } from './sample';
import { describe, it, expect, beforeEach } from 'vitest';

describe('SamplePipe', () => {
  let pipe: SamplePipe;

  beforeEach(() => {
    pipe = new SamplePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return undefined for null input', () => {
    expect(pipe.transform(null as unknown as unknown[])).toBeUndefined();
  });

  it('should return undefined for undefined input', () => {
    expect(pipe.transform(undefined as unknown as unknown[])).toBeUndefined();
  });

  it('should return empty array for null input with n>1', () => {
    expect(pipe.transform(null as unknown as unknown[], 3)).toEqual([]);
  });

  it('should return undefined for empty array', () => {
    expect(pipe.transform([])).toBeUndefined();
  });

  it('should return empty array for empty array with n>1', () => {
    expect(pipe.transform([], 3)).toEqual([]);
  });

  it('should return a single item by default', () => {
    const input = [1, 2, 3, 4, 5];
    const result = pipe.transform(input);
    expect(input).toContain(result);
  });

  it('should return an array when n>1', () => {
    const input = [1, 2, 3, 4, 5];
    const result = pipe.transform(input, 3) as unknown[];
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(3);
  });

  it('should return items from the original array', () => {
    const input = ['a', 'b', 'c', 'd', 'e'];
    const result = pipe.transform(input, 3) as unknown[];
    for (const item of result) {
      expect(input).toContain(item);
    }
  });

  it('should return no duplicates', () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const result = pipe.transform(input, 5) as unknown[];
    const unique = new Set(result);
    expect(unique.size).toBe(5);
  });

  it('should clamp n to array length', () => {
    const input = [1, 2, 3];
    const result = pipe.transform(input, 10) as unknown[];
    expect(result).toHaveLength(3);
    expect([...result].sort()).toEqual([1, 2, 3]);
  });

  it('should return empty array for n=0', () => {
    expect(pipe.transform([1, 2, 3], 0)).toEqual([]);
  });

  it('should return empty array for negative n', () => {
    expect(pipe.transform([1, 2, 3], -1)).toEqual([]);
  });

  it('should return the only element for single-element array', () => {
    expect(pipe.transform([42])).toBe(42);
  });

  it('should actually randomize over multiple runs', () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const first = JSON.stringify(pipe.transform(input, 5));
    let different = false;

    for (let i = 0; i < 20; i++) {
      const result = JSON.stringify(pipe.transform(input, 5));
      if (result !== first) {
        different = true;
        break;
      }
    }

    expect(different).toBe(true);
  });

  it('should not mutate the original array', () => {
    const original = [1, 2, 3, 4, 5];
    const copy = [...original];
    pipe.transform(original, 3);
    expect(original).toEqual(copy);
  });
});