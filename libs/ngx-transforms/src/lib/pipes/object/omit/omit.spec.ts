import { OmitPipe } from './omit';
import { describe, it, expect, beforeEach } from 'vitest';

describe('OmitPipe', () => {
  let pipe: OmitPipe;

  beforeEach(() => {
    pipe = new OmitPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty for null', () => {
    expect(pipe.transform(null, ['a'])).toEqual({});
  });

  it('should return empty for undefined', () => {
    expect(pipe.transform(undefined, ['a'])).toEqual({});
  });

  it('should return empty for primitive', () => {
    expect(pipe.transform(42, ['a'])).toEqual({});
  });

  it('should return full object when keys array is empty', () => {
    expect(pipe.transform({ a: 1, b: 2 }, [])).toEqual({ a: 1, b: 2 });
  });

  it('should return full object when keys is null/invalid', () => {
    expect(pipe.transform({ a: 1, b: 2 }, null as unknown as string[])).toEqual({
      a: 1,
      b: 2,
    });
  });

  it('should omit a single key', () => {
    expect(pipe.transform({ a: 1, b: 2, c: 3 }, ['b'])).toEqual({ a: 1, c: 3 });
  });

  it('should omit multiple keys', () => {
    expect(pipe.transform({ a: 1, b: 2, c: 3 }, ['a', 'c'])).toEqual({ b: 2 });
  });

  it('should accept a single string key', () => {
    expect(pipe.transform({ a: 1, b: 2 }, 'a')).toEqual({ b: 2 });
  });

  it('should ignore keys not present in source', () => {
    expect(pipe.transform({ a: 1, b: 2 }, ['missing'])).toEqual({ a: 1, b: 2 });
  });

  it('should remove all keys when all listed', () => {
    expect(pipe.transform({ a: 1, b: 2 }, ['a', 'b'])).toEqual({});
  });

  it('should preserve types of remaining values', () => {
    const obj = { name: 'Alice', age: 30, password: 'secret', tags: ['admin'] };
    expect(pipe.transform(obj, ['password'])).toEqual({
      name: 'Alice',
      age: 30,
      tags: ['admin'],
    });
  });

  it('should keep null and undefined values that are not omitted', () => {
    expect(pipe.transform({ a: null, b: undefined, c: 1 }, ['c'])).toEqual({
      a: null,
      b: undefined,
    });
  });

  it('should not include inherited prototype properties', () => {
    class Foo { x = 1; y = 2; method() { return this.x; } }
    const instance = new Foo();
    expect(pipe.transform(instance, ['y'])).toEqual({ x: 1 });
  });

  it('should not mutate the source object', () => {
    const original = { a: 1, b: 2, c: 3 };
    pipe.transform(original, ['b']);
    expect(original).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('should ignore non-string entries in keys array', () => {
    expect(
      pipe.transform({ a: 1, b: 2 }, ['a', 42 as unknown as string])
    ).toEqual({ b: 2 });
  });

  it('should handle empty source object', () => {
    expect(pipe.transform({}, ['a'])).toEqual({});
  });

  it('should be the inverse of pick when keys complement', () => {
    const source = { a: 1, b: 2, c: 3 };
    expect(pipe.transform(source, ['a'])).toEqual({ b: 2, c: 3 });
  });
});
