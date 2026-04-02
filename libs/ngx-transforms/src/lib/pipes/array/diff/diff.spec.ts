import { DiffPipe } from './diff';
import { describe, it, expect, beforeEach } from 'vitest';

describe('DiffPipe', () => {
  let pipe: DiffPipe;

  beforeEach(() => {
    pipe = new DiffPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty array for null input', () => {
    expect(pipe.transform(null as unknown as unknown[], [1])).toEqual([]);
  });

  it('should return empty array for undefined input', () => {
    expect(pipe.transform(undefined as unknown as unknown[], [1])).toEqual([]);
  });

  it('should return copy when compared is empty', () => {
    expect(pipe.transform([1, 2, 3], [])).toEqual([1, 2, 3]);
  });

  it('should return copy when compared is null', () => {
    expect(pipe.transform([1, 2, 3], null as unknown as unknown[])).toEqual([1, 2, 3]);
  });

  it('should return elements not in compared array', () => {
    expect(pipe.transform([1, 2, 3, 4, 5], [3, 4, 5, 6])).toEqual([1, 2]);
  });

  it('should return all elements when no overlap', () => {
    expect(pipe.transform([1, 2, 3], [4, 5, 6])).toEqual([1, 2, 3]);
  });

  it('should return empty array when all elements are in compared', () => {
    expect(pipe.transform([1, 2, 3], [1, 2, 3, 4])).toEqual([]);
  });

  it('should work with strings', () => {
    expect(pipe.transform(['a', 'b', 'c', 'd'], ['b', 'd', 'e'])).toEqual(['a', 'c']);
  });

  it('should preserve duplicates in source', () => {
    expect(pipe.transform([1, 2, 2, 3], [2])).toEqual([1, 3]);
  });

  it('should diff objects by key', () => {
    const allUsers = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ];
    const activeUsers = [
      { id: 1, name: 'Alice' },
      { id: 3, name: 'Charlie' },
    ];
    const result = pipe.transform(allUsers, activeUsers, 'id');
    expect(result).toHaveLength(1);
    expect((result[0] as Record<string, unknown>)['name']).toBe('Bob');
  });

  it('should diff objects by nested key', () => {
    const all = [
      { id: 1, meta: { region: 'US' } },
      { id: 2, meta: { region: 'EU' } },
      { id: 3, meta: { region: 'US' } },
    ];
    const excluded = [
      { id: 10, meta: { region: 'US' } },
    ];
    const result = pipe.transform(all, excluded, 'meta.region');
    expect(result).toHaveLength(1);
    expect((result[0] as Record<string, unknown>)['id']).toBe(2);
  });

  it('should handle missing nested key gracefully', () => {
    const input = [
      { a: { b: 'x' } },
      { a: {} },
      { a: { b: 'y' } },
    ];
    const compared = [{ a: { b: 'x' } }];
    const result = pipe.transform(input, compared, 'a.b');
    expect(result).toHaveLength(2);
  });

  it('should not mutate the original arrays', () => {
    const source = [1, 2, 3, 4, 5];
    const compared = [3, 4];
    const result = pipe.transform(source, compared);
    expect(result).toEqual([1, 2, 5]);
    expect(source).toEqual([1, 2, 3, 4, 5]);
    expect(compared).toEqual([3, 4]);
  });

  it('should handle empty source array', () => {
    expect(pipe.transform([], [1, 2, 3])).toEqual([]);
  });
});
