import { UniquePipe } from './unique';
import { describe, it, expect, beforeEach } from 'vitest';

describe('UniquePipe', () => {
  let pipe: UniquePipe;

  beforeEach(() => {
    pipe = new UniquePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  // --- Null / invalid guards ---

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

  // --- Primitives (no key) ---

  it('should remove duplicate numbers', () => {
    expect(pipe.transform([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
  });

  it('should remove duplicate strings', () => {
    expect(pipe.transform(['a', 'b', 'a', 'c', 'b'])).toEqual(['a', 'b', 'c']);
  });

  it('should return same array when no duplicates', () => {
    expect(pipe.transform([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it('should treat different types as distinct', () => {
    expect(pipe.transform([1, '1', 1, '1'])).toEqual([1, '1']);
  });

  it('should handle booleans', () => {
    expect(pipe.transform([true, false, true, false])).toEqual([true, false]);
  });

  it('should handle single element', () => {
    expect(pipe.transform([42])).toEqual([42]);
  });

  // --- Objects with shallow key ---

  it('should deduplicate objects by key', () => {
    const input = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 1, name: 'Alice (dup)' },
    ];
    const result = pipe.transform(input, 'id');
    expect(result).toEqual([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ]);
  });

  it('should keep first occurrence when deduplicating by key', () => {
    const input = [
      { id: 1, name: 'First' },
      { id: 1, name: 'Second' },
    ];
    const result = pipe.transform(input, 'id');
    expect(result).toHaveLength(1);
    expect((result[0] as Record<string, unknown>)['name']).toBe('First');
  });

  it('should deduplicate by string key', () => {
    const input = [
      { email: 'a@test.com', name: 'A' },
      { email: 'b@test.com', name: 'B' },
      { email: 'a@test.com', name: 'A2' },
    ];
    const result = pipe.transform(input, 'email');
    expect(result).toHaveLength(2);
  });

  // --- Objects with deep nested key (dot notation) ---

  it('should deduplicate by nested key', () => {
    const input = [
      { user: { email: 'alice@test.com' }, order: 1 },
      { user: { email: 'bob@test.com' }, order: 2 },
      { user: { email: 'alice@test.com' }, order: 3 },
    ];
    const result = pipe.transform(input, 'user.email');
    expect(result).toHaveLength(2);
    expect((result[0] as Record<string, unknown>)['order']).toBe(1);
    expect((result[1] as Record<string, unknown>)['order']).toBe(2);
  });

  it('should deduplicate by deeply nested key', () => {
    const input = [
      { a: { b: { c: 'x' } } },
      { a: { b: { c: 'y' } } },
      { a: { b: { c: 'x' } } },
    ];
    const result = pipe.transform(input, 'a.b.c');
    expect(result).toHaveLength(2);
  });

  it('should handle missing nested key gracefully', () => {
    const input = [
      { a: { b: 1 } },
      { a: {} },
      { a: { b: 1 } },
    ];
    const result = pipe.transform(input, 'a.b');
    // first has b=1, second has b=undefined, third is dup of first
    expect(result).toHaveLength(2);
  });

  // --- Immutability ---

  it('should not mutate the original array', () => {
    const original = [1, 2, 2, 3];
    const result = pipe.transform(original);
    expect(result).toEqual([1, 2, 3]);
    expect(original).toEqual([1, 2, 2, 3]);
  });
});
