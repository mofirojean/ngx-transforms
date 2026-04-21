import { TestPipe } from './test';
import { describe, it, expect, beforeEach } from 'vitest';

describe('TestPipe', () => {
  let pipe: TestPipe;

  beforeEach(() => {
    pipe = new TestPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return false for null value', () => {
    expect(pipe.transform(null as unknown as string, 'x')).toBe(false);
  });

  it('should return false for undefined value', () => {
    expect(pipe.transform(undefined as unknown as string, 'x')).toBe(false);
  });

  it('should return false for non-string value', () => {
    expect(pipe.transform(42 as unknown as string, 'x')).toBe(false);
  });

  it('should return false for empty pattern', () => {
    expect(pipe.transform('hello', '')).toBe(false);
  });

  it('should return true when pattern matches', () => {
    expect(pipe.transform('hello', 'ell')).toBe(true);
  });

  it('should return false when pattern does not match', () => {
    expect(pipe.transform('hello', 'xyz')).toBe(false);
  });

  it('should test email', () => {
    expect(pipe.transform('a@b.com', '@')).toBe(true);
  });

  it('should test with case-insensitive flag', () => {
    expect(pipe.transform('HELLO', '[a-z]', 'i')).toBe(true);
  });

  it('should be case-sensitive by default', () => {
    expect(pipe.transform('HELLO', '[a-z]')).toBe(false);
  });

  it('should test numeric pattern', () => {
    expect(pipe.transform('123', '^[0-9]+$')).toBe(true);
  });

  it('should reject non-numeric for numeric pattern', () => {
    expect(pipe.transform('12a', '^[0-9]+$')).toBe(false);
  });

  it('should test with RegExp object', () => {
    expect(pipe.transform('hello', /ello/)).toBe(true);
  });

  it('should handle invalid regex gracefully', () => {
    expect(pipe.transform('hello', '(')).toBe(false);
  });

  it('should match empty string against valid pattern', () => {
    expect(pipe.transform('', '^$')).toBe(true);
  });

  it('should test start anchor', () => {
    expect(pipe.transform('hello world', '^hello')).toBe(true);
  });

  it('should test end anchor', () => {
    expect(pipe.transform('hello world', 'world$')).toBe(true);
  });

  it('should not mutate the original string', () => {
    const original = 'hello';
    pipe.transform(original, 'ell');
    expect(original).toBe('hello');
  });
});