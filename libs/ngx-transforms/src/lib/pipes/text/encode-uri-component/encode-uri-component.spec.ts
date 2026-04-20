import { EncodeUriComponentPipe } from './encode-uri-component';
import { describe, it, expect, beforeEach } from 'vitest';

describe('EncodeUriComponentPipe', () => {
  let pipe: EncodeUriComponentPipe;

  beforeEach(() => {
    pipe = new EncodeUriComponentPipe();
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

  it('should encode space', () => {
    expect(pipe.transform('hi world')).toBe('hi%20world');
  });

  it('should encode ampersand', () => {
    expect(pipe.transform('hi&you')).toBe('hi%26you');
  });

  it('should encode equals sign', () => {
    expect(pipe.transform('a=b')).toBe('a%3Db');
  });

  it('should encode question mark', () => {
    expect(pipe.transform('what?')).toBe('what%3F');
  });

  it('should encode slash', () => {
    expect(pipe.transform('foo/bar')).toBe('foo%2Fbar');
  });

  it('should encode hash', () => {
    expect(pipe.transform('a#b')).toBe('a%23b');
  });

  it('should encode plus', () => {
    expect(pipe.transform('1+1')).toBe('1%2B1');
  });

  it('should encode colon', () => {
    expect(pipe.transform('time:9')).toBe('time%3A9');
  });

  it('should encode complex query value', () => {
    expect(pipe.transform('foo/bar?baz=1')).toBe('foo%2Fbar%3Fbaz%3D1');
  });

  it('should preserve unreserved characters', () => {
    expect(pipe.transform("a-b_c.d~e!f*g'h(i)j")).toBe("a-b_c.d~e!f*g'h(i)j");
  });

  it('should encode unicode', () => {
    expect(pipe.transform('café')).toBe('caf%C3%A9');
  });

  it('should not mutate the original string', () => {
    const original = 'hi&world';
    pipe.transform(original);
    expect(original).toBe('hi&world');
  });
});