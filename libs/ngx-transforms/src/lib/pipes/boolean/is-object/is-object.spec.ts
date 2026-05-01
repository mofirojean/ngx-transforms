import { IsObjectPipe } from './is-object';
import { describe, it, expect, beforeEach } from 'vitest';

describe('IsObjectPipe', () => {
  let pipe: IsObjectPipe;

  beforeEach(() => {
    pipe = new IsObjectPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return true for plain object', () => {
    expect(pipe.transform({ a: 1 })).toBe(true);
  });

  it('should return true for empty object', () => {
    expect(pipe.transform({})).toBe(true);
  });

  it('should return true for nested object', () => {
    expect(pipe.transform({ a: { b: 1 } })).toBe(true);
  });

  it('should return true for class instance', () => {
    class Foo { x = 1; }
    expect(pipe.transform(new Foo())).toBe(true);
  });

  it('should return true for Date', () => {
    expect(pipe.transform(new Date())).toBe(true);
  });

  it('should return true for Map', () => {
    expect(pipe.transform(new Map())).toBe(true);
  });

  it('should return true for Set', () => {
    expect(pipe.transform(new Set())).toBe(true);
  });

  it('should return true for RegExp', () => {
    expect(pipe.transform(/abc/)).toBe(true);
  });

  it('should return false for null', () => {
    expect(pipe.transform(null)).toBe(false);
  });

  it('should return false for undefined', () => {
    expect(pipe.transform(undefined)).toBe(false);
  });

  it('should return false for array', () => {
    expect(pipe.transform([1, 2, 3])).toBe(false);
  });

  it('should return false for empty array', () => {
    expect(pipe.transform([])).toBe(false);
  });

  it('should return false for string', () => {
    expect(pipe.transform('abc')).toBe(false);
  });

  it('should return false for number', () => {
    expect(pipe.transform(42)).toBe(false);
  });

  it('should return false for boolean', () => {
    expect(pipe.transform(true)).toBe(false);
  });

  it('should return false for function', () => {
    expect(pipe.transform(() => 0)).toBe(false);
  });
});
