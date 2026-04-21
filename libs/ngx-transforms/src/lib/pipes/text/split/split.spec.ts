import { SplitPipe } from './split';
import { describe, it, expect, beforeEach } from 'vitest';

describe('SplitPipe', () => {
  let pipe: SplitPipe;

  beforeEach(() => {
    pipe = new SplitPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty array for null', () => {
    expect(pipe.transform(null as unknown as string, ',')).toEqual([]);
  });

  it('should return empty array for undefined', () => {
    expect(pipe.transform(undefined as unknown as string, ',')).toEqual([]);
  });

  it('should return empty array for non-string', () => {
    expect(pipe.transform(42 as unknown as string, ',')).toEqual([]);
  });

  it('should split into chars for empty separator (default)', () => {
    expect(pipe.transform('abc')).toEqual(['a', 'b', 'c']);
  });

  it('should split by comma', () => {
    expect(pipe.transform('a,b,c', ',')).toEqual(['a', 'b', 'c']);
  });

  it('should split by space', () => {
    expect(pipe.transform('one two three', ' ')).toEqual(['one', 'two', 'three']);
  });

  it('should split by multi-character separator', () => {
    expect(pipe.transform('a, b, c', ', ')).toEqual(['a', 'b', 'c']);
  });

  it('should split by regex', () => {
    expect(pipe.transform('abc123def456', /\d+/)).toEqual(['abc', 'def', '']);
  });

  it('should split by regex with multiple delimiters', () => {
    expect(pipe.transform('a,b;c|d', /[,;|]/)).toEqual(['a', 'b', 'c', 'd']);
  });

  it('should respect limit', () => {
    expect(pipe.transform('one two three', ' ', 2)).toEqual(['one', 'two']);
  });

  it('should return empty array for limit of 0', () => {
    expect(pipe.transform('a,b,c', ',', 0)).toEqual([]);
  });

  it('should handle empty input string', () => {
    expect(pipe.transform('', ',')).toEqual(['']);
  });

  it('should handle separator not found', () => {
    expect(pipe.transform('hello', ',')).toEqual(['hello']);
  });

  it('should handle newline separator', () => {
    expect(pipe.transform('line1\nline2\nline3', '\n')).toEqual(['line1', 'line2', 'line3']);
  });

  it('should not mutate the original string', () => {
    const original = 'a,b,c';
    pipe.transform(original, ',');
    expect(original).toBe('a,b,c');
  });
});