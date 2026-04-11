import { AveragePipe } from './average';
import { describe, it, expect, beforeEach } from 'vitest';

describe('AveragePipe', () => {
  let pipe: AveragePipe;

  beforeEach(() => {
    pipe = new AveragePipe();
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

  it('should return the average of numbers', () => {
    expect(pipe.transform([10, 20, 30])).toBe(20);
  });

  it('should return the single element', () => {
    expect(pipe.transform([42])).toBe(42);
  });

  it('should handle negative numbers', () => {
    expect(pipe.transform([5, -3, 8, -10, 2])).toBeCloseTo(0.4);
  });

  it('should handle all same values', () => {
    expect(pipe.transform([7, 7, 7])).toBe(7);
  });

  it('should handle zero', () => {
    expect(pipe.transform([0, 0, 0])).toBe(0);
  });

  it('should handle decimal numbers', () => {
    expect(pipe.transform([1.5, 2.5, 3.0])).toBeCloseTo(2.333, 2);
  });

  it('should handle large arrays', () => {
    expect(pipe.transform([100, 200, 300, 400, 500])).toBe(300);
  });

  it('should ignore non-number values', () => {
    expect(pipe.transform([5, 'a', 3, null, 8] as unknown[])).toBeCloseTo(5.333, 2);
  });

  it('should return undefined for array with no numbers', () => {
    expect(pipe.transform(['a', 'b', null] as unknown[])).toBeUndefined();
  });

  it('should ignore NaN values', () => {
    expect(pipe.transform([5, NaN, 3, NaN])).toBe(4);
  });

  it('should find average by object key', () => {
    const students = [
      { name: 'Alice', grade: 90 },
      { name: 'Bob', grade: 80 },
      { name: 'Carol', grade: 70 },
    ];
    expect(pipe.transform(students, 'grade')).toBe(80);
  });

  it('should find average by nested key', () => {
    const reviews = [
      { id: 1, meta: { rating: 4 } },
      { id: 2, meta: { rating: 5 } },
      { id: 3, meta: { rating: 3 } },
    ];
    expect(pipe.transform(reviews, 'meta.rating')).toBe(4);
  });

  it('should handle missing nested key gracefully', () => {
    const input = [
      { a: { b: 10 } },
      { a: {} },
      { a: { b: 20 } },
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
    expect(pipe.transform(temps, 'temp')).toBe(-21);
  });

  it('should not mutate the original array', () => {
    const original = [10, 20, 30];
    pipe.transform(original);
    expect(original).toEqual([10, 20, 30]);
  });
});