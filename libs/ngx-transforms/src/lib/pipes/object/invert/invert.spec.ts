import { InvertPipe } from './invert';
import { describe, it, expect, beforeEach } from 'vitest';

describe('InvertPipe', () => {
  let pipe: InvertPipe;

  beforeEach(() => {
    pipe = new InvertPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty for null', () => {
    expect(pipe.transform(null)).toEqual({});
  });

  it('should return empty for undefined', () => {
    expect(pipe.transform(undefined)).toEqual({});
  });

  it('should return empty for primitive', () => {
    expect(pipe.transform(42)).toEqual({});
  });

  it('should return empty for empty object', () => {
    expect(pipe.transform({})).toEqual({});
  });

  it('should swap simple keys and values', () => {
    expect(pipe.transform({ a: 1, b: 2, c: 3 })).toEqual({ '1': 'a', '2': 'b', '3': 'c' });
  });

  it('should swap string values to keys', () => {
    expect(pipe.transform({ en: 'hello', fr: 'bonjour' })).toEqual({
      hello: 'en',
      bonjour: 'fr',
    });
  });

  it('should keep last key on collision', () => {
    expect(pipe.transform({ a: 1, b: 1 })).toEqual({ '1': 'b' });
  });

  it('should coerce booleans to string keys', () => {
    expect(pipe.transform({ a: true, b: false })).toEqual({
      'true': 'a',
      'false': 'b',
    });
  });

  it('should coerce null value to "null" key', () => {
    expect(pipe.transform({ a: null })).toEqual({ 'null': 'a' });
  });

  it('should skip undefined values', () => {
    expect(pipe.transform({ a: undefined, b: 1 })).toEqual({ '1': 'b' });
  });

  it('should ignore prototype methods', () => {
    class Foo { x = 1; method() { return this.x; } }
    expect(pipe.transform(new Foo())).toEqual({ '1': 'x' });
  });

  it('should produce roundtrip identity for unique values', () => {
    const source = { a: 'x', b: 'y', c: 'z' };
    expect(pipe.transform(pipe.transform(source))).toEqual(source);
  });

  it('should not mutate the source', () => {
    const original = { a: 1, b: 2 };
    pipe.transform(original);
    expect(original).toEqual({ a: 1, b: 2 });
  });

  it('should handle numeric and string values mixed', () => {
    expect(pipe.transform({ a: 1, b: 'one' })).toEqual({ '1': 'a', one: 'b' });
  });

  it('should stringify object values', () => {
    expect(pipe.transform({ a: { x: 1 } })).toEqual({ '[object Object]': 'a' });
  });
});
