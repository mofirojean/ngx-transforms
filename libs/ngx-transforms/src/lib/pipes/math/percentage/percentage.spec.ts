import { PercentagePipe } from './percentage';
import { describe, it, expect, beforeEach } from 'vitest';

describe('PercentagePipe', () => {
  let pipe: PercentagePipe;

  beforeEach(() => {
    pipe = new PercentagePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return undefined for null value', () => {
    expect(pipe.transform(null as unknown as number, 100)).toBeUndefined();
  });

  it('should return undefined for undefined value', () => {
    expect(pipe.transform(undefined as unknown as number, 100)).toBeUndefined();
  });

  it('should return undefined for NaN value', () => {
    expect(pipe.transform(NaN, 100)).toBeUndefined();
  });

  it('should return undefined for null total', () => {
    expect(pipe.transform(50, null as unknown as number)).toBeUndefined();
  });

  it('should return undefined for undefined total', () => {
    expect(pipe.transform(50, undefined as unknown as number)).toBeUndefined();
  });

  it('should return undefined for NaN total', () => {
    expect(pipe.transform(50, NaN)).toBeUndefined();
  });

  it('should return undefined when total is zero', () => {
    expect(pipe.transform(50, 0)).toBeUndefined();
  });

  it('should return undefined for non-number value', () => {
    expect(pipe.transform('abc' as unknown as number, 100)).toBeUndefined();
  });

  it('should return undefined for non-number total', () => {
    expect(pipe.transform(50, 'abc' as unknown as number)).toBeUndefined();
  });

  it('should calculate basic percentage', () => {
    expect(pipe.transform(25, 100)).toBe(25);
  });

  it('should calculate percentage of a larger total', () => {
    expect(pipe.transform(25, 200)).toBe(12.5);
  });

  it('should return 100 when value equals total', () => {
    expect(pipe.transform(100, 100)).toBe(100);
  });

  it('should handle value greater than total', () => {
    expect(pipe.transform(150, 100)).toBe(150);
  });

  it('should handle zero value', () => {
    expect(pipe.transform(0, 100)).toBe(0);
  });

  it('should handle negative value', () => {
    expect(pipe.transform(-25, 100)).toBe(-25);
  });

  it('should handle negative total', () => {
    expect(pipe.transform(25, -100)).toBe(-25);
  });

  it('should handle decimal inputs', () => {
    expect(pipe.transform(1, 3)).toBeCloseTo(33.3333, 3);
  });

  it('should round to specified decimal places', () => {
    expect(pipe.transform(1, 3, 2)).toBe(33.33);
  });

  it('should round to 0 decimal places', () => {
    expect(pipe.transform(1, 3, 0)).toBe(33);
  });

  it('should round to 1 decimal place', () => {
    expect(pipe.transform(2, 3, 1)).toBe(66.7);
  });

  it('should handle large numbers', () => {
    expect(pipe.transform(750, 1000)).toBe(75);
  });

  it('should handle small fractions with decimals', () => {
    expect(pipe.transform(1, 7, 4)).toBe(14.2857);
  });
});