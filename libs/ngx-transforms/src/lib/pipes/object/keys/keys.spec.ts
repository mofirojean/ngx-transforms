import { KeysPipe } from './keys';
import { describe, it, expect, beforeEach } from 'vitest';

describe('KeysPipe', () => {
  let pipe: KeysPipe;

  beforeEach(() => {
    pipe = new KeysPipe();
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

  it('should return keys of a simple object', () => {
    expect(pipe.transform({ a: 1, b: 2, c: 3 })).toEqual(['a', 'b', 'c']);
  });

  it('should return keys of mixed-value object', () => {
    expect(pipe.transform({ name: 'Alice', age: 30, active: true })).toEqual([
      'name',
      'age',
      'active',
    ]);
  });

  it('should return only own enumerable keys (not prototype chain)', () => {
    class Foo { x = 1; method() { return this.x; } }
    const instance = new Foo();
    expect(pipe.transform(instance)).toEqual(['x']);
  });

  it('should handle nested object as a single key', () => {
    expect(pipe.transform({ outer: { inner: 1 } })).toEqual(['outer']);
  });

  it('should return numeric index keys for arrays', () => {
    expect(pipe.transform(['a', 'b', 'c'])).toEqual(['0', '1', '2']);
  });

  it('should return empty for empty array', () => {
    expect(pipe.transform([])).toEqual([]);
  });

  it('should not mutate the original object', () => {
    const original = { a: 1, b: 2 };
    pipe.transform(original);
    expect(original).toEqual({ a: 1, b: 2 });
  });
});