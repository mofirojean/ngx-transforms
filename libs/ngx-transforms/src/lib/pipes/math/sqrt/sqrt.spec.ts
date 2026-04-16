import { SqrtPipe } from './sqrt';
import { describe, it, expect, beforeEach } from 'vitest';

describe('SqrtPipe', () => {
  let pipe: SqrtPipe;

  beforeEach(() => {
    pipe = new SqrtPipe();
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

  it('should return undefined for negative number', () => {
    expect(pipe.transform(-4)).toBeUndefined();
  });

  it('should return 0 for 0', () => {
    expect(pipe.transform(0)).toBe(0);
  });

  it('should return 1 for 1', () => {
    expect(pipe.transform(1)).toBe(1);
  });

  it('should return 2 for 4', () => {
    expect(pipe.transform(4)).toBe(2);
  });

  it('should return 3 for 9', () => {
    expect(pipe.transform(9)).toBe(3);
  });

  it('should return 12 for 144', () => {
    expect(pipe.transform(144)).toBe(12);
  });

  it('should return 10 for 100', () => {
    expect(pipe.transform(100)).toBe(10);
  });

  it('should handle non-perfect squares', () => {
    expect(pipe.transform(2)).toBeCloseTo(1.4142, 3);
  });

  it('should handle decimal inputs', () => {
    expect(pipe.transform(0.25)).toBe(0.5);
  });

  it('should handle small decimals', () => {
    expect(pipe.transform(0.01)).toBeCloseTo(0.1, 10);
  });

  it('should handle large numbers', () => {
    expect(pipe.transform(1000000)).toBe(1000);
  });

  it('should return correct value for 50', () => {
    expect(pipe.transform(50)).toBeCloseTo(7.0711, 3);
  });
});
