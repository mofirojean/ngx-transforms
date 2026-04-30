import { IsNumberPipe } from './is-number';
import { describe, it, expect, beforeEach } from 'vitest';

describe('IsNumberPipe', () => {
  let pipe: IsNumberPipe;

  beforeEach(() => {
    pipe = new IsNumberPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return true for positive integer', () => {
    expect(pipe.transform(42)).toBe(true);
  });

  it('should return true for negative integer', () => {
    expect(pipe.transform(-7)).toBe(true);
  });

  it('should return true for zero', () => {
    expect(pipe.transform(0)).toBe(true);
  });

  it('should return true for float', () => {
    expect(pipe.transform(3.14)).toBe(true);
  });

  it('should return true for Infinity', () => {
    expect(pipe.transform(Infinity)).toBe(true);
  });

  it('should return true for -Infinity', () => {
    expect(pipe.transform(-Infinity)).toBe(true);
  });

  it('should return true for NaN', () => {
    // NaN is technically of type 'number'
    expect(pipe.transform(NaN)).toBe(true);
  });

  it('should return false for numeric string', () => {
    expect(pipe.transform('42')).toBe(false);
  });

  it('should return false for empty string', () => {
    expect(pipe.transform('')).toBe(false);
  });

  it('should return false for null', () => {
    expect(pipe.transform(null)).toBe(false);
  });

  it('should return false for undefined', () => {
    expect(pipe.transform(undefined)).toBe(false);
  });

  it('should return false for boolean', () => {
    expect(pipe.transform(true)).toBe(false);
    expect(pipe.transform(false)).toBe(false);
  });

  it('should return false for array', () => {
    expect(pipe.transform([1])).toBe(false);
  });

  it('should return false for object', () => {
    expect(pipe.transform({ n: 1 })).toBe(false);
  });

  it('should return false for boxed Number object', () => {
    expect(pipe.transform(new Number(1))).toBe(false);
  });

  it('should return false for Date', () => {
    expect(pipe.transform(new Date())).toBe(false);
  });

  it('should return false for BigInt', () => {
    expect(pipe.transform(10n)).toBe(false);
  });
});
