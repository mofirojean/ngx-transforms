import { DecodeUriComponentPipe } from './decode-uri-component';
import { describe, it, expect, beforeEach } from 'vitest';

describe('DecodeUriComponentPipe', () => {
  let pipe: DecodeUriComponentPipe;

  beforeEach(() => {
    pipe = new DecodeUriComponentPipe();
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

  it('should decode ampersand', () => {
    expect(pipe.transform('hi%26you')).toBe('hi&you');
  });

  it('should decode equals sign', () => {
    expect(pipe.transform('a%3Db')).toBe('a=b');
  });

  it('should decode question mark', () => {
    expect(pipe.transform('what%3F')).toBe('what?');
  });

  it('should decode slash', () => {
    expect(pipe.transform('foo%2Fbar')).toBe('foo/bar');
  });

  it('should decode hash', () => {
    expect(pipe.transform('a%23b')).toBe('a#b');
  });

  it('should decode plus', () => {
    expect(pipe.transform('1%2B1')).toBe('1+1');
  });

  it('should decode complex query value', () => {
    expect(pipe.transform('foo%2Fbar%3Fbaz%3D1')).toBe('foo/bar?baz=1');
  });

  it('should decode unicode', () => {
    expect(pipe.transform('caf%C3%A9')).toBe('café');
  });

  it('should leave plain text unchanged', () => {
    expect(pipe.transform('hello')).toBe('hello');
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