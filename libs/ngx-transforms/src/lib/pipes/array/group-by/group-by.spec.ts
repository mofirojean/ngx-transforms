import { GroupByPipe } from './group-by';
import { describe, it, expect, beforeEach } from 'vitest';

describe('GroupByPipe', () => {
  let pipe: GroupByPipe;

  beforeEach(() => {
    pipe = new GroupByPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty object for null input', () => {
    expect(pipe.transform(null as unknown as unknown[], 'key')).toEqual({});
  });

  it('should return empty object for undefined input', () => {
    expect(pipe.transform(undefined as unknown as unknown[], 'key')).toEqual({});
  });

  it('should return empty object for empty array', () => {
    expect(pipe.transform([], 'key')).toEqual({});
  });

  it('should return empty object for empty key', () => {
    expect(pipe.transform([{ name: 'Alice' }], '')).toEqual({});
  });

  it('should group by a string property', () => {
    const input = [
      { name: 'Alice', role: 'admin' },
      { name: 'Bob', role: 'editor' },
      { name: 'Carol', role: 'admin' },
      { name: 'Dave', role: 'editor' },
    ];
    const result = pipe.transform(input, 'role');
    expect(Object.keys(result)).toEqual(['admin', 'editor']);
    expect(result['admin']).toHaveLength(2);
    expect(result['editor']).toHaveLength(2);
  });

  it('should group by a numeric property', () => {
    const input = [
      { name: 'Item A', category: 1 },
      { name: 'Item B', category: 2 },
      { name: 'Item C', category: 1 },
    ];
    const result = pipe.transform(input, 'category');
    expect(result['1']).toHaveLength(2);
    expect(result['2']).toHaveLength(1);
  });

  it('should group by nested key', () => {
    const input = [
      { id: 1, address: { city: 'London' } },
      { id: 2, address: { city: 'Paris' } },
      { id: 3, address: { city: 'London' } },
    ];
    const result = pipe.transform(input, 'address.city');
    expect(result['London']).toHaveLength(2);
    expect(result['Paris']).toHaveLength(1);
  });

  it('should handle missing key values as "undefined"', () => {
    const input = [
      { name: 'Alice', role: 'admin' },
      { name: 'Bob' },
      { name: 'Carol', role: 'admin' },
    ];
    const result = pipe.transform(input, 'role');
    expect(result['admin']).toHaveLength(2);
    expect(result['undefined']).toHaveLength(1);
  });

  it('should handle null key values', () => {
    const input = [
      { name: 'Alice', status: 'active' },
      { name: 'Bob', status: null },
    ];
    const result = pipe.transform(input, 'status');
    expect(result['active']).toHaveLength(1);
    expect(result['undefined']).toHaveLength(1);
  });

  it('should preserve order within groups', () => {
    const input = [
      { name: 'Alice', team: 'A' },
      { name: 'Bob', team: 'B' },
      { name: 'Carol', team: 'A' },
    ];
    const result = pipe.transform(input, 'team');
    expect((result['A'][0] as Record<string, unknown>)['name']).toBe('Alice');
    expect((result['A'][1] as Record<string, unknown>)['name']).toBe('Carol');
  });

  it('should handle single group', () => {
    const input = [
      { name: 'Alice', role: 'admin' },
      { name: 'Bob', role: 'admin' },
    ];
    const result = pipe.transform(input, 'role');
    expect(Object.keys(result)).toEqual(['admin']);
    expect(result['admin']).toHaveLength(2);
  });

  it('should handle all unique groups', () => {
    const input = [
      { name: 'Alice', id: 1 },
      { name: 'Bob', id: 2 },
      { name: 'Carol', id: 3 },
    ];
    const result = pipe.transform(input, 'id');
    expect(Object.keys(result)).toHaveLength(3);
  });

  it('should handle boolean grouping', () => {
    const input = [
      { name: 'Alice', active: true },
      { name: 'Bob', active: false },
      { name: 'Carol', active: true },
    ];
    const result = pipe.transform(input, 'active');
    expect(result['true']).toHaveLength(2);
    expect(result['false']).toHaveLength(1);
  });
});
