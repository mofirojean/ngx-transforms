import { CapitalizePipe } from './capitalize';
import { describe, it, expect, beforeEach } from 'vitest';

describe('CapitalizePipe', () => {
  let pipe: CapitalizePipe;

  beforeEach(() => {
    pipe = new CapitalizePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty string for null input', () => {
    expect(pipe.transform(null as unknown as string)).toBe('');
  });

  it('should return empty string for undefined input', () => {
    expect(pipe.transform(undefined as unknown as string)).toBe('');
  });

  it('should return empty string for non-string input', () => {
    expect(pipe.transform(42 as unknown as string)).toBe('');
  });

  it('should return empty string for empty input', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('should capitalize a lowercase word', () => {
    expect(pipe.transform('hello')).toBe('Hello');
  });

  it('should lowercase all-uppercase input', () => {
    expect(pipe.transform('HELLO')).toBe('Hello');
  });

  it('should normalize mixed case', () => {
    expect(pipe.transform('hELLo')).toBe('Hello');
  });

  it('should handle a sentence', () => {
    expect(pipe.transform('hello world')).toBe('Hello world');
  });

  it('should normalize uppercase sentence', () => {
    expect(pipe.transform('HELLO WORLD')).toBe('Hello world');
  });

  it('should handle a single character', () => {
    expect(pipe.transform('a')).toBe('A');
  });

  it('should handle already-capitalized input', () => {
    expect(pipe.transform('Hello')).toBe('Hello');
  });

  it('should handle strings starting with number', () => {
    expect(pipe.transform('123abc')).toBe('123abc');
  });

  it('should handle strings starting with symbol', () => {
    expect(pipe.transform('-hello')).toBe('-hello');
  });

  it('should preserve leading whitespace first char', () => {
    expect(pipe.transform(' hello')).toBe(' hello');
  });

  it('should handle punctuation', () => {
    expect(pipe.transform('hello!')).toBe('Hello!');
  });

  it('should not mutate the original string', () => {
    const original = 'hello world';
    pipe.transform(original);
    expect(original).toBe('hello world');
  });
});