import { IntersectionPipe } from './intersection';
import { describe, it, expect, beforeEach } from 'vitest';

describe('IntersectionPipe', () => {
  let pipe: IntersectionPipe;

  beforeEach(() => {
    pipe = new IntersectionPipe();
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

  it('should return empty array when compared is empty', () => {
    expect(pipe.transform([1, 2, 3], [])).toEqual([]);
  });

  it('should return empty array when compared is null', () => {
    expect(pipe.transform([1, 2, 3], null as unknown as unknown[])).toEqual([]);
  });

  it('should return common elements', () => {
    expect(pipe.transform([1, 2, 3, 4, 5], [3, 4, 5, 6, 7])).toEqual([3, 4, 5]);
  });

  it('should return empty array when no overlap', () => {
    expect(pipe.transform([1, 2, 3], [4, 5, 6])).toEqual([]);
  });

  it('should return all elements when identical arrays', () => {
    expect(pipe.transform([1, 2, 3], [1, 2, 3])).toEqual([1, 2, 3]);
  });

  it('should work with strings', () => {
    expect(pipe.transform(['a', 'b', 'c', 'd'], ['b', 'd', 'e'])).toEqual(['b', 'd']);
  });

  it('should preserve order from source array', () => {
    expect(pipe.transform([5, 3, 1], [1, 3, 5])).toEqual([5, 3, 1]);
  });

  it('should handle duplicates in source', () => {
    expect(pipe.transform([1, 2, 2, 3, 3], [2, 3])).toEqual([2, 2, 3, 3]);
  });

  it('should intersect objects by key', () => {
    const teamA = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ];
    const teamB = [
      { id: 2, name: 'Bob' },
      { id: 4, name: 'Diana' },
      { id: 3, name: 'Charlie' },
    ];
    const result = pipe.transform(teamA, teamB, 'id');
    expect(result).toHaveLength(2);
    expect((result[0] as Record<string, unknown>)['name']).toBe('Bob');
    expect((result[1] as Record<string, unknown>)['name']).toBe('Charlie');
  });

  it('should intersect objects by nested key', () => {
    const listA = [
      { id: 1, meta: { region: 'US' } },
      { id: 2, meta: { region: 'EU' } },
      { id: 3, meta: { region: 'APAC' } },
    ];
    const listB = [
      { id: 10, meta: { region: 'EU' } },
      { id: 11, meta: { region: 'APAC' } },
    ];
    const result = pipe.transform(listA, listB, 'meta.region');
    expect(result).toHaveLength(2);
    expect((result[0] as Record<string, unknown>)['id']).toBe(2);
    expect((result[1] as Record<string, unknown>)['id']).toBe(3);
  });

  it('should handle missing nested key gracefully', () => {
    const input = [
      { a: { b: 'x' } },
      { a: {} },
      { a: { b: 'y' } },
    ];
    const compared = [{ a: { b: 'x' } }];
    const result = pipe.transform(input, compared, 'a.b');
    expect(result).toHaveLength(1);
  });

  it('should not mutate the original arrays', () => {
    const source = [1, 2, 3, 4, 5];
    const compared = [3, 4, 5, 6];
    const result = pipe.transform(source, compared);
    expect(result).toEqual([3, 4, 5]);
    expect(source).toEqual([1, 2, 3, 4, 5]);
    expect(compared).toEqual([3, 4, 5, 6]);
  });

  it('should handle empty source array', () => {
    expect(pipe.transform([], [1, 2, 3])).toEqual([]);
  });
});
