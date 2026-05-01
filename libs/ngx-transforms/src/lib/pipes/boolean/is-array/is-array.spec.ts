import { IsArrayPipe } from './is-array';
import { describe, it, expect, beforeEach } from 'vitest';

describe('IsArrayPipe', () => {
  let pipe: IsArrayPipe;

  beforeEach(() => {
    pipe = new IsArrayPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return true for array of numbers', () => {
    expect(pipe.transform([1, 2, 3])).toBe(true);
  });

  it('should return true for empty array', () => {
    expect(pipe.transform([])).toBe(true);
  });

  it('should return true for nested arrays', () => {
    expect(pipe.transform([[1], [2]])).toBe(true);
  });

  it('should return true for mixed-type arrays', () => {
    expect(pipe.transform([1, 'a', null, {}])).toBe(true);
  });

  it('should return false for string', () => {
    expect(pipe.transform('abc')).toBe(false);
  });

  it('should return false for object', () => {
    expect(pipe.transform({ a: 1 })).toBe(false);
  });

  it('should return false for null', () => {
    expect(pipe.transform(null)).toBe(false);
  });

  it('should return false for undefined', () => {
    expect(pipe.transform(undefined)).toBe(false);
  });

  it('should return false for number', () => {
    expect(pipe.transform(42)).toBe(false);
  });

  it('should return false for boolean', () => {
    expect(pipe.transform(true)).toBe(false);
  });

  it('should return false for array-like object', () => {
    expect(pipe.transform({ 0: 'a', 1: 'b', length: 2 })).toBe(false);
  });

  it('should return false for typed array', () => {
    expect(pipe.transform(new Uint8Array([1, 2]))).toBe(false);
  });

  it('should return false for Set', () => {
    expect(pipe.transform(new Set([1, 2]))).toBe(false);
  });

  it('should return false for Map', () => {
    expect(pipe.transform(new Map())).toBe(false);
  });
});
