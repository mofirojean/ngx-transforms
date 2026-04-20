import { DecodeUriPipe } from './decode-uri';
import { describe, it, expect, beforeEach } from 'vitest';

describe('DecodeUriPipe', () => {
  let pipe: DecodeUriPipe;

  beforeEach(() => {
    pipe = new DecodeUriPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty for null', () => {
    expect(pipe.transform(null as unknown as string)).toBe('');
  });

  it('should return empty for undefined', () => {
    expect(pipe.transform(undefined as unknown as string)).toBe('');
  });

  it('should return empty for non-string', () => {
    expect(pipe.transform(42 as unknown as string)).toBe('');
  });

  it('should return empty string unchanged', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('should decode percent-encoded space', () => {
    expect(pipe.transform('hi%20world')).toBe('hi world');
  });

  it('should decode a full URL', () => {
    expect(pipe.transform('https://example.com/?q=hi%20world')).toBe('https://example.com/?q=hi world');
  });

  it('should decode unicode', () => {
    expect(pipe.transform('caf%C3%A9')).toBe('café');
  });

  it('should leave unencoded text unchanged', () => {
    expect(pipe.transform('hello')).toBe('hello');
  });

  it('should leave URI structural chars unchanged', () => {
    expect(pipe.transform('https://x.com/p?a=1&b=2#hash')).toBe('https://x.com/p?a=1&b=2#hash');
  });

  it('should handle malformed encoding gracefully', () => {
    expect(pipe.transform('hello%')).toBe('hello%');
  });

  it('should handle invalid percent sequence gracefully', () => {
    expect(pipe.transform('hi%ZZworld')).toBe('hi%ZZworld');
  });

  it('should not mutate the original string', () => {
    const original = 'hi%20world';
    pipe.transform(original);
    expect(original).toBe('hi%20world');
  });
});