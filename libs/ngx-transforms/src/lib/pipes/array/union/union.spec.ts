import { UnionPipe } from './union';
import { describe, it, expect, beforeEach } from 'vitest';

describe('UnionPipe', () => {
  let pipe: UnionPipe;

  beforeEach(() => {
    pipe = new UnionPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty array when both inputs are null', () => {
    expect(pipe.transform(null as unknown as unknown[], null as unknown as unknown[])).toEqual([]);
  });

  it('should return second array when first is null', () => {
    expect(pipe.transform(null as unknown as unknown[], [1, 2])).toEqual([1, 2]);
  });

  it('should return first array when second is null', () => {
    expect(pipe.transform([1, 2], null as unknown as unknown[])).toEqual([1, 2]);
  });

  it('should return first array when second is empty', () => {
    expect(pipe.transform([1, 2, 3], [])).toEqual([1, 2, 3]);
  });

  it('should combine arrays removing duplicates', () => {
    expect(pipe.transform([1, 2, 3], [3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  it('should return all elements when no overlap', () => {
    expect(pipe.transform([1, 2], [3, 4])).toEqual([1, 2, 3, 4]);
  });

  it('should return unique elements when identical arrays', () => {
    expect(pipe.transform([1, 2, 3], [1, 2, 3])).toEqual([1, 2, 3]);
  });

  it('should work with strings', () => {
    expect(pipe.transform(['a', 'b', 'c'], ['b', 'c', 'd'])).toEqual(['a', 'b', 'c', 'd']);
  });

  it('should remove duplicates within source array', () => {
    expect(pipe.transform([1, 1, 2], [2, 3, 3])).toEqual([1, 2, 3]);
  });

  it('should preserve order from first array then second', () => {
    expect(pipe.transform([5, 3, 1], [2, 4, 3])).toEqual([5, 3, 1, 2, 4]);
  });

  it('should union objects by key', () => {
    const admins = [
      { id: 1, name: 'Alice', role: 'admin' },
      { id: 2, name: 'Bob', role: 'admin' },
    ];
    const editors = [
      { id: 2, name: 'Bob', role: 'editor' },
      { id: 3, name: 'Charlie', role: 'editor' },
    ];
    const result = pipe.transform(admins, editors, 'id');
    expect(result).toHaveLength(3);
    expect((result[0] as Record<string, unknown>)['name']).toBe('Alice');
    expect((result[1] as Record<string, unknown>)['name']).toBe('Bob');
    expect((result[1] as Record<string, unknown>)['role']).toBe('admin'); // first occurrence wins
    expect((result[2] as Record<string, unknown>)['name']).toBe('Charlie');
  });

  it('should union objects by nested key', () => {
    const local = [
      { id: 1, meta: { uuid: 'aaa' } },
      { id: 2, meta: { uuid: 'bbb' } },
    ];
    const remote = [
      { id: 3, meta: { uuid: 'bbb' } },
      { id: 4, meta: { uuid: 'ccc' } },
    ];
    const result = pipe.transform(local, remote, 'meta.uuid');
    expect(result).toHaveLength(3);
    expect((result[0] as Record<string, unknown>)['id']).toBe(1);
    expect((result[1] as Record<string, unknown>)['id']).toBe(2);
    expect((result[2] as Record<string, unknown>)['id']).toBe(4);
  });

  it('should handle missing nested key gracefully', () => {
    const a = [{ a: { b: 'x' } }, { a: {} }];
    const b = [{ a: { b: 'x' } }, { a: { b: 'y' } }];
    const result = pipe.transform(a, b, 'a.b');
    expect(result).toHaveLength(3); // 'x', undefined, 'y'
  });

  it('should not mutate the original arrays', () => {
    const first = [1, 2, 3];
    const second = [3, 4, 5];
    const result = pipe.transform(first, second);
    expect(result).toEqual([1, 2, 3, 4, 5]);
    expect(first).toEqual([1, 2, 3]);
    expect(second).toEqual([3, 4, 5]);
  });

  it('should handle both empty arrays', () => {
    expect(pipe.transform([], [])).toEqual([]);
  });
});
