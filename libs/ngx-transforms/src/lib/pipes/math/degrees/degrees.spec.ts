import { DegreesPipe } from './degrees';
import { describe, it, expect, beforeEach } from 'vitest';

describe('DegreesPipe', () => {
  let pipe: DegreesPipe;

  beforeEach(() => {
    pipe = new DegreesPipe();
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

  it('should convert 0 radians to 0 degrees', () => {
    expect(pipe.transform(0)).toBe(0);
  });

  it('should convert PI radians to 180 degrees', () => {
    expect(pipe.transform(Math.PI)).toBeCloseTo(180, 10);
  });

  it('should convert PI/2 radians to 90 degrees', () => {
    expect(pipe.transform(Math.PI / 2)).toBeCloseTo(90, 10);
  });

  it('should convert PI/4 radians to 45 degrees', () => {
    expect(pipe.transform(Math.PI / 4)).toBeCloseTo(45, 10);
  });

  it('should convert PI/6 radians to 30 degrees', () => {
    expect(pipe.transform(Math.PI / 6)).toBeCloseTo(30, 10);
  });

  it('should convert 2*PI radians to 360 degrees', () => {
    expect(pipe.transform(2 * Math.PI)).toBeCloseTo(360, 10);
  });

  it('should convert 1 radian to ~57.2958 degrees', () => {
    expect(pipe.transform(1)).toBeCloseTo(57.2958, 3);
  });

  it('should handle negative radians', () => {
    expect(pipe.transform(-Math.PI)).toBeCloseTo(-180, 10);
  });

  it('should handle negative PI/2', () => {
    expect(pipe.transform(-Math.PI / 2)).toBeCloseTo(-90, 10);
  });

  it('should handle small values', () => {
    expect(pipe.transform(0.01)).toBeCloseTo(0.5730, 3);
  });

  it('should handle large values', () => {
    expect(pipe.transform(10 * Math.PI)).toBeCloseTo(1800, 10);
  });
});