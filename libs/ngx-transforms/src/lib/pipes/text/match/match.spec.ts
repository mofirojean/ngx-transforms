import { MatchPipe } from './match';
import { describe, it, expect, beforeEach } from 'vitest';

describe('MatchPipe', () => {
  let pipe: MatchPipe;

  beforeEach(() => {
    pipe = new MatchPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty array for null value', () => {
    expect(pipe.transform(null as unknown as string, 'x')).toEqual([]);
  });

  it('should return empty array for undefined value', () => {
    expect(pipe.transform(undefined as unknown as string, 'x')).toEqual([]);
  });

  it('should return empty array for non-string value', () => {
    expect(pipe.transform(42 as unknown as string, 'x')).toEqual([]);
  });

  it('should return empty array for empty pattern', () => {
    expect(pipe.transform('hello', '')).toEqual([]);
  });

  it('should return all matches of digits', () => {
    expect(pipe.transform('abc123def456', '[0-9]+')).toEqual(['123', '456']);
  });

  it('should match words', () => {
    expect(pipe.transform('hello world foo', '[a-z]+')).toEqual(['hello', 'world', 'foo']);
  });

  it('should return empty array when no match found', () => {
    expect(pipe.transform('hello', 'xyz')).toEqual([]);
  });

  it('should match with case-insensitive flag', () => {
    expect(pipe.transform('HELLO World', '[a-z]+', 'gi')).toEqual(['HELLO', 'World']);
  });

  it('should match with RegExp object', () => {
    expect(pipe.transform('a1b2c3', /\d/g)).toEqual(['1', '2', '3']);
  });

  it('should force global flag on RegExp without g', () => {
    expect(pipe.transform('a1b2c3', /\d/)).toEqual(['1', '2', '3']);
  });

  it('should handle invalid regex gracefully', () => {
    expect(pipe.transform('hello', '(')).toEqual([]);
  });

  it('should match email addresses', () => {
    expect(pipe.transform('Email a@b.com or c@d.org', '[\\w.]+@[\\w.]+')).toEqual(['a@b.com', 'c@d.org']);
  });

  it('should match URLs', () => {
    expect(pipe.transform('Visit https://foo.com and http://bar.io', 'https?://[\\w.]+')).toEqual([
      'https://foo.com',
      'http://bar.io',
    ]);
  });

  it('should match hashtags', () => {
    expect(pipe.transform('Love #angular and #rxjs!', '#\\w+')).toEqual(['#angular', '#rxjs']);
  });

  it('should not mutate the original string', () => {
    const original = 'abc123';
    pipe.transform(original, '[0-9]+');
    expect(original).toBe('abc123');
  });
});