import { PowPipe } from './pow';
import { describe, it, expect, beforeEach } from 'vitest';

describe('PowPipe', () => {
  let pipe: PowPipe;

  beforeEach(() => {
    pipe = new PowPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return undefined for null value', () => {
    expect(pipe.transform(null as unknown as number)).toBeUndefined();
  });

  it('should return undefined for undefined value', () => {
    expect(pipe.transform(undefined as unknown as number)).toBeUndefined();
  });

  it('should return undefined for NaN value', () => {
    expect(pipe.transform(NaN)).toBeUndefined();
  });

  it('should return undefined for non-number value', () => {
    expect(pipe.transform('abc' as unknown as number)).toBeUndefined();
  });

  it('should return undefined for NaN exponent', () => {
    expect(pipe.transform(2, NaN)).toBeUndefined();
  });

  it('should return undefined for non-number exponent', () => {
    expect(pipe.transform(2, 'abc' as unknown as number)).toBeUndefined();
  });

  it('should square by default (exponent 2)', () => {
    expect(pipe.transform(3)).toBe(9);
  });

  it('should cube with exponent 3', () => {
    expect(pipe.transform(2, 3)).toBe(8);
  });

  it('should return 1 for exponent 0', () => {
    expect(pipe.transform(5, 0)).toBe(1);
  });

  it('should return the value for exponent 1', () => {
    expect(pipe.transform(7, 1)).toBe(7);
  });

  it('should handle zero base', () => {
    expect(pipe.transform(0, 5)).toBe(0);
  });

  it('should handle zero base with exponent 0', () => {
    expect(pipe.transform(0, 0)).toBe(1);
  });

  it('should handle negative base with even exponent', () => {
    expect(pipe.transform(-3, 2)).toBe(9);
  });

  it('should handle negative base with odd exponent', () => {
    expect(pipe.transform(-2, 3)).toBe(-8);
  });

  it('should handle negative exponent', () => {
    expect(pipe.transform(2, -1)).toBe(0.5);
  });

  it('should handle negative exponent with larger value', () => {
    expect(pipe.transform(10, -2)).toBe(0.01);
  });

  it('should handle decimal base', () => {
    expect(pipe.transform(0.5, 2)).toBe(0.25);
  });

  it('should handle decimal exponent', () => {
    expect(pipe.transform(4, 0.5)).toBe(2);
  });

  it('should handle large exponents', () => {
    expect(pipe.transform(2, 10)).toBe(1024);
  });

  it('should handle 1 as base', () => {
    expect(pipe.transform(1, 100)).toBe(1);
  });
});