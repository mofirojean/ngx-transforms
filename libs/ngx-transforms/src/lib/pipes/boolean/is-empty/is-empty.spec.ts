import { IsEmptyPipe } from './is-empty';
import { describe, it, expect, beforeEach } from 'vitest';

describe('IsEmptyPipe', () => {
  let pipe: IsEmptyPipe;

  beforeEach(() => {
    pipe = new IsEmptyPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return true for null', () => {
    expect(pipe.transform(null)).toBe(true);
  });

  it('should return true for undefined', () => {
    expect(pipe.transform(undefined)).toBe(true);
  });

  it('should return true for empty string', () => {
    expect(pipe.transform('')).toBe(true);
  });

  it('should return true for empty array', () => {
    expect(pipe.transform([])).toBe(true);
  });

  it('should return true for empty object', () => {
    expect(pipe.transform({})).toBe(true);
  });

  it('should return true for empty Map', () => {
    expect(pipe.transform(new Map())).toBe(true);
  });

  it('should return true for empty Set', () => {
    expect(pipe.transform(new Set())).toBe(true);
  });

  it('should return false for non-empty string', () => {
    expect(pipe.transform('hi')).toBe(false);
  });

  it('should return false for whitespace string', () => {
    expect(pipe.transform(' ')).toBe(false);
  });

  it('should return false for non-empty array', () => {
    expect(pipe.transform([0])).toBe(false);
  });

  it('should return false for array with falsy values', () => {
    expect(pipe.transform([null, undefined])).toBe(false);
  });

  it('should return false for object with one key', () => {
    expect(pipe.transform({ a: 1 })).toBe(false);
  });

  it('should return false for object with undefined value', () => {
    // Key exists, so not empty
    expect(pipe.transform({ a: undefined })).toBe(false);
  });

  it('should return false for non-empty Map', () => {
    expect(pipe.transform(new Map([['a', 1]]))).toBe(false);
  });

  it('should return false for non-empty Set', () => {
    expect(pipe.transform(new Set([1]))).toBe(false);
  });

  it('should return false for zero', () => {
    expect(pipe.transform(0)).toBe(false);
  });

  it('should return false for negative number', () => {
    expect(pipe.transform(-1)).toBe(false);
  });

  it('should return false for false', () => {
    expect(pipe.transform(false)).toBe(false);
  });

  it('should return false for true', () => {
    expect(pipe.transform(true)).toBe(false);
  });

  it('should return false for Date', () => {
    expect(pipe.transform(new Date())).toBe(false);
  });

  it('should return false for function', () => {
    expect(pipe.transform(() => 0)).toBe(false);
  });

  it('should return false for NaN', () => {
    expect(pipe.transform(NaN)).toBe(false);
  });

  it('should treat class instances as non-empty', () => {
    // Class instances carry identity even with no own keys
    class Foo {}
    expect(pipe.transform(new Foo())).toBe(false);
  });

  it('should treat RegExp as non-empty', () => {
    expect(pipe.transform(/abc/)).toBe(false);
  });

  it('should treat plain object created via Object.create(null) as empty when no keys', () => {
    expect(pipe.transform(Object.create(null))).toBe(true);
  });
});
