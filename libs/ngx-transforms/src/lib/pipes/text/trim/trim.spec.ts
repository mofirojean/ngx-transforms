import { TrimPipe } from './trim';
import { describe, it, expect, beforeEach } from 'vitest';

describe('TrimPipe', () => {
  let pipe: TrimPipe;

  beforeEach(() => {
    pipe = new TrimPipe();
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

  it('should return empty string unchanged', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('should trim leading whitespace', () => {
    expect(pipe.transform('   hello')).toBe('hello');
  });

  it('should trim trailing whitespace', () => {
    expect(pipe.transform('hello   ')).toBe('hello');
  });

  it('should trim both sides', () => {
    expect(pipe.transform('  hello  ')).toBe('hello');
  });

  it('should not trim internal whitespace', () => {
    expect(pipe.transform('  hello world  ')).toBe('hello world');
  });

  it('should trim tabs and newlines', () => {
    expect(pipe.transform('\t\n hello \n\t')).toBe('hello');
  });

  it('should return empty when string is all whitespace', () => {
    expect(pipe.transform('     ')).toBe('');
  });

  it('should trim specific single character', () => {
    expect(pipe.transform('--hello--', '-')).toBe('hello');
  });

  it('should trim specific character set', () => {
    expect(pipe.transform('-*-hello-*-', '-*')).toBe('hello');
  });

  it('should trim asterisks', () => {
    expect(pipe.transform('***title***', '*')).toBe('title');
  });

  it('should not trim internal matching characters', () => {
    expect(pipe.transform('--a-b-c--', '-')).toBe('a-b-c');
  });

  it('should handle regex special characters safely', () => {
    expect(pipe.transform('...hello...', '.')).toBe('hello');
  });

  it('should handle brackets and parens', () => {
    expect(pipe.transform('(hello)', '()')).toBe('hello');
  });

  it('should leave string unchanged when chars not present', () => {
    expect(pipe.transform('hello', '-')).toBe('hello');
  });

  it('should trim string with only specified chars', () => {
    expect(pipe.transform('----', '-')).toBe('');
  });

  it('should not mutate the original string', () => {
    const original = '  hello  ';
    pipe.transform(original);
    expect(original).toBe('  hello  ');
  });
});