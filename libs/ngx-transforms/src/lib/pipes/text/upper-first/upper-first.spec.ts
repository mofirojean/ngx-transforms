import { UpperFirstPipe } from './upper-first';
import { describe, it, expect, beforeEach } from 'vitest';

describe('UpperFirstPipe', () => {
  let pipe: UpperFirstPipe;

  beforeEach(() => {
    pipe = new UpperFirstPipe();
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

  it('should uppercase first character of lowercase word', () => {
    expect(pipe.transform('hello')).toBe('Hello');
  });

  it('should preserve rest of mixed-case word', () => {
    expect(pipe.transform('hELLo')).toBe('HELLo');
  });

  it('should preserve an acronym', () => {
    expect(pipe.transform('jSON')).toBe('JSON');
  });

  it('should preserve uppercase rest', () => {
    expect(pipe.transform('hello WORLD')).toBe('Hello WORLD');
  });

  it('should uppercase camelCase first char', () => {
    expect(pipe.transform('javaScript')).toBe('JavaScript');
  });

  it('should handle a single lowercase character', () => {
    expect(pipe.transform('a')).toBe('A');
  });

  it('should handle a single uppercase character', () => {
    expect(pipe.transform('A')).toBe('A');
  });

  it('should leave already-uppercase first char unchanged', () => {
    expect(pipe.transform('Hello')).toBe('Hello');
  });

  it('should not change leading number', () => {
    expect(pipe.transform('123abc')).toBe('123abc');
  });

  it('should not change leading symbol', () => {
    expect(pipe.transform('-hello')).toBe('-hello');
  });

  it('should preserve leading whitespace first char', () => {
    expect(pipe.transform(' hello')).toBe(' hello');
  });

  it('should not lowercase any subsequent chars', () => {
    expect(pipe.transform('aPIkey')).toBe('APIkey');
  });

  it('should handle punctuation in string', () => {
    expect(pipe.transform('hello!')).toBe('Hello!');
  });

  it('should not mutate the original string', () => {
    const original = 'hello WORLD';
    pipe.transform(original);
    expect(original).toBe('hello WORLD');
  });
});