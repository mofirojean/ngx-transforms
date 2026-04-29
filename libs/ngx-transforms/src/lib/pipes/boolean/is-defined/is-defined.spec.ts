import { IsDefinedPipe } from './is-defined';
import { describe, it, expect, beforeEach } from 'vitest';

describe('IsDefinedPipe', () => {
  let pipe: IsDefinedPipe;

  beforeEach(() => {
    pipe = new IsDefinedPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return false for null', () => {
    expect(pipe.transform(null)).toBe(false);
  });

  it('should return false for undefined', () => {
    expect(pipe.transform(undefined)).toBe(false);
  });

  it('should return true for empty string', () => {
    expect(pipe.transform('')).toBe(true);
  });

  it('should return true for non-empty string', () => {
    expect(pipe.transform('hello')).toBe(true);
  });

  it('should return true for 0', () => {
    expect(pipe.transform(0)).toBe(true);
  });

  it('should return true for negative numbers', () => {
    expect(pipe.transform(-1)).toBe(true);
  });

  it('should return true for positive numbers', () => {
    expect(pipe.transform(42)).toBe(true);
  });

  it('should return true for false', () => {
    expect(pipe.transform(false)).toBe(true);
  });

  it('should return true for true', () => {
    expect(pipe.transform(true)).toBe(true);
  });

  it('should return true for empty array', () => {
    expect(pipe.transform([])).toBe(true);
  });

  it('should return true for non-empty array', () => {
    expect(pipe.transform([1, 2, 3])).toBe(true);
  });

  it('should return true for empty object', () => {
    expect(pipe.transform({})).toBe(true);
  });

  it('should return true for object', () => {
    expect(pipe.transform({ a: 1 })).toBe(true);
  });

  it('should return true for NaN', () => {
    expect(pipe.transform(NaN)).toBe(true);
  });

  it('should return true for function', () => {
    expect(pipe.transform(() => 0)).toBe(true);
  });

  it('should return true for Date', () => {
    expect(pipe.transform(new Date())).toBe(true);
  });

  it('should return true for Symbol', () => {
    expect(pipe.transform(Symbol('x'))).toBe(true);
  });
});
