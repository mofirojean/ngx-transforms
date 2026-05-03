import { IsFunctionPipe } from './is-function';
import { describe, it, expect, beforeEach } from 'vitest';

describe('IsFunctionPipe', () => {
  let pipe: IsFunctionPipe;

  beforeEach(() => {
    pipe = new IsFunctionPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return true for arrow function', () => {
    expect(pipe.transform(() => 0)).toBe(true);
  });

  it('should return true for regular function', () => {
    expect(pipe.transform(function noop() { return; })).toBe(true);
  });

  it('should return true for async function', () => {
    expect(pipe.transform(async () => 0)).toBe(true);
  });

  it('should return true for generator function', () => {
    expect(pipe.transform(function* gen() { yield 1; })).toBe(true);
  });

  it('should return true for built-in function', () => {
    expect(pipe.transform(Math.max)).toBe(true);
  });

  it('should return true for class constructor', () => {
    class Foo {}
    expect(pipe.transform(Foo)).toBe(true);
  });

  it('should return true for bound function', () => {
    function fn(this: { x: number }) { return this.x; }
    expect(pipe.transform(fn.bind({ x: 1 }))).toBe(true);
  });

  it('should return true for method reference', () => {
    const obj = { fn() { return 1; } };
    expect(pipe.transform(obj.fn)).toBe(true);
  });

  it('should return false for null', () => {
    expect(pipe.transform(null)).toBe(false);
  });

  it('should return false for undefined', () => {
    expect(pipe.transform(undefined)).toBe(false);
  });

  it('should return false for string', () => {
    expect(pipe.transform('() => 0')).toBe(false);
  });

  it('should return false for number', () => {
    expect(pipe.transform(42)).toBe(false);
  });

  it('should return false for boolean', () => {
    expect(pipe.transform(true)).toBe(false);
  });

  it('should return false for object', () => {
    expect(pipe.transform({ call: () => 0 })).toBe(false);
  });

  it('should return false for array', () => {
    expect(pipe.transform([])).toBe(false);
  });
});
