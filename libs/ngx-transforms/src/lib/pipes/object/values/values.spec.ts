import { ValuesPipe } from './values';
import { describe, it, expect, beforeEach } from 'vitest';

describe('ValuesPipe', () => {
  let pipe: ValuesPipe;

  beforeEach(() => {
    pipe = new ValuesPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty array for null', () => {
    expect(pipe.transform(null)).toEqual([]);
  });

  it('should return empty array for undefined', () => {
    expect(pipe.transform(undefined)).toEqual([]);
  });

  it('should return empty array for number', () => {
    expect(pipe.transform(42)).toEqual([]);
  });

  it('should return empty array for string', () => {
    expect(pipe.transform('hello')).toEqual([]);
  });

  it('should return empty array for boolean', () => {
    expect(pipe.transform(true)).toEqual([]);
  });

  it('should return empty array for empty object', () => {
    expect(pipe.transform({})).toEqual([]);
  });

  it('should return values of a simple object', () => {
    expect(pipe.transform({ a: 1, b: 2, c: 3 })).toEqual([1, 2, 3]);
  });

  it('should return values of mixed-value object', () => {
    expect(pipe.transform({ name: 'Alice', age: 30, active: true })).toEqual([
      'Alice',
      30,
      true,
    ]);
  });

  it('should return only own enumerable values (not prototype methods)', () => {
    class Foo { x = 1; method() { return this.x; } }
    const instance = new Foo();
    expect(pipe.transform(instance)).toEqual([1]);
  });

  it('should keep nested objects intact', () => {
    const nested = { inner: 1 };
    expect(pipe.transform({ outer: nested })).toEqual([nested]);
  });

  it('should keep arrays as-is when stored as values', () => {
    const arr = [1, 2, 3];
    expect(pipe.transform({ items: arr })).toEqual([arr]);
  });

  it('should return array elements when input is an array', () => {
    expect(pipe.transform(['a', 'b', 'c'])).toEqual(['a', 'b', 'c']);
  });

  it('should return empty for empty array', () => {
    expect(pipe.transform([])).toEqual([]);
  });

  it('should keep null values', () => {
    expect(pipe.transform({ a: null, b: 1 })).toEqual([null, 1]);
  });

  it('should keep undefined values', () => {
    expect(pipe.transform({ a: undefined, b: 1 })).toEqual([undefined, 1]);
  });

  it('should not mutate the original object', () => {
    const original = { a: 1, b: 2 };
    pipe.transform(original);
    expect(original).toEqual({ a: 1, b: 2 });
  });
});