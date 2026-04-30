import { IsStringPipe } from './is-string';
import { describe, it, expect, beforeEach } from 'vitest';

describe('IsStringPipe', () => {
  let pipe: IsStringPipe;

  beforeEach(() => {
    pipe = new IsStringPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return true for non-empty string', () => {
    expect(pipe.transform('hello')).toBe(true);
  });

  it('should return true for empty string', () => {
    expect(pipe.transform('')).toBe(true);
  });

  it('should return true for whitespace string', () => {
    expect(pipe.transform('   ')).toBe(true);
  });

  it('should return true for numeric string', () => {
    expect(pipe.transform('42')).toBe(true);
  });

  it('should return true for template string result', () => {
    expect(pipe.transform(`x${1}`)).toBe(true);
  });

  it('should return false for number', () => {
    expect(pipe.transform(42)).toBe(false);
  });

  it('should return false for boolean', () => {
    expect(pipe.transform(true)).toBe(false);
  });

  it('should return false for null', () => {
    expect(pipe.transform(null)).toBe(false);
  });

  it('should return false for undefined', () => {
    expect(pipe.transform(undefined)).toBe(false);
  });

  it('should return false for array', () => {
    expect(pipe.transform(['a'])).toBe(false);
  });

  it('should return false for object', () => {
    expect(pipe.transform({ s: 'x' })).toBe(false);
  });

  it('should return false for function', () => {
    expect(pipe.transform(() => 'x')).toBe(false);
  });

  it('should return false for boxed String object', () => {
    expect(pipe.transform(new String('x'))).toBe(false);
  });

  it('should return false for symbol', () => {
    expect(pipe.transform(Symbol('x'))).toBe(false);
  });

  it('should return false for Date', () => {
    expect(pipe.transform(new Date())).toBe(false);
  });
});
