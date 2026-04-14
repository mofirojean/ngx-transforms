import { FloorPipe } from './floor';
import { describe, it, expect, beforeEach } from 'vitest';

describe('FloorPipe', () => {
  let pipe: FloorPipe;

  beforeEach(() => {
    pipe = new FloorPipe();
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

  it('should floor to integer by default', () => {
    expect(pipe.transform(4.9)).toBe(4);
  });

  it('should floor integer as itself', () => {
    expect(pipe.transform(5)).toBe(5);
  });

  it('should floor to 2 decimal places', () => {
    expect(pipe.transform(4.567, 2)).toBe(4.56);
  });

  it('should floor to 1 decimal place', () => {
    expect(pipe.transform(4.99, 1)).toBe(4.9);
  });

  it('should floor small fractions down', () => {
    expect(pipe.transform(0.999, 2)).toBe(0.99);
  });

  it('should handle zero', () => {
    expect(pipe.transform(0)).toBe(0);
  });

  it('should handle zero with precision', () => {
    expect(pipe.transform(0, 2)).toBe(0);
  });

  it('should handle negative numbers (away from zero)', () => {
    expect(pipe.transform(-4.1)).toBe(-5);
  });

  it('should handle negative numbers with precision', () => {
    expect(pipe.transform(-4.123, 2)).toBe(-4.13);
  });

  it('should handle large precision', () => {
    expect(pipe.transform(0.987654321, 6)).toBe(0.987654);
  });

  it('should handle large numbers', () => {
    expect(pipe.transform(1234.5678, 1)).toBe(1234.5);
  });

  it('should floor exact decimal values unchanged', () => {
    expect(pipe.transform(4.5, 1)).toBe(4.5);
  });

  it('should floor precision 0 explicitly', () => {
    expect(pipe.transform(4.99, 0)).toBe(4);
  });

  it('should handle precision 3', () => {
    expect(pipe.transform(1.2349, 3)).toBe(1.234);
  });
});