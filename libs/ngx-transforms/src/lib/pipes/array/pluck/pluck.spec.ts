import { PluckPipe } from './pluck';
import { describe, it, expect, beforeEach } from 'vitest';

describe('PluckPipe', () => {
  let pipe: PluckPipe;

  beforeEach(() => {
    pipe = new PluckPipe();
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

  it('should return empty array for empty array', () => {
    expect(pipe.transform([], 'name')).toEqual([]);
  });

  it('should return empty array for empty key', () => {
    expect(pipe.transform([{ name: 'Alice' }], '')).toEqual([]);
  });

  it('should extract shallow property', () => {
    const input = [
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 30 },
      { name: 'Carol', age: 28 },
    ];
    expect(pipe.transform(input, 'name')).toEqual(['Alice', 'Bob', 'Carol']);
  });

  it('should extract numeric property', () => {
    const input = [
      { id: 1, price: 9.99 },
      { id: 2, price: 19.99 },
      { id: 3, price: 29.99 },
    ];
    expect(pipe.transform(input, 'price')).toEqual([9.99, 19.99, 29.99]);
  });

  it('should extract nested property with dot notation', () => {
    const input = [
      { id: 1, customer: { name: 'Alice' } },
      { id: 2, customer: { name: 'Bob' } },
    ];
    expect(pipe.transform(input, 'customer.name')).toEqual(['Alice', 'Bob']);
  });

  it('should extract deeply nested property', () => {
    const input = [
      { a: { b: { c: 'x' } } },
      { a: { b: { c: 'y' } } },
    ];
    expect(pipe.transform(input, 'a.b.c')).toEqual(['x', 'y']);
  });

  it('should return undefined for missing properties', () => {
    const input = [
      { name: 'Alice' },
      { age: 30 },
      { name: 'Carol' },
    ];
    expect(pipe.transform(input, 'name')).toEqual(['Alice', undefined, 'Carol']);
  });

  it('should return undefined for missing nested properties', () => {
    const input = [
      { a: { b: 1 } },
      { a: {} },
      { a: { b: 3 } },
    ];
    expect(pipe.transform(input, 'a.b')).toEqual([1, undefined, 3]);
  });

  it('should handle boolean values', () => {
    const input = [
      { active: true },
      { active: false },
      { active: true },
    ];
    expect(pipe.transform(input, 'active')).toEqual([true, false, true]);
  });

  it('should not mutate the original array', () => {
    const original = [{ name: 'Alice' }, { name: 'Bob' }];
    const copy = JSON.stringify(original);
    pipe.transform(original, 'name');
    expect(JSON.stringify(original)).toBe(copy);
  });
});
