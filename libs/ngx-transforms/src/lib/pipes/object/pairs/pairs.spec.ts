import { PairsPipe } from './pairs';
import { describe, it, expect, beforeEach } from 'vitest';

describe('PairsPipe', () => {
  let pipe: PairsPipe;

  beforeEach(() => {
    pipe = new PairsPipe();
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

  it('should return entries of a simple object', () => {
    expect(pipe.transform({ a: 1, b: 2, c: 3 })).toEqual([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);
  });

  it('should return entries of mixed-value object', () => {
    expect(pipe.transform({ name: 'Alice', age: 30, active: true })).toEqual([
      ['name', 'Alice'],
      ['age', 30],
      ['active', true],
    ]);
  });

  it('should return only own enumerable entries (not prototype methods)', () => {
    class Foo { x = 1; method() { return this.x; } }
    const instance = new Foo();
    expect(pipe.transform(instance)).toEqual([['x', 1]]);
  });

  it('should keep nested objects as values', () => {
    const nested = { inner: 1 };
    expect(pipe.transform({ outer: nested })).toEqual([['outer', nested]]);
  });

  it('should return numeric index entries for arrays', () => {
    expect(pipe.transform(['a', 'b', 'c'])).toEqual([
      ['0', 'a'],
      ['1', 'b'],
      ['2', 'c'],
    ]);
  });

  it('should return empty for empty array', () => {
    expect(pipe.transform([])).toEqual([]);
  });

  it('should keep null and undefined values', () => {
    expect(pipe.transform({ a: null, b: undefined, c: 1 })).toEqual([
      ['a', null],
      ['b', undefined],
      ['c', 1],
    ]);
  });

  it('should not mutate the original object', () => {
    const original = { a: 1, b: 2 };
    pipe.transform(original);
    expect(original).toEqual({ a: 1, b: 2 });
  });
});