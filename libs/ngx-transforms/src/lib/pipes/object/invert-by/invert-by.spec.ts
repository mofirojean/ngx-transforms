import { InvertByPipe } from './invert-by';
import { describe, it, expect, beforeEach } from 'vitest';

describe('InvertByPipe', () => {
  let pipe: InvertByPipe;

  beforeEach(() => {
    pipe = new InvertByPipe();
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

  it('should group simple values', () => {
    expect(pipe.transform({ a: 1, b: 2, c: 1 })).toEqual({
      '1': ['a', 'c'],
      '2': ['b'],
    });
  });

  it('should keep all keys when no collisions', () => {
    expect(pipe.transform({ a: 1, b: 2, c: 3 })).toEqual({
      '1': ['a'],
      '2': ['b'],
      '3': ['c'],
    });
  });

  it('should group string values', () => {
    expect(pipe.transform({ alice: 'admin', bob: 'user', carol: 'admin' })).toEqual({
      admin: ['alice', 'carol'],
      user: ['bob'],
    });
  });

  it('should preserve insertion order in arrays', () => {
    const result = pipe.transform({ z: 1, a: 1, m: 1 });
    expect(result).toEqual({ '1': ['z', 'a', 'm'] });
  });

  it('should coerce booleans to string keys', () => {
    expect(pipe.transform({ a: true, b: false, c: true })).toEqual({
      'true': ['a', 'c'],
      'false': ['b'],
    });
  });

  it('should coerce null to "null" key', () => {
    expect(pipe.transform({ a: null, b: null })).toEqual({ 'null': ['a', 'b'] });
  });

  it('should skip undefined values', () => {
    expect(pipe.transform({ a: undefined, b: 1, c: 1 })).toEqual({
      '1': ['b', 'c'],
    });
  });

  it('should ignore prototype methods', () => {
    class Foo { x = 1; y = 1; method() { return this.x; } }
    expect(pipe.transform(new Foo())).toEqual({ '1': ['x', 'y'] });
  });

  it('should not mutate the source', () => {
    const original = { a: 1, b: 1 };
    pipe.transform(original);
    expect(original).toEqual({ a: 1, b: 1 });
  });

  it('should be loss-less compared to invert when collisions exist', () => {
    const source = { a: 1, b: 2, c: 1 };
    const result = pipe.transform(source);
    const totalKeys = Object.values(result).reduce((sum, arr) => sum + arr.length, 0);
    expect(totalKeys).toBe(Object.keys(source).length);
  });

  it('should handle mixed value types', () => {
    expect(pipe.transform({ a: 1, b: '1' })).toEqual({ '1': ['a', 'b'] });
  });
});
