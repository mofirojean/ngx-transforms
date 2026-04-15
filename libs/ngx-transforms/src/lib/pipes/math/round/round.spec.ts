import { RoundPipe } from './round';
import { describe, it, expect, beforeEach } from 'vitest';

describe('RoundPipe', () => {
  let pipe: RoundPipe;

  beforeEach(() => {
    pipe = new RoundPipe();
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

  it('should return undefined for negative precision', () => {
    expect(pipe.transform(4.5, -1)).toBeUndefined();
  });

  it('should return undefined for NaN precision', () => {
    expect(pipe.transform(4.5, NaN)).toBeUndefined();
  });

  it('should round down for values below .5', () => {
    expect(pipe.transform(4.4)).toBe(4);
  });

  it('should round up for .5 exactly (half-up)', () => {
    expect(pipe.transform(4.5)).toBe(5);
  });

  it('should round up for values above .5', () => {
    expect(pipe.transform(4.6)).toBe(5);
  });

  it('should return integer as itself', () => {
    expect(pipe.transform(5)).toBe(5);
  });

  it('should round to 2 decimal places', () => {
    expect(pipe.transform(4.567, 2)).toBe(4.57);
  });

  it('should round to 1 decimal place', () => {
    expect(pipe.transform(4.56, 1)).toBe(4.6);
  });

  it('should round down at 2 decimals', () => {
    expect(pipe.transform(4.564, 2)).toBe(4.56);
  });

  it('should handle zero', () => {
    expect(pipe.transform(0)).toBe(0);
  });

  it('should handle zero with precision', () => {
    expect(pipe.transform(0, 2)).toBe(0);
  });

  it('should handle negative numbers (half toward positive infinity)', () => {
    expect(pipe.transform(-2.5)).toBe(-2);
  });

  it('should round negative numbers down when below -.5', () => {
    expect(pipe.transform(-2.6)).toBe(-3);
  });

  it('should round negative numbers up when above -.5', () => {
    expect(pipe.transform(-2.4)).toBe(-2);
  });

  it('should handle negative numbers with precision', () => {
    expect(pipe.transform(-4.567, 2)).toBe(-4.57);
  });

  it('should round 0.125 to 2 decimals', () => {
    expect(pipe.transform(0.125, 2)).toBe(0.13);
  });

  it('should round large numbers', () => {
    expect(pipe.transform(1234.5678, 1)).toBe(1234.6);
  });

  it('should round precision 0 explicitly', () => {
    expect(pipe.transform(4.5, 0)).toBe(5);
  });

  it('should handle precision 3', () => {
    expect(pipe.transform(1.2345, 3)).toBe(1.235);
  });
});