import { IsNullPipe } from './is-null';
import { describe, it, expect, beforeEach } from 'vitest';

describe('IsNullPipe', () => {
  let pipe: IsNullPipe;

  beforeEach(() => {
    pipe = new IsNullPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return true for null', () => {
    expect(pipe.transform(null)).toBe(true);
  });

  it('should return false for undefined', () => {
    expect(pipe.transform(undefined)).toBe(false);
  });

  it('should return false for empty string', () => {
    expect(pipe.transform('')).toBe(false);
  });

  it('should return false for non-empty string', () => {
    expect(pipe.transform('null')).toBe(false);
  });

  it('should return false for 0', () => {
    expect(pipe.transform(0)).toBe(false);
  });

  it('should return false for false', () => {
    expect(pipe.transform(false)).toBe(false);
  });

  it('should return false for empty array', () => {
    expect(pipe.transform([])).toBe(false);
  });

  it('should return false for empty object', () => {
    expect(pipe.transform({})).toBe(false);
  });

  it('should return false for NaN', () => {
    expect(pipe.transform(NaN)).toBe(false);
  });

  it('should return false for function', () => {
    expect(pipe.transform(() => 0)).toBe(false);
  });

  it('should not coerce — only literal null returns true', () => {
    expect(pipe.transform('null')).toBe(false);
    expect(pipe.transform(undefined)).toBe(false);
  });
});
