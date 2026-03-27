import { RangePipe } from './range';
import { describe, it, expect, beforeEach } from 'vitest';

describe('RangePipe', () => {
  let pipe: RangePipe;

  beforeEach(() => {
    pipe = new RangePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty array for null', () => {
    expect(pipe.transform(null as unknown as number)).toEqual([]);
  });

  it('should return empty array for undefined', () => {
    expect(pipe.transform(undefined as unknown as number)).toEqual([]);
  });

  it('should return empty array for NaN', () => {
    expect(pipe.transform(NaN)).toEqual([]);
  });

  it('should return empty array for 0', () => {
    expect(pipe.transform(0)).toEqual([]);
  });

  it('should return empty array for negative value', () => {
    expect(pipe.transform(-3)).toEqual([]);
  });

  it('should return empty array for string input', () => {
    expect(pipe.transform('hello' as unknown as number)).toEqual([]);
  });

  it('should generate range starting from 0 by default', () => {
    expect(pipe.transform(5)).toEqual([0, 1, 2, 3, 4]);
  });

  it('should generate range with custom start', () => {
    expect(pipe.transform(5, 1)).toEqual([1, 2, 3, 4, 5]);
  });

  it('should generate range with custom start and step', () => {
    expect(pipe.transform(5, 0, 2)).toEqual([0, 2, 4, 6, 8]);
  });

  it('should generate range with step of 10', () => {
    expect(pipe.transform(4, 10, 10)).toEqual([10, 20, 30, 40]);
  });

  it('should generate single element range', () => {
    expect(pipe.transform(1)).toEqual([0]);
  });

  it('should generate single element with custom start', () => {
    expect(pipe.transform(1, 5)).toEqual([5]);
  });

  it('should handle negative start', () => {
    expect(pipe.transform(5, -2)).toEqual([-2, -1, 0, 1, 2]);
  });

  it('should handle negative step', () => {
    expect(pipe.transform(4, 10, -2)).toEqual([10, 8, 6, 4]);
  });

  it('should return empty array for step of 0', () => {
    expect(pipe.transform(5, 0, 0)).toEqual([]);
  });

  it('should handle decimal step', () => {
    const result = pipe.transform(3, 0, 0.5);
    expect(result).toEqual([0, 0.5, 1]);
  });
});
