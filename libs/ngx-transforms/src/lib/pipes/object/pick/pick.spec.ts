import { PickPipe } from './pick';
import { describe, it, expect, beforeEach } from 'vitest';

describe('PickPipe', () => {
  let pipe: PickPipe;

  beforeEach(() => {
    pipe = new PickPipe();
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

  it('should return empty when keys array is empty', () => {
    expect(pipe.transform({ a: 1, b: 2 }, [])).toEqual({});
  });

  it('should return empty when keys is null/invalid', () => {
    expect(pipe.transform({ a: 1, b: 2 }, null as unknown as string[])).toEqual({});
  });

  it('should pick a single key from array', () => {
    expect(pipe.transform({ a: 1, b: 2, c: 3 }, ['a'])).toEqual({ a: 1 });
  });

  it('should pick multiple keys', () => {
    expect(pipe.transform({ a: 1, b: 2, c: 3 }, ['a', 'c'])).toEqual({ a: 1, c: 3 });
  });

  it('should accept a single string key', () => {
    expect(pipe.transform({ a: 1, b: 2 }, 'a')).toEqual({ a: 1 });
  });

  it('should skip keys not present in source', () => {
    expect(pipe.transform({ a: 1, b: 2 }, ['a', 'missing'])).toEqual({ a: 1 });
  });

  it('should preserve types of values', () => {
    const obj = { name: 'Alice', age: 30, active: true, tags: ['admin'] };
    expect(pipe.transform(obj, ['name', 'tags'])).toEqual({
      name: 'Alice',
      tags: ['admin'],
    });
  });

  it('should keep null and undefined values', () => {
    expect(pipe.transform({ a: null, b: undefined, c: 1 }, ['a', 'b'])).toEqual({
      a: null,
      b: undefined,
    });
  });

  it('should not include inherited prototype properties', () => {
    class Foo { x = 1; method() { return this.x; } }
    const instance = new Foo();
    expect(pipe.transform(instance, ['x', 'method'])).toEqual({ x: 1 });
  });

  it('should not mutate the source object', () => {
    const original = { a: 1, b: 2, c: 3 };
    pipe.transform(original, ['a']);
    expect(original).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('should ignore non-string entries in keys array', () => {
    expect(
      pipe.transform({ a: 1, b: 2 }, ['a', 42 as unknown as string, 'b'])
    ).toEqual({ a: 1, b: 2 });
  });

  it('should handle empty source object', () => {
    expect(pipe.transform({}, ['a'])).toEqual({});
  });
});
