import { RadiansPipe } from './radians';
import { describe, it, expect, beforeEach } from 'vitest';

describe('RadiansPipe', () => {
  let pipe: RadiansPipe;

  beforeEach(() => {
    pipe = new RadiansPipe();
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

  it('should convert 0 degrees to 0 radians', () => {
    expect(pipe.transform(0)).toBe(0);
  });

  it('should convert 180 degrees to PI radians', () => {
    expect(pipe.transform(180)).toBeCloseTo(Math.PI, 10);
  });

  it('should convert 90 degrees to PI/2 radians', () => {
    expect(pipe.transform(90)).toBeCloseTo(Math.PI / 2, 10);
  });

  it('should convert 45 degrees to PI/4 radians', () => {
    expect(pipe.transform(45)).toBeCloseTo(Math.PI / 4, 10);
  });

  it('should convert 30 degrees to PI/6 radians', () => {
    expect(pipe.transform(30)).toBeCloseTo(Math.PI / 6, 10);
  });

  it('should convert 360 degrees to 2*PI radians', () => {
    expect(pipe.transform(360)).toBeCloseTo(2 * Math.PI, 10);
  });

  it('should convert 60 degrees to PI/3 radians', () => {
    expect(pipe.transform(60)).toBeCloseTo(Math.PI / 3, 10);
  });

  it('should handle negative degrees', () => {
    expect(pipe.transform(-180)).toBeCloseTo(-Math.PI, 10);
  });

  it('should handle negative 90 degrees', () => {
    expect(pipe.transform(-90)).toBeCloseTo(-Math.PI / 2, 10);
  });

  it('should handle small values', () => {
    expect(pipe.transform(1)).toBeCloseTo(0.01745, 4);
  });

  it('should handle large values', () => {
    expect(pipe.transform(1800)).toBeCloseTo(10 * Math.PI, 10);
  });
});
