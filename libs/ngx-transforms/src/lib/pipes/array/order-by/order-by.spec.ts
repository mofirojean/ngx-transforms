import { OrderByPipe } from './order-by';
import { describe, it, expect, beforeEach } from 'vitest';

describe('OrderByPipe', () => {
  let pipe: OrderByPipe;

  beforeEach(() => {
    pipe = new OrderByPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty array for null input', () => {
    expect(pipe.transform(null as unknown as unknown[], 'name')).toEqual([]);
  });

  it('should return empty array for undefined input', () => {
    expect(pipe.transform(undefined as unknown as unknown[], 'name')).toEqual([]);
  });

  it('should return copy for empty array', () => {
    expect(pipe.transform([], 'name')).toEqual([]);
  });

  it('should return copy for single element', () => {
    const input = [{ name: 'Alice' }];
    expect(pipe.transform(input, 'name')).toEqual([{ name: 'Alice' }]);
  });

  it('should return copy when key is empty', () => {
    const input = [{ name: 'Bob' }, { name: 'Alice' }];
    expect(pipe.transform(input, '')).toEqual(input);
  });

  it('should sort strings ascending by default', () => {
    const input = [{ name: 'Carol' }, { name: 'Alice' }, { name: 'Bob' }];
    const result = pipe.transform(input, 'name');
    expect(result.map((r: unknown) => (r as Record<string, unknown>)['name'])).toEqual(['Alice', 'Bob', 'Carol']);
  });

  it('should sort strings descending', () => {
    const input = [{ name: 'Alice' }, { name: 'Carol' }, { name: 'Bob' }];
    const result = pipe.transform(input, 'name', 'desc');
    expect(result.map((r: unknown) => (r as Record<string, unknown>)['name'])).toEqual(['Carol', 'Bob', 'Alice']);
  });

  it('should sort numbers ascending', () => {
    const input = [{ age: 30 }, { age: 25 }, { age: 28 }];
    const result = pipe.transform(input, 'age');
    expect(result.map((r: unknown) => (r as Record<string, unknown>)['age'])).toEqual([25, 28, 30]);
  });

  it('should sort numbers descending', () => {
    const input = [{ age: 25 }, { age: 30 }, { age: 28 }];
    const result = pipe.transform(input, 'age', 'desc');
    expect(result.map((r: unknown) => (r as Record<string, unknown>)['age'])).toEqual([30, 28, 25]);
  });

  it('should sort by nested key', () => {
    const input = [
      { id: 1, customer: { name: 'Carol' } },
      { id: 2, customer: { name: 'Alice' } },
      { id: 3, customer: { name: 'Bob' } },
    ];
    const result = pipe.transform(input, 'customer.name');
    expect(result.map((r: unknown) => (r as Record<string, unknown>)['id'])).toEqual([2, 3, 1]);
  });

  it('should push null values to the end', () => {
    const input = [{ name: null }, { name: 'Alice' }, { name: 'Bob' }];
    const result = pipe.transform(input, 'name');
    expect((result[0] as Record<string, unknown>)['name']).toBe('Alice');
    expect((result[1] as Record<string, unknown>)['name']).toBe('Bob');
    expect((result[2] as Record<string, unknown>)['name']).toBeNull();
  });

  it('should push undefined values to the end', () => {
    const input = [{ name: undefined }, { name: 'Alice' }, { name: 'Bob' }];
    const result = pipe.transform(input, 'name');
    expect((result[2] as Record<string, unknown>)['name']).toBeUndefined();
  });

  it('should handle case-insensitive string sorting', () => {
    const input = [{ name: 'bob' }, { name: 'Alice' }, { name: 'carol' }];
    const result = pipe.transform(input, 'name');
    expect(result.map((r: unknown) => (r as Record<string, unknown>)['name'])).toEqual(['Alice', 'bob', 'carol']);
  });

  it('should not mutate the original array', () => {
    const original = [{ name: 'Carol' }, { name: 'Alice' }, { name: 'Bob' }];
    const copy = JSON.stringify(original);
    pipe.transform(original, 'name');
    expect(JSON.stringify(original)).toBe(copy);
  });
});