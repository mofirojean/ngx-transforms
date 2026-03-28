import { WithoutPipe } from './without';
import { describe, it, expect, beforeEach } from 'vitest';

describe('WithoutPipe', () => {
  let pipe: WithoutPipe;

  beforeEach(() => {
    pipe = new WithoutPipe();
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

  it('should return copy when excludes is empty', () => {
    expect(pipe.transform([1, 2, 3], [])).toEqual([1, 2, 3]);
  });

  it('should return copy when excludes is null', () => {
    expect(pipe.transform([1, 2, 3], null as unknown as unknown[])).toEqual([1, 2, 3]);
  });

  it('should exclude numbers', () => {
    expect(pipe.transform([1, 2, 3, 4, 5], [2, 4])).toEqual([1, 3, 5]);
  });

  it('should exclude strings', () => {
    expect(pipe.transform(['a', 'b', 'c', 'd'], ['b', 'd'])).toEqual(['a', 'c']);
  });

  it('should exclude single value', () => {
    expect(pipe.transform([1, 2, 3], [2])).toEqual([1, 3]);
  });

  it('should return same array when no matches found', () => {
    expect(pipe.transform([1, 2, 3], [4, 5])).toEqual([1, 2, 3]);
  });

  it('should return empty array when all excluded', () => {
    expect(pipe.transform([1, 2, 3], [1, 2, 3])).toEqual([]);
  });

  it('should handle duplicates in input', () => {
    expect(pipe.transform([1, 2, 2, 3, 3], [2])).toEqual([1, 3, 3]);
  });

  it('should exclude objects by key', () => {
    const input = [
      { id: 1, status: 'active' },
      { id: 2, status: 'banned' },
      { id: 3, status: 'active' },
    ];
    const result = pipe.transform(input, ['banned'], 'status');
    expect(result).toHaveLength(2);
    expect((result[0] as Record<string, unknown>)['id']).toBe(1);
    expect((result[1] as Record<string, unknown>)['id']).toBe(3);
  });

  it('should exclude objects by multiple key values', () => {
    const input = [
      { id: 1, status: 'active' },
      { id: 2, status: 'banned' },
      { id: 3, status: 'suspended' },
      { id: 4, status: 'active' },
    ];
    const result = pipe.transform(input, ['banned', 'suspended'], 'status');
    expect(result).toHaveLength(2);
  });

  it('should exclude objects by nested key', () => {
    const input = [
      { id: 1, meta: { status: 'shipped' } },
      { id: 2, meta: { status: 'cancelled' } },
      { id: 3, meta: { status: 'shipped' } },
    ];
    const result = pipe.transform(input, ['cancelled'], 'meta.status');
    expect(result).toHaveLength(2);
    expect((result[0] as Record<string, unknown>)['id']).toBe(1);
    expect((result[1] as Record<string, unknown>)['id']).toBe(3);
  });

  it('should handle missing nested key gracefully', () => {
    const input = [
      { a: { b: 'x' } },
      { a: {} },
      { a: { b: 'y' } },
    ];
    const result = pipe.transform(input, ['x'], 'a.b');
    expect(result).toHaveLength(2);
  });

  it('should not mutate the original array', () => {
    const original = [1, 2, 3, 4, 5];
    const result = pipe.transform(original, [2, 4]);
    expect(result).toEqual([1, 3, 5]);
    expect(original).toEqual([1, 2, 3, 4, 5]);
  });
});
