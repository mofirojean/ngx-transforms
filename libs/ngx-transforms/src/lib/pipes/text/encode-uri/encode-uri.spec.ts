import { EncodeUriPipe } from './encode-uri';
import { describe, it, expect, beforeEach } from 'vitest';

describe('EncodeUriPipe', () => {
  let pipe: EncodeUriPipe;

  beforeEach(() => {
    pipe = new EncodeUriPipe();
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

  it('should encode spaces in a URL', () => {
    expect(pipe.transform('https://example.com/?q=hi world')).toBe('https://example.com/?q=hi%20world');
  });

  it('should preserve URL structural characters', () => {
    expect(pipe.transform('https://x.com/p?a=1&b=2#hash')).toBe('https://x.com/p?a=1&b=2#hash');
  });

  it('should encode unicode characters', () => {
    expect(pipe.transform('café')).toBe('caf%C3%A9');
  });

  it('should encode space in path', () => {
    expect(pipe.transform('/path with space.html')).toBe('/path%20with%20space.html');
  });

  it('should re-encode percent characters (matches encodeURI semantics)', () => {
    expect(pipe.transform('hello%20world')).toBe('hello%2520world');
  });

  it('should handle plain text', () => {
    expect(pipe.transform('hello')).toBe('hello');
  });

  it('should encode quotes', () => {
    expect(pipe.transform('quote"here')).toBe('quote%22here');
  });

  it('should encode angle brackets', () => {
    expect(pipe.transform('<tag>')).toBe('%3Ctag%3E');
  });

  it('should not mutate the original string', () => {
    const original = 'hi world';
    pipe.transform(original);
    expect(original).toBe('hi world');
  });
});