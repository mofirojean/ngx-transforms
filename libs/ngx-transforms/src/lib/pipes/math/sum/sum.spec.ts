import { SumPipe } from './sum';
import { describe, it, expect, beforeEach } from 'vitest';

describe('SumPipe', () => {
  let pipe: SumPipe;

  beforeEach(() => {
    pipe = new SumPipe();
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

  it('should return undefined for empty array', () => {
    expect(pipe.transform([])).toBeUndefined();
  });

  it('should return the sum of numbers', () => {
    expect(pipe.transform([10, 20, 30])).toBe(60);
  });

  it('should return the single element', () => {
    expect(pipe.transform([42])).toBe(42);
  });

  it('should handle negative numbers', () => {
    expect(pipe.transform([5, -3, 8, -10, 2])).toBe(2);
  });

  it('should handle all same values', () => {
    expect(pipe.transform([7, 7, 7])).toBe(21);
  });

  it('should handle zero', () => {
    expect(pipe.transform([3, 0, 5])).toBe(8);
  });

  it('should handle all zeros', () => {
    expect(pipe.transform([0, 0, 0])).toBe(0);
  });

  it('should handle decimal numbers', () => {
    expect(pipe.transform([1.5, 0.3, 2.2])).toBeCloseTo(4.0);
  });

  it('should ignore non-number values', () => {
    expect(pipe.transform([5, 'a', 3, null, 8] as unknown[])).toBe(16);
  });

  it('should return undefined for array with no numbers', () => {
    expect(pipe.transform(['a', 'b', null] as unknown[])).toBeUndefined();
  });

  it('should ignore NaN values', () => {
    expect(pipe.transform([5, NaN, 3, NaN])).toBe(8);
  });

  it('should sum by object key', () => {
    const products = [
      { name: 'Laptop', price: 999 },
      { name: 'Mouse', price: 29 },
      { name: 'Monitor', price: 450 },
    ];
    expect(pipe.transform(products, 'price')).toBe(1478);
  });

  it('should sum by nested key', () => {
    const orders = [
      { id: 1, meta: { total: 150 } },
      { id: 2, meta: { total: 45 } },
      { id: 3, meta: { total: 200 } },
    ];
    expect(pipe.transform(orders, 'meta.total')).toBe(395);
  });

  it('should handle missing nested key gracefully', () => {
    const input = [
      { a: { b: 10 } },
      { a: {} },
      { a: { b: 5 } },
    ];
    expect(pipe.transform(input, 'a.b')).toBe(15);
  });

  it('should return undefined when no valid numbers by key', () => {
    const input = [
      { name: 'Alice' },
      { name: 'Bob' },
    ];
    expect(pipe.transform(input, 'age')).toBeUndefined();
  });

  it('should handle negative numbers by key', () => {
    const temps = [
      { city: 'Moscow', temp: -15 },
      { city: 'Helsinki', temp: -8 },
      { city: 'Yakutsk', temp: -40 },
    ];
    expect(pipe.transform(temps, 'temp')).toBe(-63);
  });

  it('should not mutate the original array', () => {
    const original = [5, 3, 8, 1, 9];
    pipe.transform(original);
    expect(original).toEqual([5, 3, 8, 1, 9]);
  });
});
